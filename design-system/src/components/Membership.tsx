import * as React from 'react';

export interface MembershipProps {
  /** Ribbon text, e.g. "In the works". */
  ribbon?: React.ReactNode;
  /** Title (Playfair Display). */
  title: React.ReactNode;
  /** Supporting copy. */
  children?: React.ReactNode;
  /** Disabled CTA label, e.g. "Membership opens soon". */
  ctaLabel?: React.ReactNode;
}

/**
 * The gold-dashed "coming soon" card (.membership) with its rotated gold
 * corner ribbon (.coming-soon-overlay) and a deliberately disabled CTA pill.
 */
export function Membership({ ribbon = 'Coming soon', title, children, ctaLabel }: MembershipProps) {
  return (
    <div className="membership">
      <div className="coming-soon-overlay">{ribbon}</div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {ctaLabel && <span className="membership-cta-disabled">{ctaLabel}</span>}
    </div>
  );
}
