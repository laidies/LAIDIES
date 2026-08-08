# Recovery status — updated 2026-08-08 06:54 PDT

## Proven now

- Git history bundle: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/laidies-full.bundle`
- Bundle SHA-256: `3ec898e040ed186d01d115a9bb7b9e997b71f3c54c9f431a7c61884fbe33c12e`
- Size on disk: 6.9 GB.
- `git bundle verify` reported a complete history containing 47 refs.
- A scratch clone restored HEAD `7685fae95a2249334e1719144915ba706d853815`; `git fsck --no-dangling` passed. The scratch clone was then moved to Trash.
- Full tracked, untracked and ignored path inventory: `/Users/alisoneakin/Documents/LAIDIES-recovery-2026-08-07/repository-inventory.json`
- Inventory schema 2 result: 65,906 files / 84,334,000,122 bytes. It now records each path's Git state and disposition in addition to purpose, size, modification time and reference count.
- Current dirty result: 236 tracked modifications and 9,626 untracked files. `HOLD_UNKNOWN=4,301`; `UNKNOWN` never moves. `KEEP_OUT_OF_GIT=2,810`; `REVIEW_FOR_EXACT_PACKAGE_COMMIT=2,689`; `PRESERVE_THEN_ARCHIVE_AFTER_RESTORE_PROOF=35`; `REVIEW_TRACKED_GENERATED_FILE=27`.
- Local runtime noise is now excluded at source: `.wrangler/state/`, `.artifacts/` and dated `*.bak-*` files are gitignored. This changes discovery only; it deletes nothing.
- Encrypted AWS restic repository `58d7b464eb` exists in the private, least-privilege bucket `laidies-backup-310697203171-us-east-2`. Pilot snapshot `97cf1352` passed `restic check`, scratch restore and exact SHA-256 comparison for all three pilot files.

## Not proven

This is **not a complete backup**. The Git bundle contains history, not the current dirty working tree. The AWS restic snapshot is a three-file connectivity and restore pilot, not the 95 GB LAiDIES tree. The current inventory identifies dirty paths but does not back up their bytes.

The official restic `0.19.1` Darwin arm64 binary is installed at `/Users/alisoneakin/.local/bin/restic`. Its downloaded release asset matched published SHA-256 `7be0a144ccc377880f294204aa271d76e4b79554b42a751151d425ce6ebac143`, and `restic version` passed. Scoped AWS destination credentials are stored in macOS Keychain and the backup identity cannot list the account or touch another bucket. The required full-tree encrypted backup, `restic check --read-data`, full-tree scratch restore, site-open-from-restore, measured RPO and measured RTO remain blocked on explicit approval of the estimated ~$2.19/month 95 GB upload. No worktree move out of iCloud and no archive deletion is safe before that proof exists.

AWS account configuration and the tiny pilot were used. No full backup spend, Cloudflare, Backblaze, deploy or publication authority was used.
