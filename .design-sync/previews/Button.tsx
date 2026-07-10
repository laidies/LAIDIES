import * as React from 'react';
import { Button } from '@laidies/design-system';

export function Primary() {
  return <Button variant="primary" href="/chick-flicks.html">Pick up this week's episode →</Button>;
}

export function Join() {
  return <Button variant="join" href="#signup">Join</Button>;
}

export function PrimaryLongLabel() {
  return <Button variant="primary" href="/visitors-centre.html">Stop by the Welcome Wagon first →</Button>;
}
