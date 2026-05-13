# Markdown Editor

一个基于 **CodeMirror 6** + **React 19** + **TypeScript** 构建的现代化 Markdown 编辑器。

---

## ✨ 功能特性

### 核心编辑

| 功能                       | 说明                                             |
| -------------------------- | ------------------------------------------------ |
| ✏️ **CodeMirror 6 编辑器** | 支持语法高亮、行号、括号匹配、代码折叠、自动补全 |
| 👁️ **实时预览**            | 编辑区内容变化，预览区即时渲染                   |
| ↔️ **分栏布局**            | 编辑区 / 预览区左右并排，互不干扰                |

### 文件管理

| 功能              | 说明                             |
| ----------------- | -------------------------------- |
| 📁 **文件侧边栏** | 新建、切换、删除 Markdown 文件   |
| ✏️ **双击重命名** | 双击文件名即可重命名             |
| 🔄 **自动切换**   | 删除当前文件时自动选中下一个文件 |

### 格式工具栏

| 分组     | 按钮                                               |
| -------- | -------------------------------------------------- |
| **格式** | 加粗 `**`、斜体 `*`、删除线 `~~`、行内代码 `` ` `` |
| **标题** | H1 ~ H6                                            |
| **列表** | 无序列表 `-`、有序列表 `1.`、任务列表 `- [ ]`      |
| **插入** | 链接、图片、引用块、代码块、分隔线                 |

### 快捷键

| 快捷键             | 功能                |
| ------------------ | ------------------- |
| `Ctrl + S`         | 保存当前文件        |
| `Ctrl + N`         | 新建文件            |
| `Ctrl + Shift + N` | 切换亮色 / 暗色主题 |

### 增强功能

| 功能             | 说明                                       |
| ---------------- | ------------------------------------------ |
| 🌙 **暗色模式**  | 一键切换亮色 / 暗色主题                    |
| 💾 **自动保存**  | 1 秒防抖自动保存到 localStorage            |
| 📊 **状态栏**    | 实时显示字数、行数、字符数                 |
| 📥 **导出 .md**  | 下载当前文件为 Markdown 源文件             |
| 🌐 **导出 HTML** | 将渲染后的内容导出为 HTML 文件             |
| 🎨 **代码高亮**  | 支持 190+ 种语言的语法高亮（highlight.js） |

---

## 🛠️ 技术栈

| 技术                                          | 用途                   |
| --------------------------------------------- | ---------------------- |
| [React 19](https://react.dev/)                | UI 框架                |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全               |
| [Vite](https://vitejs.dev/)                   | 构建工具               |
| [CodeMirror 6](https://codemirror.net/)       | 代码编辑器（核心亮点） |
| [Zustand](https://github.com/pmndrs/zustand)  | 状态管理               |
| [marked](https://marked.js.org/)              | Markdown 解析          |
| [highlight.js](https://highlightjs.org/)      | 代码语法高亮           |
| [Sass (SCSS Modules)](https://sass-lang.com/) | 样式隔离               |

---

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

---

## 📸 截图指引

> 建议在 `assets/` 目录下放置截图，然后在下方替换链接。

| 截图                            | 说明                                           |
| ------------------------------- | ---------------------------------------------- |
| `assets/screenshot-light.png`   | 亮色模式主界面（编辑区 + 预览区 + 文件侧边栏） |
| `assets/screenshot-dark.png`    | 暗色模式主界面                                 |
| `assets/screenshot-toolbar.png` | 工具栏展开效果                                 |

---

## 🧠 项目亮点（面试可讲）

1. **CodeMirror 6 微内核架构** — 核心包只负责状态管理和视图渲染，语法高亮、代码折叠、搜索替换都是独立插件，按需加载
2. **React 命令式桥接** — CodeMirror 是命令式 DOM 操作，React 是声明式，通过 `useRef` + `updateListener` + `dispatch` 实现双向同步
3. **模块级变量设计模式** — 通过模块级变量暴露 EditorView 实例，避免 prop drilling 和不必要的 re-render
4. **CSS 变量主题切换** — 两套主题变量通过 `data-theme` 属性切换，零 JS 运行时开销
5. **Zustand + 防抖自动保存** — subscribe 监听状态变化，1 秒防抖后写入 localStorage

---

## 📁 项目结构

```
src/
├── types/          # TypeScript 类型定义
├── styles/         # 全局样式（变量、重置、全局）
├── stores/         # Zustand 状态管理
├── utils/          # 工具函数（marked 配置、CodeMirror 配置）
├── hooks/          # 自定义 Hooks（全局快捷键）
├── components/     # UI 组件
│   ├── Layout/     # 三栏布局容器
│   ├── FileManager/# 文件管理侧边栏
│   ├── Toolbar/    # 格式工具栏
│   ├── Editor/     # CodeMirror 编辑器
│   ├── Preview/    # Markdown 预览 + 导出
│   └── StatusBar/  # 字数/行数统计
├── App.tsx
└── main.tsx
```

---

## 📄 License

MIT
