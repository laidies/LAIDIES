# Recovery status — updated 2026-08-08 12:31 PDT

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
- Current inventory: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-inventory.json`, generated 2026-08-08T19:31:46Z; 65,925 files / 84,334,209,258 bytes; dirty 9,794 (219 tracked modifications, 9,575 untracked). Dispositions: `HOLD_UNKNOWN=4,299`, `REVIEW_FOR_EXACT_PACKAGE_COMMIT=2,626`, `PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF=32`, `REVIEW_TRACKED_GENERATED_FILE=27`, `KEEP_OUT_OF_GIT=2,810`.

## Important limitation found

The first full backup read a live, changing iCloud worktree. One pre-backup hash did not match the eventual snapshot because the source changed during the 2:43 backup; the restored bytes did match the immutable snapshot exactly. This is not restore corruption, but it means the snapshot is not proven atomic across every file.

Before any destructive cleanup or worktree migration, take one final incremental snapshot during a declared write-stable window, bind its snapshot ID and representative hashes from `restic dump`, and rerun the sampled recovery drill. Do not call the iCloud tree retired until two clean non-iCloud work drills pass.

## Authority truth

Backup and local recovery authority were used. No snapshot was forgotten or pruned; no source file was deleted or moved; no deploy, publication, public verification, Cloudflare change or Ali release authority was used.
