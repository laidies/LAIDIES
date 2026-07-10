import * as React from 'react';
import { Container, BrandWord } from '@laidies/design-system';

export function Default() {
  return (
    <Container>
      <div className="section-head" style={{ marginBottom: 0 }}>
        <p className="kicker">★ Girl power meets machine power</p>
        <h2>
          <BrandWord>LAiDIES</BrandWord> teaches AI in the language you already speak.
        </h2>
        <p>
          Rom-coms, mixtapes, mall trips — Y2K canon, repurposed as a curriculum.
          New episodes every Wednesday.
        </p>
      </div>
    </Container>
  );
}

export function WithBodyCopy() {
  return (
    <Container>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: 'var(--plum)', margin: '0 0 12px' }}>
        This week at the NewsStand
      </h3>
      <p style={{ margin: '0 0 10px', color: 'var(--plum-soft)' }}>
        The SUNNYVAiLE Tribune has your AI round-up, and the Wednesday edition ships with the
        episode. Grab both before your Blend &amp; Snap order is even ready.
      </p>
      <p style={{ margin: 0, color: 'var(--plum-soft)' }}>
        The Post Office sends you a note when it's all in — links to every stop, one letter.
      </p>
    </Container>
  );
}
