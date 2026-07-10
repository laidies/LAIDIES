import * as React from 'react';

export interface JoinCtaProps {
  /** Emphasis level: gold solid (primary) or outlined glass (secondary). */
  variant?: 'primary' | 'secondary';
  /** CTA title line (Playfair Display). */
  title: React.ReactNode;
  /** Small sub-line under the title. */
  sub?: React.ReactNode;
  /** Link target. */
  href?: string;
}

/**
 * A stacked CTA tile (.join-cta) inside a JoinBand — gold solid for the
 * primary action, translucent outline for the secondary.
 */
export function JoinCta({ variant = 'primary', title, sub, href = '#' }: JoinCtaProps) {
  return (
    <a className={`join-cta join-cta--${variant}`} href={href}>
      <span className="join-cta-title">{title}</span>
      {sub && <span className="join-cta-sub">{sub}</span>}
    </a>
  );
}

export interface JoinBandProps {
  /** Gold uppercase kicker, e.g. "Become a resident". */
  kicker?: React.ReactNode;
  /** Band title (Playfair Display). */
  title: React.ReactNode;
  /** Supporting description. */
  children?: React.ReactNode;
  /** One or two JoinCta tiles. */
  ctas: React.ReactNode;
}

/**
 * The plum→rose gradient join band (.join-band): kicker, Playfair title, and
 * description on the left, stacked JoinCta tiles on the right.
 */
export function JoinBand({ kicker, title, children, ctas }: JoinBandProps) {
  return (
    <div className="join-band">
      <div>
        {kicker && <p className="join-band-kicker">{kicker}</p>}
        <h2 className="join-band-title">{title}</h2>
        {children && <p className="join-band-desc">{children}</p>}
      </div>
      <div className="join-band-ctas">{ctas}</div>
    </div>
  );
}
