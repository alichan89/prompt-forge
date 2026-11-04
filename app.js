/* 提示词工坊 · app.js
 * 纯前端，无依赖，无网络请求。所有输入只存在浏览器 localStorage。 */

const SCENARIOS = [
  {
    id: 'xhs',
    name: '小红书文案',
    desc: '把产品卖点写成让人想收藏的笔记',
    sample: {
      product: '一款便携折叠咖啡手冲套装',
      audience: '刚工作两年、在写字楼里想喝好咖啡但没时间排队的女生',
      selling: '收纳后只有保温杯大小\n三分钟出杯，不用磨豆\n滤纸是环保材质，可降解',
      tone: '真诚分享，像朋友推荐',
      length: '500'
    },
    fields: [
      { key: 'product', label: '产品 / 主题', type: 'text', required: true, placeholder: '例：一款便携折叠咖啡手冲套装' },
      { key: 'audience', label: '写给谁看', type: 'text', required: true, placeholder: '例：刚工作两年、想喝好咖啡但没时间的上班族女生' },
      { key: 'selling', label: '核心卖点（一行一个）', type: 'textarea', required: true, placeholder: '收纳后只有保温杯大小\n三分钟出杯，不用磨豆\n滤纸可降解' },
      { key: 'tone', label: '语气', type: 'select', options: ['真诚分享，像朋友推荐', '专业测评，有理有据', '轻松吐槽，带点自黑', '干货教程，只讲方法'] },
      { key: 'length', label: '字数', type: 'select', options: ['300', '500', '800'] }
    ],
    build: v => {
      const pts = v.selling.split('\n').map(s => s.trim()).filter(Boolean).map(s => '- ' + s).join('\n');
      return `# 角色
你是一位操盘小红书 5 年的内容策划，擅长把普通产品写成让人忍不住收藏的笔记。你讨厌空话、堆砌形容词和一眼假的广告腔。

# 任务
为「${v.product}」写一篇小红书笔记，读者是：${v.audience}

# 核心卖点
${pts}

# 写作要求
1. 标题 20 字以内，制造好奇或轻微反常识。禁用「绝绝子」「yyds」「宝藏」这类过气词。
2. 前两行必须让读者产生「这说的就是我」的代入感，写具体场景，不要写感受。
3. 短句为主，每段不超过 3 行。用具体细节代替形容词堆砌。
4. 卖点要落在真实使用场景里，不要硬广。至少有一个细节是「不完美但真实」的。
5. 结尾给 1 个具体可执行的建议，再补 3–5 个精准话题标签。
6. 全文约 ${v.length} 字，语气：${v.tone}。

# 输出格式
先给正文，空一行，再列 3 个备选标题。不要解释你的思路。`;
    }
  },

  {
    id: 'video',
    name: '短视频口播',
    desc: '前三秒留住人，结构清楚能直接念',
    sample: {
      topic: '为什么你买的咖啡豆放两周就不好喝了',
      platform: '抖音',
      duration: '60 秒',
      niche: '咖啡知识',
      goal: '涨粉'
    },
    fields: [
      { key: 'topic', label: '视频主题', type: 'text', required: true, placeholder: '例：为什么你买的咖啡豆放两周就不好喝了' },
      { key: 'platform', label: '平台', type: 'select', options: ['抖音', '视频号', '小红书', 'B站'] },
      { key: 'duration', label: '时长', type: 'select', options: ['30 秒', '60 秒', '3 分钟'] },
      { key: 'niche', label: '账号赛道', type: 'text', required: true, placeholder: '例：咖啡知识 / 职场干货 / 母婴' },
      { key: 'goal', label: '这条视频的目标', type: 'select', options: ['涨粉', '带货', '科普', '引流到私域'] }
    ],
    build: v => {
      return `# 角色
你是${v.platform}上「${v.niche}」赛道的编导，写过大量完播率超过 40% 的口播稿。你清楚观众只给前 3 秒机会。

# 任务
围绕「${v.topic}」，写一条 ${v.duration} 的口播视频脚本，目标是：${v.goal}

# 结构要求
1. 前 3 秒：一句反常识、或直接把结果抛出来。必须让人停下来，不要自我介绍。
2. 3–10 秒：说清「这条视频能给你什么」，给一个继续看的理由。
3. 主体：拆成 2–3 个点，每点一句话讲透，配一个具体例子或数字。
4. 结尾：一句行动指令 + 一个具体问题引导评论。
5. 全篇口语化，能顺口念出来。禁止书面语、长定语、并列排比堆叠。

# 输出格式
用 Markdown 表格输出：| 时间 | 画面提示 | 口播 |
每一行对应一个镜头，口播字数要与时长匹配。
表格之后再给：3 个标题备选、1 句封面文案。`;
    }
  },

  {
    id: 'resume',
    name: '简历优化',
    desc: '把「负责什么」改成「做成了什么」',
    sample: {
      role: '产品经理',
      years: '1–3 年',
      company: '互联网大厂',
      content: '负责公司 App 的用户增长工作，参与拉新活动的策划和执行，协助做了几次改版，用户量有提升。'
    },
    fields: [
      { key: 'role', label: '目标岗位', type: 'text', required: true, placeholder: '例：产品经理 / 前端开发 / 市场专员' },
      { key: 'years', label: '经验年限', type: 'select', options: ['应届', '1–3 年', '3–5 年', '5 年以上'] },
      { key: 'company', label: '目标公司类型', type: 'select', options: ['互联网大厂', '中小创业公司', '国企 / 事业单位', '外企'] },
      { key: 'content', label: '现有简历片段', type: 'textarea', required: true, placeholder: '把你现在写的那段经历贴进来，越原始越好' }
    ],
    build: v => {
      return `# 角色
你是一位看过上万份简历的招聘负责人，负责过${v.company}的${v.role}岗位筛选。你能一眼看出哪句话是真做过事，哪句话是凑字数。

# 任务
把下面这段经历，改写成针对「${v.role}」岗位的有力表达。我的经验年限：${v.years}。

# 原始内容
"""
${v.content}
"""

# 改写要求
1. 用 STAR 的逻辑组织，但不要出现「情境/任务/行动/结果」这类标签。
2. 每条以动词开头，把量化结果放前面。没有数字时，用影响范围或相对变化替代，并标注需要我补充什么数据。
3. 删掉「负责」「参与」「协助」「配合」这类弱动词。
4. 一条经历最多 3 个 bullet，每行控制在 2 行内。
5. 挑出和目标岗位最相关的部分前置，无关的砍掉，不要面面俱到。

# 输出格式
1. 【改写后】可直接粘贴的简历条目
2. 【改了什么】用 2–3 条说明改动逻辑
3. 【还缺什么】这段经历缺哪些信息，补上会明显更强（最多 3 条）`;
    }
  },

  {
    id: 'summary',
    name: '长文摘要',
    desc: '只留能改变判断的信息，别做复读机',
    sample: {
      text: '（把你要读的报告、文章、会议材料粘到这里）',
      length: '300 字以内',
      purpose: '给领导汇报'
    },
    fields: [
      { key: 'text', label: '原文', type: 'textarea', required: true, placeholder: '把要提炼的报告、文章或材料整段贴进来' },
      { key: 'length', label: '压缩到', type: 'select', options: ['100 字以内', '300 字以内', '500 字以内'] },
      { key: 'purpose', label: '用途', type: 'select', options: ['给领导汇报', '自己快速理解', '做决策依据', '转成学习笔记'] }
    ],
    build: v => {
      return `# 角色
你是一位资深分析师，专门替决策者做信息提炼。你的标准是：读完摘要，就不需要再看原文。

# 任务
把下面的内容压缩到${v.length}，用途是：${v.purpose}

# 原文
"""
${v.text}
"""

# 要求
1. 只保留能改变判断的信息。删掉铺垫、重复、修饰和客套话。
2. 所有关键数字、时间、人名、结论必须保留，不得改动。
3. 不引入原文没有的观点。不做延伸评论。
4. 如果原文存在矛盾、数据缺口或逻辑跳跃，单独标出来，不要替作者圆场。

# 输出格式
先用 3 句话讲清「这段内容到底说了什么」（不超过 100 字）。
再按用途分点列出要点，每点一行。
最后一行写「可执行结论：……」——如果原文不足以支撑结论，就写「原文不足以支撑结论，还需补充：……」`;
    }
  },

  {
    id: 'translate',
    name: '翻译润色',
    desc: '先准确，再地道，不逐字硬译',
    sample: {
      text: 'We are writing to inform you that the shipment scheduled for next Monday has been delayed due to unforeseen circumstances at the port.',
      target: '中文',
      scene: '商务邮件',
      tone: '正式但友好'
    },
    fields: [
      { key: 'text', label: '原文', type: 'textarea', required: true, placeholder: '粘贴要翻译的内容' },
      { key: 'target', label: '目标语言', type: 'select', options: ['中文', '英文', '日文'] },
      { key: 'scene', label: '使用场景', type: 'select', options: ['商务邮件', '学术论文', '产品文案', '日常沟通', '简历 / 求职信'] },
      { key: 'tone', label: '语气', type: 'select', options: ['正式但友好', '严谨中性', '轻松口语', '有力有说服力'] }
    ],
    build: v => {
      return `# 角色
你是母语级的中英双语译者，做过${v.scene}类文本的本地化。你知道好翻译的标准是「读起来像原本就是这个语言写的」。

# 任务
把下面内容翻译成${v.target}，场景：${v.scene}，语气：${v.tone}

# 原文
"""
${v.text}
"""

# 要求
1. 先保证意思准确，再追求地道。禁止逐字直译。
2. 保留专业术语的通行译法；没有通行译法时保留原文，并在括号里给出解释。
3. 数字、单位、专有名词、条款编号不得改动。
4. 中文避免「的的不休」，英文避免被动语态堆叠和虚词开头。
5. 如果原文本身有歧义，按最可能的场景取一个译法，并在说明里指出。

# 输出格式
【译文】
（正文）

【说明】
2–3 条，说明你做了哪些本地化处理、哪些地方做了取舍。`;
    }
  },

  {
    id: 'explain',
    name: '概念讲解',
    desc: '用费曼法讲到你真的听懂',
    sample: {
      concept: '复利效应',
      level: '完全没有基础',
      use: '跟朋友讲清楚'
    },
    fields: [
      { key: 'concept', label: '要搞懂的概念', type: 'text', required: true, placeholder: '例：复利效应 / 区块链 / 边际效用' },
      { key: 'level', label: '我的基础', type: 'select', options: ['完全没有基础', '听过但说不清', '有基础，想深入'] },
      { key: 'use', label: '学它是为了', type: 'select', options: ['跟别人讲清楚', '考试 / 面试', '工作中实际用', '纯好奇'] }
    ],
    build: v => {
      return `# 角色
你擅长用费曼学习法把复杂概念讲到外行能复述出来。你从不用「简单来说」然后接着说行话。

# 任务
给我讲清「${v.concept}」。我的基础是：${v.level}，学它是为了：${v.use}

# 要求
1. 先给一句话定义，30 字以内，不出现任何行业术语。
2. 用一个日常生活里的类比解释它。类比要贴切，不要硬凑。
3. 说清它解决什么问题、不解决什么问题。后者同样重要。
4. 给一个我能马上动手试的最小例子（步骤不超过 3 步）。
5. 指出初学者最容易误解的 2 个点，并说明正确理解是什么。
6. 如果有前置知识，先列出必须先懂的 1–2 个概念。

# 输出格式
用「一句话 / 打个比方 / 它解决什么 / 动手试一下 / 常见误解 / 需要先懂」六个小标题分段。
不要写成散文，每段不超过 4 行。`;
    }
  },

  {
    id: 'minutes',
    name: '会议纪要',
    desc: '把两小时录音整理成能干活的纪要',
    sample: {
      transcript: '（把会议记录 / 语音转写文字粘到这里）',
      need: '待办导向'
    },
    fields: [
      { key: 'transcript', label: '会议原始记录', type: 'textarea', required: true, placeholder: '语音转写的文字，乱一点没关系' },
      { key: 'need', label: '纪要侧重', type: 'select', options: ['待办导向', '决策导向', '复盘导向'] }
    ],
    build: v => {
      return `# 角色
你是做会议记录的专家，服务对象是没参会但需要执行的人。你的纪要让读者不用再问任何问题。

# 任务
把下面的会议原始记录整理成${v.need}的纪要。

# 原始记录
"""
${v.transcript}
"""

# 要求
1. 严格区分「事实」「观点」「决定」。不要把某个人的建议写成结论。
2. 待办必须包含：负责人、具体动作、截止时间。缺失的标「待确认」，不要编造。
3. 删掉寒暄、重复讨论、跑题内容、没结论的争论。
4. 有争议未解决的，单独列一节，写清分歧点在哪。
5. 数字、日期、金额必须和原始记录一致。

# 输出格式
## 一句话结论
## 关键信息（分点）
## 决定事项（分点，注明由谁拍板）
## 待办（表格：事项 / 负责人 / 截止时间）
## 悬而未决`;
    }
  },

  {
    id: 'data',
    name: '数据分析',
    desc: '先指出坑，再给分析路径和代码',
    sample: {
      data: '一份电商后台导出的订单表，包含订单号、下单时间、商品类目、金额、优惠券、退款状态',
      question: '为什么这个月 GMV 涨了但利润降了',
      tool: 'Excel'
    },
    fields: [
      { key: 'data', label: '手上有什么数据', type: 'textarea', required: true, placeholder: '例：订单表，字段有下单时间、类目、金额、退款状态' },
      { key: 'question', label: '想搞清楚什么', type: 'text', required: true, placeholder: '例：为什么 GMV 涨了但利润降了' },
      { key: 'tool', label: '用什么工具', type: 'select', options: ['Excel', 'SQL', 'Python (pandas)', 'BI 看板'] }
    ],
    build: v => {
      return `# 角色
你是带过分析团队的数据负责人。你的习惯是先怀疑口径，再怀疑结论，最后才相信数字。

# 任务
我要分析的是：${v.data}
我想搞清楚的是：${v.question}
我用的工具是：${v.tool}

# 要求
1. 先指出这个分析最容易踩的坑，至少 1 个。比如指标口径不一致、辛普森悖论、幸存者偏差、时间窗口错配。
2. 给出 3 个层层递进的分析步骤。每一步说清：怎么做、看哪个指标、什么结果说明什么。
3. 给可直接运行的${v.tool}代码或公式，字段名用我刚才描述的。
4. 明确指出：这个结论在什么条件下不成立。

# 输出格式
按「⚠️ 先注意」「分析路径」「可运行代码」「结论边界」四段输出。
代码单独用代码块包裹，加注释说明每一步在干什么。`;
    }
  }
];

/* ---------------- state ---------------- */
const STORE_PREFIX = 'pf:v1:';
const state = {
  current: SCENARIOS[0].id,
  values: {}
};

const $ = id => document.getElementById(id);
const el = {
  list: $('scenarioList'),
  form: $('formFields'),
  formTitle: $('formTitle'),
  formDesc: $('formDesc'),
  sampleBtn: $('sampleBtn'),
  outText: $('outText'),
  outEmpty: $('outEmpty'),
  copyBtn: $('copyBtn'),
  charCount: $('charCount'),
  toast: $('toast'),
  packBtn: $('packBtn')
};

/* ---------------- storage ---------------- */
function loadValues(id) {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + id);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
function saveValues(id, values) {
  try {
    localStorage.setItem(STORE_PREFIX + id, JSON.stringify(values));
  } catch (e) { /* 隐私模式下忽略 */ }
}

/* ---------------- render ---------------- */
function currentScenario() {
  return SCENARIOS.find(s => s.id === state.current) || SCENARIOS[0];
}

function renderList() {
  el.list.innerHTML = '';
  SCENARIOS.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sc-item' + (s.id === state.current ? ' active' : '');
    btn.innerHTML = `<span class="sc-num">${String(i + 1).padStart(2, '0')}</span><span>${s.name}</span>`;
    btn.addEventListener('click', () => selectScenario(s.id));
    el.list.appendChild(btn);
  });
}

function selectScenario(id) {
  if (state.current === id) return;
  state.current = id;
  const sc = currentScenario();
  state.values = loadValues(id);
  renderList();
  renderForm(sc);
  renderOutput();
}

function renderForm(sc) {
  el.formTitle.textContent = sc.name;
  el.formDesc.textContent = sc.desc;
  el.form.innerHTML = '';

  sc.fields.forEach(f => {
    const wrap = document.createElement('div');
    wrap.className = 'field';

    const label = document.createElement('label');
    label.setAttribute('for', 'f_' + f.key);
    label.innerHTML = f.label + (f.required ? '<span class="req">*</span>' : '');
    wrap.appendChild(label);

    let input;
    if (f.type === 'textarea') {
      input = document.createElement('textarea');
      input.rows = 3;
    } else if (f.type === 'select') {
      input = document.createElement('select');
      f.options.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        input.appendChild(o);
      });
    } else {
      input = document.createElement('input');
      input.type = 'text';
    }

    input.id = 'f_' + f.key;
    if (f.placeholder) input.placeholder = f.placeholder;

    const saved = state.values[f.key];
    if (saved !== undefined && saved !== null && saved !== '') {
      input.value = saved;
    } else if (f.type === 'select') {
      input.value = f.options[0];
      state.values[f.key] = f.options[0];
    }

    input.addEventListener('input', () => {
      state.values[f.key] = input.value;
      saveValues(state.current, state.values);
      renderOutput();
    });

    wrap.appendChild(input);
    el.form.appendChild(wrap);
  });
}

function renderOutput() {
  const sc = currentScenario();
  const v = state.values;

  const missing = sc.fields
    .filter(f => f.required)
    .filter(f => !String(v[f.key] || '').trim());

  if (missing.length) {
    el.outText.hidden = true;
    el.outText.textContent = '';
    el.copyBtn.disabled = true;
    el.copyBtn.textContent = '复制';
    el.copyBtn.classList.remove('copied');
    el.charCount.textContent = '';

    el.outEmpty.hidden = false;
    el.outEmpty.innerHTML =
      `<div class="oe-title">还差 ${missing.length} 项就能生成</div>
       <ul>${missing.map(f => `<li>${f.label}</li>`).join('')}</ul>
       <div>填完左侧字段，提示词会自动出现在这里。</div>`;
    return;
  }

  const text = sc.build(v).trim();
  el.outEmpty.hidden = true;
  el.outText.hidden = false;
  el.outText.textContent = text;
  el.copyBtn.disabled = false;
  el.charCount.textContent = text.length + ' 字符';
}

/* ---------------- actions ---------------- */
let toastTimer = null;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove('show'), 1800);
}

function copyText() {
  const text = el.outText.textContent;
  if (!text) return;

  const done = () => {
    el.copyBtn.classList.add('copied');
    el.copyBtn.textContent = '已复制';
    toast('已复制，去粘贴给 AI 吧');
    setTimeout(() => {
      el.copyBtn.classList.remove('copied');
      el.copyBtn.textContent = '复制';
    }, 1600);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else {
    fallback();
  }

  function fallback() {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); }
    catch (e) { toast('复制失败，请手动选择文本'); }
    document.body.removeChild(ta);
  }
}

function fillSample() {
  const sc = currentScenario();
  if (!sc.sample) return;
  Object.keys(sc.sample).forEach(k => { state.values[k] = sc.sample[k]; });
  saveValues(state.current, state.values);
  renderForm(sc);
  renderOutput();
  toast('已填入示例，可直接改');
}

/* ---------------- init ---------------- */
function init() {
  state.values = loadValues(state.current);
  renderList();
  renderForm(currentScenario());
  renderOutput();

  el.copyBtn.addEventListener('click', copyText);
  el.sampleBtn.addEventListener('click', fillSample);

  el.packBtn.addEventListener('click', () => {
    toast('合集正在整理中，上线后这里可以直接购买');
  });
}

document.addEventListener('DOMContentLoaded', init);
