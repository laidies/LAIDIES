# Compact shared player preview

Owner requirements: prioritize controls, shrink song area and text, allow scrolling titles, keep volume visible, clarify Stop. Default now has a unified mint strip and explicit Song/Band labels. Overflow title scroll is CSS bounded by measured text overflow, disabled for reduced motion. Expanded view shows complete title and extra controls. Existing exact next-item and ownership logic unchanged.

Browser: Radio and NewsStand preview routes;320/390/1280 layouts;320px height98px and1280px height81px; no horizontal overflow. Volume keyboard, Expand/Collapse, Stop & close hiding player and restarting through NewsStand button verified. Source syntax and Up next tests pass. Screenshots slim-mobile.png, slim-expanded.png, slim-desktop.png. Actual long-title animation and OS reduced-motion toggle were not exercised in browser; source implements both. Public release and every-page audit not performed. Prior split-panel previews superseded by owner rejection.

Independent Terra Low review inspected all three final images and source: no concrete blocker. Owner visual verdict remains pending.

## Desktop correction
Ali rejected universal disclosure and flat mint. Rewind casing and mint/lime panels restored. >620px exposes all controls plus Up next and removes Expand; phones retain it. Actual1074px desktop83px tall,390px phone96px tall, no horizontal overflow. Phone toggle checked. Evidence full-controls-desktop.png and full-controls-mobile.png supersedes prior compact screenshot style. Not published.
