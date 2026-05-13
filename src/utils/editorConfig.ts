import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  rectangularSelection,
  crosshairCursor,
} from "@codemirror/view";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
} from "@codemirror/language";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import type { Theme } from "@/types";

export function createEditorConfig(
  doc: string,
  theme: Theme,
  onUpdate: (value: string) => void,
): EditorState {
  return EditorState.create({
    doc,
    extensions: [
      // 行号
      lineNumbers(),
      // 当前行高亮 + 行号高亮
      highlightActiveLineGutter(),
      // 特殊字符显示
      highlightSpecialChars(),
      // 历史记录（撤销/重做）
      history(),
      // 选中区域高亮
      drawSelection(),
      // 括号匹配
      bracketMatching(),
      // 自动闭合括号
      closeBrackets(),
      // 缩进匹配
      indentOnInput(),
      // 代码折叠
      foldGutter(),
      // 矩形选择（Alt+拖拽）
      rectangularSelection(),
      crosshairCursor(),
      // 高亮匹配的选中文本
      highlightSelectionMatches(),
      // Markdown 语法支持
      markdown({ base: markdownLanguage }),
      // 语法高亮主题
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      // 快捷键
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        indentWithTab,
      ]),
      // 暗色主题（条件启用）
      theme === "dark" ? oneDark : [],
      // 内容变化监听
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          onUpdate(update.state.doc.toString());
        }
      }),
    ].flat(),
  });
}
