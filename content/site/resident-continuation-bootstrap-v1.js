(function residentContinuationBootstrapV1(global) {
  "use strict";

  var started = false;
  // Literal deployable paths are the bootstrap's public-artifact dependency
  // manifest. Runtime query strings are added separately for cache control.
  var publicArtifactDependencies = {
    supabaseConfig: "/content/site/supabase-config.js",
    residentCardContract: "/content/site/resident-card-contract-v1.js",
    identityClient: "/content/site/identity-client-v1.js",
    accountRuntime: "/content/site/resident-account-runtime-v1.js",
    continuation: "/content/site/resident-continuation-v1.js"
  };
  var scripts = [
    {
      src: publicArtifactDependencies.supabaseConfig + "?v=20260702-1",
      ready: function () { return !!global.LAIDIES_SUPABASE_CONFIG; }
    },
    {
      src: publicArtifactDependencies.residentCardContract + "?v=20260726-repair-1",
      ready: function () { return !!global.LAIDIESResidentCard; }
    },
    {
      src: publicArtifactDependencies.identityClient + "?v=20260729-continuation-1",
      ready: function () { return !!global.LAIDIESIdentityV1; }
    },
    {
      src: publicArtifactDependencies.accountRuntime + "?v=20260729-continuation-1",
      ready: function () { return !!global.LAIDIESResidentAccountRuntime; }
    },
    {
      src: publicArtifactDependencies.continuation + "?v=20260729-continuation-1",
      ready: function () { return !!global.LAIDIESResidentContinuationV1; }
    }
  ];

  function ensureScript(spec) {
    if (spec.ready()) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var existing = [].slice.call(document.scripts).find(function (script) {
        return script.src && new URL(script.src, global.location.href).pathname ===
          new URL(spec.src, global.location.href).pathname;
      });
      var script = existing || document.createElement("script");
      var settled = false;
      function finish(error) {
        if (settled) return;
        settled = true;
        if (error || !spec.ready()) {
          reject(error || new Error("continuation-dependency-unavailable"));
        } else {
          resolve();
        }
      }
      script.addEventListener("load", function () { finish(); }, { once: true });
      script.addEventListener("error", function () {
        finish(new Error("continuation-dependency-load-failed"));
      }, { once: true });
      if (!existing) {
        script.src = spec.src;
        script.async = false;
        document.head.appendChild(script);
      } else {
        global.setTimeout(function () {
          if (spec.ready()) finish();
        }, 0);
      }
    });
  }

  async function start() {
    if (started) return;
    started = true;
    try {
      for (var i = 0; i < scripts.length; i += 1) {
        await ensureScript(scripts[i]);
      }
      var runtime = await global.LAIDIESResidentAccountRuntime.get();
      global.LAIDIESResidentContinuationV1.startAutoSync(runtime);
      global.dispatchEvent(new CustomEvent("laidies:continuation-ready", {
        detail: {
          target: global.LAIDIESResidentContinuationV1.resumeTarget()
        }
      }));
    } catch (error) {
      started = false;
      global.dispatchEvent(new CustomEvent("laidies:continuation-unavailable", {
        detail: { reason: String(error && error.message || "unavailable") }
      }));
    }
  }

  global.LAIDIESResidentContinuationBootstrapV1 = Object.freeze({
    start: start
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})(window);
