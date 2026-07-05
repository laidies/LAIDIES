import * as React from 'react';

export interface RitualBeatProps {
  /** Stop number shown in the gold circle. */
  n: number;
  /** Stop label (Playfair Display), e.g. "The Chick Flicks". */
  label: React.ReactNode;
  /** Short description, e.g. "Pick up this week's episode". */
  desc?: React.ReactNode;
  /** Mark the stop as completed (gold check, strikethrough label). */
  checked?: boolean;
  /** Link target. */
  href?: string;
}

/**
 * One numbered stop (.ritual-beat) on the Wednesday tour: gold number circle,
 * Playfair label, description, and a trailing rose arrow (gold check when
 * checked). Use inside RitualList.
 */
export function RitualBeat({ n, label, desc, checked = false, href = '#' }: RitualBeatProps) {
  return (
    <li data-checked={checked ? '' : undefined}>
      <a className="ritual-beat" href={href}>
        <span className="ritual-beat-n">{n}</span>
        <span className="ritual-beat-body">
          <span className="ritual-beat-label">{label}</span>
          {desc && <span className="ritual-beat-desc">{desc}</span>}
        </span>
      </a>
    </li>
  );
}

export interface RitualListProps {
  /** RitualBeat children. */
  children: React.ReactNode;
}

/**
 * The stacked list (.ritual-beats) of RitualBeat stops.
 */
export function RitualList({ children }: RitualListProps) {
  return <ul className="ritual-beats">{children}</ul>;
}

export interface RitualBlockProps {
  /** Block heading (Playfair Display), e.g. "Full Tour". */
  heading: React.ReactNode;
  /** Progress line above the beats, e.g. "3 of 8 stops ticked". */
  progress?: React.ReactNode;
  /** RitualList plus any RitualBonus. */
  children: React.ReactNode;
  /** Bottom CTA line; an arrow is appended automatically. */
  ctaLabel?: React.ReactNode;
  /** CTA link target. */
  ctaHref?: string;
}

/**
 * Bordered card block (.ritual-block) holding the Wednesday tour: heading,
 * optional progress line, RitualList, and an optional bottom CTA.
 */
export function RitualBlock({ heading, progress, children, ctaLabel, ctaHref = '#' }: RitualBlockProps) {
  return (
    <div className="ritual-block">
      <p className="ritual-heading">{heading}</p>
      {progress && <p className="ritual-progress">{progress}</p>}
      {children}
      {ctaLabel && (
        <a className="ritual-cta" href={ctaHref}>
          {ctaLabel}
        </a>
      )}
    </div>
  );
}

export interface RitualBonusProps {
  /** Gold uppercase eyebrow, e.g. "Bonus stop". */
  eyebrow: React.ReactNode;
  /** The hook line (Playfair Display). Wrap the reward fragment in <span className="ritual-bonus-reward">. */
  hook: React.ReactNode;
  /** Supporting note copy. */
  children?: React.ReactNode;
  /** Extra content, typically a PlayButton. */
  action?: React.ReactNode;
}

/**
 * Gold-tinted bonus callout (.ritual-bonus) at the bottom of a RitualBlock —
 * eyebrow, Playfair hook, note, and an optional action such as a PlayButton.
 */
export function RitualBonus({ eyebrow, hook, children, action }: RitualBonusProps) {
  return (
    <div className="ritual-bonus">
      <p className="ritual-bonus-eyebrow">{eyebrow}</p>
      <p className="ritual-bonus-hook">{hook}</p>
      {children && <p className="ritual-bonus-note">{children}</p>}
      {action}
    </div>
  );
}

export interface RitualChooseProps {
  /** Rose uppercase kicker, e.g. "★ Choose your tour for this Wednesday". */
  kicker: React.ReactNode;
  /** Title line (Playfair Display), e.g. "Express or Full Tour — either counts.". */
  title: React.ReactNode;
  /** Body copy. */
  children?: React.ReactNode;
}

/**
 * Rose-tinted framed intro block (.ritual-choose) that sits above the tour
 * columns and frames the choice between routes.
 */
export function RitualChoose({ kicker, title, children }: RitualChooseProps) {
  return (
    <div className="ritual-choose">
      <p className="ritual-choose-kicker">{kicker}</p>
      <h3 className="ritual-choose-title">{title}</h3>
      {children && <p className="ritual-choose-body">{children}</p>}
    </div>
  );
}
