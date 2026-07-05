import * as React from 'react';
import { SiteHeader, Band, Container, BrandWord } from '@laidies/design-system';

/** Inline SVG wordmark so the preview card never shows a broken image. */
const wordmark =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='30'><text x='0' y='23' font-family='Georgia' font-size='21' font-weight='bold' letter-spacing='1' fill='%234b2148'>L<tspan fill='%239b3f5f'>Ai</tspan>DIES</text></svg>";

export function Default() {
  return <SiteHeader logoSrc={wordmark} />;
}

export function AbovePageContent() {
  return (
    <div>
      <SiteHeader logoSrc={wordmark} signInHref="/post-office.html#signin" joinHref="#signup" />
      <Band tone="pearl">
        <Container>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="kicker">Every Wednesday in town</p>
            <h2>
              Wednesday in <BrandWord>SUNNYVAiLE</BrandWord>.
            </h2>
          </div>
        </Container>
      </Band>
    </div>
  );
}
