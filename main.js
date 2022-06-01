const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
// require the promise based version of fs functions
const fs = require("fs/promises");
// we want this to be as async as possible!
async function saveFile(browserWin, todos) {
  let { canceled, filePath } = await dialog.showSaveDialog(browserWin, {
    filters: [
      { name: "JSON", extensions: ["json"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  if (!canceled) {
    const content = JSON.stringify(todos);
    fs.writeFile(filePath, content);
  }
}
function createWindow() {
  const win = new BrowserWindow({
    width: 800,

    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("dist/index.html");
  return win;
}
async function openFile(browserWin) {
  let { canceled, filePaths } = await dialog.showOpenDialog(browserWin, {
    filters: [
      { name: "JSON", extensions: ["json"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  if (!canceled && filePaths?.length > 0) {
    return fs.readFile(filePaths[0], "utf-8");
  }
}
app.whenReady().then(() => {
  const mainWin = createWindow();
  // when we get sent a message on the channel "saveFile" we
  // call the saveToFile function
  ipcMain.handle("saveFile", (event, todos) => saveFile(mainWin, todos));
  ipcMain.handle("openFile", () => openFile(mainWin));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
