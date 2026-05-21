import { EditorView } from "@codemirror/view";

/** 模块级变量，供 Toolbar 组件访问 CodeMirror 实例 */
export const editorViewRef: { current: EditorView | null } = {
  current: null,
};
