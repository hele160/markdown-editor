import { useState } from "react";
import { useEditorStore } from "@/stores/editorStore";
import type { MarkdownFile } from "@/types";
import styles from "./index.module.scss";

interface FileManagerProps {
  collapsed: boolean;
}

export default function FileManager({ collapsed }: FileManagerProps) {
  const files = useEditorStore(s => s.files);
  const currentFileId = useEditorStore(s => s.currentFileId);
  const setCurrentFile = useEditorStore(s => s.setCurrentFile);
  const addFile = useEditorStore(s => s.addFile);
  const deleteFile = useEditorStore(s => s.deleteFile);
  const renameFile = useEditorStore(s => s.renameFile);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleDoubleClick = (file: MarkdownFile) => {
    setEditingId(file.id);
    setEditingName(file.name);
  };

  const handleRename = (id: string) => {
    if (editingName.trim()) {
      renameFile(id, editingName.trim());
    }
    setEditingId(null);
  };

  if (collapsed) return null;

  return (
    <aside className={styles.sidebar}>
      {/* 顶部栏 */}
      <div className={styles.header}>
        <span className={styles.title}>文件</span>
        <button
          className={styles.addBtn}
          onClick={() => addFile()}
          title="新建文件"
        >
          +
        </button>
      </div>

      {/* 文件列表 */}
      <ul className={styles.list}>
        {files.map(file => (
          <li
            key={file.id}
            className={`${styles.item} ${file.id === currentFileId ? styles.active : ""}`}
            onClick={() => setCurrentFile(file.id)}
          >
            {editingId === file.id ? (
              <input
                className={styles.input}
                value={editingName}
                onChange={e => setEditingName(e.target.value)}
                onBlur={() => handleRename(file.id)}
                onKeyDown={e => {
                  if (e.key === "Enter") handleRename(file.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                autoFocus
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <span
                className={styles.name}
                onDoubleClick={() => handleDoubleClick(file)}
              >
                {file.name}
              </span>
            )}

            <button
              className={styles.deleteBtn}
              onClick={e => {
                e.stopPropagation();
                deleteFile(file.id);
              }}
              title="删除文件"
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      {/* 底部统计 */}
      <div className={styles.footer}>{files.length} 个文件</div>
    </aside>
  );
}
