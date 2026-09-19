(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.NewsstandSelection = api;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";
  // Reviewed September 19. Newest Vancouver date first; relevance within each day.
  var order = [
  "ai-research-automation-20260919",
  "anthropic-lsvp-beta-20260917",
  "openai-misalignment-reporting-20260916",
  "claude-cowork-merge-20260916",
  "rathat-android-20260916",
  "chatgpt-sponsored-agents-20260916",
  "mathematicians-ai-research-values-20260916",
  "china-amodei-response-20260915",
  "gemini-live-38-20260915",
  "congress-ai-oversight-response-20260915",
  "microsoft-aft-school-privacy-20260915",
  "census-ai-graduates-20260915",
  "gates-ai-access-pledge-20260915",
  "zai-self-training-financing-plan-20260915",
  "microsoft-humanist-code-20260915",
  "rubygems-agent-attribution-20260915",
  "trump-ai-guardrails-response-20260914",
  "brain-implant-speech-gestures-20260914",
  "protein-data-20260914",
  "trump-ai-safeguards-20260913",
  "take-it-down-sentencing-20260910",
  "anthropic-threat-report-20260910",
  "amodei-ai-pacing-20260912",
  "california-chatbot-law-20260910",
  "nyc-school-ai-20260911",
  "senate-hugging-face-inquiry-20260910",
  "epa-public-participation-20260911",
  "national-safety-proposals-20260911",
  "wiser-records-20260910",
  "coxon-warning-20260910",
  "agent-web-tracing-20260911",
  "cisa-distillation-20260910",
  "papercut-campaign-20260911",
  "microsoft-capacity-20260912",
  "nvidia-groq-inquiry-20260912",
  "pro-signup-pause-20260912",
  "chatgpt-images-2-5-2026-09-08",
  "gemini-windows-20260913",
  "chatgpt-pets-20260913",
  "microsoft-family-safety-20260911",
  "gpt-live-downstream-20260911",
  "meta-muse-20260911",
  "askca-pilot-20260911",
  "deepseek-flash-20260912",
  "alphagenome-atlas-20260912",
  "crisp-pathology-20260912",
  "navier-stokes-claim-20260911",
  "cursor-projects-20260912",
  "openai-data-agent-20260910",
  "agents-api-20260911",
  "honeybook-plugin-20260912"
];
  function day(story) {
    var value = String(story.publishedAt || "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    var instant = new Date(value);
    return isNaN(instant) ? "" : new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit"
    }).format(instant);
  }
  function compare(a, b) {
    var dateOrder = day(b).localeCompare(day(a));
    if (dateOrder) return dateOrder;
    var ai = order.indexOf(a.id), bi = order.indexOf(b.id);
    return (ai < 0 ? 10000 : ai) - (bi < 0 ? 10000 : bi) ||
      String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")) ||
      String(a.id).localeCompare(String(b.id));
  }
  function assertReviewed(stories) {
    if (new Set(order).size !== order.length) throw new Error("Duplicate NewsStand editorial placement");
    stories.forEach(function (story) {
      if (story.edition === "daily" && order.indexOf(story.id) < 0)
        throw new Error("NewsStand reader relevance and placement required before release: " + story.id);
    });
  }
  return { compare: compare, assertReviewed: assertReviewed };
});
