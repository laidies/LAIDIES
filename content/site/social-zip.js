/* Build a small, deterministic ZIP archive from browser File objects. */
(function (global) {
  'use strict';

  const encoder = new TextEncoder();
  const textDecoder = new TextDecoder();

  function crc32(bytes) {
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i += 1) {
      crc ^= bytes[i];
      for (let bit = 0; bit < 8; bit += 1) {
        crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function write16(view, offset, value) {
    view.setUint16(offset, value, true);
  }

  function write32(view, offset, value) {
    view.setUint32(offset, value >>> 0, true);
  }

  function validateName(name, seen) {
    if (typeof name !== 'string' || name.length === 0 || name.length > 255) {
      throw new TypeError('ZIP entry names must be non-empty strings of 255 characters or fewer');
    }
    if (name.includes('\\') || name.startsWith('/') || /^[A-Za-z]:/.test(name)) {
      throw new TypeError('ZIP entry names must use relative POSIX paths');
    }
    if (/^[\u0000-\u001f\u007f]/.test(name) || /[\u0000-\u001f\u007f]/.test(name)) {
      throw new TypeError('ZIP entry names must not contain control characters');
    }
    const parts = name.split('/');
    if (parts.some((part) => part === '' || part === '.' || part === '..')) {
      throw new TypeError('ZIP entry names must not contain empty, . or .. path segments');
    }
    const encoded = encoder.encode(name);
    if (encoded.length > 0xffff) {
      throw new TypeError('ZIP entry names are too long');
    }
    if (seen.has(name)) {
      throw new TypeError('ZIP entry names must be unique');
    }
    seen.add(name);
    return encoded;
  }

  global.makeLaidiesSocialZip = async function makeLaidiesSocialZip(files) {
    if (!Array.isArray(files)) throw new TypeError('Expected an array of browser File objects');

    const seen = new Set();
    const entries = [];
    for (const file of files) {
      if (!file || typeof file.name !== 'string' || typeof file.arrayBuffer !== 'function') {
        throw new TypeError('Every ZIP entry must be a browser File object');
      }
      const nameBytes = validateName(file.name, seen);
      const data = new Uint8Array(await file.arrayBuffer());
      entries.push({ nameBytes, data, crc: crc32(data) });
    }

    let size = 22;
    for (const entry of entries) size += 30 + entry.nameBytes.length + entry.data.length + 46 + entry.nameBytes.length;
    const output = new Uint8Array(size);
    const view = new DataView(output.buffer);
    let offset = 0;
    const centralOffset = [];
    const flags = 0x0800; // UTF-8 names
    const method = 0; // stored, without compression
    const dosTime = 0;
    const dosDate = 0x0021; // 1980-01-01, deterministic DOS date

    for (const entry of entries) {
      centralOffset.push(offset);
      write32(view, offset, 0x04034b50); write16(view, offset + 4, 20); write16(view, offset + 6, flags);
      write16(view, offset + 8, method); write16(view, offset + 10, dosTime); write16(view, offset + 12, dosDate);
      write32(view, offset + 14, entry.crc); write32(view, offset + 18, entry.data.length); write32(view, offset + 22, entry.data.length);
      write16(view, offset + 26, entry.nameBytes.length); write16(view, offset + 28, 0);
      output.set(entry.nameBytes, offset + 30); output.set(entry.data, offset + 30 + entry.nameBytes.length);
      offset += 30 + entry.nameBytes.length + entry.data.length;
    }

    const centralStart = offset;
    entries.forEach((entry, index) => {
      write32(view, offset, 0x02014b50); write16(view, offset + 4, 20); write16(view, offset + 6, 20); write16(view, offset + 8, flags);
      write16(view, offset + 10, method); write16(view, offset + 12, dosTime); write16(view, offset + 14, dosDate);
      write32(view, offset + 16, entry.crc); write32(view, offset + 20, entry.data.length); write32(view, offset + 24, entry.data.length);
      write16(view, offset + 28, entry.nameBytes.length); write16(view, offset + 30, 0); write16(view, offset + 32, 0);
      write16(view, offset + 34, 0); write16(view, offset + 36, 0); write32(view, offset + 38, 0); write32(view, offset + 42, centralOffset[index]);
      output.set(entry.nameBytes, offset + 46); offset += 46 + entry.nameBytes.length;
    });

    const centralSize = offset - centralStart;
    write32(view, offset, 0x06054b50); write16(view, offset + 4, 0); write16(view, offset + 6, 0);
    write16(view, offset + 8, entries.length); write16(view, offset + 10, entries.length); write32(view, offset + 12, centralSize); write32(view, offset + 16, centralStart); write16(view, offset + 20, 0);
    return new Blob([output], { type: 'application/zip' });
  };
})(typeof window === 'undefined' ? globalThis : window);
