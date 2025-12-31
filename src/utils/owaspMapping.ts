/**
 * OWASP Vulnerability Category Mapping
 * Maps backend vulnerability types to OWASP Top 10 categories
 * Only covers: SQL Injection, XSS, Hardcoded Secrets
 */

export type OWASPCategory = 'SQL Injection' | 'XSS' | 'Hardcoded Secrets' | null;

/**
 * Maps vulnerability type from backend to OWASP category
 * Returns null if type doesn't match known OWASP categories
 */
export const mapToOWASPCategory = (vulnerabilityType: string): OWASPCategory => {
  const type = vulnerabilityType.toLowerCase().trim();

  // SQL Injection patterns
  if (
    type.includes('sql') ||
    type.includes('injection') ||
    type.includes('sqli') ||
    type.includes('database injection')
  ) {
    return 'SQL Injection';
  }

  // XSS patterns
  if (
    type.includes('xss') ||
    type.includes('cross-site scripting') ||
    type.includes('script injection') ||
    type.includes('dom-based xss') ||
    type.includes('stored xss') ||
    type.includes('reflected xss')
  ) {
    return 'XSS';
  }

  // Hardcoded Secrets patterns
  if (
    type.includes('hardcoded') ||
    type.includes('secret') ||
    type.includes('credential') ||
    type.includes('password') ||
    type.includes('api key') ||
    type.includes('apikey') ||
    type.includes('token') ||
    type.includes('private key')
  ) {
    return 'Hardcoded Secrets';
  }

  // Unknown type - return null (don't show OWASP category)
  return null;
};

