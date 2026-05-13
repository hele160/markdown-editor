import { useMemo } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { renderMarkdown } from "@/utils/markdown";
import styles from "./index.module.scss";

export default function Preview() {
  const content = useEditorStore(s => {
    if (!s.currentFileId) return "";
    const file = s.files.find(f => f.id === s.currentFileId);
    return file?.content ?? "";
  });

  const html = useMemo(() => renderMarkdown(content), [content]);

  return (
    <div className={styles.preview}>
      <div className={styles.header}>预览</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
