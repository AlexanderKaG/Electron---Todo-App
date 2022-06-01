const { contextBridge, ipcRenderer } = require("electron");
const os = require("os");
async function handleSaveFile(todos) {
  return ipcRenderer.invoke("saveFile", todos);
}
async function handleOpenFile() {
  return ipcRenderer.invoke("openFile");
}
contextBridge.exposeInMainWorld("api", {
  cpuCount: () => os.cpus().length,
  saveFile: handleSaveFile,
  openFile: handleOpenFile,
});
