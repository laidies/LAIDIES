# Continuous title scroll

Removes alternate and endpoint dwell from the long-title animation. Original and accessibility-hidden visual copy repeat at a measured title-width+32px period,30px/s (minimum8seconds). Song/title remains bold. Expanded and reduced-motion views hide the duplicate and disable scrolling.

Actual320px preview long Ep01 title: computed linear infinite normal direction, -260.85px period,8.695seconds. Two geometry samples showed leftward movement from -3.96 to -217.46px; the next copy enters from the right. Initial local server had stopped and was restarted; browser error-tab recovery used a fresh preview tab. Existing queue/catalogue tests pass. Initial preparation used f5535c59. The final predeployment check detected a newer NewsStand release; the shipped artifact instead preserves bf06ac26-a325-4c77-9a58-7d306124af07 exactly, changing only content/site/ksvl-player.js.

## Published verification

Production deployment: 48e279f9-5cb8-4f2a-81e0-923b8e2b286f, release source 2e4a2357. Player SHA256: 62d819d9717881aa21629d99b1b893adbe379e368387bcdf9d47e9464867cf37. Custom and immutable origins match the staged player, NewsStand HTML and NewsStand CSS.

Actual https://laidies.ai/radio at 320px: browser initially reused cached old JavaScript; an ordinary hard refresh loaded the deployed source. Long title uses 11.7378s linear infinite normal animation, original width 320.13px and accessibility-hidden duplicate at 352.13px separation. After wrap, original moved from -2.25px to -294.75px while the next copy entered from the right. Viewport restored. No change to playback behavior; no new full-site audit performed.
