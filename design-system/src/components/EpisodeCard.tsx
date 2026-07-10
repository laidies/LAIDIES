import * as React from 'react';

export interface EpisodeCardProps {
  /** Episode art URL (4:3 crop). */
  imageSrc?: string;
  /** Alt text for the episode art. */
  imageAlt?: string;
  /** Small rose uppercase eyebrow, e.g. "This week at The Chick Flicks". */
  eyebrow: React.ReactNode;
  /** Episode title (Playfair Display). */
  title: React.ReactNode;
  /** Teaser copy. Use <em> for emphasized fragments. */
  children?: React.ReactNode;
  /** CTA label, e.g. "Read the episode". An arrow is appended automatically. */
  ctaLabel?: string;
  /** CTA link target. */
  href?: string;
}

/**
 * The featured episode card (.episode-card): episode art on top, eyebrow,
 * Playfair title, teaser copy, and a rose arrow CTA. Lifts on hover.
 */
export function EpisodeCard({
  imageSrc,
  imageAlt = '',
  eyebrow,
  title,
  children,
  ctaLabel = 'Read the episode',
  href = '#',
}: EpisodeCardProps) {
  return (
    <article className="episode-card">
      {imageSrc && <img className="episode-card-img" src={imageSrc} alt={imageAlt} />}
      <div className="episode-card-body">
        <p className="episode-card-eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        {children && <p>{children}</p>}
        <a className="episode-card-cta" href={href}>
          {ctaLabel}
        </a>
      </div>
    </article>
  );
}
