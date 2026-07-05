import * as React from 'react';

export interface MastheadProps {
  /** Full-width hero image URL. */
  imageSrc?: string;
  /** Alt text for the hero image. */
  imageAlt?: string;
  /** Small uppercase eyebrow line, e.g. "★ Welcome to SUNNYVAiLE · Population: women just like you". */
  eyebrow: React.ReactNode;
  /** The lead paragraph under the eyebrow. */
  tagline: React.ReactNode;
  /** Primary CTA (typically a Button). */
  cta?: React.ReactNode;
  /** Small line under the CTA, e.g. "New in town? Stop by the Welcome Wagon first →". */
  sub?: React.ReactNode;
}

/**
 * The page-arrival masthead (.masthead): full-width town image, centered
 * eyebrow + tagline block, primary CTA and a small secondary line beneath.
 */
export function Masthead({ imageSrc, imageAlt = '', eyebrow, tagline, cta, sub }: MastheadProps) {
  return (
    <section className="masthead">
      {imageSrc && (
        <div className="masthead-image">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      )}
      <div className="masthead-bottom">
        <span className="masthead-eyebrow">{eyebrow}</span>
        <p className="masthead-tag">{tagline}</p>
        <div className="masthead-ctas">
          {cta}
          {sub && <p className="masthead-sub">{sub}</p>}
        </div>
      </div>
    </section>
  );
}
