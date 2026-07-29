// SUNNYVAiLE nav auth indicator
// Reads Supabase session from localStorage; swaps the static account
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

  function updateNav() {
    var link = document.querySelector('.sv-signin');
    if (!link) return;
    var session = getSession();
    if (!session) return; // Keep default "Sign In" for guests
    var email = session.user.email;
    var initials = getInitials(email);
    // Signed-in state: initials pill + "Resident" label. The Resident Card
    // desk owns account restore, continuation and the route into the Closet.
    link.innerHTML =
      '<span style="display: inline-block; background: var(--rose); color: var(--cream); border-radius: 999px; padding: 3px 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; margin-right: 8px; vertical-align: middle;">' +
      initials +
      '</span>Resident ★';
    link.setAttribute('title', 'Signed in as ' + email + ' — open your Resident desk');
    link.setAttribute('href', '/resident-card.html#rcAccountTitle');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNav);
  } else {
    updateNav();
  }
})();
