import * as React from 'react';

export interface SectionHeadProps {
  /** Small rose uppercase eyebrow above the title, e.g. "Every Wednesday in town". */
  kicker?: React.ReactNode;
  /** The section title (rendered as an h2 in Playfair Display). */
  title: React.ReactNode;
  /** Supporting paragraph under the title. */
  children?: React.ReactNode;
  /** Left-align instead of the default centered layout. */
  align?: 'center' | 'left';
}

/**
 * Standard LAiDIES section opener (.section-head): kicker eyebrow, Playfair
 * Display serif title, and an optional supporting paragraph. Centered by
 * default; every band on the homepage starts with one.
 */
export function SectionHead({ kicker, title, children, align = 'center' }: SectionHeadProps) {
  return (
    <header className="section-head" style={align === 'left' ? { textAlign: 'left' } : undefined}>
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}
