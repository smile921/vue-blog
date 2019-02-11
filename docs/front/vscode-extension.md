## vscode extension

### Extending Visual Studio Code

所有的扩展激活后都运行在共享扩展进程下，这种隔离进程扩展保证了 vscode 的响应与吞吐量。
扩展的支持特性有：

- 激活 Activation 当一个指定类型的文件被检测到或者一个指定的文件存在，又或者在命令面板选择了或者一个指定的按键组合按下了则加载这个扩展。
- 编辑器 Editor 他与编辑器的内容一起工作，读或者操作文本，影响选择到的内容。
- 工作空间 Workspace 接触打开的编辑器，状态栏，提示消息等
- 事件 Event 连接编辑器的生命周期事件 诸如打开，关闭，改变等等
- 关联编辑 Evolved Editing 创建并提供丰富的语言支持等

![](./img/extensibility-architecture.png)
