#!/usr/bin/env node
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../..");
const playwrightRoot = process.env.PLAYWRIGHT_CORE_PATH || "/Applications/ChatGPT.app/Contents/Resources/cua_node/lib/node_modules/playwright-core";
const { chromium } = await import(pathToFileURL(path.join(playwrightRoot, "index.mjs")));
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };
const baselineHtml = execFileSync("git", ["show", "HEAD:newsstand-crossword.html"], { cwd: root, encoding: "utf8" });
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://local").pathname);
  if (pathname === "/baseline.html") { res.writeHead(200, { "content-type": "text/html; charset=utf-8" }); res.end(baselineHtml); return; }
  const file = path.resolve(root, "." + (pathname === "/" ? "/newsstand-crossword.html" : pathname));
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": mime[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, executablePath: chrome });
const result = [];
try {
  for (const puzzle of ["puzzle-01", "puzzle-02"]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`${origin}/newsstand-crossword.html?puzzle=${puzzle}`, { waitUntil: "networkidle" });
    const baseline = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await baseline.goto(`${origin}/baseline.html?puzzle=${puzzle}`, { waitUntil: "networkidle" });
    const geometry = await page.locator("#cw-grid").evaluate(grid => ({
      children: grid.children.length,
      cells: grid.querySelectorAll(".cw-cell").length,
      width: grid.getBoundingClientRect().width,
      height: grid.getBoundingClientRect().height,
      viewportWidth: window.innerWidth,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    }));
    const size = Number(await page.locator("#cw-grid").getAttribute("aria-rowcount"));
    const domIndices = await page.locator("#cw-grid").evaluate((grid, size) => [...grid.children].every((row, rowOffset) =>
      row.getAttribute("role") === "row" && row.getAttribute("aria-rowindex") === String(rowOffset + 1) &&
      [...row.children].every((cell, columnOffset) => cell.getAttribute("role") === "gridcell" && cell.getAttribute("aria-colindex") === String(columnOffset + 1))
    ), size);
    assert.ok(Number.isInteger(size) && size > 0, `${puzzle}: grid reports a usable row count`);
    assert.equal(geometry.children, size, `${puzzle}: rendered grid has one direct row wrapper per row`);
    assert.equal(geometry.cells, size * size, `${puzzle}: rendered grid retains every cell`);
    assert.equal(domIndices, true, `${puzzle}: DOM row and column indices remain complete and sequential`);
    assert.equal(geometry.horizontalOverflow, false, `${puzzle}: row wrappers do not introduce page overflow`);
    const cellRects = async current => current.locator("#cw-grid .cw-cell").evaluateAll(cells => cells.map(cell => {
      const rect = cell.getBoundingClientRect(); return [rect.x, rect.y, rect.width, rect.height];
    }));
    assert.deepEqual(await cellRects(page), await cellRects(baseline), `${puzzle}: row wrappers preserve every cell position and size`);
    const firstInput = page.locator("#cw-grid input").first();
    await firstInput.focus();
    await page.keyboard.type("Q");
    assert.equal(await firstInput.inputValue(), "Q", `${puzzle}: typing still reaches the first crossword cell`);
    const arrowStart = await page.evaluate(() => {
      const keys = new Set([...document.querySelectorAll("#cw-grid input")].map(input => input.dataset.key));
      return [...keys].find(key => { const [row, column] = key.split("-").map(Number); return keys.has(`${row}-${column + 1}`); });
    });
    assert.ok(arrowStart, `${puzzle}: a horizontal keyboard-navigation pair exists`);
    await page.locator(`#cw-grid input[data-key="${arrowStart}"]`).focus();
    const beforeArrow = await page.evaluate(() => document.activeElement?.dataset.key);
    await page.keyboard.press("ArrowRight");
    assert.notEqual(await page.evaluate(() => document.activeElement?.dataset.key), beforeArrow, `${puzzle}: arrow navigation still changes cells`);
    const cdp = await page.context().newCDPSession(page);
    const ax = await cdp.send("Accessibility.getFullAXTree");
    const role = node => node.role && node.role.value;
    const grid = ax.nodes.find(node => role(node) === "grid");
    assert.ok(grid, `${puzzle}: grid reaches Chrome AX tree`);
    const byParent = new Map();
    for (const node of ax.nodes) for (const childId of node.childIds || []) byParent.set(childId, node);
    const rows = ax.nodes.filter(node => role(node) === "row" && byParent.get(node.nodeId)?.nodeId === grid.nodeId);
    assert.equal(rows.length, size, `${puzzle}: Chrome AX grid exposes every direct row`);
    const cellsByRow = rows.map(row => (row.childIds || []).map(id => ax.nodes.find(node => node.nodeId === id)).filter(Boolean).filter(node => role(node) === "gridcell"));
    assert.ok(cellsByRow.every(cells => cells.length === size), `${puzzle}: each AX row has every grid cell`);
    assert.equal(cellsByRow.flat().length, size * size, `${puzzle}: Chrome AX retains every grid cell in rows`);
    const properties = node => Object.fromEntries((node.properties || []).map(property => [property.name, property.value?.value]));
    const firstCell = cellsByRow[0][0];
    const firstRowProperties = properties(rows[0]);
    const firstCellProperties = properties(firstCell);
    result.push({ puzzle, size, geometry, domIndices, axRows: rows.length, axCellsPerRow: cellsByRow.map(cells => cells.length), firstRowProperties, firstCellProperties });
    await page.close(); await baseline.close();
  }
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
console.log(JSON.stringify({ status: "pass", puzzles: result }, null, 2));
