import * as React from 'react';
import { JoinBand, JoinCta, BrandWord } from '@laidies/design-system';

export function MoveToSunnyvaile() {
  return (
    <JoinBand
      kicker="★ Make it official"
      title={<>Move to <BrandWord>SUNNYVAiLE</BrandWord>.</>}
      ctas={
        <>
          <JoinCta
            variant="primary"
            title="Design your Residence Card"
            sub={<>at <BrandWord>MAiKEOVER</BrandWord> · No. 9 <BrandWord>MAiN</BrandWord>(e) →</>}
            href="/maikeover.html"
          />
          <JoinCta
            variant="secondary"
            title="Just the Wednesday delivery"
            sub="at the Post Office →"
            href="#signup"
          />
        </>
      }
    >
      Sign up for the Wednesday delivery, or design your Residence Card and unlock the whole town —
      Sorority House rooms, the Charm Hunt, gifting, and your Closet.
    </JoinBand>
  );
}

export function SingleCta() {
  return (
    <JoinBand
      kicker="★ Become a resident"
      title="Join the town."
      ctas={
        <JoinCta
          variant="primary"
          title="Join the town"
          sub={<>free · takes a minute at <BrandWord>MAiKEOVER</BrandWord> →</>}
          href="/maikeover.html"
        />
      }
    >
      One card unlocks the Sorority House chat rooms, the Charm Hunt, and gifting through the Post
      Office.
    </JoinBand>
  );
}
