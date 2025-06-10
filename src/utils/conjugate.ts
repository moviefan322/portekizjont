// Portuguese Verb Conjugator - Pretérito Perfeito

const irregularVerbs: Record<string, Record<string, Record<string, string>>> = {
  "ser": {
    "preterito_perfeito": {
      "eu": "fui",
      "você": "foi",
      "ele": "foi",
      "ela": "foi",
      "nós": "fomos",
      "vocês": "foram",
      "eles": "foram",
      "elas": "foram"
    }
  },
  "ter": {
    "preterito_perfeito": {
      "eu": "tive",
      "você": "teve",
      "ele": "teve",
      "ela": "teve",
      "nós": "tivemos",
      "vocês": "tiveram",
      "eles": "tiveram",
      "elas": "tiveram"
    }
  }
  // Add more irregular verbs here
};

const regularEndings: Record<string, Record<string, Record<string, string>>> = {
  "preterito_perfeito": {
    "ar": {
      "eu": "ei",
      "você": "ou",
      "ele": "ou",
      "ela": "ou",
      "nós": "amos",
      "vocês": "aram",
      "eles": "aram",
      "elas": "aram"
    },
    "er": {
      "eu": "i",
      "você": "eu",
      "ele": "eu",
      "ela": "eu",
      "nós": "emos",
      "vocês": "eram",
      "eles": "eram",
      "elas": "eram"
    },
    "ir": {
      "eu": "i",
      "você": "iu",
      "ele": "iu",
      "ela": "iu",
      "nós": "imos",
      "vocês": "iram",
      "eles": "iram",
      "elas": "iram"
    }
  }
};

export function detectGroup(verb: string): string | null {
  if (verb.endsWith("ar")) return "ar";
  if (verb.endsWith("er")) return "er";
  if (verb.endsWith("ir")) return "ir";
  return null;
}

export function conjugate(verb: string, subject: string, tense: string = "preterito_perfeito"): string | null {
  if (irregularVerbs[verb]?.[tense]?.[subject]) {
    return irregularVerbs[verb][tense][subject];
  }

  const group = detectGroup(verb);
  if (!group) return null;

  const endings = regularEndings[tense]?.[group];
  if (!endings || !endings[subject]) return null;

  const stem = verb.slice(0, -2);
  return stem + endings[subject];
}
