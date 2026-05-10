const STORAGE_KEY = "lua_patterns";

export const savedPatterns = {
  get: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to read patterns from localStorage", e);
      return [];
    }
  },

  set: (patterns) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patterns));
      return true;
    } catch (e) {
      console.error("Failed to save patterns to localStorage", e);
      alert("Storage error: Patterns could not be saved. Your localStorage might be full.");
      return false;
    }
  },

  save: (patternObj) => {
    const patterns = savedPatterns.get();
    const existingIndex = patterns.findIndex((p) => p.name === patternObj.name);

    if (existingIndex >= 0) {
      const confirmOverwrite = window.confirm(
        `A pattern named "${patternObj.name}" already exists. Overwrite it?`
      );
      if (!confirmOverwrite) return false;
      patterns[existingIndex] = { ...patternObj, id: patterns[existingIndex].id };
    } else {
      patterns.push({
        ...patternObj,
        id: crypto.randomUUID?.() || Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    }

    return savedPatterns.set(patterns);
  },

  delete: (id) => {
    if (!window.confirm("Are you sure you want to delete this saved pattern?")) return false;
    const patterns = savedPatterns.get();
    const filtered = patterns.filter((p) => p.id !== id);
    return savedPatterns.set(filtered);
  },

  export: () => {
    const data = JSON.stringify(savedPatterns.get(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lua_patterns_export_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  },

  import: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (!Array.isArray(imported)) throw new Error("Invalid format");

          const existing = savedPatterns.get();
          const merged = [...existing];

          imported.forEach((item) => {
            if (!merged.find((m) => m.name === item.name)) {
              merged.push({
                ...item,
                id: crypto.randomUUID?.() || Date.now().toString(),
              });
            }
          });

          savedPatterns.set(merged);
          resolve(true);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  },
};
