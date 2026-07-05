import * as React from 'react';

export interface QuickRailItemProps {
  /** Decorative glyph shown in the gold-metallic circle, e.g. "✿", "♪", "✉". */
  icon: React.ReactNode;
  /** Label revealed on hover, e.g. "Tune in KSVL". */
  label: React.ReactNode;
  /** Link target. */
  href?: string;
  /** Tooltip title. */
  title?: string;
}

/**
 * One circular stop (.quick-rail-item) on the QuickRail: dark plum circle with
 * a metallic-gold glyph that expands leftward on hover to reveal its label.
 */
export function QuickRailItem({ icon, label, href = '#', title }: QuickRailItemProps) {
  return (
    <a
      className="quick-rail-item"
      href={href}
      title={title}
      style={{ justifyContent: 'flex-start' }}
    >
      <span className="quick-rail-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="quick-rail-label">{label}</span>
    </a>
  );
}

export interface QuickRailProps {
  /** QuickRailItem children. */
  children: React.ReactNode;
  /** Accessible label for the rail. */
  ariaLabel?: string;
}

/**
 * The fixed right-edge quick-jump rail (.quick-rail) of circular town-service
 * shortcuts. Hidden on small screens.
 */
export function QuickRail({ children, ariaLabel = 'Quick jump — town services' }: QuickRailProps) {
  return (
    <nav className="quick-rail" aria-label={ariaLabel}>
      {children}
    </nav>
  );
}
