import * as React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

/**
 * Centered max-width (1180px) content wrapper (.container) with the site's
 * responsive horizontal padding. Use inside a Band.
 */
export function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}
