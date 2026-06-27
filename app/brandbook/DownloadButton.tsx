'use client';

import { useState } from 'react';

export function DownloadButton() {
  const [busy, setBusy] = useState(false);

  async function handleDownload() {
    setBusy(true);
    try {
      const html = '<!doctype html>\n' + document.documentElement.outerHTML;
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'baz-brandbook.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(a.href);
        a.remove();
      }, 0);
    } catch (err) {
      console.error('Download failed', err);
      alert('Download failed — try File → Save As.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white hover:bg-white/10 disabled:opacity-60 transition-colors px-5 h-11 rounded-full font-medium"
    >
      {busy ? 'Saving…' : 'Download .html'}
    </button>
  );
}