import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
  // 启用 GitHub Flavored Markdown（表格、任务列表等）
  gfm: true,
  // 回车即换行
  breaks: true,
});

// 创建自定义渲染器实例
const renderer = new marked.Renderer();

// 重写 code 渲染规则，实现highlight代码高亮
renderer.code = ({ text, lang }) => {
  // 支持指定语言
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
    } catch {
      // 高亮失败时，静默忽略并进入下一步的自动检测逻辑
    }
  }
  // 不支持指定语言,自动检测
  try {
    const highlighted = hljs.highlightAuto(text).value;
    return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
  } catch {
    return `<pre><code>${text}</code></pre>`;
  }
};

marked.use({ renderer });

export function renderMarkdown(content: string): string {
  if (!content) return "";
  const result = marked.parse(content);
  return typeof result === "string" ? result : "";
}
