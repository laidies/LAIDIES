# Media release manifests

This directory holds one versioned manifest for every admitted LAiDIES
episode, trailer, song or music collection. Each file validates against
`../media-release.schema.json`.

Expected names:

- `trailer.json`
- `episode-01.json`, `episode-02.json`, and so on
- `song-episode-01.json`, `song-episode-02.json`, and so on
- a separately named manifest for any later single, album or collection

Do not copy a prior manifest and change only its title. Reconcile the exact
masters, cover/album artwork, credits, rights, destinations and freshness
dispositions. A manifest remains `HOLD` until every required field and named
review is real. Public addresses and `VERIFIED_PUBLICLY` status are written
only from exact release receipts.

The approved master episode cover is part of the release identity. Its site,
podcast, YouTube and share variants must be checksum-bound derivatives with
declared focal/safe areas. Retired covers, random frames and unapproved recrops
are ineligible even if they remain elsewhere in the repository.
