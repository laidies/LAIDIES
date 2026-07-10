import * as React from 'react';
import { Band, Container, BrandWord } from '@laidies/design-system';

export function Cream() {
  return (
    <Band tone="cream">
      <Container>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="kicker">Every Wednesday in town</p>
          <h2>
            Wednesday in <BrandWord>SUNNYVAiLE</BrandWord>.
          </h2>
          <p>
            The Wednesday walk-through, stop by stop: a new episode at The Chick Flicks, a Study
            Pack at Blend &amp; Snap, and this week's Wednesday Anthem on KSVL RAiDIO.
          </p>
        </div>
      </Container>
    </Band>
  );
}

export function Pearl() {
  return (
    <Band tone="pearl">
      <Container>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="kicker">The town directory</p>
          <h2>Every place has an address.</h2>
          <p>
            Post Office, The Chick Flicks, SUNNYVAiLE High, the NewsStand, Town Hall — each
            building in town earns its function.
          </p>
        </div>
      </Container>
    </Band>
  );
}

export function Blush() {
  return (
    <Band tone="blush">
      <Container>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="kicker">★ Make it official</p>
          <h2>
            Move to <BrandWord>SUNNYVAiLE</BrandWord>.
          </h2>
          <p>
            Pick up your Residence Card at the Post Office and the town starts keeping track —
            stickers, badges, charms, all of it.
          </p>
        </div>
      </Container>
    </Band>
  );
}
