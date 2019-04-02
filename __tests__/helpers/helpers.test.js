import { generateSet } from "../../src/data/helpers";

const spanishData = {
  pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
  verbs: {
    basic: [
      {
        infinitive: "amar",
        translation: "to love",
        conjugations: {
          present: ["amo", "amas", "ama", "amamos", "amáis", "aman"],
          imperfect: ["amaba", "amabas", "amábamos", "amabais", "amaban"],
          preterite: ["amé", "amaste", "amó", "amamos", "amasteis", "amaron"],
          future: ["amaré", "amarás", "amará", "amaremos", "amaréis", "amarán"],
          conditional: [
            "amaría",
            "amarías",
            "amaría",
            "amaríamos",
            "amaríais",
            "amarían"
          ]
        }
      }
    ]
  }
};

const englishData = {
  pronouns: ["I", "you", "he/she", "we", "you", "they"],
  verbs: {
    basic: {
      "to love": {
        conjugations: {
          present: ["love", "love", "loves", "love", "love", "love"],
          imperfect: [
            "was loving",
            "were loving",
            "was loving",
            "were loving",
            "were loving",
            "were loving"
          ],
          preterite: ["loved", "loved", "loved", "loved", "loved", "loved"],
          future: [
            "will love",
            "will love",
            "will love",
            "will love",
            "will love",
            "will love"
          ],
          conditional: [
            "would love",
            "would love",
            "would love",
            "would love",
            "would love",
            "would love"
          ]
        }
      }
    }
  }
};

describe("generateSet", () => {
  test("returns the correctly formatted question set", () => {
    const result = generateSet({
      source: englishData,
      target: spanishData,
      length: 3
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("correct");
    expect(result[0]).toHaveProperty("original");
  });
});
