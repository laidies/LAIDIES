# NewsStand v27 maker inspection

Observed: 2026-08-14 America/Vancouver
Candidate status: `PRIVATE_REVIEW_ONLY_NOT_PUBLISHED`
Source route: `/newsstand.html?review=2026-08-14`

## Exact candidate bindings

- `newsstand.html` — `2918dc812928d9e54d0f4d3c60eaa93bd2c340d62aef6cdd02cdc380c561b1d2`
- `content/newsstand.css` — `dd4f0e6ff1335e89efa38052b97c560c0ae122ece3dce1e51d0d2866ac3cd1a4`
- `content/site/newsstand-catchup-v1.js` — `f53e7ee9fe326f51a69df83ffe1b48aa720ea87e2aa227750fcbddd6aa0f5220`
- `content/newsstand-review-candidate-2026-08-14.json` — `310cbeee4cb5d908867b08287e606e36a7e4e0cd7c0a3cd42ba484d639179f8d`
- `content/newsstand-review-feature-candidates-2026-08-14.json` — `c513ee8cf5695826e503a05baa3557198dad6dfc42f883875bbd7805d519377b`

## What I inspected in the real browser

- 1440×1000, 390×844 and 320×740 render without horizontal overflow.
- The Daily is the arrival experience. The old Paige/front-desk/rack chooser is
  not visible above it.
- The first desktop viewport shows newspaper identity, all four section routes,
  the ranked lead and the start of all four useful Daily desks.
- The 390px and 320px mastheads, headline, image, navigation and article body fit
  without clipped text. Service desks stack vertically rather than becoming a
  horizontal swipe rail.
- The Daily contains two qualified stories. The secondary story is visibly
  ranked below the lead rather than presented as another primary headline.
- Paige, Promptoscope, Career / Work-Life and Mme CLAi-O are readable in the
  paper. The five empty governed desks are not printed as administrative filler.
- Weekly is a complete paper front with its sourced lead, Week in Brief, Term of
  the Week, Dear Miss Jeeves and STRAiGHT TALK.
- The Big Picture is a distinct feature front with the direct answer, evidence
  boundary, work example and home example.
- The lead Daily report opens eight complete sections; Weekly opens six; The Big
  Picture opens ten. All three retain their source links.
- Archive/topic search for `privacy` returns both applicable Daily stories.
- The three rejected v26 background colours `#fff7e1`, `#fffaf0` and `#fff4d2`
  have zero effective rendered occurrences and zero source occurrences.
- The exact public build completes: 563 files, 419.35 MiB, no missing or
  prohibited dependency.

## Maker-found defects repaired before review

1. The first v27 render still inherited the rejected beige/yellow Daily paper.
   Those exact colours were removed before screenshot capture.
2. The first image set used a visually attractive evidence image that the
   default-deny public builder did not admit and an Episode 4 image with no
   NewsStand scope. The lead now uses the active `What Not to Paste` cover; the
   exact Agentic AI image has narrow private-review-only asset authority.
3. Promptoscope originally told readers to use an AI group chat. A current
   official-source check showed ChatGPT stopped new group chats on 2026-07-09.
   The candidate now uses an ordinary private AI chat and returns the shortlist
   to the human group.
4. The review data initially labelled its stories `published` only to pass the
   reader access contract. Source records now remain `review_candidate`; the
   private runtime uses isolated in-memory reader copies and grants no public
   status.
5. Rendered service prose was copied without checksum-bound exemplar identity.
   Every ready desk now binds its exact candidate record and source-exemplar
   SHA. The calibrated v27 checker rejects prose drift.

## Screenshot bindings

| View | SHA-256 |
|---|---|
| `screenshots/daily-desktop-1440.png` | `f225d3d87f53c1f451c15753b0cd0aff810725f54ec6417eadd4dfe280b0d809` |
| `screenshots/daily-mobile-390.png` | `3ca9f77e837a57f8e6d7c979d083ccc94f419e9f541903a164cd239c4bccfbc0` |
| `screenshots/daily-mobile-320.png` | `1046dcce52c40e8291c3723c316ed5f50e8be2cfabe970244c137456eae04e1b` |
| `screenshots/weekly-desktop-1440.png` | `925eb224d83a44e51709ea437084c8fa592ca418e6b2a23154e3423289b60fbb` |
| `screenshots/weekly-mobile-390.png` | `07bf2621deefb5903e411ab7873dd12ad4a615f49b5546c00bdbcf85ba6ea1ce` |
| `screenshots/big-picture-desktop-1440.png` | `3c46fcfb2107427212fd2a396e81aa8e27e5be36564f434571893cb4c9e3591d` |
| `screenshots/big-picture-mobile-390.png` | `0a7c0d8d9f5b83a86662546ad44ee4590e603d8ed2c041199bd175ae4b5ec41c` |

## What this inspection does not prove

This is maker inspection, mechanical release evidence and a private rendering
check. It is not role-distinct design admission, observed-human comprehension,
Ali acceptance, canonical promotion, deployment or public verification.
