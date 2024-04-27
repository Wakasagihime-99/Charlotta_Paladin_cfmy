/*
 * @Date: 2024-04-18
 * @LastEditors: Wakasagihime-99
 * @LastEditTime: 2024-04-27
 * @FilePath: \\Charlotta_Paladin_cfmy\\alimas.js
 * @FFXIV: 玖时九@拂晓之间
 * @Description: 豆丁骑士语音包——战场版
 * @Log: 卡在了同一条触发条件不能分开触发，暂时放弃了这个想法；
 *       问题被大佬解答了。详见module.export图片，功能已实现；
 */

//检查文件是否加载
console.log('==========================');
console.log('触发器文件已正常加载阿力马斯');
console.log('==========================');

let randomNum = 0; // 定义一个随机数全局变量

//触发器本体
Options.Triggers.push({

  // 其他区域id可见resources/zone_id.ts
  // 尘封秘岩: 431, 昂萨哈凯尔：888，荣誉野：554，狼狱停船场：250
  // 全部区域请用zoneId: ZoneId.MatchAll
  zoneId: [888, 431, 554, 250],

  // 此为非cactbot时间轴相关触发器，新触发器放入triggers:[]的大括号内才可有效触发
  triggers: [
    
    // 触发器1：在战场使用冲刺时播放冲刺语音
    {
      //触发器id。每一个触发器id必须不同（注意不能和其自带的时间轴等触发器相同），否则会互相覆盖。id允许为中文。
      id: 'Charlotta_Paladin_Sprint_cfmy',
     
      // 是否禁用此触发器。将false改为true则本触发器不触发
      disabled: false,

      // 此为触发匹配过程，游戏内各种行为将产生许多‘日志’被ACT接收，本条语言即为“查找满足...条件的日志”，若匹配，则触发器触发。
      // Regexes.ability为cactbot自定义的函数，匹配技能和AOE技能的日志条（第15/16条）
      // 除了id外，还可增加其他限制条件（置于花括号内），如source: '玖时九', target: '泰坦' 等，
      // 具体可见resources/netlog_defs.ts看它定义了几个'field'
      // 普通冲刺id是03，战场冲刺是7181
      regex: Regexes.ability({ id: '7181' }),
      
      // 以下部分规定了本触发器触发的先行条件，若不满足则触发器不会触发
      // data的选项可在源码type/data.d.ts找，可能会用到的有：job, me, role, currentHP, inCombat
      // matches和上面的“限制条件”相同，都是定义了几个'field'就可以用，field基本和ACT日志提供了多少信息相同
      // 详细可查询https://github.com/OverlayPlugin/cactbot/blob/main/docs/LogGuide.md中ACT日志每一条的“structure”
      condition: function (data, matches, output) {
        
        return data.me === matches.source      // 保证是本机使用角色释放的技能
        // && data.job === 'PLD'       // 所用职业为骑士
        // && data.role === 'tank'     // 也可选择大类别如坦克职业、治疗职业等。
        // 以上其他职业选项可在cactbot源码中types文件夹job.d.ts文件中找到，
        // 链接https://github.com/OverlayPlugin/cactbot/blob/main/types/job.d.ts

      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/冲刺.mp3', // 语音文件（相对于ui/raidboss/的相对路径）
      soundVolume: 1, // 音量，从0-1，1为最大

      // infoText: {cn:"测试"},
    },

    // 触发器2：在战场血量低于30%播放救命语音
    {
      id: 'Charlotta_Paladin_HPhelp_cfmy',
     
      disabled: false,// 是否禁用此触发器。

      // ACT日志第39条，因自定义函数并未覆盖到此条，故直接写的正则表达式（一种快速匹配日志的检索方法）
      regex: '^.{14} UpdateHp 27:[^:]*:(?<source>[^:]*):(?<currentHp>[^:]*):(?<maxHp>[^:]*)',

      condition: function (data, matches, output) {
        if (data.me === matches.source) {   // 保证为本机用户
          return matches.currentHp < matches.maxHp * 0.3
            || matches.currentHp === matches.maxHp * 0.3; // 此处为血量小于等于最大血量的30%，数值可改
          // && data.job === 'PLD')      // 同上，如若添加注意括号（计算的优先级）问题
          // && data.role === 'none')  
        }
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/豆丁救命.mp3', 
      soundVolume: 1, // 音量

      //infoText: {cn:"测试"},
    },

    // 触发器3：在战场死亡时播放不甘心语音
    {
      id: 'Charlotta_Paladin_Death_cfmy',
     
      disabled: false,

      // 25条（0x19）死亡
      regex: Regexes.wasDefeated(),
      
     
      condition: function (data, matches, output) {
        
        return data.me === matches.target   // 保证是本机使用角色死亡
        // && data.job === 'PLD')       // 同上
        // && data.role === 'tank')     
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/豆丁不甘.mp3', 
      soundVolume: 1, // 音量

      // infoText: {cn:"测试"},
    },

      // 触发器4：骑士无敌
      {
        id: 'Charlotta_Paladin_Invulnerable_cfmy',
      
        disabled: false,// 是否禁用此触发器。将false改为true则本触发器不触发

        regex: Regexes.ability({ id: '718D' }),
        
        // 以下部分规定了本触发器触发的先行条件，若不满足则触发器不会触发
        // data的key可在源码type/data.d.ts找，matches可看netregexes.ts
        condition: function (data, matches, output) {
          randomNum = Math.round(Math.random()); // 取0或1的随机数
          return data.me === matches.source //为本机使用者
        },

        sound: () => randomNum ? '../../user/raidboss/Charlotta_Paladin_cfmy/res/无敌.mp3'
                               : '../../user/raidboss/Charlotta_Paladin_cfmy/res/无敌2.mp3', // 取两个语音进行随机
        soundVolume: 1, 

    },
      
    // 触发器5：LB攒满
    {
      id: 'Charlotta_Paladin_LB_cfmy',
     
      disabled: false,

      // 36条（0x24）LimitBreak
      regex: '^.{14} LimitBreak 24:(?<valueHex>[^:]*):(?<bars>[^:]*)',
      
     
      condition: function (data, matches, output) {
        // 测试用：console.log(matches.valueHex); 
        return (matches.valueHex === '0DAC' && (data.job === 'DRK' || data.job === 'NIN' || data.job === 'AST'))
        // dk 忍者 占星 105s LB
          || (matches.valueHex === '07D0' && (data.job === 'GNB' || data.job === 'WHM' || data.job === 'BLM'))
        // 绝枪 白魔 黑魔 60s LB
          || (matches.valueHex === '0BB8' && (data.job === 'RDM' || data.job === 'DRG' || data.job === 'WAR'
                                            || data.job === 'MCH' || data.job === 'DNC' || data.job === 'SCH'
                                            || data.job === 'SMN'))
        // 赤魔 龙骑 战士 机工 舞者 学者 召唤 90s LB
          || (matches.valueHex === '0FA0' && (data.job === 'SAM' || data.job === 'PLD' || data.job === 'SGE'
                                            || data.job === 'BRD'))
        // 盘子 骑士 贤者 诗人 120s LB
          || (matches.valueHex === '09C4' && (data.job === 'MNK' || data.job === 'RPR'))
        // 武僧 镰刀 75s LB
 
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/做好觉悟吧.wav', 
      soundVolume: 1, // 音量

      // 测试用
      // run: function(data, matches, output){
      //   console.log('已触发');
      // }
      
    },


    ],
})


