import FileManager from "@/components/FileManager";
import Toolbar from "@/components/Toolbar";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import StatusBar from "@/components/StatusBar";
import { useGlobalShortcuts } from "@/hooks/useGlobalShortcuts";
import styles from "./index.module.scss";

export default function Layout() {
  useGlobalShortcuts();

  return (
    <div className={styles.layout}>
      <FileManager />
      <section className={styles.editorArea}>
        <Toolbar />
        <Editor />
      </section>
      <section className={styles.preview}>
        <Preview />
      </section>
      <StatusBar />
    </div>
  );
}
