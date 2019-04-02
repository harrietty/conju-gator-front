export function generateSet(params) {
  if (!params.source) throw new Error("source is required");
  if (!params.target) throw new Error("target is required");
  if (params.length === undefined) throw new Error("length is required");
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
    const engVerb = params.source.verbs.basic[v.translation];
    const engPronoun = params.source.pronouns[pronounIndex];
    const original = `${engPronoun} ${
      engVerb.conjugations[c][pronounIndex]
    } (${c})`;
    const start = params.target.pronouns[pronounIndex];
    const correct = v.conjugations[c][pronounIndex];
    set.push({
      start,
      original,
      correct
    });
  }
  return set;
}
