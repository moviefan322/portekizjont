// Portuguese Noun Pluralization

// Irregular plurals that don't follow standard rules
const irregularPlurals: Record<string, string> = {
  // Common irregularities
  correios: 'correios', // already plural
  óculos: 'óculos', // already plural
  pêsames: 'pêsames', // already plural

  // Some -ão words (these are unpredictable)
  alemão: 'alemães',
  capitão: 'capitães',
  escrivão: 'escrivães',
  pão: 'pães',
  cão: 'cães',
  mão: 'mãos',
  irmão: 'irmãos',
  cidadão: 'cidadãos',
  órgão: 'órgãos',

  // Other common irregularities
  qualquer: 'quaisquer',
  mal: 'males',
  cônsul: 'cônsules',
  caráter: 'caracteres',
  sênior: 'seniores',
  júnior: 'juniores',
  hospital: 'hospitais',
  hotel: 'hoteis',
  estação: 'estações',
}

/**
 * Converts a Portuguese noun to its plural form
 * @param noun The singular noun to pluralize
 * @returns The plural form of the noun
 */
export function pluralizeNoun(noun: string): string {
  // Check irregular plurals first
  if (irregularPlurals[noun]) {
    return irregularPlurals[noun]
  }

  // Apply regular rules based on word endings

  // Rule 1: Words ending in vowels (a, e, i, o, u) - add 's'
  if (/[aeiou]$/.test(noun)) {
    return noun + 's'
  }

  // Rule 2: Words ending in -m - change to -ns
  if (noun.endsWith('m')) {
    return noun.slice(0, -1) + 'ns'
  }

  // Rule 3: Words ending in -r, -s (not after vowel), -z - add 'es'
  if (/[rsz]$/.test(noun)) {
    // Special case: words already ending in -s after vowel are usually already plural
    if (noun.endsWith('s') && /[aeiou]s$/.test(noun)) {
      return noun // likely already plural
    }
    return noun + 'es'
  }

  // Rule 4: Words ending in -n - add 's' (rare in Portuguese)
  if (noun.endsWith('n')) {
    return noun + 's'
  }

  // Rule 5: Words ending in -l
  if (noun.endsWith('l')) {
    // -al, -el, -il, -ol, -ul → -ais, -éis, -is, -óis, -uis
    if (noun.endsWith('al')) {
      return noun.slice(0, -2) + 'ais'
    }
    if (noun.endsWith('el')) {
      return noun.slice(0, -2) + 'éis'
    }
    if (noun.endsWith('il')) {
      // Check if it's stressed on the last syllable
      // For simplicity, we'll assume it follows the -is pattern
      return noun.slice(0, -2) + 'is'
    }
    if (noun.endsWith('ol')) {
      return noun.slice(0, -2) + 'óis'
    }
    if (noun.endsWith('ul')) {
      return noun.slice(0, -2) + 'uis'
    }
  }

  // Rule 6: Words ending in -ão
  if (noun.endsWith('ão')) {
    // This is the tricky one - three possible patterns:
    // Default to -ões (most common for newer words)
    // Note: In practice, you need to memorize these or check a dictionary
    return noun.slice(0, -2) + 'ões'
  }

  // Rule 7: Words ending in consonant clusters or other patterns
  // Most other cases just add 's'
  return noun + 's'
}

/**
 * Checks if a word is likely already in plural form
 * @param word The word to check
 * @returns True if the word appears to be plural
 */
export function isLikelyPlural(word: string): boolean {
  // Words ending in 's' after vowel are often plural
  if (/[aeiou]s$/.test(word)) {
    return true
  }

  // Words ending in -ns are often plural
  if (word.endsWith('ns')) {
    return true
  }

  // Words ending in -ães, -ões, -ãos are plural forms of -ão words
  if (/ães$|ões$|ãos$/.test(word)) {
    return true
  }

  // Words ending in -ais, -éis, -is, -óis, -uis are often plural
  if (/ais$|éis$|is$|óis$|uis$/.test(word)) {
    return true
  }

  // Known plural-only words
  const pluralOnlyWords = ['correios', 'óculos', 'pêsames', 'costas', 'parabéns']
  if (pluralOnlyWords.includes(word)) {
    return true
  }

  return false
}

/**
 * Add a new irregular plural to the list
 * @param singular The singular form
 * @param plural The irregular plural form
 */
export function addIrregularPlural(singular: string, plural: string): void {
  irregularPlurals[singular] = plural
}

/**
 * Get all irregular plurals (for reference or debugging)
 * @returns Copy of the irregular plurals object
 */
export function getIrregularPlurals(): Record<string, string> {
  return { ...irregularPlurals }
}
