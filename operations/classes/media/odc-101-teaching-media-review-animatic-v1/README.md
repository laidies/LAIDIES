# ODC-101 teaching-media review animatic v1

Status: **BUILT LOCALLY / HOLD**

This is the first narration-timed media package for `ODC-101 — What You're
Looking At`. It teaches the distinction between an AI app, its model, working
context, optional tools and the human verification boundary. It replaces the
retired “name the furniture” framing.

## Exact review artifact

- Master: `assets/classes/odc-101/odc-101-what-youre-looking-at-review-animatic-v1.mp4`
- SHA-256: `e54a22f3d81aa23bc348b3d8675428dc996b28d0928e955b365c1c565f1c39bf`
- Clock: `00:00.000–04:09.775`
- Captions: 54 cues covering the complete clock
- Transcript and poster: beside the master
- Actual rendered-frame evidence: `rendered-contact-sheet.png`

The current system voice is a timing witness, not an approved performance.
The exact source, timing and output hashes are in `manifest.json`.

## Release boundary

Nothing in this package is bound to `content/site/high-classes.json` or the
public class player. Before release it needs an approved narration performance,
a current interface-path recheck, independent content/accessibility/
unfamiliar-learner review, and a complete human sound-on review of the exact
successor hash.

Run the bounded technical gate with:

```sh
node scripts/check-odc-101-review-animatic.mjs
```
