import * as React from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteFooterProps {
  /** Brand line shown large at the top of the footer. */
  brand?: React.ReactNode;
  /** Tagline line under the brand. */
  tagline?: React.ReactNode;
  /** Legal / copyright line. */
  legal?: React.ReactNode;
  /** Footer links (Privacy, Terms, etc.). */
  links?: FooterLink[];
}

/**
 * The dark plum site footer (.site-footer): centered Playfair brand line,
 * tagline, legal line, and a row of small links.
 */
export function SiteFooter({
  brand = 'LAiDIES',
  tagline = 'AI fluency and community for women. New episodes every Wednesday.',
  legal = '© 2026 LAiDIES. SUNNYVAiLE is a fictional town. The learning is real.',
  links = [
    { label: 'Privacy', href: '/privacy.html' },
    { label: 'Terms', href: '/terms.html' },
  ],
}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p className="footer-brand">{brand}</p>
      <p>{tagline}</p>
      <p className="footer-legal">{legal}</p>
      <div className="footer-links">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
