import * as React from 'react';

export interface DirectoryCardProps {
  /** Small rose uppercase address line, e.g. "12 MAiN Street". */
  address: React.ReactNode;
  /** Building name (Playfair Display), e.g. "The Chick Flicks". */
  name: React.ReactNode;
  /** One-line tag describing what happens there. */
  children: React.ReactNode;
  /** Link target. */
  href?: string;
}

/**
 * Town-directory tile (.dir-card): address eyebrow, Playfair building name,
 * and a one-line tag. Use inside DirectoryGrid for the SUNNYVAiLE town
 * directory.
 */
export function DirectoryCard({ address, name, children, href = '#' }: DirectoryCardProps) {
  return (
    <a className="dir-card" href={href}>
      <p className="dir-addr">{address}</p>
      <h3 className="dir-name">{name}</h3>
      <p className="dir-tag">{children}</p>
    </a>
  );
}

export interface DirectoryGridProps {
  /** DirectoryCard children. */
  children: React.ReactNode;
}

/**
 * Responsive grid (.directory-grid) for DirectoryCards — 1/2/3 columns as the
 * viewport grows.
 */
export function DirectoryGrid({ children }: DirectoryGridProps) {
  return <div className="directory-grid">{children}</div>;
}
