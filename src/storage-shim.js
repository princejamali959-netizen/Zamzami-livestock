// Claude artifacts provide a built-in `window.storage` API backed by Anthropic's
// servers. Outside claude.ai that object doesn't exist, so this shim recreates
// the same get/set/delete/list interface using the browser's localStorage,
// keeping the app's save/load code unchanged.
(function () {
  if (typeof window === "undefined" || window.storage) return;

  const NS = "farm-ledger:";

  function fullKey(key, shared) {
    return `${NS}${shared ? "shared:" : "local:"}${key}`;
  }

  window.storage = {
    async get(key, shared = false) {
      const raw = localStorage.getItem(fullKey(key, shared));
      if (raw === null) throw new Error(`Key not found: ${key}`);
      return { key, value: raw, shared };
    },
    async set(key, value, shared = false) {
      localStorage.setItem(fullKey(key, shared), value);
      return { key, value, shared };
    },
    async delete(key, shared = false) {
      localStorage.removeItem(fullKey(key, shared));
      return { key, deleted: true, shared };
    },
    async list(prefix = "", shared = false) {
      const scan = `${NS}${shared ? "shared:" : "local:"}${prefix}`;
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(scan)) keys.push(k.slice(`${NS}${shared ? "shared:" : "local:"}`.length));
      }
      return { keys, prefix, shared };
    },
  };
})();
