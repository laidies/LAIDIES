import * as React from 'react';
import { SignupBand } from '@laidies/design-system';

export function WednesdayPostcard() {
  return (
    <SignupBand
      title="Sign up for the Wednesday Postcard."
      placeholder="you@yourcompany.com"
      buttonLabel="Sign up at the Post Office"
    >
      All five in one letter: the episode, the Study Pack, the Pop Quiz, this week's AI news, and
      this week's episode song from KSVL. Just the newsletter, once a week. No card needed.
    </SignupBand>
  );
}

export function Defaults() {
  return <SignupBand title="Get the Wednesday letter." />;
}
