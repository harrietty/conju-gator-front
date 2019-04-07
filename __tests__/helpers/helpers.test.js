import { generateSet } from "../../src/data/helpers";

const spanishData = {
  pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
  verbs: {
    basic: [
      {
        infinitive: "tener",
        translation: "to have",
        conjugations: {
          present: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
          preterite: [
            "tuve",
            "tuviste",
            "tuvo",
            "tuvimos",
            "tuvisteis",
            "tuvieron"
          ],
          imperfect: [
            "tenía",
            "tenías",
            "tenía",
            "teníamos",
            "teníais",
            "tenían"
          ],
          conditional: [
            "tendría",
            "tendrías",
            "tendría",
            "tendríamos",
            "tendríais",
            "tendrían"
          ],
          future: [
            "tendré",
            "tendrás",
            "tendrá",
            "tendremos",
            "tendréis",
            "tendrán"
          ]
        }
      }
    ]
  }
};

const englishData = {
  pronouns: ["I", "you", "he/she", "we", "you (pl)", "they"],
  verbs: {
    basic: {
      "to have": {
        present: ["have", "have", "has", "have", "have", "have"],
        preterite: ["had", "had", "had", "had", "had", "had"],
        present_participle: "having",
        past_participle: "had",
        root: "have"
      }
    }
  }
};

describe("generateSet", () => {
  test("returns the correctly formatted question set", () => {
    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 3,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"]
    });

    expect(result).toHaveLength(3);
    expect(result[0]).toHaveProperty("start");
    expect(result[0]).toHaveProperty("correct");
    expect(result[0]).toHaveProperty("original");
    expect(result[0]).toHaveProperty("infinitive");
  });
});
