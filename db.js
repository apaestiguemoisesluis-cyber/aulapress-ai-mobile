/* AulaPress AI - IndexedDB privado; no hay servicios externos ni claves API. */
const Store = (() => {
  const DB = 'aulapress-ai-private-v1';
  const VERSION = 1;
  let pending;
  function open() {
    if (pending) return pending;
    pending = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB, VERSION);
      request.onupgradeneeded = () => {
        const d = request.result;
        if (!d.objectStoreNames.contains('courses')) d.createObjectStore('courses', { keyPath: 'id' });
        if (!d.objectStoreNames.contains('files')) {
          const f = d.createObjectStore('files', { keyPath: 'id' });
          f.createIndex('courseId', 'courseId', { unique: false });
        }
        if (!d.objectStoreNames.contains('settings')) d.createObjectStore('settings', { keyPath: 'key' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error('Cierra otras pestañas de AulaPress e inténtalo de nuevo.'));
    });
    return pending;
  }
  async function operation(table, mode, run) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(table, mode);
      const os = tx.objectStore(table);
      let result;
      const req = run(os);
      if (req) {
        req.onsuccess = () => { result = req.result; };
        req.onerror = () => { /* the transaction error handler rejects */ };
      }
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error || new Error('No se pudo guardar en este dispositivo.'));
      tx.onabort = () => reject(tx.error || new Error('Almacenamiento interrumpido o sin espacio.'));
    });
  }
  const list = t => operation(t, 'readonly', os => os.getAll());
  const get = (t, k) => operation(t, 'readonly', os => os.get(k));
  const put = (t, obj) => operation(t, 'readwrite', os => os.put(obj));
  const del = (t, k) => operation(t, 'readwrite', os => os.delete(k));
  async function deleteCourse(id) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(['courses','files'], 'readwrite');
      const files = tx.objectStore('files');
      files.index('courseId').openCursor(IDBKeyRange.only(id)).onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) { cursor.delete(); cursor.continue(); }
      };
      tx.objectStore('courses').delete(id);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
  async function restore(data) {
    const d = await open();
    return new Promise((resolve,reject) => {
      const tx=d.transaction(['courses','files','settings'],'readwrite');
      for (const name of ['courses','files','settings']) tx.objectStore(name).clear();
      for (const c of data.courses) tx.objectStore('courses').put(c);
      for (const f of data.files) tx.objectStore('files').put(f);
      for (const s of data.settings) tx.objectStore('settings').put(s);
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error);
      tx.onabort=()=>reject(tx.error);
    });
  }
  return { open, list, get, put, del, deleteCourse, restore };
})();
