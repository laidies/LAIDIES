import * as React from 'react';

export interface SiteHeaderProps {
  /** Logo image URL. Defaults to the LAiDIES wordmark path used on the live site. */
  logoSrc?: string;
  /** Sign-in link target. */
  signInHref?: string;
  /** Join button target. */
  joinHref?: string;
}

/**
 * The sticky minimal site header (.site-header): LAiDIES wordmark logo on the
 * left, "Sign in" text link and the plum "Join" pill on the right, on a cream
 * bar with a hairline bottom border.
 */
export function SiteHeader({
  logoSrc = '/assets/brand/laidies-wordmark-final-b-light.svg',
  signInHref = '/post-office.html#signin',
  joinHref = '#signup',
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a className="site-logo" href="/" aria-label="LAiDIES — home">
          <img src={logoSrc} alt="LAiDIES" width={120} height={30} />
        </a>
        <div className="site-header-spacer" />
        <a className="signin-link" href={signInHref}>
          Sign in
        </a>
        <a className="join-btn" href={joinHref}>
          Join
        </a>
      </div>
    </header>
  );
}
