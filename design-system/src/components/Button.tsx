import * as React from 'react';

export interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Visual style. "primary" is the large plum pill CTA; "join" is the compact header pill. */
  variant?: 'primary' | 'join';
  /** Link target. */
  href?: string;
  children: React.ReactNode;
}

/**
 * The LAiDIES call-to-action pill. "primary" (.btn-primary) is the large plum
 * button used for main page CTAs ("Pick up this week's episode →"); "join"
 * (.join-btn) is the compact pill used in the site header. Both hover to rose.
 */
export function Button({ variant = 'primary', href = '#', children, ...rest }: ButtonProps) {
  const className = variant === 'join' ? 'join-btn' : 'btn-primary';
  return (
    <a className={className} href={href} {...rest}>
      {children}
    </a>
  );
}
