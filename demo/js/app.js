/**
 * 师说 demo — 最小 hash 路由
 * PRD：首页、协作教研、课堂观察、资源库；用户信息与 API 为占位展示
 */

const routes = {
  "/": renderHome,
  "/research": renderResearch,
  "/note": renderNote,
  "/classroom": renderClassroom,
  "/repo": renderRepo,
};

const assistantConfigByPath = {
  "/": {
    visible: true,
    title: "师说助手",
    desc: "首页右侧 · 主 Agent（演示）",
    welcome: "你好我是师说助手，有问题尽管问。",
    placeholder: "描述需求，例如：打开课堂观察上传",
  },
  "/research": {
    visible: true,
    title: "教研助手",
    desc: "协作教研 · 专属 Agent（演示）",
    welcome: "需要我协助你完成哪些教研工作？",
    placeholder: "描述教研任务，例如：生成研讨提纲",
  },
  "/note": {
    visible: true,
    title: "笔记助手",
    desc: "课堂笔记 · 专属 Agent（演示）",
    welcome: "你可以告诉我你想干什么，生成教案？还是随便写写？",
    placeholder: "描述笔记诉求，例如：整理课堂反思",
  },
  "/classroom": {
    visible: true,
    title: "课堂助手",
    desc: "课堂观察 · 专属 Agent（演示）",
    welcome: "想了解哪些关于课堂的问题？",
    placeholder: "描述课堂观察问题，例如：提取互动高峰时段",
  },
};

function $(sel, root = document) {
  return root.querySelector(sel);
}

function formatDateZh() {
  const d = new Date();
  const w = ["日", "一", "二", "三", "四", "五", "六"];
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const yyyy = d.getFullYear();
  return `${yyyy}年${month}月${day}日 星期${w[d.getDay()]}`;
}

function navigate(path) {
  if (!routes[path]) path = "/";
  window.location.hash = path;
}

function onRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  const view = $("#view");
  view.innerHTML = "";
  syncAssistantByRoute(path);
  (routes[path] || routes["/"])(view);
}

function renderAssistantWelcome(message) {
  const body = $("#assistant-chat");
  if (!body) return;
  body.innerHTML = "";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = message;
  body.appendChild(bubble);
}

function syncAssistantByRoute(path) {
  const panel = document.querySelector(".assistant-panel");
  const title = document.querySelector(".assistant-head h2");
  const desc = document.querySelector(".assistant-head span");
  const input = $("#assistant-input");
  if (!panel || !title || !desc || !input) return;

  const config = assistantConfigByPath[path] || assistantConfigByPath["/"];
  panel.hidden = !config.visible;
  title.textContent = config.title;
  desc.textContent = config.desc;
  input.placeholder = config.placeholder;
  renderAssistantWelcome(config.welcome);
}

function updateHeaderDate() {
  const el = document.getElementById("site-header-date");
  if (!el) return;
  const d = new Date();
  el.dateTime = d.toISOString();
  el.textContent = formatDateZh();
}

function renderHome(root) {
  root.innerHTML = `
    <div class="home-layout">
      <div class="panel home-panel home-overview-panel">
        <div class="topbar">
          <div class="greeting">
            <h1>工作台</h1>
          </div>
          <div class="topbar-meta">
            <div class="badge-row">
              <span class="pill">待办 3</span>
              <button class="icon-btn" type="button" title="搜索">⌕</button>
            </div>
          </div>
        </div>

        <div class="notice-strip">
          <div class="notice-card">
            <h3>本周在线时长</h3>
            <strong>6 h 20 m</strong>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">粗统计占位</div>
          </div>
          <div class="notice-card">
            <h3>待办 · 课堂观察</h3>
            <strong>1</strong>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">未提交观察报告</div>
          </div>
          <div class="notice-card">
            <h3>待办 · 协作教研</h3>
            <strong>2</strong>
            <div style="font-size:12px;color:var(--muted);margin-top:4px">教研草稿 / 教案未保存</div>
          </div>
        </div>
      </div>

      <div class="panel home-panel home-apps-panel">
        <div class="section-title">
          <h1>应用广场</h1>
        </div>
        <div class="app-grid">
          <article class="app-card mint" data-nav="/research">
            <div class="icon-wrap" style="background:rgba(255,255,255,.55)">📚</div>
            <h3>协作教研</h3>
            <p>主题讨论、纪要与教案共创</p>
          </article>
          <article class="app-card lavender" data-nav="/note">
            <div class="icon-wrap" style="background:rgba(255,255,255,.55)">📝</div>
            <h3>课堂笔记</h3>
            <p>私有/协作空间、多页签、块级编辑与 AI 协同</p>
          </article>
          <article class="app-card pink" data-nav="/classroom">
            <div class="icon-wrap" style="background:rgba(255,255,255,.55)">🎬</div>
            <h3>课堂观察</h3>
            <p>视频上传、分析报告与时间锚点互动</p>
          </article>
          <article class="app-card disabled">
            <div class="icon-wrap" style="background:#f3f4f6">📖</div>
            <h3>题库</h3>
            <p>敬请期待</p>
          </article>
          <article class="app-card disabled">
            <div class="icon-wrap" style="background:#f3f4f6">🌱</div>
            <h3>教师成长记录</h3>
            <p>敬请期待</p>
          </article>
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll(".app-card[data-nav]").forEach((card) => {
    card.addEventListener("click", () => navigate(card.dataset.nav));
  });
}

function renderResearch(root) {
  root.innerHTML = `
    <div class="panel">
      <div class="page-head">
        <h1>协作教研</h1>
        <button class="btn secondary" type="button" data-nav="/">返回首页</button>
      </div>
      <p style="margin:0 0 14px;font-size:13px;color:var(--muted)">教研主题列表（MVP 占位，对应 PRD 6.4.1）</p>
      <div class="list">
        <div class="list-row"><div><strong>整本书阅读 · 单元集体备课</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">七年级语文 · 进行中</div></div><span class="tag">教研主题</span></div>
        <div class="list-row"><div><strong>函数概念同课异构</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">高一数学 · 已归档</div></div><span class="tag">教研主题</span></div>
      </div>
    </div>
  `;
  $("[data-nav]", root).addEventListener("click", () => navigate("/"));
}

function renderClassroom(root) {
  root.innerHTML = `
    <div class="panel">
      <div class="page-head">
        <h1>课堂观察</h1>
        <div style="display:flex;gap:8px">
          <button class="btn secondary" type="button" data-nav="/">返回首页</button>
          <button class="btn" type="button" id="open-upload">上传课堂视频</button>
        </div>
      </div>
      <p style="margin:0 0 14px;font-size:13px;color:var(--muted)">视频封面卡片流（PRD 6.5.1 占位）</p>
      <div class="card-grid">
        <div class="video-card">
          <div class="video-thumb">▶</div>
          <div class="video-meta">
            <h3>《二次函数》复习课</h3>
            <p>数学 · 李老师 · <span class="status ok">分析成功</span></p>
          </div>
        </div>
        <div class="video-card">
          <div class="video-thumb">▶</div>
          <div class="video-meta">
            <h3>《岳阳楼记》品读</h3>
            <p>语文 · 王老师 · <span class="status run">分析中</span></p>
          </div>
        </div>
      </div>
    </div>

    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <aside class="drawer" id="upload-drawer" aria-hidden="true">
      <header>
        <h2>上传课堂视频</h2>
        <button class="btn secondary" type="button" id="close-drawer">关闭</button>
      </header>
      <div class="drawer-body">
        <p style="margin:0;font-size:12px;color:var(--muted)">必填字段与 PRD <code>04-05</code> 6.5.2 一致；提交为前端校验演示，无实际上传。</p>
        <div class="field">
          <label for="course-subject">课程名称（学科筛选）</label>
          <select id="course-subject" required>
            <option value="">请选择</option>
            <option>语文</option>
            <option>数学</option>
            <option>英语</option>
          </select>
        </div>
        <div class="field">
          <label for="class-name">课堂名称</label>
          <input id="class-name" type="text" placeholder="例如：二次函数复习课" required />
        </div>
        <div class="field">
          <label for="teach-date">授课日期</label>
          <input id="teach-date" type="date" required />
        </div>
        <div class="field">
          <label>课堂时间（起止）</label>
          <div class="time-row">
            <input id="time-start" type="time" required />
            <input id="time-end" type="time" required />
          </div>
        </div>
        <div class="field">
          <label for="video-file">视频文件</label>
          <input id="video-file" type="file" accept="video/*" required />
        </div>
        <div class="field">
          <label for="optional-note">备注（选填）</label>
          <input id="optional-note" type="text" placeholder="可选" />
        </div>
      </div>
      <div class="drawer-footer">
        <button class="btn secondary" type="button" id="cancel-upload">取消</button>
        <button class="btn" type="button" id="submit-upload">保存并分析（演示）</button>
      </div>
    </aside>
  `;

  const backdrop = $("#drawer-backdrop", root);
  const drawer = $("#upload-drawer", root);
  const open = () => {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
  };
  const close = () => {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  };

  $("#open-upload", root).addEventListener("click", open);
  $("#close-drawer", root).addEventListener("click", close);
  $("#cancel-upload", root).addEventListener("click", close);
  backdrop.addEventListener("click", close);
  $("[data-nav]", root).addEventListener("click", () => navigate("/"));

  $("#submit-upload", root).addEventListener("click", () => {
    const subject = $("#course-subject", root).value;
    const name = $("#class-name", root).value.trim();
    const date = $("#teach-date", root).value;
    const t0 = $("#time-start", root).value;
    const t1 = $("#time-end", root).value;
    const file = $("#video-file", root).files[0];
    if (!subject || !name || !date || !t0 || !t1 || !file) {
      alert("请填写全部必填项并选择视频文件（演示校验）。");
      return;
    }
    if (t0 >= t1) {
      alert("结束时间应晚于开始时间。");
      return;
    }
    alert("校验通过（演示）。实际上传与排队分析由后端实现。");
    close();
  });
}

function renderNote(root) {
  root.innerHTML = `
    <div class="note-page-layout">
      <div class="note-nav-module">
        <div class="note-nav-top">
          <button class="btn secondary note-back-btn" type="button" data-nav="/">← 返回首页</button>
        </div>
        <aside class="note-nav">
          <h2 class="space-title">空间列表</h2>
          <div class="space-list">
            <button class="space-item active" type="button" data-space="private">
              私有空间
              <small>仅自己可见 · 课堂反思草稿</small>
            </button>
            <button class="space-item" type="button" data-space="collab">
              协作空间
              <small>教研组共创 · 2 位协作者</small>
            </button>
          </div>
        </aside>
      </div>
      <div class="panel note-main-panel">
        <div class="page-head">
          <h1>课堂笔记</h1>
        </div>
        <p style="margin:0 0 14px;font-size:13px;color:var(--muted)">左侧空间导航 + 中间富文本编辑器（可交互演示）</p>
        <section class="note-editor">
          <div class="note-editor-head">
            <div class="editor-tabs">
              <span class="editor-tab">自定义笔记</span>
              <span class="editor-tab">无标题</span>
            </div>
          </div>
          <div class="editor-toolbar">
            <button class="tool-btn" type="button" data-cmd="undo">↶</button>
            <button class="tool-btn" type="button" data-cmd="redo">↷</button>
            <button class="tool-btn" type="button" data-cmd="formatBlock" data-value="h2">标题</button>
            <button class="tool-btn" type="button" data-cmd="bold">B</button>
            <button class="tool-btn" type="button" data-cmd="italic">I</button>
            <button class="tool-btn" type="button" data-cmd="underline">U</button>
            <button class="tool-btn" type="button" data-cmd="insertUnorderedList">• 列表</button>
          </div>
          <div id="rich-editor" class="rich-editor" contenteditable="true" spellcheck="false">
            <h2>自定义笔记</h2>
            <p>在这里记录课堂观察、教案思路与教研结论。</p>
            <p>你可以直接输入内容，也可使用上方工具栏进行格式化。</p>
          </div>
          <div class="editor-footer">
            支持键盘输入、选区格式化与基础列表编辑（演示）。
          </div>
        </section>
      </div>
    </div>
  `;
  $("[data-nav]", root).addEventListener("click", () => navigate("/"));

  const editor = $("#rich-editor", root);
  const buttons = root.querySelectorAll(".tool-btn[data-cmd]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      editor.focus();
      const cmd = btn.dataset.cmd;
      const value = btn.dataset.value || null;
      document.execCommand(cmd, false, value);
    });
  });

  const spaceButtons = root.querySelectorAll(".space-item");
  const privateDraft = `
    <h2>私有空间 · 课堂笔记</h2>
    <p>记录个人课堂复盘、改进点和后续行动。</p>
    <ul>
      <li>学生在提问环节更积极，互动次数提升。</li>
      <li>板书结构可进一步分层，突出关键概念。</li>
      <li>下节课增加 3 分钟同伴互评练习。</li>
    </ul>
  `;
  const collabDraft = `
    <h2>协作空间 · 共创教案</h2>
    <p>与教研组成员同步修改建议并汇总可落地策略。</p>
    <ol>
      <li>统一导入情境案例，减少不同班级起点差异。</li>
      <li>共用分层练习模板，按学情自动分组。</li>
      <li>周五前完成终版教案并发起组内评审。</li>
    </ol>
  `;

  spaceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      spaceButtons.forEach((item) => item.classList.remove("active"));
      btn.classList.add("active");
      editor.innerHTML = btn.dataset.space === "collab" ? collabDraft : privateDraft;
      editor.focus();
    });
  });
}

function renderRepo(root) {
  root.innerHTML = `
    <div class="panel">
      <div class="page-head">
        <h1>资源库</h1>
        <button class="btn secondary" type="button" data-nav="/">返回首页</button>
      </div>
      <p style="margin:0 0 14px;font-size:13px;color:var(--muted)">三类资源列表占位（PRD <code>04-11</code>）</p>
      <div class="list">
        <div class="list-row"><div><strong>《岳阳楼记》单元教研纪要</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">教研纪要 · 入库成功</div></div><span class="tag">回源</span></div>
        <div class="list-row"><div><strong>二次函数复习 · 教案 v2</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">教案 · 入库成功</div></div><span class="tag">回源</span></div>
        <div class="list-row"><div><strong>课堂观察报告 · 2026-04-20</strong><div style="font-size:12px;color:var(--muted);margin-top:4px">课堂观察报告 · 入库成功</div></div><span class="tag">回源</span></div>
      </div>
    </div>
  `;
  $("[data-nav]", root).addEventListener("click", () => navigate("/"));
}

function initAssistant() {
  const input = $("#assistant-input");
  const send = () => {
    const v = input.value.trim();
    if (!v) return;
    const body = $("#assistant-chat");
    const user = document.createElement("div");
    user.className = "bubble";
    user.style.alignSelf = "flex-end";
    user.style.borderRadius = "14px 14px 6px 14px";
    user.style.background = "#e0e7ff";
    user.textContent = v;
    body.appendChild(user);
    input.value = "";
    body.scrollTop = body.scrollHeight;
  };
  $("#assistant-send").addEventListener("click", send);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
}

window.addEventListener("hashchange", onRoute);
window.addEventListener("load", () => {
  updateHeaderDate();
  initAssistant();
  if (!window.location.hash) window.location.hash = "#/";
  onRoute();
});
