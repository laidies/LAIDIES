export function missingMaterialQuestion(prompt) {
  const text = String(prompt || "").toLowerCase();
  if (!/\b(?:this|the)\s+(?:sentence|message|rule|policy|document|contract|invoice|note|text)\b/.test(text)) return null;
  return "Please paste or describe the exact material you want help understanding, with names and confidential details removed.";
}
