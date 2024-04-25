/*
 * @Date: 2024-04-18
 * @LastEditors: Wakasagihime-99
 * @LastEditTime: 2024-04-25
 * @FilePath: \\Charlotta_Paladin_cfmy\\alimas.js
 * @FFXIV: 玖时九@拂晓之间
 * @Description: 豆丁骑士语音包——战场版
 * @Log: 卡在了同一条触发条件不能分开触发，暂时放弃了这个想法
 */


//检查文件是否加载
console.log('==========================');
console.log('触发器文件已正常加载阿力马斯');
console.log('==========================');

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
          return data.me === matches.source              //为本机使用者
        },

        sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/无敌.mp3',
        soundVolume: 1, 

      },


    ],
})


