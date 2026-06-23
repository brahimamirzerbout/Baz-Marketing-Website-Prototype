import Link from 'next/link';
import { Fragment } from 'react';

type Item = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-8">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-ink-900 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink-900 font-medium' : ''}>
                    {item.label}
                  </span>
                )}
              </li>
              {!last && <li aria-hidden className="text-ink-300">/</li>}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
