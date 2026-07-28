// SUNNYVAiLE nav auth indicator
// Reads Supabase session from localStorage; swaps the static "✉︎ Sign In"
// pill for an initials pill when the visitor is signed in. Runs on any page
// that has a `.sv-signin` element in its nav.
(function() {
  var PROJECT_REF = 'swqnkxzebxdbgyrzpdne';
  var KEY = 'sb-' + PROJECT_REF + '-auth-token';

  function getSession() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.user || !s.user.email) return null;
      if (s.expires_at && s.expires_at * 1000 <= Date.now()) return null;
      return s;
    } catch (_) { return null; }
  }

  function getInitials(email) {
    if (!email) return '★';
    var name = email.split('@')[0];
    var parts = name.split(/[._-]/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  function loadSupabaseConfig() {
    if (window.LAIDIES_SUPABASE_CONFIG) {
      return Promise.resolve(window.LAIDIES_SUPABASE_CONFIG);
    }
    return new Promise(function(resolve) {
      var existing = document.querySelector('script[data-sv-auth-config]');
      if (existing) {
        existing.addEventListener('load', function() {
          resolve(window.LAIDIES_SUPABASE_CONFIG || null);
        }, { once: true });
        existing.addEventListener('error', function() { resolve(null); }, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = '/content/site/supabase-config.js';
      script.dataset.svAuthConfig = '1';
      script.onload = function() {
        resolve(window.LAIDIES_SUPABASE_CONFIG || null);
      };
      script.onerror = function() { resolve(null); };
      document.head.appendChild(script);
    });
  }

  function addChatLink(accountLink, session) {
    if (document.querySelector('.svgh-chat')) return;
    var chat = document.createElement('a');
    chat.className = 'svgh-chat';
    chat.href = '/resident-chat.html';
    chat.textContent = 'Chat';
    chat.setAttribute('aria-label', 'Open private resident chat');
    accountLink.parentNode.insertBefore(chat, accountLink);

    loadSupabaseConfig().then(function(config) {
      if (!config || !config.url || !config.anonKey || !session.access_token) return null;
      return fetch(config.url + '/rest/v1/rpc/my_resident_conversations', {
        method: 'POST',
        headers: {
          apikey: config.anonKey,
          Authorization: 'Bearer ' + session.access_token,
          'Content-Type': 'application/json'
        },
        body: '{}'
      });
    }).then(function(response) {
      if (!response || !response.ok) return null;
      return response.json();
    }).then(function(rows) {
      if (!Array.isArray(rows)) return;
      var unread = rows.reduce(function(total, row) {
        return total + Number(row.unread_count || 0);
      }, 0);
      chat.textContent = unread > 0 ? 'Chat ' + unread : 'Chat';
      if (unread > 0) {
        chat.setAttribute(
          'aria-label',
          'Open private resident chat, ' + unread + ' unread ' +
            (unread === 1 ? 'message' : 'messages')
        );
      }
    }).catch(function() {
      // The navigation still works when the unread check is unavailable.
    });
  }

  function updateNav() {
    var link = document.querySelector('.sv-signin');
    if (!link) return;
    var session = getSession();
    if (!session) return; // Keep default "Sign In" for guests
    var email = session.user.email;
    var initials = getInitials(email);
    // Signed-in state: initials pill + "Resident" label, click goes straight
    // to the Closet — a signed-in resident never needs the make-your-card flow.
    link.innerHTML =
      '<span style="display: inline-block; background: var(--rose); color: var(--cream); border-radius: 999px; padding: 3px 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; margin-right: 8px; vertical-align: middle;">' +
      initials +
      '</span>Resident ★';
    link.setAttribute('title', 'Open your private Closet');
    link.setAttribute('href', '/laidies-card.html');
    addChatLink(link, session);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNav);
  } else {
    updateNav();
  }
})();
