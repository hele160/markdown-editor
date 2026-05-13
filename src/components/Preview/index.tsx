import { useMemo, useCallback } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { renderMarkdown } from "@/utils/markdown";
import styles from "./index.module.scss";

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Preview() {
  const currentFile = useEditorStore(s => {
    if (!s.currentFileId) return null;
    return s.files.find(f => f.id === s.currentFileId) ?? null;
  });

  const content = currentFile?.content ?? "";
  const html = useMemo(() => renderMarkdown(content), [content]);

  const handleExportMarkdown = useCallback(() => {
    if (!currentFile) return;
    downloadFile(currentFile.content, currentFile.name, "text/markdown");
  }, [currentFile]);

  const handleExportHTML = useCallback(() => {
    if (!currentFile) return;
    const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentFile.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      line-height: 1.8;
      color: #1a1a2e;
    }
    pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; }
    code { font-family: "JetBrains Mono", "Consolas", monospace; font-size: 0.9em; }
    img { max-width: 100%; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e5e7eb; padding: 8px 12px; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    const name = currentFile.name.replace(/\.md$/, "") + ".html";
    downloadFile(fullHtml, name, "text/html");
  }, [currentFile, html]);

  return (
    <div className={styles.preview}>
      <div className={styles.header}>
        <span>预览</span>
        <div className={styles.exportGroup}>
          <button className={styles.exportBtn} onClick={handleExportMarkdown}>
            导出 .md
          </button>
          <button className={styles.exportBtn} onClick={handleExportHTML}>
            导出 HTML
          </button>
        </div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
