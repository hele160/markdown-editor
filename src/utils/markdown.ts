import { marked } from "marked";
import hljs from "highlight.js";

// 配置 marked
marked.setOptions({
  gfm: true, // 启用 GitHub Flavored Markdown（表格、任务列表等）
  breaks: true, // 回车即换行
});

// 自定义渲染器：重写代码块的渲染逻辑
const renderer = new marked.Renderer();

renderer.code = ({ text, lang }) => {
  // 如果指定了语言且有对应的 highlight.js 语言包，使用语法高亮
  if (lang && hljs.getLanguage(lang)) {
    try {
      const highlighted = hljs.highlight(text, { language: lang }).value;
      return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
    } catch {
      // 高亮失败时，fallback 到纯文本
    }
  }

  // 没有指定语言或语言不支持时，自动检测
  try {
    const highlighted = hljs.highlightAuto(text).value;
    return `<pre><code class="hljs">${highlighted}</code></pre>`;
  } catch {
    return `<pre><code>${text}</code></pre>`;
  }
};

marked.use({ renderer });

/**
 * 将 Markdown 文本渲染为 HTML
 * @param content - Markdown 原始文本
 * @returns 渲染后的 HTML 字符串
 */
export function renderMarkdown(content: string): string {
  if (!content) return "";
  const result = marked.parse(content);
  return typeof result === "string" ? result : "";
}
