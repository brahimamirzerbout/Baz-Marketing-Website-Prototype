import type { Testimonial } from '@/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col bg-paper rounded-2xl p-6 md:p-7 border border-ink-100 h-full">
      <span aria-hidden className="font-display text-5xl text-accent leading-none mb-3">&ldquo;</span>
      <blockquote className="font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug text-ink-900 flex-1">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
        <div>
          <p className="font-medium text-ink-900">{testimonial.author}</p>
          <p className="text-sm text-ink-500">{testimonial.role} · {testimonial.company}</p>
        </div>
        {testimonial.metric && (
          <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent text-right">
            {testimonial.metric}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
