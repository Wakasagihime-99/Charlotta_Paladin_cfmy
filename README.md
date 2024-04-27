<!--
 * @Date: 2024-04-24
 * @LastEditors: Wakasagihime-99
 * @LastEditTime: 2024-04-27
 * @FilePath: \\Charlotta_Paladin_cfmy\\README.md
 * @FFXIV: 玖时九@拂晓之间
 * @Description: 用户指南
-->

# 基于cactbot的战场豆丁语音触发器

<!-- TOC -->

- [基于cactbot的战场豆丁语音触发器](#基于cactbot的战场豆丁语音触发器)
  - [安装](#安装)
    - [前置插件](#前置插件)
    - [设置cactbot](#设置cactbot)
  - [功能介绍](#功能介绍)
  - [注意](#注意)

<!-- /TOC -->
<!-- /TOC -->

## 安装

### 前置插件

在使用本插件前，你需要安装ACT及cactbot插件。如您使用ACT国服整合版，则可在如下位置一键安装cactbot。

![国服ACT整合版安装cactbot](png\cactbot_install.png)

### 设置cactbot

在插件-ngld悬浮窗处可找到cactbot配置。找到自己的cactbot user目录（以下简称use文件夹），检查默认触发器提示输出方式是否将提示音打开。

![cactbot设置](png\cactbot_config.png)

下载Charlotta_Paladin_cfmy.zip，并将其解压到user文件夹下的raidboss文件夹内。

![解压位置](png\unzip.png)

重启ACT或在cactbot配置页右侧空白处右键Reload，cactbot被重新加载，若下方日志有如下提示，则插件加载成功。

![加载成功](png\succesfullyrun.png)

## 功能介绍

- 目前实装了功能：
  - 战场疾跑播放奔跑语音
  - 血量低于30%时播放helpme
  - 死亡语音
  - 骑士无敌音效随机
  - 全职业LB攒满
  - 也许还会更新
- 如您想关闭某个触发器，或增加其他条件（如只有职业为骑士时触发），可打开alimas.js并根据注释酌情修改。下图红线为可能会常用的设置。

![代码示例](png\codedemo.png)

## 注意

- 灵感及部分素材来源于【【FF14】当骑士拉拉肥用上Relink豆丁语音包-哔哩哔哩】 <https://b23.tv/ytIrYrr> ，特此鸣谢
- 其他素材来源于解包文件，见 <https://g.nga.cn/read.php?tid=39242143&page=1>
- 感谢国服ACT群的各位大佬们耐心的教学与解答
- 初学者，做着玩的，如出现问题，看我干嘛，你看我会吗？（狗头心虚）（请于github发issues（或者也许在游戏上找我！？））
