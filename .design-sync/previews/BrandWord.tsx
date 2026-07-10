import * as React from 'react';
import { BrandWord } from '@laidies/design-system';

export function Laidies() {
  return (
    <p style={{ margin: 0, fontSize: 17 }}>
      <BrandWord>LAiDIES</BrandWord> teaches AI in the language you already speak.
    </p>
  );
}

export function InSectionTitle() {
  return (
    <div className="section-head" style={{ marginBottom: 0 }}>
      <h2>
        Wednesday in <BrandWord>SUNNYVAiLE</BrandWord>.
      </h2>
    </div>
  );
}

export function BrandWordSweep() {
  return (
    <p style={{ margin: 0, fontSize: 16, display: 'flex', flexWrap: 'wrap', gap: '10px 22px' }}>
      <BrandWord>LAiDIES</BrandWord>
      <BrandWord>SUNNYVAiLE</BrandWord>
      <BrandWord>LIBRAiRY</BrandWord>
      <BrandWord>RAiDIO</BrandWord>
      <BrandWord>MAiKEOVER</BrandWord>
      <BrandWord>SANCTUAiRY</BrandWord>
      <BrandWord>FAiRY</BrandWord>
    </p>
  );
}
