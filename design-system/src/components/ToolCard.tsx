import * as React from 'react';

export interface ToolCardProps {
  /** Small rose uppercase eyebrow, e.g. "Ask anything". */
  eyebrow: React.ReactNode;
  /** Tool name (Playfair Display), e.g. "FAiRY Godmother". */
  name: React.ReactNode;
  /** Where in town it lives, e.g. "Lives at Mme CLAi-O's". */
  where?: React.ReactNode;
  /** One-sentence description of the tool. */
  children: React.ReactNode;
  /** CTA label; an arrow is appended automatically. */
  ctaLabel?: string;
  /** Link target. */
  href?: string;
}

/**
 * Quick-access tool card (.tool-card) from the homepage tools rail: eyebrow,
 * Playfair tool name, "where it lives" line, description, and a rose "open"
 * CTA. Use inside ToolsGrid.
 */
export function ToolCard({ eyebrow, name, where, children, ctaLabel = 'Open', href = '#' }: ToolCardProps) {
  return (
    <a className="tool-card" href={href}>
      <p className="tool-eyebrow">{eyebrow}</p>
      <h3 className="tool-name">{name}</h3>
      {where && <p className="tool-where">{where}</p>}
      <p className="tool-desc">{children}</p>
      <span className="tool-open">{ctaLabel}</span>
    </a>
  );
}

export interface ToolsGridProps {
  /** ToolCard children. */
  children: React.ReactNode;
}

/**
 * Responsive grid (.tools-grid) for ToolCards — 1 column on mobile, 2 on
 * tablet, 5 across on desktop.
 */
export function ToolsGrid({ children }: ToolsGridProps) {
  return <div className="tools-grid">{children}</div>;
}
