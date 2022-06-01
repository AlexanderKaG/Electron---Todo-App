const { contextBridge, ipcRenderer } = require("electron");
const os = require("os");
// expose the function window.api.cpuCount()
contextBridge.exposeInMainWorld("api", {
  // Note that the os.cpus() is a Node.js method calling the OS
  cpuCount: () => os.cpus().length,
});
async function handleSaveFile(todos) {
  return ipcRenderer.invoke("saveFile", todos);
}
contextBridge.exposeInMainWorld("api", {
  cpuCount: () => os.cpus().length,
  saveFile: handleSaveFile,
});
