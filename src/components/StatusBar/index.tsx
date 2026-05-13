import { useMemo } from "react";
import { useEditorStore } from "@/stores/editorStore";
import styles from "./index.module.scss";

interface StatusBarProps {
  sidebarCollapsed: boolean;
}

export default function StatusBar({ sidebarCollapsed }: StatusBarProps) {
  const content = useEditorStore(s => {
    if (!s.currentFileId) return "";
    const file = s.files.find(f => f.id === s.currentFileId);
    return file?.content ?? "";
  });

  const stats = useMemo(() => {
    const chars = content.length;
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const lines = content ? content.split("\n").length : 0;
    return { chars, words, lines };
  }, [content]);

  return (
    <footer
      className={`${styles.statusbar} ${sidebarCollapsed ? styles.collapsed : ""}`}
    >
      <span>字数: {stats.words}</span>
      <span>行数: {stats.lines}</span>
      <span>字符: {stats.chars}</span>
    </footer>
  );
}
