import { irregularVerbs } from '@/data/irregularVerbs'
import { regularEndings } from '@/data/regularEndings'
import { reflexiveVerbs, reflexivePronouns } from '@/data/reflexive'

export function detectGroup(verb: string): string | null {
  if (verb.endsWith('ar')) return 'ar'
  if (verb.endsWith('er')) return 'er'
  if (verb.endsWith('ir')) return 'ir'
  return null
}

export function conjugate(
  verb: string,
  subject: string,
  tense: string = 'preterito_perfeito',
  reflexiveOverride: boolean = false
): string | null {
  let conjugatedVerb: string | null = null

  // Check for irregular verbs first
  if (irregularVerbs[verb]?.[tense]?.[subject]) {
    conjugatedVerb = irregularVerbs[verb][tense][subject]
  } else {
    // Handle regular verbs
    const group = detectGroup(verb)
    if (!group) return null

    const endings = regularEndings[tense]?.[group]
    if (!endings || !endings[subject]) return null

    const stem = verb.slice(0, -2)
    conjugatedVerb = stem + endings[subject]
  }

  // Add reflexive pronoun if verb is reflexive
  if (!reflexiveOverride && reflexiveVerbs.has(verb) && conjugatedVerb) {
    const reflexivePronoun = reflexivePronouns[subject]
    return `${reflexivePronoun} ${conjugatedVerb}`
  }

  return conjugatedVerb
}
