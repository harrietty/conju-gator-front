export function generateSet(params) {
  if (!params.english) throw new Error("english is required");
  if (!params.target) throw new Error("target is required");
  if (params.length === undefined) throw new Error("length is required");
  if (!params.tenses) throw new Error("tenses is required");
  const verbs = params.target.verbs.basic;
  const tenseOptions = Object.keys(verbs[0].conjugations).filter(c => {
    return params.tenses.includes(c);
  });
  const pronouns = params.target.pronouns;

  const set = [];
  for (let i = 0; i < params.length; i++) {
    // choose a verb at random
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    // choose a conjugation at random
    const c = tenseOptions[Math.floor(Math.random() * tenseOptions.length)];
    // choose a pronoun index at random, , out of the available options
    const pronounIndex = choosePronoun(v, pronouns);

    // crete start, correct and original
    const engVerb = params.english.verbs.basic[v.translation];
    const engPronoun = params.english.pronouns[pronounIndex];
    let engCorrect;
    if (c === "present") {
      engCorrect = engVerb.present[pronounIndex];
    } else if (c === "future") {
      engCorrect = `will ${engVerb.root}`;
    } else if (c === "conditional") {
      engCorrect = `would ${engVerb.root}`;
    } else if (c === "preterite") {
      engCorrect = engVerb.preterite[pronounIndex];
    } else if (c === "imperfect") {
      engCorrect = `${getImperfectToBe(engPronoun)} ${
        engVerb.present_participle
      }`;
    }
    const original = `${engPronoun} ${engCorrect} (${c})`;
    const start = params.target.pronouns[pronounIndex];
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
