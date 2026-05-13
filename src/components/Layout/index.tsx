import FileManager from "@/components/FileManager";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";
import styles from "./index.module.scss";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <FileManager />
      <section className={styles.editor}>
        <Editor />
      </section>
      <section className={styles.preview}>
        <Preview />
      </section>
    </div>
  );
}
