import {contextBridge,ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('testMain',{
    helloWorld:(name:String)=>ipcRenderer.send('helloWorld',name),
});