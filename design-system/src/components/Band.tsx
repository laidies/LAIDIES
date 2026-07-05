import * as React from 'react';

export interface BandProps {
  /** Background tone of the section band. */
  tone?: 'cream' | 'pearl' | 'blush';
  children: React.ReactNode;
}

/**
 * Full-width page section band (.band) with one of the three LAiDIES
 * background tones. Pages are built as a vertical stack of alternating bands;
 * put a Container inside to constrain content width.
 */
export function Band({ tone = 'cream', children }: BandProps) {
  return <section className={`band band--${tone}`}>{children}</section>;
}
