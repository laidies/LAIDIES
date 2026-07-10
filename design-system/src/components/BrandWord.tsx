import * as React from 'react';

export interface BrandWordProps {
  /** The brand word to render, e.g. "LAiDIES", "SUNNYVAiLE", "RAiDIO". The "Ai" letters are automatically highlighted in rose. */
  children: string;
}

/**
 * Renders a LAiDIES-brand word with its "Ai" letters in the rose accent color,
 * per the site-wide brand rule. Use for LAiDIES, SUNNYVAiLE, LIBRAiRY, RAiDIO,
 * MAiKEOVER, SANCTUAiRY, FAiRY, and any other brand word containing "Ai".
 */
export function BrandWord({ children }: BrandWordProps) {
  const parts = children.split(/(Ai)/g);
  return (
    <span style={{ textTransform: 'none' }}>
      {parts.map((part, i) =>
        part === 'Ai' ? (
          <span key={i} data-brand-ai="">
            Ai
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </span>
  );
}
