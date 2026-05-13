import { useCallback } from "react";
import { EditorView } from "@codemirror/view";
import { editorViewRef } from "@/components/Editor";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Link,
  Image,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
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
  icon: React.ReactNode;
  title: string;
  syntax: SyntaxType;
}

const iconSize = 16;

const buttonGroups: ToolbarButton[][] = [
  [
    { icon: <Bold size={iconSize} />, title: "加粗", syntax: "bold" },
    { icon: <Italic size={iconSize} />, title: "斜体", syntax: "italic" },
    {
      icon: <Strikethrough size={iconSize} />,
      title: "删除线",
      syntax: "strikethrough",
    },
  ],
  [
    { icon: <Heading1 size={iconSize} />, title: "标题 1", syntax: "h1" },
    { icon: <Heading2 size={iconSize} />, title: "标题 2", syntax: "h2" },
    { icon: <Heading3 size={iconSize} />, title: "标题 3", syntax: "h3" },
  ],
  [
    { icon: <List size={iconSize} />, title: "无序列表", syntax: "ul" },
    { icon: <ListOrdered size={iconSize} />, title: "有序列表", syntax: "ol" },
    {
      icon: <CheckSquare size={iconSize} />,
      title: "任务列表",
      syntax: "task",
    },
  ],
  [
    { icon: <Quote size={iconSize} />, title: "引用", syntax: "quote" },
    { icon: <Code size={iconSize} />, title: "代码块", syntax: "code" },
    { icon: <Link size={iconSize} />, title: "链接", syntax: "link" },
    { icon: <Image size={iconSize} />, title: "图片", syntax: "image" },
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
        {sidebarCollapsed ? (
          <PanelLeftOpen size={iconSize} />
        ) : (
          <PanelLeftClose size={iconSize} />
        )}
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
              {btn.icon}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
