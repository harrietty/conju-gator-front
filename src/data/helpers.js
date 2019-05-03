export function generateSet(params) {
  if (!params.english) throw new Error("english is required");
  if (!params.target) throw new Error("target is required");
  if (params.length === undefined) throw new Error("length is required");
  if (!params.tenses) throw new Error("tenses is required");
  if (!params.verbType) throw new Error("verbType is required");

  let verbs = params.target.verbs.basic;
  if (params.verbType !== "all") {
    verbs = verbs.filter(v => {
      if (params.verbType === "irregular" && v.type.includes("irregular")) {
        return true;
      } else if (params.verbType === "common" && v.type.includes("common")) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Remove any nonsensical tenses
  const tenseOptions = Object.keys(verbs[0].conjugations).filter(c => {
    return params.tenses.includes(c);
  });

  const pronouns = params.target.pronouns;

  const set = [];
  for (let i = 0; i < params.length; i++) {
    // choose a verb at random
    const v = verbs[Math.floor(Math.random() * verbs.length)];

    // If the verb is phrasal such as "to be born" or "to go up",
    // we use the main verb as the verb which we conjugate, and then
    // add on the "extra words" such as "up" later on
    const isPhrasal = v.translation.match(/([a-z\s]+)\(\+[a-z\s]+\)/);
    const phrasalRoot = isPhrasal ? isPhrasal[1] : null;
    const extraWords = isPhrasal
      ? v.translation.match(/\(\+([a-z\s]+)\)/)[1]
      : null;

    // choose a conjugation at random
    const c = tenseOptions[Math.floor(Math.random() * tenseOptions.length)];
    // choose a pronoun index at random, , out of the available options
    const pronounIndex = choosePronoun(v, pronouns);

    // crete start, correct and original
    const translation = isPhrasal ? phrasalRoot : v.translation;
    const engVerb = params.english.verbs.basic[translation];
    const engPronoun = getEngPronoun(params.english.pronouns[pronounIndex], v);
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
    } else if (c === "preterite") {
      engCorrect = engVerb.preterite[pronounIndex];
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    } else if (c === "imperfect") {
      engCorrect = `${getImperfectToBe(engPronoun)} ${
        engVerb.present_participle
      }`;
      if (isPhrasal) engCorrect += ` ${extraWords}`;
    }
    const original = `${engPronoun} ${engCorrect} (${c})`;
    const start = getStartPronoun(params.target.pronouns[pronounIndex], v);
    const correct = v.conjugations[c][pronounIndex];
    set.push({
      start,
      original,
      correct,
      infinitive: v.infinitive
    });
  }
  return set;
}

function getImperfectToBe(pronoun) {
  return {
    I: "was",
    you: "were",
    "he/she": "was",
    we: "were",
    "you (pl)": "were",
    they: "were"
  }[pronoun];
}

/**
 * Receives a Spanish verb and responds with a pronoun index to use,
 * based on which pronouns this particular verb conjugates for
 * For example, llover would only ever return a pronoun index of 2
 * for third person singular
 * @param {Object} verb
 * @return {Number}
 */
export function choosePronoun(verb) {
  const availablePronouns = verb.conjugations.present
    .map((p, i) => ({ i, pronoun: p }))
    .filter(p => p.pronoun)
    .map(p => p.i);

  return availablePronouns[
    Math.floor(Math.random() * availablePronouns.length)
  ];
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
