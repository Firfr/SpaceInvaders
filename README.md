SpaceInvaders 太空侵略者
=============
This is a remake of the space invader phaser example, which you can find here:
http://examples.phaser.io/  
这是对 Phaser 示例中“Space Invader”游戏的一次重制，你可以在以下链接找到原版示例：http://examples.phaser.io/


This remake is made with require.js, which breaks up the code into modules.  
这次重制使用了 require.js，它将代码拆分为多个模块。  
Modules are in assets/javascript/module  
模块文件位于：assets/javascript/module

Code is more organized thanks to State and Statemanager class from Phaser.  
由于使用了 Phaser 提供的 State 和 StateManager 类，代码结构更加清晰。  
You can find the states in assets/javascript/state  
你可以在这里找到各个状态：assets/javascript/state

I used Phaser 2.0.1(no Physics) from the Dev branch.  
我使用的是 Phaser 2.0.1 版本（不包含物理引擎），来源于 Dev 分支。
The dev branch has a lot of bug fixes so it's recommended to use it.  
Dev 分支包含大量 bug 修复，因此推荐使用这个分支。

Thanks to require.js, i made an optimized version of my game,  
多亏了 require.js，我还制作了一个优化版本的游戏，  
which can be viewed with indexOpt.html. This use the "compiled" code, which can be found in assets/javascript/built  
你可以在 indexOpt.html 中查看。该版本使用“编译后”的代码，你可以在 assets/javascript/built 中找到相关文件。

Known issue: In every new play state(after the end state) the game makes new DOM nodes.  
已知问题：每次进入新的游戏状态（比如在“游戏结束”之后重新开始），游戏都会创建新的 DOM 节点。  
The cause: in every cycle i make a new text to show the score.  
原因：每个循环中我都会新建一个文本对象用于显示分数。  
I tried to destroy the texts but i never succeed.  
我尝试过销毁这些文本对象，但从未成功。

You can play with it here: http://strykerkkd.github.io/SpaceInvaders/  
你可以在这里试玩：http://strykerkkd.github.io/SpaceInvaders/


