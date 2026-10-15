import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import rust from 'highlight.js/lib/languages/rust';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);

const snippetCache = new Map<string, string>();

export function highlightSnippet(code: string, language: string): string {
  const cacheKey = `${language}:${code}`;
  const cached = snippetCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const result = hljs.highlight(code, { language, ignoreIllegals: true }).value;
    snippetCache.set(cacheKey, result);
    return result;
  } catch {
    return code;
  }
}

export function detectLanguageFromFilename(filename?: string): string {
  if (!filename) return 'typescript';
  if (filename.endsWith('.rs')) return 'rust';
  if (filename.endsWith('.sh') || filename.endsWith('.bash')) return 'bash';
  if (filename.endsWith('.json')) return 'json';
  if (filename.endsWith('.html') || filename.endsWith('.xml')) return 'xml';
  if (filename.endsWith('.yml') || filename.endsWith('.yaml')) return 'yaml';
  return 'typescript';
}
