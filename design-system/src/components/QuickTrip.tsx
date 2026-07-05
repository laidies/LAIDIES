import * as React from 'react';

export interface QuickTripOptionProps {
  /** Thumbnail image URL (92×92 crop). */
  imageSrc?: string;
  /** Alt text for the thumbnail. */
  imageAlt?: string;
  /** Small rose uppercase eyebrow, e.g. "Start with Episode 1". */
  eyebrow: React.ReactNode;
  /** Option title (Playfair Display). */
  title: React.ReactNode;
  /** Short description. */
  children?: React.ReactNode;
  /** CTA line, e.g. "Read it →". */
  ctaLabel?: React.ReactNode;
  /** Link target. */
  href?: string;
}

/**
 * A single tappable option row (.quick-trip-opt): 92px thumbnail beside
 * eyebrow, title, description, and CTA. Border warms to rose on hover.
 */
export function QuickTripOption({
  imageSrc,
  imageAlt = '',
  eyebrow,
  title,
  children,
  ctaLabel,
  href = '#',
}: QuickTripOptionProps) {
  return (
    <a
      className="quick-trip-opt"
      href={href}
      style={imageSrc ? undefined : { gridTemplateColumns: '1fr' }}
    >
      {imageSrc && <img className="quick-trip-opt-img" src={imageSrc} alt={imageAlt} loading="lazy" />}
      <div className="quick-trip-opt-body">
        <p className="quick-trip-opt-eyebrow">{eyebrow}</p>
        <p className="quick-trip-opt-title">{title}</p>
        {children && <p className="quick-trip-opt-desc">{children}</p>}
        {ctaLabel && <span className="quick-trip-opt-cta">{ctaLabel}</span>}
      </div>
    </a>
  );
}

export interface QuickTripBlockProps {
  /** Block heading (Playfair Display), e.g. "Express Tour". */
  heading: React.ReactNode;
  /** Italic intro line under the heading. */
  intro?: React.ReactNode;
  /** QuickTripOption rows and QuickTripDivider separators. */
  children: React.ReactNode;
  /** Bottom "see all" line, e.g. "Browse all episodes at The Chick Flicks". */
  footer?: React.ReactNode;
  /** Link target for the footer line. */
  footerHref?: string;
}

/**
 * Bordered card block (.quick-trip-block) holding QuickTripOption rows — the
 * homepage's "Express Tour" pattern. Optional italic intro and a bottom
 * hairline "see all" link.
 */
export function QuickTripBlock({ heading, intro, children, footer, footerHref = '#' }: QuickTripBlockProps) {
  return (
    <div className="quick-trip-block">
      <p className="ritual-heading">{heading}</p>
      {intro && <p className="quick-trip-intro">{intro}</p>}
      {children}
      {footer && (
        <a className="quick-trip-all" href={footerHref}>
          {footer}
        </a>
      )}
    </div>
  );
}

export interface QuickTripDividerProps {
  /** Divider label, e.g. "or, when you have a minute". */
  children: React.ReactNode;
}

/**
 * Italic Playfair divider line (.quick-trip-divider) between QuickTripOption
 * rows, with hairlines on either side.
 */
export function QuickTripDivider({ children }: QuickTripDividerProps) {
  return <p className="quick-trip-divider">{children}</p>;
}
