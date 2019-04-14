import { generateSet, choosePronoun } from "../../src/data/helpers";

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

const spanishDataThirdPerson = {
  pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
  verbs: {
    basic: [
      {
        infinitive: "occurrir",
        translation: "to occur/to happen",
        conjugations: {
          present: [null, null, "ocurre", null, null, "ocurren"],
          preterite: [null, null, "ocurrió", null, null, "ocurrieron"],
          imperfect: [null, null, "ocurría", null, null, "ocurrían"],
          conditional: [null, null, "ocurriría", null, null, "ocurrirían"],
          future: [null, null, "ocurrirá", null, null, "ocurrirán"]
        }
      },
      {
        infinitive: "llover",
        translation: "to rain",
        conjugations: {
          present: [null, null, "llueve", null, null, null],
          preterite: [null, null, "llovió", null, null, null],
          imperfect: [null, null, "llovía", null, null, null],
          conditional: [null, null, "llovería", null, null, null],
          future: [null, null, "lloverá", null, null, null]
        }
      }
    ]
  }
};

const englishDataThirdPerson = {
  pronouns: ["I", "you", "he/she", "we", "you (pl)", "they"],
  verbs: {
    basic: {
      "to rain": {
        present: [null, null, "rains", null, null, null],
        preterite: [null, null, "rained", null, null, null],
        present_participle: "raining",
        past_participle: "rained",
        root: "rain"
      },
      "to occur/to happen": {
        present: [null, null, "occurs", null, null, "occur"],
        preterite: [null, null, "occurred", null, null, "occurred"],
        present_participle: "occurring",
        past_participle: "occurred",
        root: "occur"
      }
    }
  }
};

describe("choosePronoun", () => {
  test("returns any random prounoun when given a verb that supports all pronouns", () => {
    const verb = {
      infinitive: "intentar",
      translation: "to try",
      conjugations: {
        present: [
          "intento",
          "intentas",
          "intenta",
          "intentamos",
          "intentáis",
          "intentan"
        ],
        preterite: [
          "intenté",
          "intentaste",
          "intentó",
          "intentamos",
          "intentasteis",
          "intentaron"
        ],
        imperfect: [
          "intentaba",
          "intentabas",
          "intentaba",
          "intentábamos",
          "intentabais",
          "intentaban"
        ],
        conditional: [
          "intentaría",
          "intentarías",
          "intentaría",
          "intentaríamos",
          "intentaríais",
          "intentarían"
        ],
        future: [
          "intentaré",
          "intentarás",
          "intentará",
          "intentaremos",
          "intentaréis",
          "intentarán"
        ]
      }
    };
    const foundPronounIndices = [];
    new Array(100).fill(1).forEach(_ => {
      foundPronounIndices.push(choosePronoun(verb));
    });
    expect(foundPronounIndices).toContain(1);
    expect(foundPronounIndices).toContain(1);
    expect(foundPronounIndices).toContain(2);
    expect(foundPronounIndices).toContain(3);
    expect(foundPronounIndices).toContain(4);
    expect(foundPronounIndices).toContain(5);
  });

  test("returns only a supported pronoun index for a verb such as llover", () => {
    const verb = {
      infinitive: "llover",
      translation: "to rain",
      conjugations: {
        present: [null, null, "llueve", null, null, null],
        preterite: [null, null, "llovió", null, null, null],
        imperfect: [null, null, "llovía", null, null, null],
        conditional: [null, null, "llovería", null, null, null],
        future: [null, null, "lloverá", null, null, null]
      }
    };
    new Array(30).fill(1).forEach(_ => {
      expect(choosePronoun(verb)).toBe(2);
    });

    const verb2 = {
      infinitive: "occurrir",
      translation: "to occur/to happen",
      conjugations: {
        present: [null, null, "ocurre", null, null, "ocurren"],
        preterite: [null, null, "ocurrió", null, null, "ocurrieron"],
        imperfect: [null, null, "ocurría", null, null, "ocurrían"],
        conditional: [null, null, "ocurriría", null, null, "ocurrirían"],
        future: [null, null, "ocurrirá", null, null, "ocurrirán"]
      }
    };
    const foundPronounIndices = [];
    new Array(30).fill(1).forEach(_ => {
      foundPronounIndices.push(choosePronoun(verb2));
    });
    expect(foundPronounIndices).toContain(2);
    expect(foundPronounIndices).toContain(5);
    expect(foundPronounIndices).not.toContain(0);
    expect(foundPronounIndices).not.toContain(1);
    expect(foundPronounIndices).not.toContain(3);
    expect(foundPronounIndices).not.toContain(4);
  });
});

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

  test("returns only the correct conjugations for third-person-only verbs", () => {
    const result = generateSet({
      english: englishDataThirdPerson,
      target: spanishDataThirdPerson,
      length: 3,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"]
    });

    expect(result).toHaveLength(3);
    result.forEach(r => {
      expect(typeof r.start).toBe("string");
      expect(typeof r.correct).toBe("string");
      expect(typeof r.original).toBe("string");
      expect(typeof r.infinitive).toBe("string");
    });
  });

  test("returns the pronoun 'it' for third-person only verbs", () => {
    const result = generateSet({
      english: englishDataThirdPerson,
      target: spanishDataThirdPerson,
      length: 50,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"]
    });

    // Llover should be "it"
    // Ocurrir could be "it" or "they"
    result.forEach(r => {
      if (r.infinitive === "llover") {
        expect(r.original.split(" ")[0]).toBe("it");
        // In Spanish we would not use the pronoun for "it"
        expect(r.start).toBe("");
      } else if (r.infinitive === "ocurrir") {
        expect(["it", "they"]).toContain(r.original.split(" ")[0]);
        expect(["they", ""]).toContain(r.start);
      }
    });
  });

  test("returns the correct data for verbs with a 'to be' root such as 'to be born'", () => {
    const engData = {
      pronouns: ["I", "you", "he/she", "we", "you", "they"],
      verbs: {
        basic: {
          "to be": {
            present: ["am", "are", "is", "are", "are", "are"],
            preterite: ["was", "were", "was", "were", "were", "were"],
            present_participle: "being",
            past_participle: "been",
            root: "be"
          }
        }
      }
    };
    const spanData = {
      pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
      verbs: {
        basic: [
          {
            infinitive: "nacer",
            translation: "to be(+born)",
            conjugations: {
              present: ["nazco", "naces", "nace", "nacemos", "nacéis", "nacen"],
              preterite: [
                "nací",
                "naciste",
                "nació",
                "nacimos",
                "nacisteis",
                "nacieron"
              ],
              imperfect: [
                "nacía",
                "nacías",
                "nacía",
                "nacíamos",
                "nacíais",
                "nacían"
              ],
              conditional: [
                "nacería",
                "nacerías",
                "nacería",
                "naceríamos",
                "naceríais",
                "nacerían"
              ],
              future: [
                "naceré",
                "nacerás",
                "nacerá",
                "naceremos",
                "naceréis",
                "nacerán"
              ]
            }
          }
        ]
      }
    };

    const result = generateSet({
      english: engData,
      target: spanData,
      length: 50,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"]
    });

    result.forEach(r => {
      expect(r.original).toContain("born");
    });
  });
});
