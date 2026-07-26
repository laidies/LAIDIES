# Tonight minimum-safe release rollback

The candidate is based on detached HEAD
`c5d72fadc0cc873d1d1bfdabdb79a3aea9c773fb`.

Preflight only:

```sh
node operations/releases/tonight-minimum-safe-2026-07-26/rollback-tonight-minimum-safe-release-v1.mjs
```

The preflight verifies every current candidate file against
`tonight-minimum-safe-release-v1-files.json`. It requires the current HEAD to
descend from the exact baseline and refuses unrelated history or post-seal
drift.

Execution, only if rollback is explicitly authorized:

```sh
node operations/releases/tonight-minimum-safe-2026-07-26/rollback-tonight-minimum-safe-release-v1.mjs --execute
```

Tracked files are restored from the exact baseline object. Candidate-only
files are removed one-by-one from the sealed manifest; no glob, reset,
checkout, clean, provider operation or public action is used. The artifact
directory is retained as evidence and is not a deployment target.
