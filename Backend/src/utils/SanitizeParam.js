export const sanitizeParam = (param) => {
  if (!param) return "";
  let clean = String(param).trim();
  // Strip double or single quotes if passed in URL query e.g. status="active"
  if (
    (clean.startsWith('"') && clean.endsWith('"')) ||
    (clean.startsWith("'") && clean.endsWith("'"))
  ) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
};