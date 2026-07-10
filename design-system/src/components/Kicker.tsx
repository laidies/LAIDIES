import * as React from 'react';

export interface KickerProps {
  /** Short uppercase label, e.g. "Every Wednesday in town" or "★ Meet the town". */
  children: React.ReactNode;
}

/**
 * The small rose uppercase eyebrow label (.kicker) that opens every LAiDIES
 * section — wide letter-spacing, sits above the section title.
 */
export function Kicker({ children }: KickerProps) {
  return <p className="kicker">{children}</p>;
}
