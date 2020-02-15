const acceptedPronouns = ["i", "you", "he/she/it", "you(pl)", "we", "they"];

export class LanguageData {
  constructor(params) {
    if (!params.english) throw new Error("english is required");
    if (!params.target) throw new Error("target is required");
    if (params.length === undefined) throw new Error("length is required");
    if (!params.tenses) throw new Error("tenses is required");
    if (!params.pronouns) throw new Error("pronouns is required");
    if (!params.verbType) throw new Error("verbType is required");

    this.params = params;
    this.pronouns = params.pronouns.map(p => p.toLowerCase());
    this.pronounOptions = this.pronouns.filter(p => {
      return acceptedPronouns.includes(p.toLowerCase());
    });
    this.verbs = params.target.verbs.basic;
    this.verbs = this.verbs.filter(v => {
      if (!supportsSuitablePronouns(v, this.pronounOptions)) return false;
      else {
        if (params.verbType === "all") return true;
        if (params.verbType === "irregular" && v.type.includes("irregular")) {
          return true;
        } else if (params.verbType === "common" && v.type.includes("common")) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.tenseOptions = Object.keys(this.verbs[0].conjugations).filter(c => {
      return params.tenses.includes(c);
    });
  }

  getNextQuestion() {
    // choose a verb at random
    const v = this.verbs[Math.floor(Math.random() * this.verbs.length)];

    // choose a pronoun index at random, out of the available options
    const pronounIndex = choosePronoun(v, this.pronounOptions);

    const isReflexive = v.type.includes("reflexive");

    // Some verbs have more than 1 translation so we get any one of them
    const translationIndex = Math.floor(Math.random() * v.translations.length);
    const translationChoice = v.translations[translationIndex];

    // If the verb is phrasal such as "to be born" or "to go up",
    // we use the main verb as the verb which we conjugate, and then
    // add on the "extra words" such as "up" later on
    const isPhrasal = translationChoice.match(/([a-z\s]+)\(\+[a-z\s]+\)/);
    const phrasalRoot = isPhrasal ? isPhrasal[1] : null;
    const extraWords = isPhrasal
      ? translationChoice.match(/\(\+([a-z\s]+)\)/)[1]
      : null;

    // choose a conjugation at random
    const c = this.tenseOptions[
      Math.floor(Math.random() * this.tenseOptions.length)
    ];

    // crete start, correct and original
    const translation = isPhrasal ? phrasalRoot : translationChoice;
    const engVerb = this.params.english.verbs.basic[translation];
    const engPronoun = getEngPronoun(
      this.params.english.pronouns[pronounIndex],
      v
    );
    let engCorrect;
    if (c === "present") {
      engCorrect = engVerb.present[pronounIndex];
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    } else if (c === "future") {
      engCorrect = `will ${engVerb.root}`;
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    } else if (c === "conditional") {
      engCorrect = `would ${engVerb.root}`;
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    } else if (c === "preterite" || c === "imperfect") {
      engCorrect = engVerb.preterite[pronounIndex];
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    }
    const original = `${engPronoun} ${engCorrect} (${c})`;
    const start = getStartPronoun(this.params.target.pronouns[pronounIndex], v);
    const correct = v.conjugations[c][pronounIndex];
    return {
      start,
      original,
      correct,
      infinitive: v.infinitive,
      isReflexive
    };
  }
}

/**
 * Receives a Spanish verb and responds with a pronoun index to use,
 * based on which pronouns this particular verb conjugates for
 * For example, llover would only ever return a pronoun index of 2
 * for third person singular
 * Returns null if the given verb does not support the listed pronouns
 * @param {Object} verb
 * @param {Array} pronounOptions
 * @return {Number|Null}
 */
export function choosePronoun(verb, pronounOptions) {
  pronounOptions = pronounOptions.map(p => p.toLowerCase());
  const availablePronouns = verb.conjugations.present
    .map((p, i) => ({ i, pronoun: acceptedPronouns[i], isNull: p === null }))
    .filter(p => !p.isNull && pronounOptions.includes(p.pronoun))
    .map(p => p.i);

  const res =
    availablePronouns[Math.floor(Math.random() * availablePronouns.length)];
  return res === undefined ? null : res;
}

/**
 * When given a pronoun, will check against the verb whether it should return "it"
 * or the original pronoun e.g. he/she, they, we, you
 * @param {String} pronoun
 * @param {Object} verb
 * @return {String}
 */
function getEngPronoun(pronoun, verb) {
  if (pronoun !== "he/she") return pronoun;
  else {
    // Is it a "third-person only" verb?
    const isThirdPersonOnly =
      verb.conjugations.present.filter(e => e === null).length >= 4;
    if (isThirdPersonOnly) {
      return "it";
    } else {
      return pronoun;
    }
  }
}

/**
 * When given a pronoun, will check against the verb whether it should return ""
 * or the original pronoun e.g. él/ella, nosotros
 * @param {String} pronoun
 * @param {Object} verb
 * @return {String}
 */
function getStartPronoun(pronoun, verb) {
  const isThirdPersonOnly =
    verb.conjugations.present.filter(e => e === null).length >= 4;
  if (isThirdPersonOnly && pronoun === "él/ella") {
    return "";
  } else {
    return pronoun;
  }
}

export function supportsSuitablePronouns(verb, pronounOptions) {
  const conjs = verb.conjugations.present;
  for (let i = 0; i < pronounOptions.length; i++) {
    const pronounIndex = acceptedPronouns.indexOf(pronounOptions[i]);
    if (conjs[pronounIndex] !== null) return true;
  }

  return false;
}
