// Abreviaturas de libros para relacionar citas litúrgicas con los IDs de archivos JSON locales
const mapAbreviaturas = {
  "gn": "01_gn",
  "gen": "01_gn",
  "genesis": "01_gn",
  "génesis": "01_gn",
  "ex": "02_ex",
  "exo": "02_ex",
  "exodo": "02_ex",
  "éxodo": "02_ex",
  "lv": "03_lv",
  "lev": "03_lv",
  "levitico": "03_lv",
  "levítico": "03_lv",
  "nm": "04_nm",
  "num": "04_nm",
  "numeros": "04_nm",
  "números": "04_nm",
  "dt": "05_dt",
  "deut": "05_dt",
  "deuteronomio": "05_dt",
  "js": "06_js",
  "jos": "06_js",
  "josue": "06_js",
  "josué": "06_js",
  "jc": "07_jc",
  "jue": "07_jc",
  "jueces": "07_jc",
  "rt": "08_rt",
  "rut": "08_rt",
  "1s": "09_1s",
  "1 sam": "09_1s",
  "1 samuel": "09_1s",
  "i samuel": "09_1s",
  "samuel": "09_1s",
  "2s": "10_2s",
  "2 sam": "10_2s",
  "2 samuel": "10_2s",
  "ii samuel": "10_2s",
  "1r": "11_1r",
  "1 rey": "11_1r",
  "1 reyes": "11_1r",
  "i reyes": "11_1r",
  "2r": "12_2r",
  "2 rey": "12_2r",
  "2 reyes": "12_2r",
  "ii reyes": "12_2r",
  "1cr": "13_1cr",
  "1 cro": "13_1cr",
  "1 cronicas": "13_1cr",
  "1 crónicas": "13_1cr",
  "i crónicas": "13_1cr",
  "1 crón": "13_1cr",
  "1 cron": "13_1cr",
  "2cr": "14_2cr",
  "2 cro": "14_2cr",
  "2 cronicas": "14_2cr",
  "2 crónicas": "14_2cr",
  "ii crónicas": "14_2cr",
  "2 crón": "14_2cr",
  "2 cron": "14_2cr",
  "esd": "15_esd",
  "esdras": "15_esd",
  "nh": "16_nh",
  "neh": "16_nh",
  "nehemias": "16_nh",
  "nehemías": "16_nh",
  "tb": "17_tb",
  "tob": "17_tb",
  "tobias": "17_tb",
  "tobías": "17_tb",
  "jd": "18_jd",
  "judit": "18_jd",
  "est": "19_est",
  "ester": "19_est",
  "1mac": "20_1mac",
  "1 mac": "20_1mac",
  "1 macabeos": "20_1mac",
  "i macabeos": "20_1mac",
  "2mac": "21_2mac",
  "2 mac": "21_2mac",
  "2 macabeos": "21_2mac",
  "ii macabeos": "21_2mac",
  "jb": "22_jb",
  "job": "22_jb",
  "sal": "23_sal",
  "ps": "23_sal",
  "salmo": "23_sal",
  "salmos": "23_sal",
  "pr": "24_pr",
  "prov": "24_pr",
  "proverbios": "24_pr",
  "qo": "25_qo",
  "ecl": "25_qo",
  "eclesiastes": "25_qo",
  "eclesiastés": "25_qo",
  "eclesiastés(qo)": "25_qo",
  "qohélet": "25_qo",
  "cant": "26_cant",
  "cantar": "26_cant",
  "sab": "27_sab",
  "sb": "27_sab",
  "sabiduria": "27_sab",
  "sabiduría": "27_sab",
  "si": "28_si",
  "ecli": "28_si",
  "sir": "28_si",
  "eclesiastico": "28_si",
  "eclesiástico": "28_si",
  "eclesiástico(si)": "28_si",
  "sirácida": "28_si",
  "siracida": "28_si",
  "is": "29_is",
  "isa": "29_is",
  "isaias": "29_is",
  "isaías": "29_is",
  "Isaías": "29_is",
  "jr": "30_jr",
  "jer": "30_jr",
  "jeremias": "30_jr",
  "jeremías": "30_jr",
  "lam": "31_lam",
  "lamentaciones": "31_lam",
  "ba": "32_ba",
  "bar": "32_ba",
  "baruc": "32_ba",
  "ez": "33_ez",
  "eze": "33_ez",
  "ezequiel": "33_ez",
  "dn": "34_dn",
  "dan": "34_dn",
  "daniel": "34_dn",
  "os": "35_os",
  "oseas": "35_os",
  "jl": "36_jl",
  "joel": "36_jl",
  "am": "37_am",
  "amos": "37_am",
  "amós": "37_am",
  "ab": "38_ab",
  "abd": "38_ab",
  "abdias": "38_ab",
  "abdías": "38_ab",
  "jon": "39_jon",
  "jonas": "39_jon",
  "jonás": "39_jon",
  "mi": "40_mi",
  "mic": "40_mi",
  "miqueas": "40_mi",
  "na": "41_na",
  "nah": "41_na",
  "nahun": "41_na",
  "nahún": "41_na",
  "ha": "42_ha",
  "hab": "42_ha",
  "habacuc": "42_ha",
  "so": "43_so",
  "sof": "43_so",
  "sofonias": "43_so",
  "sofonías": "43_so",
  "ag": "44_ag",
  "age": "44_ag",
  "ageo": "44_ag",
  "za": "45_za",
  "zac": "45_za",
  "zacarias": "45_za",
  "zacarías": "45_za",
  "ml": "46_ml",
  "mal": "46_ml",
  "malaquias": "46_ml",
  "malaquías": "46_ml",
  "mt": "47_mt",
  "mat": "47_mt",
  "mateo": "47_mt",
  "mc": "48_mc",
  "mar": "48_mc",
  "marcos": "48_mc",
  "lc": "49_lc",
  "luc": "49_lc",
  "lucas": "49_lc",
  "jn": "50_jn",
  "jua": "50_jn",
  "juan": "50_jn",
  "hch": "51_hch",
  "hec": "51_hch",
  "hechos": "51_hch",
  "hechos de los apóstoles": "51_hch",
  "hechos de los apostoles": "51_hch",
  "rm": "52_rm",
  "rom": "52_rm",
  "romanos": "52_rm",
  "1co": "53_1co",
  "1 cor": "53_1co",
  "1 corintios": "53_1co",
  "i corintios": "53_1co",
  "corintios": "53_1co",
  "2co": "54_2co",
  "2 cor": "54_2co",
  "2 corintios": "54_2co",
  "ii corintios": "54_2co",
  "ga": "55_ga",
  "gal": "55_ga",
  "galatas": "55_ga",
  "gálatas": "55_ga",
  "ef": "56_ef",
  "efe": "56_ef",
  "efesios": "56_ef",
  "flp": "57_flp",
  "fil": "57_flp",
  "filipenses": "57_flp",
  "col": "58_col",
  "colosenses": "58_col",
  "1ts": "59_1ts",
  "1 tes": "59_1ts",
  "1 tesalonicenses": "59_1ts",
  "i tesalonicenses": "59_1ts",
  "2ts": "60_2ts",
  "2 tes": "60_2ts",
  "2 tesalonicenses": "60_2ts",
  "ii tesalonicenses": "60_2ts",
  "1tm": "61_1tm",
  "1 tim": "61_1tm",
  "1 timoteo": "61_1tm",
  "i timoteo": "61_1tm",
  "timoteo": "61_1tm",
  "2tm": "62_2tm",
  "2 tim": "62_2tm",
  "2 timoteo": "62_2tm",
  "ii timoteo": "62_2tm",
  "tt": "63_tt",
  "tit": "63_tt",
  "tito": "63_tt",
  "flm": "64_flm",
  "fils": "64_flm",
  "filemon": "64_flm",
  "filemón": "64_flm",
  "hb": "65_hb",
  "heb": "65_hb",
  "hebreos": "65_hb",
  "st": "66_st",
  "snt": "66_st",
  "sgo": "66_st",
  "santiago": "66_st",
  "1p": "67_1p",
  "1 ped": "67_1p",
  "1 pedro": "67_1p",
  "i pedro": "67_1p",
  "2p": "68_2p",
  "2 ped": "68_2p",
  "2 pedro": "68_2p",
  "ii pedro": "68_2p",
  "1jn": "69_1jn",
  "1 jn": "69_1jn",
  "1 juan": "69_1jn",
  "i juan": "69_1jn",
  "2jn": "70_2jn",
  "2 jn": "70_2jn",
  "2 juan": "70_2jn",
  "ii juan": "70_2jn",
  "3jn": "71_3jn",
  "3 jn": "71_3jn",
  "3 juan": "71_3jn",
  "iii juan": "71_3jn",
  "judas": "72_judas",
  "jud": "72_judas",
  "ap": "73_ap",
  "apoc": "73_ap",
  "apocalipsis": "73_ap"
};

// Mapeo de fechas específicas a claves litúrgicas para la Lectura del día automática
const liturgiaFechas = {
  "29/11/2026": "adviento_s1_do",
  "30/11/2026": "adviento_s1_lu",
  "01/12/2026": "adviento_s1_ma",
  "02/12/2026": "adviento_s1_mi",
  "03/12/2026": "adviento_s1_ju",
  "04/12/2026": "adviento_s1_vi",
  "05/12/2026": "adviento_s1_sa",
  "17/07/2026": "ordinario_s15_vi",
  "19/07/2026": "ordinario_s16_do",
  "26/07/2026": "ordinario_s17_do",
  "02/08/2026": "ordinario_s18_do",
  "09/08/2026": "ordinario_s19_do",
  "16/08/2026": "ordinario_s20_do",
  "23/08/2026": "ordinario_s21_do",
  "30/08/2026": "ordinario_s22_do",
  "06/09/2026": "ordinario_s23_do",
  "13/09/2026": "ordinario_s24_do",
  "20/09/2026": "ordinario_s25_do",
  "27/09/2026": "ordinario_s26_do",
  "04/10/2026": "ordinario_s27_do",
  "11/10/2026": "ordinario_s28_do",
  "18/10/2026": "ordinario_s29_do",
  "25/10/2026": "ordinario_s30_do",
  "01/11/2026": "ordinario_s31_do",
  "08/11/2026": "ordinario_s32_do",
  "15/11/2026": "ordinario_s33_do",
  "22/11/2026": "ordinario_s34_do"
};

// Base de datos de lecturas litúrgicas
const liturgiaLecturas = {
    "ordinario_s2_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Isaías 49, 3. 5-6"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 39, 2 y 4ab, 7-8a. 8b-9. 10 (R.: 8a y 9a)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 1, 1-3"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Juan 1, 29-34"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 2ª semana de Tiempo Ordinario"
                                  }
                        },
    "enero6":  {
        "A":  {
            "lecturas":  [
                {
                    "tipo":  "1ª Lectura",
                    "cita":  "Isaías 60, 1-6"
                },
                {
                    "tipo":  "Salmo",
                    "cita":  "Salmo 71, 1-2. 7-8. 10-11. 12-13"
                },
                {
                    "tipo":  "2ª Lectura",
                    "cita":  "Efesios 3, 2-3a. 5-6"
                },
                {
                    "tipo":  "Evangelio",
                    "cita":  "Mateo 2, 1-12"
                }
            ],
            "titulo":  "Epifanía del Señor"
        },
        "B":  {
            "lecturas":  [
                {
                    "tipo":  "1ª Lectura",
                    "cita":  "Isaías 60, 1-6"
                },
                {
                    "tipo":  "Salmo",
                    "cita":  "Salmo 71, 1-2. 7-8. 10-11. 12-13"
                },
                {
                    "tipo":  "2ª Lectura",
                    "cita":  "Efesios 3, 2-3a. 5-6"
                },
                {
                    "tipo":  "Evangelio",
                    "cita":  "Mateo 2, 1-12"
                }
            ],
            "titulo":  "Epifanía del Señor"
        },
        "C":  {
            "lecturas":  [
                {
                    "tipo":  "1ª Lectura",
                    "cita":  "Isaías 60, 1-6"
                },
                {
                    "tipo":  "Salmo",
                    "cita":  "Salmo 71, 1-2. 7-8. 10-11. 12-13"
                },
                {
                    "tipo":  "2ª Lectura",
                    "cita":  "Efesios 3, 2-3a. 5-6"
                },
                {
                    "tipo":  "Evangelio",
                    "cita":  "Mateo 2, 1-12"
                }
            ],
            "titulo":  "Epifanía del Señor"
        }
    },
    "enero1": {
        "A": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "Números 6, 22-27"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 66, 2-3. 5-6. 8"
                },
                {
                    "tipo": "2ª Lectura",
                    "cita": "Gálatas 4, 4-7"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Lucas 2, 16-21"
                }
            ],
            "titulo": "Santa María, Madre de Dios (1 de Enero)"
        }
    },
    "sagrado_corazon":  {
        "A":  {
            "lecturas":  [
                {
                    "tipo":  "1ª Lectura",
                    "cita":  "Deuteronomio 7, 6-11"
                },
                {
                    "tipo":  "Salmo",
                    "cita":  "Salmo 102. 1-2. 3-4. 6-7. 8 y 10"
                },
                {
                    "tipo":  "2ª Lectura",
                    "cita":  "Juan 4, 7-16"
                },
                {
                    "tipo":  "Evangelio",
                    "cita":  "Mateo 11, 25-30"
                }
            ],
            "titulo":  "El sagrado Corazón de Jesús"
        }
    },
    "ordinario_s1_lu": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 1, 1-8"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 115, 12-13. 14 y 17. 18-19"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 1, 14-20"
                }
            ],
            "titulo": "Lunes de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "ordinario_s1_ma": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 1, 9-20"
                },
                {
                    "tipo": "Salmo",
                    "cita": "1 Samuel 2, 1. 4-5. 6-7. 8"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 1, 21-28"
                }
            ],
            "titulo": "Martes de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "ordinario_s1_mi": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 3, 1-10. 19-20"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 39, 2 y 5. 7-8a. 8b-9. 10"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 1, 29-39"
                }
            ],
            "titulo": "Miércoles de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "ordinario_s1_ju": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 4, 1-11"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 43, 10-11. 14-15. 24-25"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 1, 40-45"
                }
            ],
            "titulo": "Jueves de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "ordinario_s1_vi": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 8, 4-7. 10-22a"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 88, 16-17. 18-19"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 2, 1-12"
                }
            ],
            "titulo": "Viernes de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "ordinario_s1_sa": {
        "PAR": {
            "lecturas": [
                {
                    "tipo": "1ª Lectura",
                    "cita": "1 Samuel 9, 1-4. 17-19; 10, 1a"
                },
                {
                    "tipo": "Salmo",
                    "cita": "Salmo 20, 2-3. 4-5. 6-7"
                },
                {
                    "tipo": "Evangelio",
                    "cita": "Marcos 2, 13-17"
                }
            ],
            "titulo": "Sábado de la 1ª semana de Tiempo Ordinario (Año Par)"
        }
    },
    "adviento_s3_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 35, 1-6a. 10"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 145, 7. 8-9a. 9bc-10"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Santiago 5, 7-10"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 11, 2-11"
                                                      }
                                                  ],
                                     "titulo":  "Domingo 3º de Adviento"
                                 }
                       },
    "cuaresma_s4_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Samuel 16, 1b. 6-7. 10-13a"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 22, 1-3a. 3b-4. 5. 6"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Efesios 5, 8-14"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 9, 1-41"
                                                      }
                                                  ],
                                     "titulo":  "Cuarto domingo de Cuaresma"
                                 }
                       },
    "ordinario_s5_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Isaías 58, 7-10"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 111, 4-5. 6-7. 8a y 9 (R.: 4a)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 corintios 2, 1-5"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 5, 13-16"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 5ª semana de Tiempo Ordinario"
                                  }
                        },
    "cuaresma_s6_vi":  {
                           "C":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 52, 13—53, 12"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Hebreos 4, 14-16; 5, 7-9"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 18, 1—19, 42"
                                                      }
                                                  ],
                                     "titulo":  "Viernes santo"
                                 },
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 52, 13—53, 12"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Hebreos 4, 14-16; 5, 7-9"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 18, 1—19, 42"
                                                      }
                                                  ],
                                     "titulo":  "Viernes santo"
                                 },
                           "B":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 52, 13—53, 12"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Hebreos 4, 14-16; 5, 7-9"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 18, 1—19, 42"
                                                      }
                                                  ],
                                     "titulo":  "Viernes santo"
                                 }
                       },
    "ordinario_s17_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "1 reyes 3, 5. 7-12"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 118, 57 y 72. 76-77. 127-128. 129-130"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 8, 28-30"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 13, 44-52"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 17ª semana de Tiempo Ordinario"
                                   }
                         },
    "pascua_s2_do":  {
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 2, 42-47"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 117, 2-4. 13-15. 22-24"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro: 1, 3-9"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 20, 19-31"
                                                    }
                                                ],
                                   "titulo":  "Segundo domingo de Pascua"
                               }
                     },
    "ordinario_s16_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "sabiduria 12, 13. 16-19"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 85, 5-6. 9-10. 15-16a"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 8, 26-27"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 13, 24-43"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 16ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s27_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 5, 1-7"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 79, 9 y 12. 13-14. 15-16. 19-20"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Filipenses 4, 6-9"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 21, 33-43"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 27ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s3_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Isaías 8, 23b—9, 3"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 26, 1. 4. 13-14 (R.: 1a)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 1, 10-13. 17"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 4, 12-23"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 3ª semana de Tiempo Ordinario"
                                  }
                        },
    "adviento_s1_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías  2, 1-5"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 121, 1-2. 4-5. 6-7. 8-9"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos 13, 11-14a"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 24, 37-44"
                                                      }
                                                  ],
                                     "titulo":  "Domingo 1º de Adviento"
                                 }
                       },
    "ordinario_s12_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Jeremías 20, 10-13"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 68, 8-10. 14 y 17. 33-35 (R.: 14c)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 5, 12-15"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 10, 26-33"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 12ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s7_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Levítico  19, 1-2. 17-18"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 102, 1-2. 3-4. 8 y 10. 12-13 (R.: 8a)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 3, 16-23"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 5, 38-48"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 7ª semana de Tiempo Ordinario"
                                  }
                        },
    "cuaresma_s6_ju":  {
                           "C":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Éxodo 12, 1-8. 11-14"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 115, 12-13. 15-16bc. 17-18"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Corintios 11, 23-26"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 13, 1-15"
                                                      }
                                                  ],
                                     "titulo":  "Jueves santo"
                                 },
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Éxodo 12, 1-8. 11-14"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 115, 12-13. 15-16bc. 17-18"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Corintios 11, 23-26"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 13, 1-15"
                                                      }
                                                  ],
                                     "titulo":  "Jueves santo"
                                 },
                           "B":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Éxodo 12, 1-8. 11-14"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 115, 12-13. 15-16bc. 17-18"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Corintios 11, 23-26"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 13, 1-15"
                                                      }
                                                  ],
                                     "titulo":  "Jueves santo"
                                 }
                       },
    "ordinario_s33_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "proverbios 31, 10-13. 19-20. 30-31"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 127, 1-2. 3. 4-5 (R.: 1a)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Tesalonicenses 5, 1-6"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 25, 14-30"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 33ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s11_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Éxodo 19, 2-6a"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 99, 2. 3. 5"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 5, 6-11"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 9, 36—10, 8"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 11ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s20_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 56, 1. 6-7"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 66, 2-3. 5. 6 y 8 (R.: 4)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 11, 13-15. 29-32"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 15, 21-28"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 20ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s34_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Ezequiel 34, 11-12. 15-17"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "22, 1-2. 2-3. 5-6"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Corintios 15, 20-26. 28"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 25, 31-46"
                                                        }
                                                    ],
                                       "titulo":  "Cristo Rey del Universo, Domingo de la 34ª semana de Tiempo Ordinario"
                                   }
                         },
    "adviento_s4_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 7, 10-14"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 23, 1-2. 3-4ab. 5-6"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos 1, 1-7"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 1, 18-24"
                                                      }
                                                  ],
                                     "titulo":  "Domingo 4º de Adviento"
                                 }
                       },
    "ordinario_s31_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Malaquías 1, 14b—2, 2b. 8-10"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 130, 1. 2. 3"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Tesalonicenses 2, 7b-9. 13"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 23, 1-12"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 31ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s19_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "1 reyes 19, 9a. 11-13a"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 84, 9ab-10. 11-12. 13-14 (R.: 8)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 9, 1-5"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 14, 22-33"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 19ª semana de Tiempo Ordinario"
                                   }
                         },
    "pascua_s4_do":  {
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 2, 14a. 36-41"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 22, 1-3a. 3b-4. 5. 6"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro 2, 20b-25"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 10, 1-10"
                                                    }
                                                ],
                                   "titulo":  "Cuarto domingo de Pascua"
                               }
                     },
    "navidad_s1_do":  {
                          "A":  {
                                    "lecturas":  [
                                                     {
                                                         "tipo":  "1ª Lectura",
                                                         "cita":  "Sirácida 3, 2-6. 12-14"
                                                     },
                                                     {
                                                         "tipo":  "Salmo",
                                                         "cita":  "Salmo 127, 1-2. 3. 4-5"
                                                     },
                                                     {
                                                         "tipo":  "2ª Lectura",
                                                         "cita":  "Colosenses 3, 12-21"
                                                     },
                                                     {
                                                         "tipo":  "Evangelio",
                                                         "cita":  "Mateo 2, 13-15. 19-23"
                                                     }
                                                 ],
                                    "titulo":  "La Sagrada Familia"
                                }
                      },
    "ordinario_s26_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Ezequiel 18, 25-28"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 24, 4bc-5. 6-7. 8-9 (R.: 6a)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Filipenses 2, 1-11 / Filipenses 2, 1-5"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 21, 28-32"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 26ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s32_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "sabiduria 6, 12-16"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 62, 2. 3-4. 5-6. 7-8 (R.: 2b)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Tesalonicenses 4, 13-18"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 25, 1-13"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 32ª semana de Tiempo Ordinario"
                                   }
                         },
    "cuaresma_s3_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Éxodo 17, 3-7"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 94, 1-2. 6-7. 8-9"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos 5, 1-2. 5-8"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 4, 5-42"
                                                      }
                                                  ],
                                     "titulo":  "Tercer domingo de Cuaresma"
                                 }
                       },
    "cuaresma_s2_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Génesis 12, 1-4"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 32, 4-5. 18-19. 20 y 22"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Timoteo 1, 8b-10"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 17, 1-9"
                                                      }
                                                  ],
                                     "titulo":  "Segundo domingo de Cuaresma"
                                 }
                       },
    "ordinario_s9_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Deuteronomio 11, 18. 26-28. 32"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 30, 2-3a. 3bc-4. 17 y 25 (R.: 3b)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "Romanos 3, 21-25a. 28"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 7, 21-27"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 9ª semana de Tiempo Ordinario"
                                  }
                        },
    "ordinario_s6_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Sirácida 15, 16-21"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 118, 1-2. 4-5. 17-18. 33-34 (R.: 1b)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 2, 6-10"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 5, 17-37"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 6ª semana de Tiempo Ordinario"
                                  }
                        },
    "pascua_s6_do":  {
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 8, 5-8. 14-17"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 65, 1-3a. 4-5. 6-7a. 16 y 20"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro 3, 15-18"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 14, 15-21"
                                                    }
                                                ],
                                   "titulo":  "Sexto domingo de Pascua"
                               }
                     },
    "ordinario_s29_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 45, 1. 4-6"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 95, 1 y 3. 4-5. 7-8. 9-10a y c (R.: 7b)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Tesalonicenses 1, 1-5b"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 22, 15-21"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 29ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s28_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 25, 6-10a"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 22, 1-3a. 3b-4. 5. 6 (R.: 6cd)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Filipenses 4, 12-14. 19-20"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 22, 1-14"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 28ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s24_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Sirácida 27,30 - 28,9"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 102, 1-2. 3-4. 9-10. 11-12 (R.: 8)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 14, 7-9"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 18, 21-35"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 24ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s22_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Jeremías 20, 7-9"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 62, 2. 3-4. 5-6. 8-9 (R.:2b)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 12, 1-2"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 16, 21-27"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 22ª semana de Tiempo Ordinario"
                                   }
                         },
    "cuaresma_s1_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Génesis 2, 7-9; 3, 1-7"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 50, 3-4. 5-6a. 12-13. 14 y 17"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos 5, 12-19 / Romanos 5, 12. 17-19"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 4, 1-11"
                                                      }
                                                  ],
                                     "titulo":  "Primer domingo de Cuaresma"
                                 }
                       },
    "ordinario_s13_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "2 reyes 4, 8-11. 14-16a"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 88, 2-3. 16-17. 18-19"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 6, 3-4. 8-11"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 10, 37-42"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 13ª semana de Tiempo Ordinario"
                                   }
                         },
    "pascua_s5_do":  {
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 6, 1-7"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 32, 1-2. 4-5. 18-19"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro 2, 4-9"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 14, 1-12"
                                                    }
                                                ],
                                   "titulo":  "Quinto domingo de Pascua"
                               }
                     },
    "ordinario_s8_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Isaías 49, 14-15"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "salmo 61, 2-3. 6-7. 8-9"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 4, 1-5"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 6, 24-34"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 8ª semana de Tiempo Ordinario"
                                  }
                        },
    "ordinario_s25_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 55, 6-9"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 144, 2-3. 8-9. 17-18 (R.: 18a)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Filipenses 1, 20c-24. 27a"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 20, 1-16"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 25ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s23_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Ezequiel 33, 7-9"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 94, 1-2. 6-7. 8-9 (R.: 8)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 13, 8-10"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 18, 15-20"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 23ª semana de Tiempo Ordinario"
                                   }
                         },
    "adviento_s2_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Isaías 11, 1-10"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 71, 1-2. 7-8. 12-13. 17"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos: 15, 4-9"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo: 3, 1-12"
                                                      }
                                                  ],
                                     "titulo":  "Domingo 2º de Adviento"
                                 }
                       },
    "cuaresma_s5_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Ezequiel 37, 12-14"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 129, 1-2. 3-4ab. 4c-6. 7-8"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Romanos 8, 8-11"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Juan 11, 1-45"
                                                      }
                                                  ],
                                     "titulo":  "Quinto domingo de Cuaresma"
                                 }
                       },
    "ordinario_s30_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Éxodo 22, 20-26"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 17, 2-3a. 3bc-4. 47 y 51ab (R.: 2)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "1 Tesalonicenses 1, 5c-10"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 22, 34-40"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 30ª semana de Tiempo Ordinario"
                                   }
                         },
    "pascua_s1_do":  {
                         "C":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 10, 34a. 37-43"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 117, 1-2. 16ab-17. 22-23"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Colosenses 3, 1-4 / Corintios 5, 6b-8"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 20, 1-9"
                                                    }
                                                ],
                                   "titulo":  "Domingo de Pascua"
                               },
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 1, 12-14"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 26, 1. 4. 7-8"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro 4, 13-16"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 17, 1-11"
                                                    }
                                                ],
                                   "titulo":  "Séptimo domingo de Pascua"
                               },
                         "B":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 10, 34a. 37-43"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 117, 1-2. 16ab-17. 22-23"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Colosenses 3, 1-4 / Corintios 5, 6b-8"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Juan 20, 1-9"
                                                    }
                                                ],
                                   "titulo":  "Domingo de Pascua"
                               }
                     },
    "ordinario_s21_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 22, 19-23"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 137, 1-2a. 2bc-3. 6 y 8bc (R.: 8bc)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 11, 33-36"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 16, 13-20"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 21ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s10_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Oseas 6, 3-6"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 49, 1 y 8. 12-13. 14-15 (R.: 23b)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 4, 18-25"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 9, 9-13"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 10ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s4_do":  {
                            "A":  {
                                      "lecturas":  [
                                                       {
                                                           "tipo":  "1ª Lectura",
                                                           "cita":  "Sofonías 2, 3; 3, 12-13"
                                                       },
                                                       {
                                                           "tipo":  "Salmo",
                                                           "cita":  "Salmo 145, 7. 8-9a. 9bc-10 (R.: Mt 5, 13)"
                                                       },
                                                       {
                                                           "tipo":  "2ª Lectura",
                                                           "cita":  "1 Corintios 1, 26-31"
                                                       },
                                                       {
                                                           "tipo":  "Evangelio",
                                                           "cita":  "Mateo 5, 1-12a"
                                                       }
                                                   ],
                                      "titulo":  "Domingo de la 4ª semana de Tiempo Ordinario"
                                  }
                        },
    "ordinario_s15_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 55, 10-11"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 64, 10. 11. 12-13. 14 (R.: Lc 8, 8)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 8, 18-23"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 13, 1-23"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 15ª semana de Tiempo Ordinario"
                                   }
                         },
    "ordinario_s14_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Zacarías 9, 9-10"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 144, 1-2. 8-9. 10-11. 13cd-14 (R.: cf. 1)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 8, 9. 11-13"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 11, 25-30"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 14ª semana de Tiempo Ordinario"
                                   }
                         },
    "cuaresma_s6_do":  {
                           "A":  {
                                     "lecturas":  [
                                                      {
                                                          "tipo":  "1ª Lectura",
                                                          "cita":  "Mateo 21, 1-11        Isaías 50, 4-7"
                                                      },
                                                      {
                                                          "tipo":  "Salmo",
                                                          "cita":  "Salmo 21, 8-9. 17-18a. 19-20. 23-24"
                                                      },
                                                      {
                                                          "tipo":  "2ª Lectura",
                                                          "cita":  "Filipenses 2, 6-11"
                                                      },
                                                      {
                                                          "tipo":  "Evangelio",
                                                          "cita":  "Mateo 26, 14—27, 66"
                                                      }
                                                  ],
                                     "titulo":  "Domingo de ramos"
                                 }
                       },
    "ordinario_s18_do":  {
                             "A":  {
                                       "lecturas":  [
                                                        {
                                                            "tipo":  "1ª Lectura",
                                                            "cita":  "Isaías 55, 1-3"
                                                        },
                                                        {
                                                            "tipo":  "Salmo",
                                                            "cita":  "Salmo 144, 8-9. 15-16. 17-18 (R.: cf. 16)"
                                                        },
                                                        {
                                                            "tipo":  "2ª Lectura",
                                                            "cita":  "Romanos 8, 35. 37-39"
                                                        },
                                                        {
                                                            "tipo":  "Evangelio",
                                                            "cita":  "Mateo 14, 13-21"
                                                        }
                                                    ],
                                       "titulo":  "Domingo de la 18ª semana de Tiempo Ordinario"
                                   }
                         },
    "pascua_s3_do":  {
                         "A":  {
                                   "lecturas":  [
                                                    {
                                                        "tipo":  "1ª Lectura",
                                                        "cita":  "Hechos de los apóstoles 2, 14. 22-33"
                                                    },
                                                    {
                                                        "tipo":  "Salmo",
                                                        "cita":  "Salmo 15, 1-2a y 5. 7-8. 9-10. 11"
                                                    },
                                                    {
                                                        "tipo":  "2ª Lectura",
                                                        "cita":  "Pedro 1, 17-21"
                                                    },
                                                    {
                                                        "tipo":  "Evangelio",
                                                        "cita":  "Lucas 24, 13-35"
                                                    }
                                                ],
                                   "titulo":  "Tercer domingo de Pascua"
                               }
                     }
};

window.liturgiaData = {
  mapAbreviaturas,
  liturgiaFechas,
  liturgiaLecturas
};