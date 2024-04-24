/*
 * @Date: 2024-04-18
 * @LastEditors: Wakasagihime-99
 * @LastEditTime: 2024-04-24
 * @FilePath: \\cactbotd:\\software\\ACT\\Plugins\\cactbot-offline\\user\\raidboss\\Charlotta_Paladin_cfmy\\alimas.js
 * @FFXIV: 玖时九@拂晓之间
 * @Description: 豆丁骑士语音包——战场版
 */


//检查文件是否加载
console.log('==========================');
console.log('触发器文件已正常加载阿力马斯');
console.log('==========================');

//触发器本体
Options.Triggers.push({

  // 其他区域id可见zone_id.ts
  // 尘封秘岩: 431, 昂萨哈凯尔：888，荣誉野：554，狼狱停船场：250
  // 全部区域请用zoneId: ZoneId.MatchAll
  zoneId: [888, 431, 554, 250],

  // 此为非cactbot时间轴相关触发器，新触发器放入triggers:[]的大括号内才可有效触发
  triggers: [
    
    // 触发器1：在战场使用冲刺时播放冲刺语音
    {
      id: 'Charlotta_Paladin_Sprint_cfmy',
     
      disabled: false,// 是否禁用此触发器。将false改为true则本触发器不触发

      // 普通冲刺id是03，战场冲刺是7181
      netRegex: NetRegexes.ability({ id: '7181' }),
      
      // 以下部分规定了本触发器触发的先行条件，若不满足则触发器不会触发
      // data的key可在源码type/data.d.ts找，matches可看netregexes.ts
      condition: function (data, matches, output) {
        
        return data.me === matches.source      // 保证是本机使用角色释放的技能
        // && data.job === 'PLD')       // 所用职业为骑士(若需要则取消注释，并增加括号)
        // && data.role === 'tank')     // 也可选择大类别如坦克职业、治疗职业等。（若需要则取消注释，并增加括号）
        // 以上选项皆可在cactbot源码中types文件夹job.d.ts文件中找到
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/冲刺.mp3', // 语音文件（相对于ui/raidboss/的相对路径）
      soundVolume: 1, // 音量，从0-1，1为最大

      // infoText: {cn:"测试"},
    },

    // 触发器2：在战场血量低于30%播放救命语音
    {
      id: 'Charlotta_Paladin_HPhelp_cfmy',
     
      disabled: false,// 是否禁用此触发器。将false改为true则本触发器不触发

      // ACT日志第39条，详见：https://github.com/OverlayPlugin/cactbot/blob/main/docs/LogGuide.md
      regex: '^.{14} UpdateHp 27:[^:]*:(?<source>[^:]*):(?<currentHp>[^:]*):(?<maxHp>[^:]*)',

      
      // 以下部分规定了本触发器触发的先行条件，若不满足则触发器不会触发
      // data的key可在type/data.d.ts找，此处matches为上述正则表达式的几个分组名称
      condition: function (data, matches, output) {
        if (data.me === matches.source) {   // 保证为本机用户
          return matches.currentHp < matches.maxHp * 0.3
            || matches.currentHp === matches.maxHp * 0.3; // 此处为血量小于等于最大血量的30%，数值可改
          // && data.job === 'PLD')      // 同上
          // && data.role === 'none')  
        }
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/豆丁救命.mp3', // 语音文件（相对于ui/raidboss/的相对路径）
      soundVolume: 1, // 音量，从0-1，1为最大

      //infoText: {cn:"测试"},
    },

    // 触发器3：在战场死亡时播放不甘心语音
    {
      id: 'Charlotta_Paladin_Death_cfmy',
     
      disabled: false,// 是否禁用此触发器。将false改为true则本触发器不触发

      // 25条（0x19）死亡
      regex: Regexes.wasDefeated(),
      
      // 以下部分规定了本触发器触发的先行条件，若不满足则触发器不会触发
      // data的key可在源码type/data.d.ts找，matches可看netregexes.ts
      condition: function (data, matches, output) {
        
        return data.me === matches.target   // 保证是本机使用角色死亡
        // && data.job === 'PLD')       // 所用职业为骑士(若需要则取消注释，并增加括号)
        // && data.role === 'tank')     // 也可选择大类别如坦克职业、治疗职业等。（若需要则取消注释，并增加括号）
        // 以上选项皆可在cactbot源码中types文件夹job.d.ts文件中找到
      },
      
      sound: '../../user/raidboss/Charlotta_Paladin_cfmy/res/豆丁不甘.mp3', // 语音文件（相对于ui/raidboss/的相对路径）
      soundVolume: 1, // 音量，从0-1，1为最大

      // infoText: {cn:"测试"},
    },

  ],
})

