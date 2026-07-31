const params = new URLSearchParams(window.location.search);
const direction = ["a", "b", "c"].includes(params.get("direction"))
  ? params.get("direction")
  : "a";
document.documentElement.dataset.direction = direction;
if (params.get("capture") === "1") document.documentElement.dataset.capture = "true";
if (params.get("mobile") === "1") document.documentElement.dataset.mobile = "true";

const rules = {
  a: "A: ident is native punctuation inside one continuous graphic-novel world.",
  b: "B: ident is the explicit threshold between painterly town and comic episode.",
  c: "C: ident activates when a visitor crosses from place into an operated or story surface.",
};
document.querySelector(".ident-rule").textContent = rules[direction];
document.querySelectorAll("[data-direction]").forEach((button) => {
  button.setAttribute("aria-pressed", String(button.dataset.direction === direction));
  button.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("direction", button.dataset.direction);
    window.location.href = url;
  });
});
