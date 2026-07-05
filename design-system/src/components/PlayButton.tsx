import * as React from 'react';

export interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Label shown next to the play icon, e.g. "♪ Hear the Wednesday Anthem · THE LAiDIES". */
  children: React.ReactNode;
  /** Show the playing (pause) state. */
  playing?: boolean;
}

/**
 * The rose-outlined song pill (.ritual-bonus-play) used across SUNNYVAiLE to
 * play anthems and episode songs on KSVL. Uppercase label with a small
 * play/pause icon; fills rose on hover.
 */
export function PlayButton({ children, playing = false, ...rest }: PlayButtonProps) {
  return (
    <button type="button" className={`ritual-bonus-play${playing ? ' is-playing' : ''}`} {...rest}>
      <svg viewBox="0 0 24 24" className="play-icon" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
      <svg viewBox="0 0 24 24" className="pause-icon" aria-hidden="true" style={{ display: 'none' }}>
        <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
      </svg>
      <span>{children}</span>
    </button>
  );
}
