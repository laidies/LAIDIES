/**
 * Hot Goss Renderer — Enhanced Format with Collapsible Cards
 * 
 * Stories show headline + preview by default.
 * Click "read more" to expand source-provided body + LAIDIES explanation fields when present.
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

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char];
    });
  }

  function getFirstField(story, names) {
    for (var i = 0; i < names.length; i += 1) {
      var value = story && story[names[i]];
      if (value) return value;
    }
    return '';
  }

  function buildNoteBlock(label, value, className) {
    if (!value) return '';
    return '<div class="goss-note-block ' + className + '">' +
      '<span>' + escapeHtml(label) + '</span>' +
      '<p>' + escapeHtml(value) + '</p>' +
    '</div>';
  }

  function buildStoryCard(story, number, isDaily) {
    var numberHtml = number ? '<span class="goss-number">' + String(number).padStart(2, '0') + '</span>' : '';
    var sourceUrl = story.url || story.source;
    var sourceLink = sourceUrl ? '<a href="' + escapeHtml(sourceUrl) + '" target="_blank" rel="noreferrer" class="goss-source-link">Read the receipt \u2192</a>' : '';
    
    var siteLinks = '';
    if (story.siteLinks && story.siteLinks.length) {
      siteLinks = '<div class="goss-site-links">' + story.siteLinks.map(function(link) {
        return '<a href="' + escapeHtml(link.url) + '">' + escapeHtml(link.label || 'Related LAIDIES link') + '</a>';
      }).join('') + '</div>';
    }

    var whatHappened = getFirstField(story, ['whatHappened', 'summary', 'body']);
    var whyCare = getFirstField(story, ['whyYouCare', 'whyWeCare', 'whyItMatters', 'whyCare']);
    var dealRating = getFirstField(story, ['dealRating', 'impactRating', 'howBigADeal', 'rating']);
    var translation = getFirstField(story, ['laidiesTranslation', 'translation', 'groupChatTranslation']);
    var takeaway = getFirstField(story, ['smartBusyWomanTakeaway', 'takeaway', 'groupChatTakeaway', 'workTakeaway']);
    var cocktailParty = getFirstField(story, ['cocktailParty', 'oneLiner', 'meetingOneLiner']);

    var preview = story.preview || (story.body ? story.body.split('. ')[0] + '.' : 'Receipt ready.');
    var dailyClass = isDaily ? ' goss-daily' : '';
    
    return '<article class="goss-story' + dailyClass + '">' +
      numberHtml +
      '<h4 class="goss-headline">' + escapeHtml(story.headline) + '</h4>' +
      '<p class="goss-preview">' + escapeHtml(preview) + '</p>' +
      '<button class="goss-expand-btn">read more \u2193</button>' +
      '<div class="goss-expanded">' +
        buildNoteBlock('What happened?', whatHappened, 'goss-note-what') +
        buildNoteBlock('Why do we care?', whyCare, 'goss-note-why') +
        buildNoteBlock('How big a deal?', dealRating, 'goss-note-rating') +
        buildNoteBlock('LAIDIES translation', translation, 'goss-note-translation') +
        buildNoteBlock('Smart busy woman takeaway', takeaway, 'goss-note-takeaway') +
        buildNoteBlock(isDaily ? 'One-liner' : 'The cocktail party version', cocktailParty, 'goss-note-cocktail') +
        '<div class="goss-footer">' + sourceLink + siteLinks + '</div>' +
      '</div>' +
    '</article>';
  }
})();
