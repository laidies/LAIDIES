import * as React from 'react';
import { QuickRail, QuickRailItem } from '@laidies/design-system';

export function TownServices() {
  return (
    <QuickRail>
      <QuickRailItem icon="✿" label="Start here" href="/visitors-centre.html" title="Welcome Wagon" />
      <QuickRailItem icon="§" label="Look it up" href="/library.html" title="Look it up · The LIBRAiRY" />
      <QuickRailItem icon="♪" label="Tune in KSVL" href="/radio.html" title="KSVL RAiDIO, 99.9" />
      <QuickRailItem icon="✉" label="Check the mail" href="/post-office.html" title="Post Office · mail & gifts" />
      <QuickRailItem icon="✧" label="Light a candle" href="/sanctuary.html" title="The SANCTUAiRY · Patron Saints" />
      <QuickRailItem icon="&" label="Study Pack" href="/blend-snap.html" title="The Blend & Snap · Study Pack" />
    </QuickRail>
  );
}

export function ShortRail() {
  return (
    <QuickRail ariaLabel="Quick jump — Wednesday stops">
      <QuickRailItem icon="✦" label="Ask LAiDY" href="/games/fairy-godmother.html" title="Ask LAiDY · FAiRY Godmother" />
      <QuickRailItem icon="¶" label="Read the news" href="/newsstand.html" title="The NewsStand" />
      <QuickRailItem icon="♦" label="Have fun" href="/games/fun-pack.html" title="Have fun · the games arcade" />
      <QuickRailItem icon="❦" label="Say hi" href="/sorority-house.html" title="Delta LAi Nu chat rooms" />
    </QuickRail>
  );
}
