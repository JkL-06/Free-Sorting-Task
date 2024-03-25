const {app, BrowserWindow} = require('electron');

let mainWindow;  // 用来保存主窗口对象的引用

// 当 Electron 完成初始化并准备创建浏览器窗口时被调用
app.on('ready', () => {
  // 创建主窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true
  });
  mainWindow.loadFile('dist/index.html');
  // 加载页面文件
  // if (app.isPackaged) {
  //   // 如果是打包好的就加载打包的 HTML 文件
  //   mainWindow.loadFile('dist/index.html');
  // }else {
  //   // 如果没有打包就直接从本地服务器加载
  //   mainWindow.loadURL('http://localhost:8080/');
  // }

  mainWindow.setMenu(null);

  // 关闭事件
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
app.on("window-all-closed", () => {
  app.quit();
});