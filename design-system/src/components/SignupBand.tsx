import * as React from 'react';

export interface SignupBandProps {
  /** Band title (Playfair Display), e.g. "Get the Wednesday letter.". */
  title: React.ReactNode;
  /** Supporting line under the title. */
  children?: React.ReactNode;
  /** Email input placeholder. */
  placeholder?: string;
  /** Submit button label. */
  buttonLabel?: string;
}

/**
 * The plum→rose gradient newsletter band (.signup-band) with the rounded
 * email + gold submit form (.signup-form) — the Post Office signup.
 */
export function SignupBand({
  title,
  children,
  placeholder = 'you@youremail.com',
  buttonLabel = 'Sign me up',
}: SignupBandProps) {
  return (
    <div className="signup-band">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder={placeholder} aria-label="Email address" />
        <button type="submit">{buttonLabel}</button>
      </form>
    </div>
  );
}
