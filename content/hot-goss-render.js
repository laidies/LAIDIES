/**
 * Hot Goss Renderer — Enhanced Format with Collapsible Cards
 * 
 * Stories show headline + preview by default.
 * Click "read more" to expand full body + whyYouCare + cocktailParty + links.
 * 
 * Auto-links to glossary terms and episodes based on siteLinks in JSON.
 */
(function() {
  fetch("content/hot-goss-feed.json?v=" + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(data) {
      // Render weekly stories
      var weeklyEl = document.getElementById("gossWeeklyList");
      if (weeklyEl && data.weeklyStories && data.weeklyStories.length) {
        weeklyEl.innerHTML = data.weeklyStories.map(function(story, i) {
          return buildStoryCard(story, i + 1, false);
        }).join("");
      }
      // Render daily headlines
      var dailyEl = document.getElementById("gossDailyList");
      if (dailyEl && data.dailyHeadlines && data.dailyHeadlines.length) {
        dailyEl.innerHTML = data.dailyHeadlines.map(function(story) {
          return buildStoryCard(story, null, true);
        }).join("");
      }
      // Show last updated
      if (data.lastUpdated) {
        var stamp = document.querySelector(".hot-goss-stamp strong");
        if (stamp) stamp.textContent = "Last updated: " + data.lastUpdated;
      }
      // Wire up expand/collapse
      document.querySelectorAll('.goss-expand-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var card = btn.closest('.goss-story');
          var isExpanded = card.classList.contains('is-expanded');
          card.classList.toggle('is-expanded');
          btn.textContent = isExpanded ? 'read more \u2193' : 'less \u2191';
        });
      });
    })
    .catch(function() {
      var weeklyEl = document.getElementById("gossWeeklyList");
      if (weeklyEl) weeklyEl.innerHTML = '<p style="color: var(--muted);">Stories loading soon. Check back shortly.</p>';
    });

  function buildStoryCard(story, number, isDaily) {
    var numberHtml = number ? '<span class="goss-number">' + String(number).padStart(2, '0') + '</span>' : '';
    var sourceLink = story.source ? '<a href="' + story.source + '" target="_blank" rel="noreferrer" class="goss-source-link">Read the receipt \u2192</a>' : '';
    
    var siteLinks = '';
    if (story.siteLinks && story.siteLinks.length) {
      siteLinks = '<div class="goss-site-links">' + story.siteLinks.map(function(link) {
        var icon = link.type === 'episode' ? '\ud83d\udcf0' : link.type === 'glossary' ? '\ud83d\udcd6' : '\ud83d\udd17';
        return '<a href="' + link.url + '">' + icon + ' ' + link.label + '</a>';
      }).join('') + '</div>';
    }
    
    var whyYouCare = story.whyYouCare ? '<div class="goss-why-care"><span class="goss-why-label">\ud83d\udca1 Why you\'d care:</span><p>' + story.whyYouCare + '</p></div>' : '';
    var cocktailLabel = isDaily ? '\ud83c\udf78 One-liner:' : '\ud83c\udf78 The cocktail party version:';
    var cocktailParty = story.cocktailParty ? '<div class="goss-cocktail-party"><span class="goss-cocktail-label">' + cocktailLabel + '</span><p>' + story.cocktailParty + '</p></div>' : '';
    
    var preview = story.preview || story.body.split('. ')[0] + '.';
    var dailyClass = isDaily ? ' goss-daily' : '';
    
    return '<article class="goss-story' + dailyClass + '">' +
      numberHtml +
      '<h4 class="goss-headline">' + story.headline + '</h4>' +
      '<p class="goss-preview">' + preview + '</p>' +
      '<button class="goss-expand-btn">read more \u2193</button>' +
      '<div class="goss-expanded">' +
        '<p class="goss-body">' + story.body + '</p>' +
        whyYouCare +
        cocktailParty +
        '<div class="goss-footer">' + sourceLink + siteLinks + '</div>' +
      '</div>' +
    '</article>';
  }
})();
