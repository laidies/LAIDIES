# Visitor's Centre functional candidate v2

This is an isolated, neutral and reversible functional prototype. It does not
select the sitewide visual style and is not integrated, approved, deployed or
public.

Serve the `Website-homepage` repository root:

```text
python3 -m http.server 8765 --bind 127.0.0.1
```

Open:

```text
/operations/design-explorations/visitors-centre-building-championship-20260726/functional-candidate-v2/index.html
```

Visitor fixtures:

- `?visitor=first-time`
- `?visitor=returning-no-card`
- `?visitor=card-local`
- `?visitor=card-account`

Failure fixtures:

- `?failure=map`
- `?failure=directory`
- `?failure=storage`
- `?failure=missing-contract`

Run:

```text
node operations/design-explorations/visitors-centre-building-championship-20260726/test-functional-candidate-v2.mjs
```
