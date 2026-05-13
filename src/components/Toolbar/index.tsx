import { useCallback } from "react";
import { EditorView } from "@codemirror/view";
import { editorViewRef } from "@/components/Editor";
import styles from "./index.module.scss";

type SyntaxType =
  | "bold"
  | "italic"
  | "strikethrough"
  | "h1"
  | "h2"
  | "h3"
  | "ul"
  | "ol"
  | "task"
  | "quote"
  | "code"
  | "link"
  | "image";

interface ToolbarButton {
  label: string;
  title: string;
  syntax: SyntaxType;
}

const buttonGroups: ToolbarButton[][] = [
  [
    { label: "B", title: "加粗", syntax: "bold" },
    { label: "I", title: "斜体", syntax: "italic" },
    { label: "S", title: "删除线", syntax: "strikethrough" },
  ],
  [
    { label: "H1", title: "标题 1", syntax: "h1" },
    { label: "H2", title: "标题 2", syntax: "h2" },
    { label: "H3", title: "标题 3", syntax: "h3" },
  ],
  [
    { label: "ul", title: "无序列表", syntax: "ul" },
    { label: "ol", title: "有序列表", syntax: "ol" },
    { label: "☑", title: "任务列表", syntax: "task" },
  ],
  [
    { label: "❝", title: "引用", syntax: "quote" },
    { label: "</>", title: "代码块", syntax: "code" },
    { label: "🔗", title: "链接", syntax: "link" },
    { label: "🖼", title: "图片", syntax: "image" },
  ],
];

function getMarkdownSyntax(syntax: SyntaxType, selectedText: string): string {
  const text = selectedText || "text";

  switch (syntax) {
    case "bold":
      return `**${text}**`;
    case "italic":
      return `*${text}*`;
    case "strikethrough":
      return `~~${text}~~`;
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "ul":
      return `- ${text}`;
    case "ol":
      return `1. ${text}`;
    case "task":
      return `- [ ] ${text}`;
    case "quote":
      return `> ${text}`;
    case "code":
      return "```\n" + text + "\n```";
    case "link":
      return `[${text}](url)`;
    case "image":
      return `![${text}](url)`;
  }
}

function insertMarkdown(view: EditorView, syntax: SyntaxType) {
  const { from, to } = view.state.selection.main;
  const selectedText = view.state.sliceDoc(from, to);
  const insertion = getMarkdownSyntax(syntax, selectedText);

  // 计算插入后的光标位置
  let cursorPos: number;
  if (selectedText) {
    // 有选中文本时，光标放在选中文本末尾
    cursorPos = from + insertion.length;
  } else {
    // 无选中文本时，光标放在 "text" 的末尾
    const textPlaceholder = "text";
    const placeholderIndex = insertion.lastIndexOf(textPlaceholder);
    cursorPos =
      placeholderIndex !== -1
        ? from + placeholderIndex + textPlaceholder.length
        : from + insertion.length;
  }

  view.dispatch({
    changes: { from, to, insert: insertion },
    selection: { anchor: cursorPos },
  });
  view.focus();
}

interface ToolbarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function Toolbar({
  sidebarCollapsed,
  onToggleSidebar,
}: ToolbarProps) {
  const handleClick = useCallback((syntax: SyntaxType) => {
    const view = editorViewRef.current;
    if (!view) return;
    insertMarkdown(view, syntax);
  }, []);

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.toggleBtn}
        onClick={onToggleSidebar}
        title={sidebarCollapsed ? "展开文件管理" : "收起文件管理"}
      >
        {sidebarCollapsed ? "☰" : "✕"}
      </button>
      {buttonGroups.map((group, gi) => (
        <div key={gi} className={styles.group}>
          {group.map(btn => (
            <button
              key={btn.syntax}
              className={styles.btn}
              title={btn.title}
              onClick={() => handleClick(btn.syntax)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
