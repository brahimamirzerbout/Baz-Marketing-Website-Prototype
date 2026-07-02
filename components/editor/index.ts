// Aether Editor Extensions — Stubs for future implementation
// These exports satisfy the barrel import in components/aether/index.ts

export function DiffViewer() { return null; }
export function CodeBlock() { return null; }
export function Minimap() { return null; }
export function MermaidRenderer() { return null; }
export function DatasetBrowser() { return null; }
export function FileUploadZone() { return null; }
export function NotificationCenter() { return null; }

export type DiffLine = { type: 'add' | 'remove' | 'unchanged'; content: string };
