// SUNNYVAiLE navigation authentication state.
// Signed out: "Sign in" → the private Resident Card continuation desk.
// Signed in: initials/avatar + "My Closet" → the resident's Closet.
// Supports both the shared inner-page header and the Homepage's own header.
(function () {
  'use strict';

  var PROJECT_REF = 'swqnkxzebxdbgyrzpdne';
  var KEY = 'sb-' + PROJECT_REF + '-auth-token';
  var SIGN_IN_HREF = '/resident-card.html#rcAccountTitle';
  var CLOSET_HREF = '/laidies-card.html';

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

  function safeAssetPath(value) {
    return typeof value === 'string' &&
      /^\/assets\/[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:png|jpe?g|webp|gif|avif)$/i.test(value) &&
      value.indexOf('..') === -1 &&
      value.indexOf('//') === -1;
  }

  function getLocalAvatar() {
    try {
      var direct = localStorage.getItem('laidies_card_avatar_url') || '';
      if (safeAssetPath(direct)) return direct;
      var raw = localStorage.getItem('laidies_resident_card_v1');
      var card = raw ? JSON.parse(raw) : null;
      var nested = card && card.fields && card.fields.cardAvatarUrl || '';
      return safeAssetPath(nested) ? nested : '';
    } catch (_) {
      return '';
    }
  }

  function getInitials(email) {
    if (!email) return '★';
    var name = email.split('@')[0];
    var parts = name.split(/[._-]/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  }

  function addIdentityBadge(link, email) {
    var avatar = getLocalAvatar();
    var badge = avatar
      ? document.createElement('img')
      : document.createElement('span');
    if (avatar) {
      badge.src = avatar;
      badge.alt = '';
      badge.style.objectFit = 'cover';
    } else {
      badge.textContent = getInitials(email);
    }
    badge.setAttribute('aria-hidden', 'true');
    badge.style.display = 'inline-flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.style.width = '24px';
    badge.style.height = '24px';
    badge.style.background = 'var(--rose, #9b3f5f)';
    badge.style.color = 'var(--cream, #fffdfb)';
    badge.style.borderRadius = '999px';
    badge.style.fontSize = '10px';
    badge.style.fontWeight = '800';
    badge.style.letterSpacing = '0.04em';
    badge.style.marginRight = '7px';
    badge.style.verticalAlign = 'middle';
    link.appendChild(badge);
  }

  function updateNav() {
    var links = document.querySelectorAll('.sv-signin, .signin-link');
    if (!links.length) return;
    var session = getSession();
    links.forEach(function (link) {
      link.replaceChildren();
      if (!session) {
        link.textContent = 'Sign in';
        link.setAttribute('href', SIGN_IN_HREF);
        link.setAttribute('title', 'Sign in to pick up where you left off');
        link.removeAttribute('data-authenticated');
        return;
      }
      var email = session.user.email;
      addIdentityBadge(link, email);
      link.appendChild(document.createTextNode('My Closet'));
      link.setAttribute('href', CLOSET_HREF);
      link.setAttribute('title', 'Signed in as ' + email + ' — open My Closet');
      link.setAttribute('data-authenticated', 'true');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNav);
  } else {
    updateNav();
  }
  window.addEventListener('pageshow', updateNav);
  window.addEventListener('focus', updateNav);
  window.addEventListener('storage', function (event) {
    if (event.key === KEY ||
        event.key === 'laidies_card_avatar_url' ||
        event.key === 'laidies_resident_card_v1') {
      updateNav();
    }
  });
})();
