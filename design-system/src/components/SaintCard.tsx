import * as React from 'react';

export interface SaintCardProps {
  /** Portrait image URL (square). Falls back to a blush square when omitted. */
  imageSrc?: string;
  /** Saint name (Playfair Display), e.g. "Saint Cher of Beverly Hills". */
  name: React.ReactNode;
  /** Small rose uppercase lane line, e.g. "Patron Saint of the Confident Ask". */
  lane: React.ReactNode;
  /** The saint's rule / one-liner. */
  children: React.ReactNode;
  /** Link target. */
  href?: string;
}

/**
 * Patron Saint trading card (.saint-card): square portrait, Playfair name,
 * uppercase lane label, and the saint's rule. Use inside SaintsRail.
 */
export function SaintCard({ imageSrc, name, lane, children, href = '#' }: SaintCardProps) {
  return (
    <a className="saint-card" href={href}>
      <div
        className="saint-initial"
        style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
        aria-hidden="true"
      />
      <h3>{name}</h3>
      <p className="saint-lane">{lane}</p>
      <p className="saint-rule">{children}</p>
    </a>
  );
}

export interface SaintsRailProps {
  /** SaintCard children. */
  children: React.ReactNode;
}

/**
 * Horizontal scroll-snap rail (.saints-grid) for SaintCards, with the site's
 * thin rose scrollbar.
 */
export function SaintsRail({ children }: SaintsRailProps) {
  return <div className="saints-grid">{children}</div>;
}
