import * as React from 'react';
import { JoinCta, BrandWord } from '@laidies/design-system';

/**
 * JoinCta only ever appears inside the plum→rose JoinBand gradient — the
 * secondary (translucent glass) variant is invisible on cream, so every cell
 * composes onto the site's gradient.
 */
function GradientContext({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #341446 0%, #9b3f5f 100%)',
        padding: 32,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {children}
    </div>
  );
}

export function Primary() {
  return (
    <GradientContext>
      <JoinCta
        variant="primary"
        title="Design your Residence Card"
        sub={<>at <BrandWord>MAiKEOVER</BrandWord> · No. 9 <BrandWord>MAiN</BrandWord>(e) →</>}
        href="/maikeover.html"
      />
    </GradientContext>
  );
}

export function Secondary() {
  return (
    <GradientContext>
      <JoinCta
        variant="secondary"
        title="Just the Wednesday delivery"
        sub="at the Post Office →"
        href="#signup"
      />
    </GradientContext>
  );
}

export function StackedPair() {
  return (
    <GradientContext>
      <JoinCta
        variant="primary"
        title="Join the town"
        sub={<>free · takes a minute at <BrandWord>MAiKEOVER</BrandWord> →</>}
        href="/maikeover.html"
      />
      <JoinCta variant="secondary" title="Sign in" sub="already a resident? →" href="/signin.html" />
    </GradientContext>
  );
}

export function NoSub() {
  return (
    <GradientContext>
      <JoinCta variant="primary" title="Join the town" href="/maikeover.html" />
    </GradientContext>
  );
}
