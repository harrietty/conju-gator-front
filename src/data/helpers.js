export function generateSet(params) {
  if (!params.english) throw new Error("english is required");
  if (!params.target) throw new Error("target is required");
  if (params.length === undefined) throw new Error("length is required");
  if (!params.tenses) throw new Error("tenses is required");
  const verbs = params.target.verbs.basic;
  const conjugations = Object.keys(verbs[0].conjugations);
  const pronouns = params.target.pronouns;

  const set = [];
  for (let i = 0; i < params.length; i++) {
    // choose a verb at random
    const v = verbs[Math.floor(Math.random() * verbs.length)];
    // choose a conjugation at random
    const c = conjugations[Math.floor(Math.random() * conjugations.length)];
    // choose a pronoun index at random
    const pronounIndex = Math.floor(Math.random() * pronouns.length);

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
