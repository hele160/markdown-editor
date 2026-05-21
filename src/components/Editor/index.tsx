import { useEffect, useRef, useCallback } from "react";
import { EditorView } from "@codemirror/view";
import { createEditorConfig } from "@/utils/editorConfig";
import { editorViewRef } from "@/utils/editorViewRef";
import { useEditorStore } from "@/stores/editorStore";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./index.module.scss";

export default function Editor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const currentFile = useEditorStore(s =>
    s.currentFileId
      ? (s.files.find(f => f.id === s.currentFileId) ?? null)
      : null,
  );
  const updateContent = useEditorStore(s => s.updateContent);
  const theme = useThemeStore(s => s.theme);

  // 稳定的 onUpdate 回调
  const handleUpdate = useCallback(
    (value: string) => {
      const id = useEditorStore.getState().currentFileId;
      if (id) {
        updateContent(id, value);
      }
    },
    [updateContent],
  );

  // 1. 初始化 CodeMirror 实例（仅执行一次）
  useEffect(() => {
    if (!containerRef.current) return;

    const state = createEditorConfig(
      currentFile?.content ?? "",
      theme,
      handleUpdate,
    );

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;
    editorViewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
      editorViewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 当 currentFile 切换时，同步内容到 CodeMirror
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    const targetDoc = currentFile?.content ?? "";

    if (currentDoc !== targetDoc) {
      view.dispatch({
        changes: {
          from: 0,
          to: currentDoc.length,
          insert: targetDoc,
        },
      });
    }
  }, [currentFile?.id, currentFile?.content]);

  // 3. 主题切换时重建配置
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const currentDoc = view.state.doc.toString();
    const state = createEditorConfig(currentDoc, theme, handleUpdate);
    view.setState(state);
  }, [theme, handleUpdate]);

  return <div ref={containerRef} className={styles.editor} />;
}
