import { useState } from "react";
import FileManager from "@/components/FileManager";
import Toolbar from "@/components/Toolbar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import StatusBar from "@/components/StatusBar";
import { useGlobalShortcuts } from "@/hooks/useGlobalShortcuts";
import styles from "./index.module.scss";

export default function Layout() {
  useGlobalShortcuts();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  return (
    <div
      className={`${styles.layout} ${sidebarCollapsed ? styles.collapsed : ""}`}
    >
      <FileManager collapsed={sidebarCollapsed} />
      <section className={styles.editorArea}>
        <Toolbar
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <Editor />
      </section>
      <section className={styles.preview}>
        <Preview />
      </section>
      <StatusBar sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
