import * as React from 'react';
import { RitualBonus, PlayButton, BrandWord } from '@laidies/design-system';

export function FullTourReward() {
  return (
    <RitualBonus
      eyebrow="★ Bonus for finishing the Full Tour"
      hook={
        <>
          All 8 stops on your Tour Guide ·{' '}
          <span className="ritual-bonus-reward">+1 <BrandWord>FAiRY</BrandWord> wish</span>
        </>
      }
      action={<PlayButton>♪ The Wednesday Anthem</PlayButton>}
    >
      One extra wish with the <a href="/games/fairy-godmother.html"><BrandWord>FAiRY</BrandWord> Godmother</a>,
      banked on your Closet. Resets Wednesday. Your Tour Guide auto-ticks each stop when you visit —
      no clicking required.
    </RitualBonus>
  );
}

export function NoteOnly() {
  return (
    <RitualBonus
      eyebrow="★ Bonus stop"
      hook={
        <>
          Find all seven this week ·{' '}
          <span className="ritual-bonus-reward">this week's charm</span>
        </>
      }
    >
      Charms hide in town images across <BrandWord>SUNNYVAiLE</BrandWord>. Found charms live on your
      Residence Card.
    </RitualBonus>
  );
}
