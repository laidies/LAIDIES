# Fold-Out Map Counter — isolated owner-review candidate

Open only through a local server whose root is `Website-homepage`; the candidate
intentionally reads the exact approved shared town map and postcard asset
without modifying either.

```text
cd Website-homepage
python3 -m http.server 8765 --bind 127.0.0.1
```

Candidate path:

```text
/operations/design-explorations/visitors-centre-building-championship-20260726/candidate/index.html
```

Automated candidate QA:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/test-candidate.mjs
```

The candidate is not integrated, deployed or published. Its live-route links
exercise the current receiving pages; they do not prove downstream completion.
