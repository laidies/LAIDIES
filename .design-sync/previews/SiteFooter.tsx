import * as React from 'react';
import { SiteFooter } from '@laidies/design-system';

export function Default() {
  return <SiteFooter />;
}

export function HomepageFooter() {
  return (
    <SiteFooter
      brand={
        <>
          LAiDIES
          <sup style={{ fontSize: '0.5em', opacity: 0.8 }}>™</sup>
        </>
      }
      tagline="AI fluency and community for women. New episodes every Wednesday."
      legal="© 2026 Ali Eakin · Filed from SUNNYVAiLE · All rights reserved."
      links={[
        { label: 'Welcome Wagon', href: '/visitors-centre.html' },
        { label: 'LIBRAiRY', href: '/library.html' },
        { label: 'The Mall', href: '/mall.html' },
        { label: 'SANCTUAiRY', href: '/sanctuary.html' },
        { label: 'Post Office', href: '/post-office.html' },
        { label: 'Privacy', href: '/privacy.html' },
        { label: 'Terms', href: '/terms.html' },
      ]}
    />
  );
}
