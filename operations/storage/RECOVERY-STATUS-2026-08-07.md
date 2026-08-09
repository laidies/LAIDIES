# Recovery status — updated 2026-08-09 06:55 PDT

## Proven now

- Git history bundle: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/laidies-full.bundle`; SHA-256 `3ec898e040ed186d01d115a9bb7b9e997b71f3c54c9f431a7c61884fbe33c12e`; 47 refs; scratch clone and `git fsck --no-dangling` passed.
- Encrypted Restic repository: AWS S3 bucket `laidies-backup-310697203171-us-east-2`, repository ID `58d7b464eb`.
- Full-tree snapshot: `ff1c716baa2e8e147c29e9fc4b6eb4576255d920cb130c4f81a022edbef9065f`, created 2026-08-08 07:05:43 PDT with tag `full-initial-2026-08-08`.
- Backup result: 80,739 files; 94.632 GiB processed; 68.119 GiB added; 66.548 GiB stored; 2:43:38.
- `restic check --read-data` read all 4,022 packs and reported no errors.
- Full scratch restore path: `/tmp/laidies-restic-restore.YPW0Uj`; 80,739 restored files, matching the snapshot file count.
- Measured full-restore window: 2026-08-08 10:46:15–12:15:19 PDT, approximately 1:29:04. The original terminal session was lost after completion, so no process exit code is claimed; matching file count, no remaining Restic process and the checks below are the retained completion evidence.
- Immutable-byte check: snapshot `restic dump` SHA-256 and restored SHA-256 for `Website-homepage/operations/runtime/work-resolution-loop.json` both equal `627589f7e47dc22f8f1a67e03864fb56bf5e098c8aa81a3ddf16874ccbeaaa31`.
- Restored-site check: local scratch server returned HTTP 200 and expected titles for `index.html` (`LAiDIES — SUNNYVAiLE`), `library.html` (`SUNNYVAiLE LIBRAiRY`) and `content/library-books/pilots/ai-fundamentals-101-v2/review.html` (`AI Fundamentals 101 — local review draft`). Route recovery does not approve the held book or Library design.
- Automated recurrence: nightly incremental backup, weekly repository integrity check and monthly sampled restore/route drill are active. No retention deletion policy has been enabled.
- Write-stable follow-up snapshot: `4a996ba9`, taken after writes were paused. The representative source fingerprint was unchanged before and after the snapshot; sampled `restic dump`/restore hashes and the three restored routes passed. This closes the live-source limitation for bounded integration work, but it does not authorize deletion of the iCloud worktree.
- Clean-checkout drills: the pre-merge branch at `c096ea51` and post-merge worktree at `13fafe62` passed the exact operating-baseline commands, but both shared the original iCloud repository's Git object database. They prove clean checkout behavior, not independent non-iCloud source storage.
- Two standalone non-iCloud drills: `/Users/alisoneakin/Projects/laidies` and `/Users/alisoneakin/Projects/laidies-drill-2` are separate fresh partial clones, each with its own local `.git`, exact branch commit `f921e1c1f08156f6ad81fec585c7d6afcffd247a`, clean tracked state and full `npm run ci` PASS. The second clone also reproduced the curated public builder's exact fail-closed ten-path hold. These drills prove independent source storage and repeatable operation; exact disposition of every migrated path and the timed parity/consumer gates still prevent old-copy retirement.
- Current inventory: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-storage-inventory.json`, generated 2026-08-09T09:03:22Z from the standalone tool using explicit `--root`; 65,925 files / 84,334,212,604 bytes; dirty 9,792 (219 tracked modifications, 9,573 untracked). Dispositions: `HOLD_UNKNOWN=4,299`, `REVIEW_FOR_EXACT_PACKAGE_COMMIT=957`, `PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF=206`, `KEEP_OUT_OF_GIT=4,330`. Copied external-review inputs, isolated product prototypes and the superseded August 1 opening-day media scaffold remain historical; rendered design QA media remains generated evidence; modified tracked generated files remain preserved; and rejected/exploratory design files cannot return as current source. Reference counting reads only current authority and active-source text, so ignored dependencies and historical/generated evidence cannot manufacture recovery dependencies.
- Exact clean-baseline reconciliation: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-storage-reconciliation.json` compared all 957 exact-package candidates without mutating either tree. Twenty-one tracked paths differ from the clean branch, 928 paths are absent from it and eight exact bytes already match the baseline. The eight matches require no import; every remaining candidate stays in owner/package review until integrated or explicitly held.
- Controlled recovery queue: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-recovery-packages.json` groups all 9,792 dirty paths into review packages without moving, staging or deleting anything. It routes 919 untracked additions and 17 tracked diffs for exact review; eight paths require no import, one verified transformed import requires no repeat review, 4,299 unknown paths remain held, 206 historical/rejected/generated paths remain preserved behind archive gates and 4,330 generated/ignored paths remain out of Git. A package can become `READY_FOR_OWNER_REVIEW` only when its route is high-confidence, it contains at most 25 reviewable paths and every exact backticked source path it names is already in the clean baseline or inside that package. Exact SHA-bound owner rulings split mixed packages: changed source or transformed-target bytes invalidate the ruling automatically, and a HOLD grants no deletion, archive or authority claim. The 02:15 PDT owner review found that the three-file `platform:site-runtime` package mixed visitor-facing Homepage behaviour, a Library-locked Miss Jeeves pilot taxonomy and a search index that points at the rejected AI Fundamentals candidate while using contradictory status values. Exact-SHA owner holds preserve all three without restoring them through storage recovery. The live recount leaves 55 packages / 64 paths ready for owner review. Package status is permission to inspect an exact boundary, never owner, commit or release authority.

## Limitation closed for bounded integration

The first full backup read a live, changing iCloud worktree. One pre-backup hash did not match the eventual snapshot because the source changed during the 2:43 backup; the restored bytes did match the immutable snapshot exactly. This was source movement, not restore corruption.

Snapshot `4a996ba9` supplied the required write-stable follow-up and sampled recovery drill. Bounded clean-branch integration may proceed. Two independent standalone clone drills passed at `f921e1c1`; destructive cleanup and retirement of the iCloud tree remain prohibited until every moved path has an exact disposition and the timed parity/consumer gates pass.

## Legacy receipt classification

The 06:15 PDT live queue contained 31 unreferenced Control Room judge/audit
receipts dated 2026-08-03 and two Audience acceptance records that explicitly
granted responsibility only while implementation remained held. These are
historical decision evidence, not missing current implementation. The
inventory now classifies only those exact untracked August 3 filename patterns
as `HISTORICAL`. Its calibrated fixture proves the old receipt and Audience
acceptance remain preserved behind the archive/restore gate while an adjacent
2026-08-09 Control Room decision and current Audience implementation still
classify as active source.

The full 65,925-file dirty-tree scan passed without mutation. Reviewable source
rows fell from 913 to 880, and ready owner-review work fell from 64 paths to 31.
The 33 historical records were not deleted, moved, edited, staged or imported.
`UNKNOWN` remains immovable, and Library visitor-facing work remains outside
this recovery package.

## Product-owner authority closure

The 06:35 PDT review found that the apparently ready two-file
`businesswomens-special` package would create an orphan in the clean branch:
the clean baseline did not yet contain the registry or the Bronze parent
charter/state. The prior dependency check saw only exact backticked paths, so it
could not reject a structurally incomplete owner package.

The planner now derives owner authority from the current product registry.
Every product-owner package requires the registry plus its bound dossier/state
and, for a subproduct, the parent's bound dossier/state in the clean baseline or
the same exact package. A calibrated fixture reproduces the Businesswomen's
Special shape and rejects it as `HOLD_MISSING_OWNER_AUTHORITY` while a complete
Library owner package remains ready.

Applied to the unchanged 9,792-path inventory, the real queue falls from 31
ready reviewable paths to three: two AIDB concept-card images and one opening-day
media-gate record. Eighty-five product packages now remain explicitly held on
missing registry/parent authority rather than being offered for orphan import.
No Businesswomen's Special, Bronze, Library or dirty-source byte was imported,
edited, moved, deleted or staged.

## Final ready-path disposition

The 06:55 PDT review resolved the last three ready paths. Two untracked AIDB
PNGs are exact private concept renders whose own visible label says they are
not published LAiDIES cards. The tracked HTML source already exists in the
clean branch and no current source consumes the PNGs. Exact-SHA rulings now
preserve both images as held generated review output rather than source.

The remaining tracked media-gate correction is current authority, not clutter.
It removes four false `OWNER WATCH REQUIRED` claims and returns Episodes 01–04
to `INTERNAL REPAIR REQUIRED` while their objective picture, identity, motion,
occurrence and recurring-credit gates remain unresolved. The exact source SHA
is bound for import and the operational/media checks consume this manifest.
No visual asset, episode master, Library path, public route or deployment was
changed.

## Authority truth

Backup and local recovery authority were used. No snapshot was forgotten or pruned; no source file was deleted or moved; no deploy, publication, public verification, Cloudflare change or Ali release authority was used.
