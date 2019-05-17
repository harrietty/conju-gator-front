import {
  generateSet,
  choosePronoun,
  supportsSuitablePronouns
} from "../../src/data/helpers";

const spanishData = {
  pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
  verbs: {
    basic: [
      {
        infinitive: "tener",
        translations: ["to have"],
        type: ["common", "irregular"],
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
        translations: ["to occur"],
        type: [],
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
        translations: ["to rain"],
        type: [],
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
      "to occur": {
        present: [null, null, "occurs", null, null, "occur"],
        preterite: [null, null, "occurred", null, null, "occurred"],
        present_participle: "occurring",
        past_participle: "occurred",
        root: "occur"
      }
    }
  }
};

describe("supportsSuitablePronouns", () => {
  const verb = {
    infinitive: "tener",
    translations: ["to have"],
    type: ["common", "irregular"],
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
      imperfect: ["tenía", "tenías", "tenía", "teníamos", "teníais", "tenían"],
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
  };

  it("returns true if the verb given has 1 or more required pronouns", () => {
    expect(supportsSuitablePronouns(verb, ["I"])).toBe(true);
    expect(supportsSuitablePronouns(verb, ["you"])).toBe(true);
    expect(supportsSuitablePronouns(verb, ["he/she/it"])).toBe(true);
    expect(supportsSuitablePronouns(verb, ["we"])).toBe(true);
    expect(supportsSuitablePronouns(verb, ["you(pl)"])).toBe(true);
    expect(supportsSuitablePronouns(verb, ["they"])).toBe(true);
  });
});

describe("choosePronoun", () => {
  const verb = {
    infinitive: "intentar",
    translations: ["to try"],
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
  test("returns any random prounoun when given a verb that supports all pronouns", () => {
    const pronounOptions = ["I", "you", "he/she/it", "you(pl)", "we", "they"];
    const foundPronounIndices = [];
    new Array(100).fill(1).forEach(_ => {
      foundPronounIndices.push(choosePronoun(verb, pronounOptions));
    });
    expect(foundPronounIndices).toContain(1);
    expect(foundPronounIndices).toContain(1);
    expect(foundPronounIndices).toContain(2);
    expect(foundPronounIndices).toContain(3);
    expect(foundPronounIndices).toContain(4);
    expect(foundPronounIndices).toContain(5);
  });

  test("returns only the index of the specified pronouns from options passed", () => {
    for (let i = 0; i < 30; i++) {
      expect(choosePronoun(verb, ["I"])).toBe(0);
    }

    for (let i = 0; i < 30; i++) {
      expect(choosePronoun(verb, ["he/she/it"])).toBe(2);
    }
  });

  test("returns only the correct indices if more than 1 pronoun given", () => {
    const res = [];
    for (let i = 0; i < 100; i++) {
      res.push(choosePronoun(verb, ["I", "you", "they"]));
    }
    expect(res).toContain(0);
    expect(res).toContain(1);
    expect(res).toContain(5);
    expect(res).not.toContain(2);
    expect(res).not.toContain(3);
    expect(res).not.toContain(4);
  });

  describe("With a verb such as llover or ocurrir", () => {
    const llover = {
      infinitive: "llover",
      translations: ["to rain"],
      conjugations: {
        present: [null, null, "llueve", null, null, null],
        preterite: [null, null, "llovió", null, null, null],
        imperfect: [null, null, "llovía", null, null, null],
        conditional: [null, null, "llovería", null, null, null],
        future: [null, null, "lloverá", null, null, null]
      }
    };

    const ocurrir = {
      infinitive: "ocurrir",
      translations: ["to occur"],
      conjugations: {
        present: [null, null, "ocurre", null, null, "ocurren"],
        preterite: [null, null, "ocurrió", null, null, "ocurrieron"],
        imperfect: [null, null, "ocurría", null, null, "ocurrían"],
        conditional: [null, null, "ocurriría", null, null, "ocurrirían"],
        future: [null, null, "ocurrirá", null, null, "ocurrirán"]
      }
    };

    test("returns only a supported pronoun index when all pronounOptions available", () => {
      const pronounOptions = ["I", "you", "he/she/it", "you(pl)", "we", "they"];

      new Array(30).fill(1).forEach(_ => {
        expect(choosePronoun(llover, pronounOptions)).toBe(2);
      });

      const foundPronounIndices = [];
      new Array(30).fill(1).forEach(_ => {
        foundPronounIndices.push(choosePronoun(ocurrir, pronounOptions));
      });
      expect(foundPronounIndices).toContain(2);
      expect(foundPronounIndices).toContain(5);
      expect(foundPronounIndices).not.toContain(0);
      expect(foundPronounIndices).not.toContain(1);
      expect(foundPronounIndices).not.toContain(3);
      expect(foundPronounIndices).not.toContain(4);
    });

    test("returns only a supported pronoun index when only 1 pronounOption available", () => {
      let pronounOptions = ["he/she/it"];

      new Array(30).fill(1).forEach(_ => {
        expect(choosePronoun(llover, pronounOptions)).toBe(2);
      });

      new Array(30).fill(1).forEach(_ => {
        expect(choosePronoun(ocurrir, pronounOptions)).toBe(2);
      });

      pronounOptions = ["he/she/it", "they"];

      new Array(30).fill(1).forEach(_ => {
        expect(choosePronoun(llover, pronounOptions)).toBe(2);
      });

      const foundPronounIndices = [];
      new Array(30).fill(1).forEach(_ => {
        foundPronounIndices.push(choosePronoun(ocurrir, pronounOptions));
      });
      expect(foundPronounIndices).toContain(2);
      expect(foundPronounIndices).toContain(5);
      expect(foundPronounIndices).not.toContain(0);
      expect(foundPronounIndices).not.toContain(1);
      expect(foundPronounIndices).not.toContain(3);
      expect(foundPronounIndices).not.toContain(4);
    });

    test("returns null if the verb does not support any of the pronounOptions", () => {
      const pronounOptions = ["you"];
      expect(choosePronoun(llover, pronounOptions)).toBe(null);
    });
  });
});

describe("generateSet", () => {
  test("returns the correctly formatted question set", () => {
    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 3,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
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
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
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
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
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
            translations: ["to be(+born)"],
            type: [],
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
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
    });

    result.forEach(r => {
      expect(r.original).toContain("born");
    });
  });

  test("selects only common verbs if type: common provided as param", () => {
    const spanishData = {
      pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
      verbs: {
        basic: [
          {
            infinitive: "tener",
            translations: ["to have"],
            type: ["common"],
            conjugations: {
              present: [
                "tengo",
                "tienes",
                "tiene",
                "tenemos",
                "tenéis",
                "tienen"
              ],
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
          },
          {
            infinitive: "oír",
            translations: ["to hear"],
            type: ["irregular"],
            conjugations: {
              present: ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
              preterite: ["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"],
              imperfect: ["oía", "oías", "oía", "oíamos", "oíais", "oían"],
              conditional: [
                "oiría",
                "oirías",
                "oiría",
                "oiríamos",
                "oiríais",
                "oirían"
              ],
              future: ["oiré", "oirás", "oirá", "oiremos", "oiréis", "oirán"]
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
          },
          "to hear": {
            present: ["hear", "hear", "hears", "hear", "hear", "hear"],
            preterite: ["heard", "heard", "heard", "heard", "heard", "heard"],
            present_participle: "hearing",
            past_participle: "heard",
            root: "hear"
          }
        }
      }
    };

    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 50,
      tenses: ["present"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "common"
    });

    result.forEach(r => {
      expect(r.infinitive).toBe("tener");
    });
  });

  test("selects only irregular verbs if type: irregular provided as param", () => {
    const spanishData = {
      pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
      verbs: {
        basic: [
          {
            infinitive: "tener",
            translations: ["to have"],
            type: ["common"],
            conjugations: {
              present: [
                "tengo",
                "tienes",
                "tiene",
                "tenemos",
                "tenéis",
                "tienen"
              ],
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
          },
          {
            infinitive: "oír",
            translations: ["to hear"],
            type: ["irregular"],
            conjugations: {
              present: ["oigo", "oyes", "oye", "oímos", "oís", "oyen"],
              preterite: ["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"],
              imperfect: ["oía", "oías", "oía", "oíamos", "oíais", "oían"],
              conditional: [
                "oiría",
                "oirías",
                "oiría",
                "oiríamos",
                "oiríais",
                "oirían"
              ],
              future: ["oiré", "oirás", "oirá", "oiremos", "oiréis", "oirán"]
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
          },
          "to hear": {
            present: ["hear", "hear", "hears", "hear", "hear", "hear"],
            preterite: ["heard", "heard", "heard", "heard", "heard", "heard"],
            present_participle: "hearing",
            past_participle: "heard",
            root: "hear"
          }
        }
      }
    };

    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 50,
      tenses: ["present"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "irregular"
    });

    result.forEach(r => {
      expect(r.infinitive).toBe("oír");
    });
  });

  test("Applies the isReflexive key correctly", () => {
    const spanishData = {
      pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
      verbs: {
        basic: [
          {
            infinitive: "ducharse",
            translations: ["to shower"],
            type: ["reflexive", "regular"],
            conjugations: {
              present: [
                "me ducho",
                "te duchas",
                "se ducha",
                "nos duchamos",
                "os ducháis",
                "se duchan"
              ],
              preterite: [
                "me duché",
                "te duchaste",
                "se duchó",
                "nos duchamos",
                "os duchasteis",
                "se ducharon"
              ],
              imperfect: [
                "me duchaba",
                "te duchabas",
                "se duchaba",
                "nos duchábamos",
                "os duchabais",
                "se duchaban"
              ],
              conditional: [
                "me ducharía",
                "te ducharías",
                "se ducharía",
                "nos ducharíamos",
                "os ducharíais",
                "se ducharían"
              ],
              future: [
                "me ducharé",
                "te ducharás",
                "se duchará",
                "nos ducharemos",
                "os ducharéis",
                "se ducharán"
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
          "to shower": {
            present: [
              "shower",
              "shower",
              "showers",
              "shower",
              "shower",
              "shower"
            ],
            preterite: [
              "showered",
              "showered",
              "showered",
              "showered",
              "showered",
              "showered"
            ],
            present_participle: "showering",
            past_participle: "showered",
            root: "shower"
          }
        }
      }
    };

    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 3,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
    });

    result.forEach(r => {
      expect(r.isReflexive).toBe(true);
    });
  });

  test("Chooses randomly from more than 1 english translation", () => {
    const spanishData = {
      pronouns: ["yo", "tú", "él/ella", "nosotros", "vosotros", "ellos/ellas"],
      verbs: {
        basic: [
          {
            infinitive: "hacer",
            translations: ["to do", "to make"],
            type: ["common", "irregular"],
            conjugations: {
              present: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
              preterite: [
                "hice",
                "hiciste",
                "hizo",
                "hicimos",
                "hicisteis",
                "hicieron"
              ],
              imperfect: [
                "hacía",
                "hacías",
                "hacía",
                "hacíamos",
                "hacíais",
                "hacían"
              ],
              conditional: [
                "haría",
                "harías",
                "haría",
                "haríamos",
                "haríais",
                "harían"
              ],
              future: ["haré", "harás", "hará", "haremos", "haréis", "harán"]
            }
          }
        ]
      }
    };

    const englishData = {
      pronouns: ["I", "you", "he/she", "we", "you (pl)", "they"],
      verbs: {
        basic: {
          "to do": {
            present: ["do", "do", "does", "do", "do", "do"],
            preterite: ["did", "did", "did", "did", "did", "did"],
            present_participle: "doing",
            past_participle: "done",
            root: "do"
          },
          "to make": {
            present: ["make", "make", "makes", "make", "make", "make"],
            preterite: ["made", "made", "made", "made", "made", "made"],
            present_participle: "making",
            past_participle: "made",
            root: "make"
          }
        }
      }
    };

    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 50,
      tenses: ["preterite"],
      pronouns: ["I", "you", "he/she/it", "you(pl)", "we", "they"],
      verbType: "all"
    });

    const collectedTranslations = { did: 0, made: 0 };
    result.forEach(r => {
      if (r.original.includes("made")) {
        collectedTranslations.made++;
      } else if (r.original.includes("did")) {
        collectedTranslations.did++;
      }
    });

    expect(collectedTranslations.did).toBeGreaterThan(1);
    expect(collectedTranslations.made).toBeGreaterThan(1);
  });

  test("Only selects the specified pronoun", () => {
    const result = generateSet({
      english: englishData,
      target: spanishData,
      length: 30,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I"],
      verbType: "all"
    });
    result.forEach(r => {
      expect(r.start).toContain("yo");
    });
  });

  test("Ignores any third-person only verbs if the specified pronoun does not match", () => {
    const result = generateSet({
      english: englishDataThirdPerson,
      target: spanishDataThirdPerson,
      length: 30,
      tenses: ["present", "conditional", "future", "preterite", "imperfect"],
      pronouns: ["I"],
      verbType: "all"
    });
    expect(result).toEqual([]);
  });
});
