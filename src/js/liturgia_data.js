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
  "1 Cronicas": "13_1cr",
  "1 cronicas": "13_1cr",
  "1 crón": "13_1cr",
  "1 cron": "13_1cr",
  "1crónicas": "13_1cr",
  "2cr": "14_2cr",
  "2 cro": "14_2cr",
  "2 cronicas": "14_2cr",
  "2 crónicas": "14_2cr",
  "ii crónicas": "14_2cr",
  "2 crón": "14_2cr",
  "2 cron": "14_2cr",
  "2crónicas": "14_2cr",
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
  "san marcos": "48_mc",
  "lc": "49_lc",
  "luc": "49_lc",
  "lucas": "49_lc",
  "san lucas": "49_lc",
  "jn": "50_jn",
  "jua": "50_jn",
  "juan": "50_jn",
  "san juan": "50_jn",
  "hch": "51_hch",
  "hec": "51_hch",
  "hechos": "51_hch",
  "hechos de los apóstoles": "51_hch",
  "hechos de los apostoles": "51_hch",
  "Hechos de los apóstoles": "51_hch",
  "Hechos de los Apóstoles": "51_hch",
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
    "20/07/2026": "ordinario_s16_lu",
    "21/07/2026": "ordinario_s16_ma",
    "22/07/2026": "ordinario_s16_mi",
    "23/07/2026": "ordinario_s16_ju",
    "24/07/2026": "ordinario_s16_vi",
    "25/07/2026": "ordinario_s16_sa",
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
    "22/11/2026": "ordinario_s34_do",

    "17/12": "adviento_17_dic",
    "18/12": "adviento_18_dic",
    "19/12": "adviento_19_dic",
    "20/12": "adviento_20_dic",
    "21/12": "adviento_21_dic",
    "22/12": "adviento_22_dic",
    "23/12": "adviento_23_dic",
    "24/12": "adviento_24_dic",
    "25/12": "navidad_25_dic",

    "26/12": "navidad_26_dic",
    "27/12": "navidad_27_dic",
    "28/12": "navidad_28_dic",
    "29/12": "navidad_29_dic",
    "30/12": "navidad_30_dic",
    "31/12": "navidad_31_dic",
    
    //Segundo domingo despues de navidad ahora cae el 3 de Enero 2027
    "3/1": "navidad_s2_do",

    "1/1": "navidad_1_ene",
    "2/1": "navidad_2_ene",
    "3/1": "navidad_3_ene",
    "4/1": "navidad_4_ene",
    "5/1": "navidad_5_ene",
    "6/1": "navidad_6_ene",
    "7/1": "navidad_7_ene",
    "8/1": "navidad_8_ene",
    "9/1": "navidad_9_ene",
    "10/1": "navidad_10_ene",
    "11/1": "navidad_11_ene",
    "12/1": "navidad_12_ene",
    
};

// Base de datos de lecturas litúrgicas
const liturgiaLecturas = {


/*
 _____    ___   _____   ___   _____    ___      ___ 
|  ___|  |_ _| | ____| / __| |_   _|  / _ \    / __|
| |_      | |  |  _|   \__ \   | |   / ___ \   \__ \
|_|      |___| |_____| |___/   |_|  /_/   \_\  |___/
 ___    ___    _       _____   __  __   _   _   ___    ____     ___      ____    _____   ___
/ __|  / _ \  | |     | ____| |  \/  | | \ | |  |_ _| |  _ \   / _ \    |  _ \  | ____| / __|
\__ \ | (_) | | |___  |  _|   | |\/| | |  \| |   | |  | |_) | / ___ \   | |_) | |  _|   \__ \
|___/  \___/  |_____| |_____| |_|  |_| |_|\__|  |___| |____/  /_/   \_\ |____/  |_____| |___/

╔═════════════════════════════════════════════════╗
║  FIESTA - SAGRADO CORAZON DE JESUS - CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/

"scorazondeJesus": {
   "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Deuteronomio 7, 6-11"},
        {"tipo": "Salmo",           "cita": "Salmo 102. 1-2. 3-4. 6-7. 8 y 10"},
        {"tipo": "2ª Lectura",      "cita": "1 Juan 4, 7-16"},
        {"tipo": "Evangelio",       "cita": "Mateo 11, 25-30"}
        ],"titulo": "El sagrado Corazón de Jesús"},
   "B": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Oseas 11, 1b. 3-4. 8c-9"},
        {"tipo": "Salmo",           "cita": "Isaías 12, 2-3. 4bcd. 5-6"},
        {"tipo": "2ª Lectura",      "cita": "Efesios 3, 8-12. 14-19"},
        {"tipo": "Evangelio",       "cita": "Juan 19, 31-37"}
        ],"titulo": "El sagrado Corazón de Jesús"},
   "C": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Ezequiel 34, 11-16"},
        {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 5, 5b-11"},
        {"tipo": "Evangelio",       "cita": "Lucas 15, 3-7"}
        ],"titulo": "El sagrado Corazón de Jesús"},},

/* ___      ____   __   __   ___   _____   _   _   _____    ___
  / _ \    |  _ \  \ \ / /  |_ _| | ____| | \ | | |_   _|  / _ \
 / ___ \   | |_) |  \ V /    | |  |  _|   |  \| |   | |   | (_) |
/_/   \_\  |____/    \_/    |___| |_____| |_|\__|   |_|    \___/
*/
/************************************************\
╔════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - SEMANA 1 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "adviento_s1_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías  2, 1-5"},
                {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 4-5. 6-7. 8-9"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 13, 11-14a"},
                {"tipo": "Evangelio",       "cita": "Mateo 24, 37-44"}
                ],"titulo": "Domingo 1º de Adviento Ciclo A"},
            "B": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaias 63, 16-17. 19. 64, 2-7"},
                {"tipo": "Salmo",           "cita": "Salmo 79, 2ac y 3b. 15-16. 18-19"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 1, 3-9"},
                {"tipo": "Evangelio",       "cita": "Marcos 13, 33-37"}
                ],"titulo": "Domingo 1º de Adviento Ciclo B"},
            "C": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Jeremías 33, 14-16"},
                {"tipo": "Salmo",           "cita": "Salmo 24, 4bc-5ab. 8-9. 10 y 14"},
                {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 3, 12—4, 2"},
                {"tipo": "Evangelio",       "cita": "Lucas 21, 25-28. 34-36"}
                ],"titulo": "Domingo 1º de Adviento Ciclo C"}
        },              /*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - DIAS DE LA SEMANA 1 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "adviento_s1_lu": {"A": {"titulo": "Lunes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 2, 1-5 / Isaías 4, 2-6"},
                    {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 4-5. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Mateo 8, 5-11"}],},},
/*MARTES*/      "adviento_s1_ma": {"A": {"titulo": "Martes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 11, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 7-8. 12-13. 17"},
                    {"tipo": "Evangelio",       "cita": "Lucas 10,21-24"}],},},
/*MIERCOLES*/   "adviento_s1_mi": {"A": {"titulo": "Miércoles 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 25, 6-10a"},
                    {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
                    {"tipo": "Evangelio",       "cita": "Mateo 15, 29-37"}],},},
/*JUEVES*/     "adviento_s1_ju": {"A": {"titulo": "Jueves 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 26, 1-6"},
                    {"tipo": "Salmo",           "cita": "Salmo 117, 1 y 8-9. 19-21. 25-27a"},
                    {"tipo": "Evangelio",       "cita": "Mateo 7, 21. 24-27"}],},},
/*VIERNES*/     "adviento_s1_vi": {"A": {"titulo": "Viernes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 29, 17-24"},
                    {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 13-14"},
                    {"tipo": "Evangelio",       "cita": "Mateo 9, 27-31"}],},},
/*SABADO*/     "adviento_s1_sa": {"A": {"titulo": "Sábado 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 30, 19-21. 23-26"},
                    {"tipo": "Salmo",           "cita": "Salmo 146, 1-2. 3-4. 5-6"},
                    {"tipo": "Evangelio",       "cita": "Mateo 9,35-10,1.6-8"}],},},

/*
╔════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - SEMANA 2 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "adviento_s2_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 11, 1-10"},
                {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 7-8. 12-13. 17"},
                {"tipo": "2ª Lectura",      "cita": "Romanos: 15, 4-9"},
                {"tipo": "Evangelio",       "cita": "Mateo: 3, 1-12"}
                ],"titulo": "Domingo 2º de Adviento"}
        },          /*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - DIAS DE LA SEMANA 2 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "adviento_s2_lu": {"A": {"titulo": "Lunes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 35, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 84, 9ab-10. 11-12. 13-14 "},
                    {"tipo": "Evangelio",       "cita": "Lucas 5, 17-26"}],},},
/*MARTES*/      "adviento_s2_ma": {"A": {"titulo": "Martes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 40, 1-11"},
                    {"tipo": "Salmo",           "cita": "Salmo 95, 1-2. 3 y 10ac. 11-12. 13-14"},
                    {"tipo": "Evangelio",       "cita": "Mateo 18, 12-14"}],},},
/*MIERCOLES*/   "adviento_s2_mi": {"A": {"titulo": "Miércoles 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 40, 25-31"},
                    {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 3-4. 8 y 10"},
                    {"tipo": "Evangelio",       "cita": "Mateo 11, 28-30"}],},},
/*JUEVES*/     "adviento_s2_ju": {"A": {"titulo": "Jueves 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 41, 13-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 144, 1 y 9. 10-11. 12-13"},
                    {"tipo": "Evangelio",       "cita": "Mateo 11, 11-15"}],},},
/*VIERNES*/     "adviento_s2_vi": {"A": {"titulo": "Viernes 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 48, 17-19"},
                    {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
                    {"tipo": "Evangelio",       "cita": "Mateo 11, 16-19"}],},},
/*SABADO*/     "adviento_s2_sa": {"A": {"titulo": "Sábado 1º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Sirácida 48, 1-4. 9-11"},
                    {"tipo": "Salmo",           "cita": "Salmo 79, 2ac y 3b. 15-16. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Mateo 17,10-13"}],},},

/*
╔════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - SEMANA 3 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "adviento_s3_do": {
            "A": {"titulo": "Domingo 3º de Adviento","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 35, 1-6a. 10"},
                {"tipo": "Salmo",           "cita": "Salmo 145, 7. 8-9a. 9bc-10"},
                {"tipo": "2ª Lectura",      "cita": "Santiago 5, 7-10"},
                {"tipo": "Evangelio",       "cita": "Mateo 11, 2-11"}],}
            },
/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - DIAS DE LA SEMANA 3 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "adviento_s3_lu": {"A": {"titulo": "Lunes 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Números 24, 2-7. 15-17a"},
                    {"tipo": "Salmo",           "cita": "Salmo 24, 4-5ab. 6-7bc. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Mateo 21, 23-27"}],},},
/*MARTES*/      "adviento_s3_ma": {"A": {"titulo": "Martes 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Sofonías 3, 1-2. 9-13"},
                    {"tipo": "Salmo",           "cita": "Salmo 33, 2-3. 6-7. 17-18. 19 y 23"},
                    {"tipo": "Evangelio",       "cita": "Mateo 21, 28-32"}],},},
/*MIERCOLES*/   "adviento_s3_mi": {"A": {"titulo": "Miércoles 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 45, 6b-8. 18. 21b-25"},
                    {"tipo": "Salmo",           "cita": "Salmo 84, 9ab-10. 11-12. 13-14"},
                    {"tipo": "Evangelio",       "cita": "Lucas 7, 19-23"}],},},
/*JUEVES*/     "adviento_s3_ju": {"A": {"titulo": "Jueves 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 54, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 29, 2 y 4. 5-6. 11-12a y 13b"},
                    {"tipo": "Evangelio",       "cita": "Lucas 7, 24-30"}],},},
/*VIERNES*/     "adviento_s3_vi": {"A": {"titulo": "Viernes 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 56, 1-3a. 6-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 66, 2-3. 5. 7-8"},
                    {"tipo": "Evangelio",       "cita": "Juan 5, 33-36"}],},},
/*SABADO*/     "adviento_s3_sa": {"A": {"titulo": "Sábado 3º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Malaquías 3,1-4. 23-24"},
                    {"tipo": "Salmo",           "cita": "Salmo 24, 4-5ab. 8-9. 10 y 14"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 57-66"}],},},
/*
╔════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - SEMANA 4 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "adviento_s4_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 7, 10-14"},
                {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 1, 1-7"},
                {"tipo": "Evangelio",       "cita": "Mateo 1, 18-24"}
                ],"titulo": "Domingo 4º de Adviento"}
        },          
        
        
/**************************************************\
╔══════════════════════════════════════════════════╗
║  TIEMPO DE NAVIDAD - SEMANA 1 DOMINGO CICLO ABC  ║
╚══════════════════════════════════════════════════╝
*/ 
  "navidad_s1_do": {
    "A": {"titulo": "1º Domingo después de Navidad","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sirácida 3, 2-6. 12-14"},
        {"tipo": "Salmo",           "cita": "Salmo 127, 1-2. 3. 4-5"},
        {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 12-21"},
        {"tipo": "Evangelio",       "cita": "Mateo 2, 13-15. 19-23"}
          ],}},

  "navidad_s2_do": {
    "A": {"titulo": "2º Domingo después de Navidad","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sirácida 24. 1-2. 8-12"},
        {"tipo": "Salmo",           "cita": "Salmo 147, 12-13. 14-15. 19-20"},
        {"tipo": "2ª Lectura",      "cita": "Efesios 1, 3-6. 15-18"},
        {"tipo": "Evangelio",       "cita": "Juan 1, 1-18 o Juan 1, 1-5. 9-14"}
          ],}},

        /*
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - ENTRANDO A NAVIDAD DEL 17 AL 24 DE DICIEMBRE CICLO ABC, PAR/IMPAR  ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝*/ 
/*17 Diciembre*/"adviento_17_dic": {"A": {"titulo": "17 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Génesis 49, 2. 8-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 3-4ab. 7-8. 17"},
                    {"tipo": "Evangelio",       "cita": "Mateo 1, 1-17"}],},},
/*18 Diciembre*/"adviento_18_dic": {"A": {"titulo": "18 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 23, 5-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 12-13. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Mateo 1, 18-24"}],},},
/*19 Diciembre*/"adviento_19_dic": {"A": {"titulo": "19 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jueces 13, 2-7.2 4-25a"},
                    {"tipo": "Salmo",           "cita": "Salmo 70, 3-4a. 5-6ab. 16-17"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 5-25"}],},},
/*20 Diciembre*/"adviento_20_dic": {"A": {"titulo": "20 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 7, 10-14"},
                    {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 26-38"}],},},
/*21 Diciembre*/"adviento_21_dic": {"A": {"titulo": "21 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "cantar 2 ,8-14 / Sofonías 3, 14-18a"},
                    {"tipo": "Salmo",           "cita": "Salmo 32, 2-3. 11-12. 20-21"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 39-45"}],},},
/*22 Diciembre*/"adviento_22_dic": {"A": {"titulo": "22 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Samuel 1, 24-28"},
                    {"tipo": "Salmo",           "cita": "1 Samuel 2, 1. 4-5. 6-7. 8"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 46-56"}],},},
/*23 Diciembre*/"adviento_23_dic": {"A": {"titulo": "23 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Malaquías 3, 1-4. 23-24"},
                    {"tipo": "Salmo",           "cita": "Salmo 24, 4-5ab. 8-9. 10 y 14"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 57-66"}],},},
/*24 Diciembre*/"adviento_24_dic": {"A": {"titulo": "24 de Diciembre, Ferias de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Samuel 7, 1-5. 8b-12. 14a.16"},
                    {"tipo": "Salmo",           "cita": "Salmo 88, 2-3. 4-5. 27 y 29"},
                    {"tipo": "Evangelio",       "cita": "Lucas 1, 67-79"}],},},


//Esta tiene dos opciones en una y se alcanza al 2 de Enero con la opcion 1 y 2 cuando estas en el calendario en el dia 2
// NATIVIDAD DEL SEÑOR
/*
 _   _     ___    __   __   ___    ____     ___      ____
| \ | |   / _ \   \ \ / /  |_ _|  |  _ \   / _ \    |  _ \
|  \| |  / ___ \   \ V /    | |   | |_) | / ___ \   | |_) |
|_|\__| /_/   \_\   \_/    |___|  |____/ /_/   \_\  |____/
*/
/*25 Diciembre*/"navidad_25_dic": [
                    {"A": {"titulo": "25 de Diciembre, Natividad del Señor, Misa de la Vigilia","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 62, 1-5"},
                        {"tipo": "Salmo",           "cita": "Salmo 88, 4-5. 16-17. 27 y 29"},
                        {"tipo": "2ª Lectura",      "cita": "apóstoles 13, 16-17. 22-25"},
                        {"tipo": "Evangelio",       "cita": "Mateo 1, 1-25 o Mateo 1, 18-25"}]}},
                    {"A": {"titulo": "25 de Diciembre, Natividad del Señor, Misa de Medianoche","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 9, 1-3. 5-6"},
                        {"tipo": "Salmo",           "cita": "Salmo 95, 1-2a. 2b-3. 11-12. 13"},
                        {"tipo": "2ª Lectura",      "cita": "Tito 2, 11-14"},
                        {"tipo": "Evangelio",       "cita": "Lucas 2, 1-14"}]}},
                    {"A": {"titulo": "25 de Diciembre, Natividad del Señor, Misa de la Aurora","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 62, 11-12"},
                        {"tipo": "Salmo",           "cita": "Salmo 96, 1. 6. 11-12"},
                        {"tipo": "2ª Lectura",      "cita": "Tito 3, 4-7"},
                        {"tipo": "Evangelio",       "cita": "Lucas 2, 15-20"}]}},
                    {"A": {"titulo": "25 de Diciembre, Natividad del Señor, Misa del Día","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 52, 7-10"},
                        {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 3cd-4. 5-6"},
                        {"tipo": "2ª Lectura",      "cita": "Hebreos 1, 1-6"},
                        {"tipo": "Evangelio",       "cita": "Juan 1, 1-18 o Juan 1, 1-5. 9-14"}]}},
                            ],

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 26 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_26_dic": [{"A": {"titulo": "26 de Diciembre, SAN ESTEBAN, PROTOMÁRTIR.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 6, 8-10; 7, 54-60"},
        {"tipo": "Salmo",           "cita": "Salmo 30, 3cd-4. 6 y 8ab. 16bc-17"},
        {"tipo": "Evangelio",       "cita": "Mateo 10, 17-22"}]}},],

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 27 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_27_dic": [{"A": {"titulo": "27 de Diciembre, SAN JUAN, APÓSTOL Y EVANGELISTA","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 1, 1-4"},
        {"tipo": "Salmo",           "cita": "Salmo 96, 1-2. 5-6. 11-12"},
        {"tipo": "Evangelio",       "cita": "Juan 20, 2-8"}]}},],

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 28 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_28_dic": [{"A": {"titulo": "28 de Diciembre, LOS SANTOS INOCENTES, MÁRTIRES","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 1, 5—2, 2"},
        {"tipo": "Salmo",           "cita": "Salmo 123, 2-3. 4-5. 7b-8"},
        {"tipo": "Evangelio",       "cita": "Mateo 2, 13-18"}]}},],

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 29 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_29_dic": {"A": {"titulo": "29 de Diciembre: 5º día de la octava de Navidad.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 2, 3-11"},
        {"tipo": "Salmo",           "cita": "Salmo 95, 1-2a. 2b-3. 5b-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 2, 22-35"}],},},

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 30 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_30_dic": {"A": {"titulo": "30 de Diciembre: 6º día de la octava de Navidad.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Juan 2, 12-17"},
        {"tipo": "Salmo",           "cita": "Salmo 95, 7-8a. 8b-9. 10"},
        {"tipo": "Evangelio",       "cita": "Lucas 2, 36-40"}],},},

/*
╔════════════════════════════════════╗
║  OCTAVA DE NAVIDAD - 31 DICIEMBRE  ║
╚════════════════════════════════════╝*/ 
    "navidad_31_dic": {"A": {"titulo": "31 de Diciembre: 7º día de la octava de Navidad.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 2, 18-21"},
        {"tipo": "Salmo",           "cita": "Salmo 95, 1-2. 11-12. 13-14"},
        {"tipo": "Evangelio",       "cita": "Juan 1, 1-18"}],},},

/*
╔══════════════════════════════════════════╗
║  1 DE ENERO - SANTA MARIA MADRE DE DIOS  ║
╚══════════════════════════════════════════╝*/
    "navidad_1_ene": {"A": {"titulo": "1º Enero, Santa María Madre de Dios, Octava de la Natividad del Señor, Navidad","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Números 6, 22-27"},
        {"tipo": "Salmo",           "cita": "salmo 66, 2-3. 5. 6 y 8"},
        {"tipo": "2ª Lectura",      "cita": "Gálatas 4, 4-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 2, 16-21"}],},},

/*
╔════════════════════════════════════════════════════════════╗
║  2 DE ENERO - Antes de la epifania                         ║
║  2 DE ENERO - San Basilio Magno y san Gregorio Nacianceno  ║
╚════════════════════════════════════════════════════════════╝*/
    "navidad_2_ene": [
        {"A": {"titulo": "2 de Enero, Antes de la epifania, Ciclo A,B,C.","lecturas": [
                    {"tipo": "1ª Lectura",  "cita": "1 Juan 2, 22-28"},
                    {"tipo": "Salmo",       "cita": "Salmo 97, 1-2ab. 2cd-3ab. 3cd-4"},
                    {"tipo": "Evangelio",   "cita": "Juan 1, 19-28"}]}},
        {"A": {"titulo": "2 de Enero, San Basilio Magno y san Gregorio Nacianceno, obispos y doctores de la Iglesia","lecturas": [
                    {"tipo": "1ª Lectura",  "cita": "Efesios 4, 1-7. 11-13"},
                    {"tipo": "Salmo",       "cita": "Salmo 22, 1-3. 4. 5. 6"},
                    {"tipo": "Evangelio",   "cita": "Mateo 23, 8-12"}]}}],

/*
╔═════════════════════════════════════╗
║  3 DE ENERO - Antes de la epifania  ║
╚═════════════════════════════════════╝*/
    "navidad_3_ene": {"A": {"titulo": "3 de Enero, Antes de la epifania, Ciclo.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 2, 29—3, 6"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1-2ab. 3cd-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Juan 1, 29-34"}],},},

/*
╔═════════════════════════════════════╗
║  4 DE ENERO - Antes de la epifania  ║
╚═════════════════════════════════════╝*/
    "navidad_4_ene": {"A": {"titulo": "4 de Enero, Antes de la epifania, Ciclo A,B,C.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 3, 7-10"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1-2ab. 7-8a. 8b-9"},
        {"tipo": "Evangelio",       "cita": "Juan 1, 35-42"}],},},

/*
╔═════════════════════════════════════╗
║  5 DE ENERO - Antes de la epifania  ║
╚═════════════════════════════════════╝*/
    "navidad_5_ene": {"A": {"titulo": "5 de Enero, Antes de la epifania, Ciclo A,B,C.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Juan 3, 11-21"},
        {"tipo": "Salmo",           "cita": "Salmo 99, 1-2. 3. 4. 5"},
        {"tipo": "Evangelio",       "cita": "Juan 1, 43-51"}],},},

//  En otro paises la epifania se celebra Domingo, RD lo celebra el 6 de enero.
//Esta tiene dos opciones para el día y propio de los santos
/*
╔═══════════════════════════════════╗
║  6 DE ENERO - Epifania del Señor  ║
╚═══════════════════════════════════╝*/
    "navidad_6_ene": [
        {"A": {"titulo": "6 de Enero, Epifanía del Señor, Ciclo A,B,C.","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 60, 1-6"},
                {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 7-8. 10-11. 12-13"},
                {"tipo": "2ª Lectura",      "cita": "Efesios 3, 2-3a. 5-6"},
                {"tipo": "Evangelio",       "cita": "Mateo 2, 1-12"}]}},
        {"A": {"titulo": "6 de Enero, Antes de Epifanía","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "1 Juan 5, 5-13"},
                {"tipo": "Salmo",       "cita": "Salmo 147,12-13.14-15. 19-20"},
                {"tipo": "Evangelio",   "cita": "Marcos 1, 7-11 o Lucas 3, 23-38 o Lucas 3, 23. 31-34. 36. 38"}]}}],
/*******************************************************************************************/

/*
╔═════════════════════════════════════════════════╗
║  7 DE ENERO - después de la Epifania del Señor  ║
╚═════════════════════════════════════════════════╝*/
//Esta tiene dos opciones para el día y propio de los santos
    "navidad_7_ene": [
        {"A": {"titulo": "7 de Enero, después de la epifania, Ciclo A,B,C.","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "1 Juan 5, 14-21"},
                {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
                {"tipo": "Evangelio",       "cita": "Juan 2, 1-12"}]}},
        {"A": {"titulo": "7 de Enero, San Raimundo de Peñafort, presbítero","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "2 Corintios 5, 14-20"},
                {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 3-4. 8-9. 13-14. 17-18a"},
                {"tipo": "Evangelio",   "cita": "Lucas 12, 35-40"}]}}],
/*******************************************************************************************/

/*
╔═════════════════════════════════════════════════╗
║  8 DE ENERO - después de la Epifania del Señor  ║
╚═════════════════════════════════════════════════╝*/
    "navidad_8_ene": {"A": {"titulo": "8 de Enero, después de la epifania.","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Juan 4, 7-10"},
        {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 3-4ab. 7-8"},
        {"tipo": "Evangelio",       "cita": "Marcos 6, 34-44"}],},},


//Esta tiene dos opciones para el día y propio de los santos
/*
╔═════════════════════════════════════════════════╗
║  9 DE ENERO - después de la Epifania del Señor  ║
╚═════════════════════════════════════════════════╝*/
    "navidad_9_ene": [
        {"A": {"titulo": "9 de Enero, después de la epifania, Ciclo A,B,C, Par/Impar","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "1 Juan 4, 11-18"},
            {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 10-11. 12-13"},
            {"tipo": "Evangelio",       "cita": "Marcos 6, 45-52"}]}},
        {"A": {"titulo": "9 de Enero, San Eulogio de Córdoba, presbítero y mártir","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Filipenses 1, 21-30"},
            {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 10-11. 12-13"},
            {"tipo": "Evangelio",       "cita": "Marcos 6, 45-52"}]}}],

/*
╔══════════════════════════════════════════════════╗
║  10 DE ENERO - después de la Epifania del Señor  ║
╚══════════════════════════════════════════════════╝*/
    "navidad_10_ene": {"A": {"titulo": "10 de Enero, después de la epifania, Ciclo A,B,C, Par/Impar","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Juan 4, 19—5, 4"},
        {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 14 y 15bc. 17"},
        {"tipo": "Evangelio",       "cita": "Lucas 4, 14-22a"}],},},

/*
╔══════════════════════════════════════════════════╗
║  11 DE ENERO - después de la Epifania del Señor  ║
╚══════════════════════════════════════════════════╝*/
    "navidad_11_ene": {"A": {"titulo": "11 de Enero, después de la epifania, Ciclo A,B,C, Par/Impar","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Juan 5, 5-13"},
        {"tipo": "Salmo",           "cita": "Salmo 147, 12-13. 14-15. 19-20"},
        {"tipo": "Evangelio",       "cita": "Lucas 5, 12-16"}],},},

/*
╔══════════════════════════════════════════════════╗
║  12 DE ENERO - después de la Epifania del Señor  ║
╚══════════════════════════════════════════════════╝*/
    "navidad_12_ene": {"A": {"titulo": "12 de Enero, después de la epifania, Ciclo A,B,C, Par/Impar","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Juan 5, 14-21"},
        {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
        {"tipo": "Evangelio",       "cita": "Juan 3, 22-30"}],},},

/*           BOCETO
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO ADVIENTO - DIAS DE LA SEMANA 4 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "adviento_s4_lu": {"A": {"titulo": "Lunes 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},
/*MARTES*/      "adviento_s4_ma": {"A": {"titulo": "Martes 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},
/*MIERCOLES*/   "adviento_s4_mi": {"A": {"titulo": "Miércoles 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},
/*JUEVES*/     "adviento_s4_ju": {"A": {"titulo": "Jueves 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},
/*VIERNES*/     "adviento_s4_vi": {"A": {"titulo": "Viernes 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},
/*SABADO*/     "adviento_s4_sa": {"A": {"titulo": "Sábado 4º de Adviento Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": ""},
                    {"tipo": "Salmo",           "cita": ""},
                    {"tipo": "Evangelio",       "cita": ""}],},},

/*___    ____    ____    ___   _   _     ___     ____     ___    ___
 / _ \  |  _ \  |  _ \  |_ _| | \ | |   / _ \   |  _ \   |_ _|  / _ \
| (_) | |  _ <  | |_) |  | |  |  \| |  / ___ \  |  _ <    | |  | (_) |
 \___/  |_| \_\ |____/  |___| |_|\__| /_/   \_\ |_| \_\  |___|  \___/  */

/************************************************\
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 1 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/ 
  "ordinario_s1_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 42, 1-4. 6-7"},
        {"tipo": "Salmo",           "cita": "Salmo 28, 1a y 2. 3ac-4. 3b y 9b-10"},
        {"tipo": "2ª Lectura",      "cita": "Hechos de los Apóstoles 10, 34-38"},
        {"tipo": "Evangelio",       "cita": "Mateo 3, 13-17"}
        ],"titulo": "Bautismo del Señor Ciclo A"},
    "B": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 42, 1-4. 6-7"},
        {"tipo": "Salmo",           "cita": "Salmo 28, 1a y 2. 3ac-4. 3b y 9b-10"},
        {"tipo": "2ª Lectura",      "cita": "Hechos de los Apóstoles 10, 34-38"},
        {"tipo": "Evangelio",       "cita": "Marcos 1, 7-11"}
        ],"titulo": "Bautismo del Señor Ciclo B"},
    "C": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 42, 1-4. 6-7"},
        {"tipo": "Salmo",           "cita": "Salmo 28, 1a y 2. 3ac-4. 3b y 9b-10"},
        {"tipo": "2ª Lectura",      "cita": "Hechos de los Apóstoles 10, 34-38"},
        {"tipo": "Evangelio",       "cita": "Lucas 3, 15-16. 21-22"}
        ],"titulo": "Bautismo del Señor Ciclo C"}
  },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 2 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/ 
    "ordinario_s2_do": {
        "A": {"lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Isaías 49, 3. 5-6"},
            {"tipo": "Salmo",           "cita": "Salmo 39, 2 y 4ab, 7-8a. 8b-9. 10"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 1, 1-3"},
            {"tipo": "Evangelio",       "cita": "Juan 1, 29-34"}
            ],"titulo": "Domingo de la 2ª semana del Tiempo Ordinario"},
        "B": {"lecturas": [
            {"tipo": "1ª Lectura",      "cita": "1 Samuel 3, 3b-10. 19"},
            {"tipo": "Salmo",           "cita": "Salmo 39, 2 y 4ab. 7. 8-9. 10"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 6, 13c-15a. 17-20"},
            {"tipo": "Evangelio",       "cita": "Juan 1, 35-42"}
            ],"titulo": "Domingo de la 2ª semana del Tiempo Ordinario"},
        "C": {"lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Isaías 62, 1-5"},
            {"tipo": "Salmo",           "cita": "Salmo 95, 1-2a. 2b-3. 7-8a. 9-10"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 12, 4-11"},
            {"tipo": "Evangelio",       "cita": "Juan 2, 1-11"}
            ],"titulo": "Domingo de la 2ª semana del Tiempo Ordinario"}
        },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 3 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/ 
    "ordinario_s3_do": {
        "A": {"titulo": "Domingo de la 3ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Isaías 8, 23b—9, 3"},
            {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 13-14"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 1, 10-13. 17"},
            {"tipo": "Evangelio",       "cita": "Mateo 4, 12-23"}],},
        "B": {"titulo": "Domingo de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "1 Samuel 3, 3b-10. 19"},
            {"tipo": "Salmo",           "cita": "Salmo 39, 2 y 4ab. 7. 8-9. 10"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 6, 13c-15a. 17-20"},
            {"tipo": "Evangelio",       "cita": "Juan 1, 35-42"}],},
        "C": {"titulo": "Domingo de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Isaías 62, 1-5"},
            {"tipo": "Salmo",           "cita": "Salmo 95, 1-2a. 2b-3. 7-8a. 9-10"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 12, 4-11"},
            {"tipo": "Evangelio",       "cita": "Juan 2, 1-11"}],}
  },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 4 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/      "ordinario_s4_do": {
        "A": {"lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Sofonías 2, 3; 3, 12-13"},
            {"tipo": "Salmo",           "cita": "Salmo 145, 7. 8-9a. 9bc-10 (R.: Mt 5, 13)"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 1, 26-31"},
            {"tipo": "Evangelio",       "cita": "Mateo 5, 1-12a"}
            ],"titulo": "Domingo de la 4ª semana del Tiempo Ordinario"}
        },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 5 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/      "ordinario_s5_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 58, 7-10"},
                {"tipo": "Salmo",           "cita": "Salmo 111, 4-5. 6-7. 8a y 9 (R.: 4a)"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 2, 1-5"},
                {"tipo": "Evangelio",       "cita": "Mateo 5, 13-16"}
            ],"titulo": "Domingo de la 5ª semana del Tiempo Ordinario"}
        },
/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 6 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/      "ordinario_s6_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Sirácida 15, 16-21"},
                {"tipo": "Salmo",           "cita": "Salmo 118, 1-2. 4-5. 17-18. 33-34 (R.: 1b)"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 2, 6-10"},
                {"tipo": "Evangelio",       "cita": "Mateo 5, 17-37"}
                ],"titulo": "Domingo de la 6ª semana del Tiempo Ordinario"}
        },
/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 7 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/      "ordinario_s7_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Levítico  19, 1-2. 17-18"},
                {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 3-4. 8 y 10. 12-13 (R.: 8a)"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 3, 16-23"},
                {"tipo": "Evangelio",       "cita": "Mateo 5, 38-48"}
                ],"titulo": "Domingo de la 7ª semana del Tiempo Ordinario"}
        },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 8 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/          "ordinario_s8_do": {
                "A": {"lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 49, 14-15"},
                    {"tipo": "Salmo",           "cita": "salmo 61, 2-3. 6-7. 8-9ab"},
                    {"tipo": "2ª Lectura",      "cita": "1 Corintios 4, 1-5"},
                    {"tipo": "Evangelio",       "cita": "Mateo 6, 24-34"}
                    ],"titulo": "Domingo de la 8ª semana del Tiempo Ordinario"}
            },

/*
╔═════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 9 DOMINGO CICLO ABC  ║
╚═════════════════════════════════════════════════╝
*/      "ordinario_s9_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Deuteronomio 11, 18. 26-28. 32"},
                {"tipo": "Salmo",           "cita": "Salmo 30, 2-3a. 3bc-4. 17 y 25 (R.: 3b)"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 3, 21-25a. 28"},
                {"tipo": "Evangelio",       "cita": "Mateo 7, 21-27"}
                ],"titulo": "Domingo de la 9ª semana del Tiempo Ordinario"}
        },

/*
╔══════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 10 DOMINGO CICLO ABC  ║
╚══════════════════════════════════════════════════╝
*/      "ordinario_s10_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Oseas 6, 3-6"},
                {"tipo": "Salmo",           "cita": "Salmo 49, 1 y 8. 12-13. 14-15 (R.: 23b)"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 4, 18-25"},
                {"tipo": "Evangelio",       "cita": "Mateo 9, 9-13"}
                ],"titulo": "Domingo de la 10ª semana del Tiempo Ordinario"}
        },
/*
╔══════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SEMANA 11 DOMINGO CICLO ABC  ║
╚══════════════════════════════════════════════════╝
*/      "ordinario_s11_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Éxodo 19, 2-6a"},
                {"tipo": "Salmo",           "cita": "Salmo 99, 2. 3. 5 (R.: 3c)"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 5, 6-11"},
                {"tipo": "Evangelio",       "cita": "Mateo 9, 36—10, 8"}
                ],"titulo": "Domingo de la 11ª semana del Tiempo Ordinario"}
        },

// TIEMPO ORDINARIO - SEMANA 12 DOMINGO
      "ordinario_s12_do": {
    "A": {"titulo": "Domingo de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Jeremías 20, 10-13"},
        {"tipo": "Salmo",           "cita": "Salmo 68, 8-10. 14 y 17. 33-35"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 5, 12-15"},
        {"tipo": "Evangelio",       "cita": "Mateo 10, 26-33"}],}},

  "ordinario_s13_do": {
    "A": {"titulo": "Domingo de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "2 Reyes 4, 8-11. 14-16a"},
        {"tipo": "Salmo",           "cita": "Salmo 88, 2-3. 16-17. 18-19"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 6, 3-4. 8-11"},
        {"tipo": "Evangelio",       "cita": "Mateo 10, 37-42"}],}},

    "ordinario_s14_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Zacarías 9, 9-10"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 1-2. 8-9. 10-11. 13cd-14 (R.: cf. 1)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 8, 9. 11-13"},
        {"tipo": "Evangelio",       "cita": "Mateo 11, 25-30"}
        ],"titulo": "Domingo de la 14ª semana del Tiempo Ordinario"}
  },
  "ordinario_s15_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 55, 10-11"},
        {"tipo": "Salmo",           "cita": "Salmo 64, 10. 11. 12-13. 14 (R.: Lc 8, 8)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 8, 18-23"},
        {"tipo": "Evangelio",       "cita": "Mateo 13, 1-23"}
        ],"titulo": "Domingo de la 15ª semana del Tiempo Ordinario"}
  },


  "ordinario_s16_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "sabiduria 12, 13. 16-19"},
        {"tipo": "Salmo",           "cita": "Salmo 85, 5-6. 9-10. 15-16a (R.: 5a)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 8, 26-27"},
        {"tipo": "Evangelio",       "cita": "Mateo 13, 24-43"}
        ],"titulo": "Domingo de la 16ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 17 DOMINGO
  "ordinario_s17_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Reyes 3, 5. 7-12"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 57 y 72. 76-77. 127-128. 129-130"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 8, 28-30"},
        {"tipo": "Evangelio",       "cita": "Mateo 13, 44-52"}
        ],"titulo": "Domingo de la 17ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 18 DOMINGO
  "ordinario_s18_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 55, 1-3"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 8-9. 15-16. 17-18 (R.: cf. 16)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 8, 35. 37-39"},
        {"tipo": "Evangelio",       "cita": "Mateo 14, 13-21"}
        ],"titulo": "Domingo de la 18ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 19 DOMINGO
    "ordinario_s19_do": {
    "A": {
      "lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Reyes 19, 9a. 11-13a"    },
        {"tipo": "Salmo",           "cita": "Salmo 84, 9ab-10. 11-12. 13-14 (R.: 8)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 9, 1-5"},
        {"tipo": "Evangelio",       "cita": "Mateo 14, 22-33"}
      ],"titulo": "Domingo de la 19ª semana del Tiempo Ordinario"
    }
  },

// TIEMPO ORDINARIO - SEMANA 20 DOMINGO
  "ordinario_s20_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 56, 1. 6-7"},
        {"tipo": "Salmo",           "cita": "Salmo 66, 2-3. 5. 6 y 8 (R.: 4)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 11, 13-15. 29-32"},
        {"tipo": "Evangelio",       "cita": "Mateo 15, 21-28"}
        ],"titulo": "Domingo de la 20ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 21 DOMINGO
  "ordinario_s21_do": {
    "A": {
      "lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 22, 19-23"},
        {"tipo": "Salmo",           "cita": "Salmo 137, 1-2a. 2bc-3. 6 y 8bc"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 11, 33-36"},
        {"tipo": "Evangelio",       "cita": "Mateo 16, 13-20"}
      ],"titulo": "Domingo de la 21ª semana del Tiempo Ordinario"
    }
  },

// TIEMPO ORDINARIO - SEMANA 22 DOMINGO
  "ordinario_s22_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Jeremías 20, 7-9"},
        {"tipo": "Salmo",           "cita": "Salmo 62, 2. 3-4. 5-6. 8-9 (R.:2b)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 12, 1-2"},
        {"tipo": "Evangelio",       "cita": "Mateo 16, 21-27"}
        ],"titulo": "Domingo de la 22ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 23 DOMINGO
  "ordinario_s23_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Ezequiel 33, 7-9"},
        {"tipo": "Salmo",           "cita": "Salmo 94, 1-2. 6-7. 8-9 (R.: 8)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 13, 8-10"},
        {"tipo": "Evangelio",       "cita": "Mateo 18, 15-20"}
        ],"titulo": "Domingo de la 23ª semana del Tiempo Ordinario"}
  },

// TIEMPO ORDINARIO - SEMANA 24 DOMINGO
  "ordinario_s24_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sirácida 27, 33—28, 9"},
        {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 3-4. 9-10. 11-12 (R.: 8)"},
        {"tipo": "2ª Lectura",      "cita": "Romanos 14, 7-9"},
        {"tipo": "Evangelio",       "cita": "Mateo 18, 21-35"}
        ],"titulo": "Domingo de la 24ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 25 DOMINGO
  "ordinario_s25_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 55, 6-9"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 2-3. 8-9. 17-18 (R.: 18a)"},
        {"tipo": "2ª Lectura",      "cita": "Filipenses 1, 20c-24. 27a"},
        {"tipo": "Evangelio",       "cita": "Mateo 20, 1-16"}
        ],"titulo": "Domingo de la 25ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 26 DOMINGO
  "ordinario_s26_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Ezequiel 18, 25-28"},
        {"tipo": "Salmo",           "cita": "Salmo 24, 4bc-5. 6-7. 8-9 (R.: 6a)"},
        {"tipo": "2ª Lectura",      "cita": "Filipenses 2, 1-11 / Filipenses 2, 1-5"},
        {"tipo": "Evangelio",       "cita": "Mateo 21, 28-32"}
        ],"titulo": "Domingo de la 26ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 27 DOMINGO
    "ordinario_s27_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 5, 1-7"},
        {"tipo": "Salmo",           "cita": "Salmo 79, 9 y 12. 13-14. 15-16. 19-20"},
        {"tipo": "2ª Lectura",      "cita": "Filipenses 4, 6-9"},
        {"tipo": "Evangelio",       "cita": "Mateo 21, 33-43"}
        ],"titulo": "Domingo de la 27ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 28 DOMINGO
    "ordinario_s28_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 25, 6-10a"},
        {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6 (R.: 6cd)"},
        {"tipo": "2ª Lectura",      "cita": "Filipenses 4, 12-14. 19-20"},
        {"tipo": "Evangelio",       "cita": "Mateo 22, 1-14"}
        ],"titulo": "Domingo de la 28ª semana del Tiempo Ordinario"}
      },
      
// TIEMPO ORDINARIO - SEMANA 29 DOMINGO
  "ordinario_s29_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 45, 1. 4-6"},
        {"tipo": "Salmo",           "cita": "Salmo 95, 1 y 3. 4-5. 7-8. 9-10a y c (R.: 7b)"},
        {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 1, 1-5b"},
        {"tipo": "Evangelio",       "cita": "Mateo 22, 15-21"}
        ],"titulo": "Domingo de la 29ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 30 DOMINGO
  "ordinario_s30_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Éxodo 22, 20-26"},
        {"tipo": "Salmo",           "cita": "Salmo 17, 2-3a. 3bc-4. 47 y 51ab (R.: 2)"},
        {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 1, 5c-10"},
        {"tipo": "Evangelio",       "cita": "Mateo 22, 34-40"}
        ],"titulo": "Domingo de la 30ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 31 DOMINGO
  "ordinario_s31_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Lectura de la profecía de Malaquías 1, 14b—2, 2b. 8-10"},
        {"tipo": "Salmo",           "cita": "Salmo 130, 1. 2. 3"},
        {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 2, 7b-9. 13"},
        {"tipo": "Evangelio",       "cita": "Mateo 23, 1-12"}
        ],"titulo": "Domingo de la 31ª semana del Tiempo Ordinario"}
      },

// TIEMPO ORDINARIO - SEMANA 32 DOMINGO
  "ordinario_s32_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "sabiduría 6, 12-16"},
        {"tipo": "Salmo",           "cita": "Salmo 62, 2. 3-4. 5-6. 7-8 (R.: 2b)"},
        {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 4, 13-18"},
        {"tipo": "Evangelio",       "cita": "Mateo 25, 1-13"}
        ],"titulo": "Domingo de la 32ª semana del Tiempo Ordinario"}
    },

// TIEMPO ORDINARIO - SEMANA 33 DOMINGO
      "ordinario_s33_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Proverbios 31, 10-13. 19-20. 30-31"},
        {"tipo": "Salmo",           "cita": "Salmo 127, 1-2. 3. 4-5 (R.: 1a)"},
        {"tipo": "2ª Lectura",      "cita": "1 Tesalonicenses 5, 1-6"},
        {"tipo": "Evangelio",       "cita": "Mateo 25, 14-30"}
        ],"titulo": "Domingo de la 33ª semana del Tiempo Ordinario"}
    },

// TIEMPO ORDINARIO - SEMANA 34 DOMINGO
  "ordinario_s34_do": {
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Ezequiel 34, 11-12. 15-17"},
        {"tipo": "Salmo",           "cita": "salmo 22, 1-2a. 2b-3. 5-6"},
        {"tipo": "2ª Lectura",      "cita": "1 Corintios 15, 20-26. 28"},
        {"tipo": "Evangelio",       "cita": "Mateo 25, 31-46"}
        ],"titulo": "Domingo de la 34ª semana del Tiempo Ordinario"}
    },
/*___   _   _    ___     ____    _____   ___   __  __     ___
 / __| | | | |  / _ \   |  _ \  | ____| / __| |  \/  |   / _ \
| (__  | |_| | / ___ \  |  _ <  |  _|   \__ \ | |\/| |  / ___ \
 \___|  \___/ /_/   \_\ |_| \_\ |_____| |___/ |_|  |_| /_/   \_\
╔══════════════════════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - MIERCOLES DE CENIZA, CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════════╝*/ 
/*MIERCOLES*/   "cuaresma_mc_mi": {"A": {"titulo": "Miércoles de Ceniza, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Joel 2, 12-18"},
                    {"tipo": "Salmo",           "cita": "Salmo 50, 3-4. 5-6a. 12-13. 14 y 17"},
                    {"tipo": "2ª Lectura",      "cita": "2 Corintios 5, 20—6, 2"},
                    {"tipo": "Evangelio",       "cita": "Mateo 6, 1-6. 16-18"}],},},
/*JUEVES*/     "cuaresma_mc_ju": {"A": {"titulo": "Jueves después de Cenizas, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Deuteronomio 30, 15-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
                    {"tipo": "Evangelio",       "cita": "Lucas 9, 22-25"}],},},
/*VIERNES*/     "cuaresma_mc_vi": {"A": {"titulo": "Viernes después de Cenizas, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 58, 1-9a"},
                    {"tipo": "Salmo",           "cita": "Salmo 50, 3-4. 5-6a. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Mateo 9, 14-15"}],},},
/*SABADO*/     "cuaresma_mc_sa": {"A": {"titulo": "Sábado después de Cenizas, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 58, 9b-14"},
                    {"tipo": "Salmo",           "cita": "Salmo 85, 1-2. 3-4. 5-6"},
                    {"tipo": "Evangelio",       "cita": "Lucas 5, 27-32"}],},},

/*
╔════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - SEMANA 1 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "cuaresma_s1_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Génesis 2, 7-9; 3, 1-7"},
                {"tipo": "Salmo",           "cita": "Salmo 50, 3-4. 5-6a. 12-13. 14 y 17"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 5, 12-19 / Romanos 5, 12. 17-19"},
                {"tipo": "Evangelio",       "cita": "Mateo 4, 1-11"}
                ],"titulo": "Primer Domingo de Cuaresma"},
            "B": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Génesis 9, 8-15"},
                {"tipo": "Salmo",           "cita": "Salmo 24, 4bc-5ab. 6-7bc. 8-9"},
                {"tipo": "2ª Lectura",      "cita": "1 Pedro 3, 18-22"},
                {"tipo": "Evangelio",       "cita": "Marcos 1, 12-15"}
                ],"titulo": "Segundo Domingo de Cuaresma"},
            "C": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Deuteronomio 26, 4-10"},
                {"tipo": "Salmo",           "cita": "Salmo 90, 1-2. 10-11. 12-13. 14-15"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 10, 8-13"},
                {"tipo": "Evangelio",       "cita": "Lucas 4, 1-13"}
                ],"titulo": "Tercer Domingo de Cuaresma"}
        },

/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - DIAS DE LA SEMANA 1 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "cuaresma_s1_lu": {"A": {"titulo": "Lunes de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Levítico 19, 1-2. 11-18"},
                    {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10. 15"},
                    {"tipo": "Evangelio",       "cita": "Mateo 25, 31-46"}],},},
/*MARTES*/      "cuaresma_s1_ma": {"A": {"titulo": "Martes de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 55, 10-11"},
                    {"tipo": "Salmo",           "cita": "Salmo 33, 4-5. 6-7. 16-17. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Mateo 6, 7-15"}],},},
/*MIERCOLES*/   "cuaresma_s1_mi": {"A": {"titulo": "Miércoles de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jonás 3, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 50, 3-4. 12-13. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Lucas 11, 29-32"}],},},

/*JUEVES*/     "cuaresma_s1_ju": {"A": {"titulo": "Jueves de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Ester 14, 1. 3-5. 12-14"},
                    {"tipo": "Salmo",           "cita": "Salmo 137, 1-2a. 2bc y 3. 7c-8"},
                    {"tipo": "Evangelio",       "cita": "Mateo 7, 7-12"}],},},
                    
/*VIERNES*/     "cuaresma_s1_vi": {"A": {"titulo": "Viernes de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Ezequiel 18, 21-28"},
                    {"tipo": "Salmo",           "cita": "Salmo 129, 1-2. 3-4. 5-7a. 7bc-8"},
                    {"tipo": "Evangelio",       "cita": "Mateo 5, 20-26"}],},},
/*SABADO*/     "cuaresma_s1_sa": {"A": {"titulo": "Sábado de la 1º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Deuteronomio 26, 16-19"},
                    {"tipo": "Salmo",           "cita": "Salmo 118, 1-2. 4-5. 7-8"},
                    {"tipo": "Evangelio",       "cita": "Mateo 5, 43-48"}],},},



/*
╔════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - SEMANA 2 DOMINGO CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/      "cuaresma_s2_do": {
            "A": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Génesis 12, 1-4"},
                {"tipo": "Salmo",           "cita": "Salmo 32, 4-5. 18-19. 20 y 22"},
                {"tipo": "2ª Lectura",      "cita": "Timoteo 1, 8b-10"},
                {"tipo": "Evangelio",       "cita": "Mateo 17, 1-9"}
                ],"titulo": "Segundo domingo de Cuaresma"},
            "B": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Génesis 22, 1-2. 9-13. 15-18"},
                {"tipo": "Salmo",           "cita": "Salmo 115, 10 y 15. 16-17. 18-19"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 8, 31b-34"},
                {"tipo": "Evangelio",       "cita": "Marcos 9, 2-10"}
                ],"titulo": "Segundo domingo de Cuaresma"},
            "C": {"lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Génesis 15, 5-12. 17-18"},
                {"tipo": "Salmo",           "cita": "Salmo 26, 1. 7-8a. 8b-9abc. 13-14"},
                {"tipo": "2ª Lectura",      "cita": "Filipenses 3, 17—4, 1 o Filipenses 3, 20—4, 1"},
                {"tipo": "Evangelio",       "cita": "Lucas 9, 28b-36"}
                ],"titulo": "Segundo domingo de Cuaresma"}
            
        },


/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - DIAS DE LA SEMANA 2 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "cuaresma_s2_lu": {"A": {"titulo": "Lunes de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Daniel 9, 4b-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 78, 8. 9.11 y 13"},
                    {"tipo": "Evangelio",       "cita": "Lucas 6, 36-38"}],},},
/*MARTES*/      "cuaresma_s2_ma": {"A": {"titulo": "Martes de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 1, 10. 16-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 49, 8-9. 16bc-17. 21 y 23"},
                    {"tipo": "Evangelio",       "cita": "Mateo 23, 1-12"}],},},
/*MIERCOLES*/   "cuaresma_s2_mi": {"A": {"titulo": "Miércoles de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 18, 18-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 30, 5-6. 14.15-16"},
                    {"tipo": "Evangelio",       "cita": "Mateo 20, 17-28"}],},},
/*JUEVES*/     "cuaresma_s2_ju": {"A": {"titulo": "Jueves de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 17, 5-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
                    {"tipo": "Evangelio",       "cita": "Lucas 16, 19-31"}],},},
/*VIERNES*/     "cuaresma_s2_vi": {"A": {"titulo": "Viernes de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Génesis 37, 3-4. 12-13a. 17b-28"},
                    {"tipo": "Salmo",           "cita": "Salmo 104, 16-17. 18-19. 20-21"},
                    {"tipo": "Evangelio",       "cita": "Mateo 21, 33-43.4 5-46"}],},},
/*SABADO*/     "cuaresma_s2_sa": {"A": {"titulo": "Sábado de la 2º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Miqueas 7, 14-15. 18-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 3-4. 9-10. 11-12"},
                    {"tipo": "Evangelio",       "cita": "Lucas 15, 1-3. 11-32"}],},},


/*
╔═══════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA 3 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════════╝
*/      "cuaresma_s3_do": {
            "A": {"titulo": "Tercer domingo de Cuaresma, Ciclo A","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Éxodo 17, 3-7"},
                {"tipo": "Salmo",           "cita": "Salmo 94, 1-2. 6-7. 8-9"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 5, 1-2. 5-8"},
                {"tipo": "Evangelio",       "cita": "Juan 4, 5-42 o Juan 4, 15. 19b-26. 39a. 40-42"}],},
            "B": {"titulo": "Tercer domingo de Cuaresma, Ciclo B","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Éxodo 20, 1-17 o Éxodo 20, 1-3. 7-8. 12-17"},
                {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10. 11"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 1, 22-25"},
                {"tipo": "Evangelio",       "cita": "Juan 2, 13-25."}],},
            "C": {"titulo": "Tercer domingo de Cuaresma, Ciclo C","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Éxodo 3, 1-8a. 13-15"},
                {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 3-4. 6-7. 8 y 11"},
                {"tipo": "2ª Lectura",      "cita": "1 Corintios 10, 1-6. 10-12"},
                {"tipo": "Evangelio",       "cita": "Lucas 13, 1-9"}],}
        },


/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - DIAS DE LA SEMANA 3 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LIBREELECCION*/"cuaresma_s3_le": {"A": {"titulo": "Misa de libre Elección de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Éxodo 17, 1-7"},
                    {"tipo": "Salmo",           "cita": "Salmo 94, 1-2. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Juan 4, 5-42"}],},},
/*LUNES*/       "cuaresma_s3_lu": {"A": {"titulo": "Lunes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "2 Reyes 5, 1-15a"},
                    {"tipo": "Salmo",           "cita": "Salmo 41, 2. 3; 42, 3. 4"},
                    {"tipo": "Evangelio",       "cita": "Lucas 4, 24-30"}],},},
/*MARTES*/      "cuaresma_s3_ma": {"A": {"titulo": "Martes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Daniel 3, 25. 34-43"},
                    {"tipo": "Salmo",           "cita": "Salmo 24, 4-5ab. 6 y 7bc. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Mateo 18, 21-35"}],},},
/*MIERCOLES*/   "cuaresma_s3_mi": {"A": {"titulo": "Miércoles de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Deuteronomio 4, 1. 5-9"},
                    {"tipo": "Salmo",           "cita": "Salmo 147,12-13.15-16. 19-20"},
                    {"tipo": "Evangelio",       "cita": "Mateo 5, 17-19"}],},},
/*JUEVES*/     "cuaresma_s3_ju": {"A": {"titulo": "Jueves de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 7, 23-28"},
                    {"tipo": "Salmo",           "cita": "Salmo 94, 1-2. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Lucas 11, 14-23"}],},},
/*VIERNES*/     "cuaresma_s3_vi": {"A": {"titulo": "Viernes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Oseas 14, 2-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 80, 6c-8a. 8bc-9. 10-11ab. 14 y 17"},
                    {"tipo": "Evangelio",       "cita": "Marcos 12, 28b-34"}],},},
/*SABADO*/     "cuaresma_s3_sa": {"A": {"titulo": "Sábado de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Oseas 6, 1-6"},
                    {"tipo": "Salmo",           "cita": "Salmo 50, 3-4. 18-19. 20-21"},
                    {"tipo": "Evangelio",       "cita": "Lucas 18, 9-14"}],},},

/*
╔═══════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA 4 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════════╝
*/      "cuaresma_s4_do": {
            "A": {"titulo": "Cuarto domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Samuel 16, 1b. 6-7. 10-13a"},
                {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
                {"tipo": "2ª Lectura",      "cita": "Efesios 5, 8-14"},
                {"tipo": "Evangelio",       "cita": "Juan 9, 1-41 o Juan 9, 1. 6-9. 13-17. 34-38"}],},
            "B": {"titulo": "Cuarto domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "2 Crónicas 36, 14-16. 19-23"},
                {"tipo": "Salmo",           "cita": "Salmo 136, 1-2. 3. 4. 5. 6"},
                {"tipo": "2ª Lectura",      "cita": "Efesios 2, 4-10"},
                {"tipo": "Evangelio",       "cita": "Juan 3, 14-21"}]},
            "C": {"titulo": "Cuarto domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Josué 5, 9a. 10-12"},
                {"tipo": "Salmo",           "cita": "Salmo 33, 2-3. 4-5. 6-7"},
                {"tipo": "2ª Lectura",      "cita": "2 Corintios 5, 17-21"},
                {"tipo": "Evangelio",       "cita": "Lucas 15, 1-3. 11-32"}],}
        },


/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - DIAS DE LA SEMANA 4 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/
/*LIBREELECCION*/"cuaresma_s4_le": {"A": {"titulo": "Misa de libre Elección de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Miqueas 7, 7-9"},
                    {"tipo": "Salmo",           "cita": "Salmo 26, 1. 7-8a. 8b-9abc. 13-14"},
                    {"tipo": "Evangelio",       "cita": "Juan 9, 1-41"}],},},
/*LUNES*/       "cuaresma_s4_lu": {"A": {"titulo": "Lunes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 65, 17-21"},
                    {"tipo": "Salmo",           "cita": "Salmo 29, 2 y 4. 5-6. 11-12a y 13b"},
                    {"tipo": "Evangelio",       "cita": "Juan 4, 43-54"}],},},
/*MARTES*/      "cuaresma_s4_ma": {"A": {"titulo": "Martes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Ezequiel 47, 1-9. 12"},
                    {"tipo": "Salmo",           "cita": "Salmo 45, 2-3. 5-6. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Juan 5, 1-3. 5-16"}],},},
/*MIERCOLES*/   "cuaresma_s4_mi": {"A": {"titulo": "Miércoles de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Isaías 49, 8-15"},
                    {"tipo": "Salmo",           "cita": "Salmo 144, 8-9. 13cd-14. 17-18"},
                    {"tipo": "Evangelio",       "cita": "Juan 5, 17-30"}],},},
/*JUEVES*/     "cuaresma_s4_ju": {"A": {"titulo": "Jueves de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Éxodo 32, 7-14"},
                    {"tipo": "Salmo",           "cita": "Salmo 105, 19-20. 21-22. 23"},
                    {"tipo": "Evangelio",       "cita": "Juan 5, 31-47"}],},},
/*VIERNES*/     "cuaresma_s4_vi": {"A": {"titulo": "Viernes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Sabiduría 2, 1a.12-22"},
                    {"tipo": "Salmo",           "cita": "Salmo 33, 17-18. 19-20. 21 y 23"},
                    {"tipo": "Evangelio",       "cita": "Juan 7, 1-2. 10. 25-30"}],},},
/*SABADO*/     "cuaresma_s4_sa": {"A": {"titulo": "Sábado de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 11, 18-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 7, 2-3. 9bc-10. 11-12"},
                    {"tipo": "Evangelio",       "cita": "Juan 7, 40-53"}],},},

/*
╔═══════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA 5 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════════╝
*/      "cuaresma_s5_do": {
            "A": {"titulo": "Quinto Domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Ezequiel 37, 12-14"},
                {"tipo": "Salmo",           "cita": "Salmo 129, 1-2. 3-4ab. 4c-6. 7-8"},
                {"tipo": "2ª Lectura",      "cita": "Romanos 8, 8-11"},
                {"tipo": "Evangelio",       "cita": "Juan 11, 1-45 o Juan 11, 3-7. 17. 20-27. 33b-45"}],},
            "B": {"titulo": "Quinto Domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Jeremías 31, 31-34"},
                {"tipo": "Salmo",           "cita": "Salmo 50, 3-4, 12-13. 14-15"},
                {"tipo": "2ª Lectura",      "cita": "Hebreos 5, 7-9"},
                {"tipo": "Evangelio",       "cita": "Juan 12, 20-33"}]},
            "C": {"titulo": "Quinto Domingo de Cuaresma", "lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Isaías 43, 16-21"},
                {"tipo": "Salmo",           "cita": "Salmo 125, 1-2ab. 2cd-3. 4-5. 6"},
                {"tipo": "2ª Lectura",      "cita": "Filipenses 3, 8-14"},
                {"tipo": "Evangelio",       "cita": "Juan 8, 1-11"}],}
        },      /*

/*
╔══════════════════════════════════════════════════════════════╗
║  TIEMPO CUARESMA - DIAS DE LA SEMANA 5 CICLO ABC, PAR/IMPAR  ║
╚══════════════════════════════════════════════════════════════╝*/ 
/*LIBREELECCION*/"cuaresma_s5_le": {"A": {"titulo": "Misa de libre Elección de la 5º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "2 Reyes 4, 18b-21. 32-37"},
                    {"tipo": "Salmo",           "cita": "Salmo 16, 1. 6-7. 8b y 15"},
                    {"tipo": "Evangelio",       "cita": "Juan 11, 1-45"}]},},
/*LUNES*/       "cuaresma_s5_lu": {"A": {"titulo": "Lunes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Daniel 13, 1-9. 15-17. 19-30. 33-62 o Daniel 13, 41c - 62"},
                    {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
                    {"tipo": "Evangelio",       "cita": "Juan 8, 1-11 o Juan 8, 12-20"}],},},
/*MARTES*/      "cuaresma_s5_ma": {"A": {"titulo": "Martes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Números 21, 4-9"},
                    {"tipo": "Salmo",           "cita": "Salmo 101, 2-3. 16-18. 19-21"},
                    {"tipo": "Evangelio",       "cita": "Juan 8, 21-30"}],},},
/*MIERCOLES*/   "cuaresma_s5_mi": {"A": {"titulo": "Miércoles de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Daniel 3, 14-20. 91-92. 95"},
                    {"tipo": "Salmo",           "cita": "Daniel 3, 52. 53. 54. 55. 56"},
                    {"tipo": "Evangelio",       "cita": "Juan 8, 31-42"}],},},
/*JUEVES*/     "cuaresma_s5_ju": {"A": {"titulo": "Jueves de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Génesis 17, 3-9"},
                    {"tipo": "Salmo",           "cita": "Salmo 104, 4-5. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Juan 8, 51-59"}],},},
/*VIERNES*/     "cuaresma_s5_vi": {"A": {"titulo": "Viernes de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Jeremías 20, 10-13"},
                    {"tipo": "Salmo",           "cita": "Salmo 17, 2-3a. 3bc-4. 5-6. 7"},
                    {"tipo": "Evangelio",       "cita": "Juan 10, 31-42"}],},},
/*SABADO*/     "cuaresma_s5_sa": {"A": {"titulo": "Sábado de la 3º semana de Cuaresma, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Ezequiel 37, 21-28"},
                    {"tipo": "Salmo",           "cita": "Jeremías 31, 10. 11-1 2ab. 13 "},
                    {"tipo": "Evangelio",       "cita": "Juan 11, 45-57"}],},},


/*
╔═════════════════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA 6 DOMINGO DE RAMOS, CICLO ABC  ║
╚═════════════════════════════════════════════════════════════╝
*/      "cuaresma_s6_do": {
           "A": {"titulo": "Domingo de Ramos Ciclo A", "lecturas": [
                {"tipo": "1ª Lectura",       "cita": "Isaías 61, 1-3a. 6a. 8b-9"},
                {"tipo": "Salmo",            "cita": "Salmo 88, 21-22. 25 y 27"},
                {"tipo": "2ª Lectura",       "cita": "Apocalipsis 1, 5-8"},
                {"tipo": "Evangelio",        "cita": "Lucas 4, 16-21"}],},
           "B": {"titulo": "Domingo de Ramos Ciclo B", "lecturas": [
                {"tipo": "Evangelio de Entrada","cita": "Marcos 11, 1-10 o Juan 12, 12-16"},
                {"tipo": "1ª Lectura",       "cita": "Isaías 50, 4-7"},
                {"tipo": "Salmo",            "cita": "Salmo 21, 8-9. 17-18a. 19-20. 23-24"},
                {"tipo": "2ª Lectura",       "cita": "Filipenses 2, 6-11"},
                {"tipo": "Evangelio",        "cita": "Marcos 14, 1—15, 47 o Marcos 15, 1-39"}]},
           "C": {"titulo": "Domingo de Ramos Ciclo C", "lecturas": [
                {"tipo": "Evangelio de Entrada","cita": "Lucas 19, 28-40"},
                {"tipo": "1ª Lectura",       "cita": "Isaías 50, 4-7"},
                {"tipo": "Salmo",            "cita": "Salmo 21, 8-9. 17-18a. 19-20. 23-24"},
                {"tipo": "2ª Lectura",       "cita": "Filipenses 2, 6-11"},
                {"tipo": "Evangelio",        "cita": "Lucas 22, 14—23, 56 o Lucas 23, 1-49"}],}
        },

/*
╔════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA SANTA, CICLO ABC  ║
╚════════════════════════════════════════════════╝
*/ 
/*LUNES SANTO*/     "cuaresma_s6_lu": {"A": {"titulo": "Lunes Santo, Ciclo A,B,C, Par/Impar","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 2, 1-5 / Isaías 4, 2-6"},
                        {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 4-5. 6-7. 8-9"},
                        {"tipo": "Evangelio",       "cita": "Mateo 8, 5-11"}],},},
/*MARTES SANTO*/    "cuaresma_s6_ma": {"A": {"titulo": "Martes Santo, Ciclo A,B,C, Par/Impar","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 11, 1-10"},
                        {"tipo": "Salmo",           "cita": "Salmo 71, 1-2. 7-8. 12-13. 17"},
                        {"tipo": "Evangelio",       "cita": "Lucas 10,21-24"}],},},
/*MIERCOLES SANTO*/ "cuaresma_s6_mi": {"A": {"titulo": "Miércoles Santo, Ciclo A,B,C, Par/Impar","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 25, 6-10a"},
                        {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
                        {"tipo": "Evangelio",       "cita": "Mateo 15, 29-37"}],},},

/*
╔═════════════════════════════════════════════════════════╗
║  TIEMPO DE CUARESMA - SEMANA 6 JUEVES SANTO, CICLO ABC  ║
╚═════════════════════════════════════════════════════════╝
*/      "cuaresma_s6_ju": [
                    {"A": {"titulo": "Jueves santo, Misa Crismal","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Isaías 61, 1-3a. 6a. 8b-9"},
                        {"tipo": "Salmo",           "cita": "Salmo 88, 21-22. 25 y 27"},
                        {"tipo": "2ª Lectura",      "cita": "Apocalipsis 1, 5-8"},
                        {"tipo": "Evangelio",       "cita": "Lucas 4, 16-21"}]}},
                    {"A": {"titulo": "Jueves santo, Misa de la cena del Señor, Ciclos A, B y C","lecturas": [
                        {"tipo": "1ª Lectura",      "cita": "Éxodo 12, 1-8. 11-14"},
                        {"tipo": "Salmo",           "cita": "Salmo 115, 12-13. 15-16bc. 17-18"},
                        {"tipo": "2ª Lectura",      "cita": "1 Corintios 11,23-26"},
                        {"tipo": "Evangelio",       "cita": "Juan 13, 1-15"}]}}
                            ],

// TIEMPO DE CUARESMA - SEMANA 6 VIERNES SANTO
  "cuaresma_s6_vi": {
    "C": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 52, 13—53, 12"},
        {"tipo": "Salmo",           "cita": "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"},
        {"tipo": "2ª Lectura",      "cita": "Hebreos 4, 14-16; 5, 7-9"},
        {"tipo": "Evangelio",       "cita": "Juan 18, 1—19, 42"}
        ],"titulo": "Viernes santo"
    },
    "A": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 52, 13—53, 12"},
        {"tipo": "Salmo",           "cita": "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"},
        {"tipo": "2ª Lectura",      "cita": "Hebreos 4, 14-16; 5, 7-9"},
        {"tipo": "Evangelio",       "cita": "Juan 18, 1—19, 42"}
        ],"titulo": "Viernes santo"
    },
    "B": {"lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Isaías 52, 13—53, 12"},
        {"tipo": "Salmo",           "cita": "Salmo 30, 2 y 6. 12-13. 15-16. 17 y 25"},
        {"tipo": "2ª Lectura",      "cita": "Hebreos 4, 14-16; 5, 7-9"},
        {"tipo": "Evangelio",       "cita": "Juan 18, 1—19, 42"}
        ],"titulo": "Viernes santo"
    }
  },

/*
 ____     ___      ___    ___    _   _    ___
|  _ \   / _ \    / __|  / __|  | | | |  / _ \
|  __/  / ___ \   \__ \ | (__   | |_| | / ___ \
|_|    /_/   \_\  |___/  \___|   \___/ /_/   \_\
╔═════════════════════════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 1 DOMINGO CICLO ABC - VIGILIA PASCUAL  ║
╚═════════════════════════════════════════════════════════════════╝
*/ 
    "pascua_s1_do": [
        {"A":  {"titulo": "Vigilia Pascual, Domingo de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 1, 1—2, 2 o Génesis 1, 1. 26-31a"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 5-6. 10 y 12. 13-14. 24 y 35a o Salmo 32, 4-5. 6-7. 12-13. 20 y 22"},
            {"tipo": "2ª Lectura",      "cita": "Génesis 22, 1-18 o Génesis 22, 1-2. 9a. 10-13. 15-18"},
            {"tipo": "Salmo",           "cita": "Salmo 15, 5 y 8. 9-10. 11"},
            {"tipo": "3ª Lectura",      "cita": "Éxodo 14, 15—15, 1"},
            {"tipo": "Salmo",           "cita": "Éxodo 15, 1-2. 3-4. 5-6. 17-18"},
            {"tipo": "4ª Lectura",      "cita": "Isaías 54, 5-14"},
            {"tipo": "Salmo",           "cita": "salmo 29, 2 y 4. 5-6. 11 y 12a y 13b"},
            {"tipo": "5ª Lectura",      "cita": "Isaías 55, 1-11"},
            {"tipo": "Salmo",           "cita": "Isaías 12, 2-3. 4. 5-6"},
            {"tipo": "6ª Lectura",      "cita": "Baruc 3, 9-15. 32—4,4"},
            {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10, 11"},
            {"tipo": "7ª Lectura",      "cita": "Ezequiel 36, 16-28"},
            {"tipo": "Salmo",           "cita": "Salmo 41, 3. 5bcd; 42, 3. 4 o Isaías 12, 2-3. 4. 5-6 o Salmo 50, 12-13. 14-15. 18-19"},
            {"tipo": "EPÍSTOLA",        "cita": "Romanos 6, 3-11"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17. 22-23"},
            {"tipo": "Evangelio",       "cita": "Mateo 28, 1-10"}]}},

        {"A": {"titulo": "Domingo de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 1-9"}]}},

        {"A": {"titulo": "Misa Vespertina, Domingo de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 13-35"}]}},

        {"B": {"titulo": "Vigilia Pascual, Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 1, 1—2, 2 o Génesis 1, 1. 26-31a"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 5-6. 10 y 12. 13-14. 24 y 35c o Salmo 32, 4-5. 6-7. 12-13. 20 y 22"},
            {"tipo": "2ª Lectura",      "cita": "Génesis 22, 1-18 o Génesis 22, 1-2. 9a. 10-13. 15-18"},
            {"tipo": "Salmo",           "cita": "Salmo 15, 5 y 8. 9-10. 11"},
            {"tipo": "3ª Lectura",      "cita": "Éxodo 14, 15—15, 1"},
            {"tipo": "Salmo",           "cita": "Éxodo 15, 1-2. 3-4. 5-6. 17-18"},
            {"tipo": "4ª Lectura",      "cita": "Isaías 54, 5-14"},
            {"tipo": "Salmo",           "cita": "Salmo 29, 2 y 4. 5-6. 11 y 12a y 13b"},
            {"tipo": "5ª Lectura",      "cita": "profeta Isaías 55, 1-11"},
            {"tipo": "Salmo",           "cita": "Isaías 12, 2-3. 4bcd. 5-6"},
            {"tipo": "6ª Lectura",      "cita": "Baruc 3, 9-15. 32—4,4"},
            {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10, 11"},
            {"tipo": "7ª Lectura",      "cita": "Ezequiel 36, 16-28"},
            {"tipo": "Salmo",           "cita": "Salmo 41, 3. 5bcd; 42, 3. 4 o Isaías 12, 2-3. 4bcd. 5-6 o Salmo 50, 12-13. 14-15. 18-19"},
            {"tipo": "EPÍSTOLA",        "cita": "Romanos 6, 3-11"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17. 22-23"},
            {"tipo": "Evangelio",       "cita": "Marcos 16, 1-7"}]}},

        {"B": {"titulo": "Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1- 2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o 1 Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 1-9"}]}},

        {"B": {"titulo": "Misa Vespertina, Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1- 2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o 1 Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 13-35"}]}},


        {"C": {"titulo": "Vigilia Pascual, Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 1, 1—2, 2 o Génesis 1, 1. 26-31a"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 5-6. 10 y 12. 13-14. 24 y 35c o Salmo 32, 4-5. 6-7. 12-13. 20 y 22"},
            {"tipo": "2ª Lectura",      "cita": "Génesis 22, 1-18 o Génesis 22, 1-2. 9a. 10-13. 15-18"},
            {"tipo": "Salmo",           "cita": "Salmo 15, 5 y 8. 9-10. 11"},
            {"tipo": "3ª Lectura",      "cita": "Éxodo 14, 15—15, 1"},
            {"tipo": "Salmo",           "cita": "Éxodo 15, 1-2. 3-4. 5-6. 17-18"},
            {"tipo": "4ª Lectura",      "cita": "Isaías 54, 5-14"},
            {"tipo": "Salmo",           "cita": "Salmo 29, 2 y 4. 5-6. 11 y 12a y 13b"},
            {"tipo": "5ª Lectura",      "cita": "Isaías 55, 1-11"},
            {"tipo": "Salmo",           "cita": "Isaías 12, 2-3. 4bcd. 5-6"},
            {"tipo": "6ª Lectura",      "cita": "Baruc 3, 9-15. 32—4, 4"},
            {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10. 11"},
            {"tipo": "7ª Lectura",      "cita": "Ezequiel 36, 16-28"},
            {"tipo": "Salmo",           "cita": "Salmo 41, 3. 5bcd; 42, 3. 4 o Isaías 12, 2-3. 4bcd. 5-6 o Salmo 50, 12-13. 14-15. 18-19"},
            {"tipo": "EPÍSTOLA",        "cita": "Romanos 6, 3-11"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17. 22-23"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 1-12"}]}},

        {"C": {"titulo": "Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1- 2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o 1 Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 1-9"}]}},

        {"C": {"titulo": "Misa Vespertina, Domingo de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 10, 34a. 37-43"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 1- 2. 16ab-17. 22-23"},
            {"tipo": "2ª Lectura",      "cita": "Colosenses 3, 1-4 o 1 Corintios 5, 6b-8"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 13-35"}]}},

        ],


/*___     ___    _____    ___     __   __    ___        ____    _____      ____     ___      ___    ___    _   _    ___
 / _ \   / __|  |_   _|  / _ \    \ \ / /   / _ \      |  _ \  | ____|    |  _ \   / _ \    / __|  / __|  | | | |  / _ \
| (_) | | (__     | |   / ___ \    \ V /   / ___ \     | |_) | |  _|      |  __/  / ___ \   \__ \ | (__   | |_| | / ___ \
 \___/   \___|    |_|  /_/   \_\    \_/   /_/   \_\    |____/  |_____|    |_|     /_/   \_\ |___/  \___|   \___/ /_/   \_\
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 1ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s1_lu": {"A": {"titulo": "Lunes de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 14. 22-23"},
                    {"tipo": "Salmo",           "cita": "Salmo 15, 1-2 y 5. 7-8. 9-10. 11"},
                    {"tipo": "Evangelio",       "cita": "Mateo 28, 8-15"}],},},
/*MARTES*/      "pascua_s1_ma": {"A": {"titulo": "Martes de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 36-41"},
                    {"tipo": "Salmo",           "cita": "Salmo 32, 4-5. 18-19. 20 y 22"},
                    {"tipo": "Evangelio",       "cita": "Juan 20, 11-18"}],},},
/*MIERCOLES*/   "pascua_s1_mi": {"A": {"titulo": "Miércoles de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 3, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 104, 1-2. 3-4. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Lucas 24, 13-35"}],},},
/*JUEVES*/     "pascua_s1_ju": {"A": {"titulo": "Jueves de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 3, 11-26"},
                    {"tipo": "Salmo",           "cita": "Salmo 8, 2a y 5. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Lucas 24, 35-48"}],},},
/*VIERNES*/     "pascua_s1_vi": {"A": {"titulo": "Viernes de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 4, 1-12"},
                    {"tipo": "Salmo",           "cita": "Salmo 117, 1-2 y 4. 22-24. 25-27a"},
                    {"tipo": "Evangelio",       "cita": "Juan 21, 1-14"}],},},
/*SABADO*/     "pascua_s1_sa": {"A": {"titulo": "Sábado de la 8ª de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 4, 13-21"},
                    {"tipo": "Salmo",           "cita": "Salmo 117, 1 y 14-15. 16-18. 19-21"},
                    {"tipo": "Evangelio",       "cita": "Marcos 16, 9-15"}],},},

/*
╔═══════════════════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 2 DOMINGO CICLO ABC 8ª DE PASCUA ║
╚═══════════════════════════════════════════════════════════╝*/
    "pascua_s2_do": {
        "A": {"titulo": "Segundo Domingo de Pascua, 8ª de Pascua ","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 2, 42-47"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 2-4. 13-15. 22-24"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 3-9"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-31"}],},
        "B": {"titulo": "Segundo Domingo de Pascua, 8ª de Pascua ","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 2, 42-47"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 2-4. 13-15. 22-24"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 3-9"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-31"}],},
        "C": {"titulo": "Segundo Domingo de Pascua, 8ª de Pascua ","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 2, 42-47"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 2-4. 13-15. 22-24"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 3-9"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-31"}],},},

/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 2ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s2_lu": {"A": {"titulo": "Lunes de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 4, 23-31"},
                    {"tipo": "Salmo",           "cita": "Salmo 2, 1-3. 4-6. 7-9"},
                    {"tipo": "Evangelio",       "cita": "Juan 3, 1-8"}],},},
/*MARTES*/      "pascua_s2_ma": {"A": {"titulo": "Martes de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 4, 32-37"},
                    {"tipo": "Salmo",           "cita": "Salmo 92, 1ab. 1c-2. 5"},
                    {"tipo": "Evangelio",       "cita": "Juan 3, 5a. 7b-15"}],},},
/*MIERCOLES*/   "pascua_s2_mi": {"A": {"titulo": "Miércoles de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 5, 17-26"},
                    {"tipo": "Salmo",           "cita": "Salmo 33, 2-3. 4-5. 6-7. 8-9"},
                    {"tipo": "Evangelio",       "cita": "Juan 3, 16-21"}],},},
/*JUEVES*/     "pascua_s2_ju": {"A": {"titulo": "Jueves de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 5, 27-33"},
                    {"tipo": "Salmo",           "cita": "Salmo 33, 2 y 9. 17-18.19-20"},
                    {"tipo": "Evangelio",       "cita": "Juan 3, 31-36"}],},},
/*VIERNES*/     "pascua_s2_vi": {"A": {"titulo": "Viernes de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 5, 34-42"},
                    {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 13-14"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 1-15"}],},},
/*SABADO*/     "pascua_s2_sa": {"A": {"titulo": "Sábado de la 2ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 6, 1-7"},
                    {"tipo": "Salmo",           "cita": "Salmo 32, 1-2. 4-5. 18-19"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 16-21"}],},},

/*
╔═══════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 3 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════╝
*/  "pascua_s3_do": {
        "A": {"titulo": "Tercer Domingo de Pascua","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 14. 22-33"},
            {"tipo": "Salmo",           "cita": "Salmo 15, 1-2a y 5. 7-8. 9-10. 11"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 17-21"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 13-35"}],},
        "B": {"titulo": "Segundo Domingo de Pascua, 8ª de Pascua ","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 2, 42-47"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 2-4. 13-15. 22-24"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 3-9"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-31"}],},
        "C": {"titulo": "Segundo Domingo de Pascua, 8ª de Pascua ","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "hechos 2, 42-47"},
            {"tipo": "Salmo",           "cita": "Salmo 117, 2-4. 13-15. 22-24"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 1, 3-9"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-31"}],},},

/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 3ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s3_lu": {"A": {"titulo": "Lunes de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 6, 8-15"},
                    {"tipo": "Salmo",           "cita": "Salmo 118, 23-24. 26-27. 29-30"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 22-29"}],},},
/*MARTES*/      "pascua_s3_ma": {"A": {"titulo": "Martes de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 7, 51—8, 1a"},
                    {"tipo": "Salmo",           "cita": "Salmo 30, 3cd-4. 6ab y 7b y 8a. 17 y 21ab"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 30-35"}],},},
/*MIERCOLES*/   "pascua_s3_mi": {"A": {"titulo": "Miércoles de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 8, 1b-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 65, 1-3a. 4-5. 6-7a"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 35-40"}],},},
/*JUEVES*/     "pascua_s3_ju": {"A": {"titulo": "Jueves de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 8, 26-40"},
                    {"tipo": "Salmo",           "cita": "Salmo 65, 8-9. 16-17. 20"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 44-51"}],},},
/*VIERNES*/     "pascua_s3_vi": {"A": {"titulo": "Viernes de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 9, 1-20"},
                    {"tipo": "Salmo",           "cita": "Salmo 116, 1. 2"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 52-59"}],},},
/*SABADO*/     "pascua_s3_sa": {"A": {"titulo": "Sábado de la 3ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 9, 31-42"},
                    {"tipo": "Salmo",           "cita": "Salmo 115, 12-13. 14-15. 16-17"},
                    {"tipo": "Evangelio",       "cita": "Juan 6, 60-69"}],},},
/*
╔═══════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 4 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════╝
*/  "pascua_s4_do": {
        "A": {"titulo": "Domingo 4º de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 14a. 36-41"},
            {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 2, 20b-25"},
            {"tipo": "Evangelio",       "cita": "Juan 10, 1-10"}],},
        "B": {"titulo": "Domingo 4º de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": ""},
            {"tipo": "Salmo",           "cita": ""},
            {"tipo": "2ª Lectura",      "cita": ""},
            {"tipo": "Evangelio",       "cita": ""}],},
        "C": {"titulo": "Domingo 4º de Pascua, Ciclo C","lecturas": [
            {"tipo": "1ª Lectura",      "cita": ""},
            {"tipo": "Salmo",           "cita": ""},
            {"tipo": "2ª Lectura",      "cita": ""},
            {"tipo": "Evangelio",       "cita": ""}],},},


/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 4ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s4_lu": {"A": {"titulo": "Lunes de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 11, 1-18"},
                    {"tipo": "Salmo",           "cita": "Salmo 41, 2-3; 42, 3. 4"},
                    {"tipo": "Evangelio",       "cita": "Juan 10, 1-10 o Juan 10, 11-18"}],},},
/*MARTES*/      "pascua_s4_ma": {"A": {"titulo": "Martes de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 11, 19-26"},
                    {"tipo": "Salmo",           "cita": "Salmo 86, 1-3. 4-5. 6- 7"},
                    {"tipo": "Evangelio",       "cita": "Juan 10, 22-30"}],},},
/*MIERCOLES*/   "pascua_s4_mi": {"A": {"titulo": "Miércoles de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 12, 24—13, 5"},
                    {"tipo": "Salmo",           "cita": "Salmo 66, 2-3. 5. 6 y 8"},
                    {"tipo": "Evangelio",       "cita": "Juan 12, 44-50"}],},},
/*JUEVES*/     "pascua_s4_ju": {"A": {"titulo": "Jueves de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 13, 13-25"},
                    {"tipo": "Salmo",           "cita": "Salmo 88, 2-3. 21-22. 25 y 27"},
                    {"tipo": "Evangelio",       "cita": "Juan 13, 16-20"}],},},
/*VIERNES*/     "pascua_s4_vi": {"A": {"titulo": "Viernes de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 13, 26-33"},
                    {"tipo": "Salmo",           "cita": "Salmo 2, 6-7. 8-9. 10-11"},
                    {"tipo": "Evangelio",       "cita": "Juan 14, 1-6"}],},},
/*SABADO*/     "pascua_s4_sa": {"A": {"titulo": "Sábado de la 4ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 13, 44-52"},
                    {"tipo": "Salmo",           "cita": "Salmo 97, 1-2ab. 2cd-3ab. 3cd-4"},
                    {"tipo": "Evangelio",       "cita": "Juan 14, 7-14"}],},},


/*
╔═══════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 5 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════╝
*/  "pascua_s5_do": {
        "A": {"titulo": "Domingo 5º de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 6, 1-7"},
            {"tipo": "Salmo",           "cita": "Salmo 32, 1-2. 4-5. 18-19"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 2, 4-9"},
            {"tipo": "Evangelio",       "cita": "Juan 14, 1-12"}],},
        "B": {"titulo": "Domingo 5º de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": ""},
            {"tipo": "Salmo",           "cita": ""},
            {"tipo": "2ª Lectura",      "cita": ""},
            {"tipo": "Evangelio",       "cita": ""}],},
        "C": {"titulo": "Domingo 5º de Pascua, Ciclo C","lecturas": [
            {"tipo": "1ª Lectura",      "cita": ""},
            {"tipo": "Salmo",           "cita": ""},
            {"tipo": "2ª Lectura",      "cita": ""},
            {"tipo": "Evangelio",       "cita": ""}],},},


/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 5ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s5_lu": {"A": {"titulo": "Lunes de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 14, 5-18"},
                    {"tipo": "Salmo",           "cita": "Salmo 113 B, 1-2. 3-4. 15-16"},
                    {"tipo": "Evangelio",       "cita": "Juan 14, 21-26"}],},},
/*MARTES*/      "pascua_s5_ma": {"A": {"titulo": "Martes de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 14, 19-28"},
                    {"tipo": "Salmo",           "cita": "Salmo 144, 10-11. 12-13ab. 21"},
                    {"tipo": "Evangelio",       "cita": "Juan 14, 27-31a"}],},},
/*MIERCOLES*/   "pascua_s5_mi": {"A": {"titulo": "Miércoles de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 15, 1-6"},
                    {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 4-5"},
                    {"tipo": "Evangelio",       "cita": "Juan 15, 1-8"}],},},
/*JUEVES*/     "pascua_s5_ju": {"A": {"titulo": "Jueves de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 15, 7-21"},
                    {"tipo": "Salmo",           "cita": "Salmo 95, 1-2a. 2b-3. 10"},
                    {"tipo": "Evangelio",       "cita": "Juan 15, 9-11"}],},},
/*VIERNES*/     "pascua_s5_vi": {"A": {"titulo": "Viernes de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 15, 22-31"},
                    {"tipo": "Salmo",           "cita": "Salmo 56, 8-9. 10-12 "},
                    {"tipo": "Evangelio",       "cita": "Juan 15, 12-17"}],},},
/*SABADO*/     "pascua_s5_sa": {"A": {"titulo": "Sábado de la 5ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 16, 1-10"},
                    {"tipo": "Salmo",           "cita": "Salmo 99, 1-2. 3. 5"},
                    {"tipo": "Evangelio",       "cita": "Juan 15, 18-21"}],},},

/*
╔═══════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 6 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════╝
*/  "pascua_s6_do": {
        "A": {"titulo": "Domingo 6ª de Pascua, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 8, 5-8. 14-17"},
            {"tipo": "Salmo",           "cita": "Salmo 65, 1-3a. 4-5. 6-7a. 16 y 20"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 3, 15-18"},
            {"tipo": "Evangelio",       "cita": "Juan 14, 15-21"}],},
        "B": {"titulo": "Domingo 6ª de Pascua, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 10, 25-26. 34-35. 44-48"},
            {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 3cd-4"},
            {"tipo": "2ª Lectura",      "cita": "1 Juan 4, 7-10"},
            {"tipo": "Evangelio",       "cita": "Juan 15, 9-17"}],},
        "C": {"titulo": "Domingo 6ª de Pascua, Ciclo C","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 15, 1-2. 22-29"},
            {"tipo": "Salmo",           "cita": "Salmo 66, 2-3. 5. 6 y 8"},
            {"tipo": "2ª Lectura",      "cita": "Apocalipsis 21, 10-14. 22-23"},
            {"tipo": "Evangelio",       "cita": "Juan 14, 23-29"}],},},

/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 6ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s6_lu": {"A": {"titulo": "Lunes de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 16, 11-15"},
                    {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
                    {"tipo": "Evangelio",       "cita": "Juan 15, 26—16, 4a"}],},},
/*MARTES*/      "pascua_s6_ma": {"A": {"titulo": "Martes de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 16, 22-34"},
                    {"tipo": "Salmo",           "cita": "Salmo 137, 1-2a. 2bc y 3. 7c-8"},
                    {"tipo": "Evangelio",       "cita": "Juan 16,5-11"}],},},
/*MIERCOLES*/   "pascua_s6_mi": {"A": {"titulo": "Miércoles de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 17, 15. 22—18, 1"},
                    {"tipo": "Salmo",           "cita": "Salmo 148, 1-2. 11-12. 13. 14"},
                    {"tipo": "Evangelio",       "cita": "Juan 16, 12-15"}],},},
/*JUEVES*/     "pascua_s6_ju": {"A": {"titulo": "Jueves de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 18, 1-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 97, 1-2ab. 2cd-3ab. 3cd-4"},
                    {"tipo": "Evangelio",       "cita": "Juan 16, 16-20"}],},},
/*VIERNES*/     "pascua_s6_vi": {"A": {"titulo": "Viernes de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 18, 9-18"},
                    {"tipo": "Salmo",           "cita": "Salmo 46, 2-3. 4-5. 6-7"},
                    {"tipo": "Evangelio",       "cita": "Juan 16 ,20-23a"}],},},
/*SABADO*/     "pascua_s6_sa": {"A": {"titulo": "Sábado de la 6ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 18, 23-28"},
                    {"tipo": "Salmo",           "cita": "Salmo 46, 2-3. 8-9. 10"},
                    {"tipo": "Evangelio",       "cita": "Juan 16, 23b-28"}],},},


/*
╔══════════════════════════════════════════════════╗
║  TIEMPO PASCUAL - ASCENSIÓN DEL SEÑOR CICLO ABC  ║
╚══════════════════════════════════════════════════╝
*/      "pascua_as_do": {
    "A": {"titulo": "La Ascensión del Señor, Tiempo de Pascua, Ciclo A.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 1, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 46, 2-3. 6-7. 8-9"},
            {"tipo": "2ª Lectura",      "cita": "Efesios 1, 17-23"},
            {"tipo": "Evangelio",       "cita": "Mateo 28, 16-20"}],},
    "B": {"titulo": "La Ascensión del Señor, Tiempo de Pascua, Ciclo B.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 1, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 46, 2-3. 6-7. 8-9"},
            {"tipo": "2ª Lectura",      "cita": "Efesios 1, 17-23 o Efesios 4, 1-13 o Efesios 4, 1-7. 11-13"},
            {"tipo": "Evangelio",       "cita": "Marcos 16, 15-20"}],},
    "C": {"titulo": "La Ascensión del Señor, Tiempo de Pascua, Ciclo  C.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 1, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 46, 2-3. 6-7. 8-9"},
            {"tipo": "2ª Lectura",      "cita": "Efesios 1, 17-23 o Hebreos 9, 24-28; 10, 19-23"},
            {"tipo": "Evangelio",       "cita": "Lucas 24, 46-53"}],}
        },

/*
╔═══════════════════════════════════════════════╗
║  TIEMPO PASCUAL - SEMANA 7 DOMINGO CICLO ABC  ║
╚═══════════════════════════════════════════════╝
*/      "pascua_s7_do": {
    "A": {"titulo": "Séptimo Domingo de Pascua","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 1, 12-14"},
            {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 7-8a"},
            {"tipo": "2ª Lectura",      "cita": "1 Pedro 4, 13-16"},
            {"tipo": "Evangelio",       "cita": "Juan 17, 1-11a"}],},
    "B": {"titulo": "Séptimo Domingo de Pascua","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 1, 15-17. 20a. 20c-26"},
            {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 11-12. 19-20ab"},
            {"tipo": "2ª Lectura",      "cita": "1 Juan 4, 11-16"},
            {"tipo": "Evangelio",       "cita": "Juan 17, 11b-19"}],},
    "C": {"titulo": "Séptimo Domingo de Pascua","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 7, 55-60"},
            {"tipo": "Salmo",           "cita": "Salmo 96, 1 y 2b. 6 y 7c. 9"},
            {"tipo": "2ª Lectura",      "cita": "Apocalipsis 22, 12-14. 16-17. 20"},
            {"tipo": "Evangelio",       "cita": "Juan 17, 20-26"}],},
        },


/*
╔════════════════════════════════════════════════════════════════╗
║  TIEMPO DE PASCUA - DIAS DE LA 7ª SEMANA CICLO ABC, PAR/IMPAR  ║
╚════════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s7_lu": {"A": {"titulo": "Lunes de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 19, 1-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 2-3. 4-5ac. 6-7ab"},
                    {"tipo": "Evangelio",       "cita": "Juan 16, 29-33"}],},},
/*MARTES*/      "pascua_s7_ma": {"A": {"titulo": "Martes de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 20, 17-27"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 10-11. 20-21"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 1-11a"}],},},
/*MIERCOLES*/   "pascua_s7_mi": {"A": {"titulo": "Miércoles de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 20, 28-38"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 29-30. 33-35a. 35b y 36c"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 11b-19"}],},},
/*JUEVES*/     "pascua_s7_ju": {"A": {"titulo": "Jueves de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 22, 30; 23, 6-11"},
                    {"tipo": "Salmo",           "cita": "Salmo 15, 1-2 y 5. 7-8. 9-10. 11"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 20-26"}],},},
/*VIERNES*/     "pascua_s7_vi": {"A": {"titulo": "Viernes de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 25, 13-21"},
                    {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 11-12. 19-20ab"},
                    {"tipo": "Evangelio",       "cita": "Juan 21, 15-19"}],},},
/*SABADO*/     "pascua_s7_sa": {"A": {"titulo": "Sábado de la 7ª semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 28, 16-20. 30-31"},
                    {"tipo": "Salmo",           "cita": "Salmo 10, 4. 5 y 7"},
                    {"tipo": "Evangelio",       "cita": "Juan 21, 20-25"}],},},


/*
╔═════════════════════════════════════════════════════════════╗
║  TIEMPO PASCUAL - DIAS DE LA SEMANA 7 CICLO ABC, PAR/IMPAR  ║
╚═════════════════════════════════════════════════════════════╝*/ 
/*LUNES*/       "pascua_s7_lu": {"A": {"titulo": "Lunes de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 19, 1-8"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 2-3. 4-5ac. 6-7ab"},
                    {"tipo": "Evangelio",       "cita": "Juan 16, 29-33"}],},},
/*MARTES*/      "pascua_s7_ma": {"A": {"titulo": "Martes de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 20, 17-27"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 10-11. 20-21"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 1-11a"}],},},
/*MIERCOLES*/   "pascua_s7_mi": {"A": {"titulo": "Miércoles de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 20, 28-38"},
                    {"tipo": "Salmo",           "cita": "Salmo 67, 29-30. 33-35a. 35b y 36c"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 11b-19"}],},},
/*JUEVES*/     "pascua_s7_ju": {"A": {"titulo": "Jueves de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 22, 30; 23, 6-11"},
                    {"tipo": "Salmo",           "cita": "Salmo 15, 1-2 y 5. 7-8. 9-10. 11"},
                    {"tipo": "Evangelio",       "cita": "Juan 17, 20-26"}],},},
/*VIERNES*/     "pascua_s7_vi": {"A": {"titulo": "Viernes de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 25, 13-21"},
                    {"tipo": "Salmo",           "cita": "Salmo 102, 1-2. 11-12. 19-20ab"},
                    {"tipo": "Evangelio",       "cita": "Juan 21, 15-19"}],},},
/*SABADO*/     "pascua_s7_sa": {"A": {"titulo": "Sábado de la séptima semana de Pascua, Ciclo A,B,C, Par/Impar","lecturas": [
                    {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 28, 16-20. 30-31"},
                    {"tipo": "Salmo",           "cita": "Salmo 10, 4. 5 y 7"},
                    {"tipo": "Evangelio",       "cita": "Juan 21, 20-25"}],},},

/*
╔═══════════════════════════════════════════════════════╗
║  TIEMPO PASCUAL - DOMINGO DE PENTECOSTES,  CICLO ABC  ║
╚═══════════════════════════════════════════════════════╝
*/  "pascua_pent_do": [
        {"A":  {"titulo": "Domingo de Pentecostés, Misa de La vigilia, Ciclo A.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 11, 1-9 o Éxodo 19, 3-8a. 16-20b o Ezequiel 37, 1-14 o Joel 3, 1-5"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 24. 27-28. 29bc-30"},
            {"tipo": "2ª Lectura",      "cita": "Romanos 8, 22-27"},
            {"tipo": "Evangelio",       "cita": "Juan 7, 37-39"}]}},

        {"A": {"titulo": "Domingo de Pentecostés, Misa del día, Ciclo A","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1ab y 24ac. 29bc-30. 31 y 34"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 12, 3b-7. 12-13"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-23"}]}},

        {"B":  {"titulo": "Domingo de Pentecostés, Misa de La vigilia, Ciclo B.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 11, 1-9 o Éxodo 19, 3-8a. 16-20b o Ezequiel 37, 1-14 o Joel 3, 1-5"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 24. 27-28. 29bc-30"},
            {"tipo": "2ª Lectura",      "cita": "Romanos 8, 22-27"},
            {"tipo": "Evangelio",       "cita": "Juan 7, 37-39"}]}},

        {"B": {"titulo": "Domingo de Pentecostés, Misa del día, Ciclo B","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1ab y 24ac. 29bc-30. 31 y 34"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 12, 3b-7. 12-13"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-23"}]}},

        {"C":  {"titulo": "Domingo de Pentecostés, Misa de La vigilia, Ciclo C.","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Génesis 11, 1-9 o Éxodo 19, 3-8a. 16-20b o Ezequiel 37, 1-14 o Joel 3, 1-5"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1-2a. 24. 27-28. 29bc-30"},
            {"tipo": "2ª Lectura",      "cita": "Romanos 8, 22-27"},
            {"tipo": "Evangelio",       "cita": "Juan 7, 37-39"}]}},

        {"C": {"titulo": "Domingo de Pentecostés, Misa del día, Ciclo C","lecturas": [
            {"tipo": "1ª Lectura",      "cita": "Hechos de los Apóstoles 2, 1-11"},
            {"tipo": "Salmo",           "cita": "Salmo 103, 1ab y 24ac. 29bc-30. 31 y 34"},
            {"tipo": "2ª Lectura",      "cita": "1 Corintios 12, 3b-7. 12-13"},
            {"tipo": "Evangelio",       "cita": "Juan 20, 19-23"}]}},],

/*___    ____    ____     ___   _   _    ___      ____    ___     ___
 / _ \  |  _ \  |  _ \   |_ _| | \ | |  / _ \    |  _ \   |_ _|  / _ \
| (_) | |  _ <  | |_) |   | |  |  \| | / ___ \   |  _ <    | |  | (_) |
 \___/  |_| \_\ |____/   |___| |_|\__| /_/   \_\ |_| \_\  |___|  \___/
 ____     ___      ____       ___   ___   __  __   ____     ___      ____
|  _ \   / _ \    |  _ \     /  /  |_ _| |  \/  | |  _ \   / _ \    |  _ \
|  __/  / ___ \   |  _ <    /  /    | |  | |\/| | |  __/  / ___ \   |  _ <
|_|     /_/   \_\ |_| \_\  /__/    |___| |_|  |_| |_|    /_/   \_\  |_| \_\
 AÑO PAR E IMPAR DEL TIEMPO ORDINARIO DE LOS DIAS LUNES A SABADO
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - LUNES 1ª SEMANA,  AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
  "ordinario_s1_lu":{
    "PAR": {"titulo": "Lunes de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Samuel 1, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 115, 12-13. 14 y 17. 18-19"},
        {"tipo": "Evangelio",       "cita": "Marcos 1, 14-20"}]},
    "IMPAR": {"titulo": "Lunes de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Hebreos 1, 1-6"},
        {"tipo": "Salmo",           "cita": "Salmo 96, 1 y 2b. 6 y 7c. 9"},
        {"tipo": "Evangelio",       "cita": "Marcos 1, 14-20"}]}},

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - MARTES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
    "ordinario_s1_ma": {
            "PAR": {"titulo": "Martes de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "1 Samuel 1, 9-20"},
                {"tipo": "Salmo",           "cita": "1 Samuel 2, 1. 4-5. 6-7. 8"},
                {"tipo": "Evangelio",       "cita": "Marcos 1, 21-28"}]},
            "IMPAR": {"titulo": "Martes de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",      "cita": "Hebreos 2, 5-12"},
                {"tipo": "Salmo",           "cita": "Salmo 8, 2 a y 5. 6-7. 8-9"},
                {"tipo": "Evangelio",       "cita": "Marcos 1, 21-28"}]}},

/*
╔═════════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - MIERCOELS 1ª SEMANA, AÑO PAR/IMPAR  ║
╚═════════════════════════════════════════════════════════╝*/
    "ordinario_s1_mi": {
            "PAR": {"titulo": "Miercoles de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "1 Samuel 3, 1-10. 19-20"},
                {"tipo": "Salmo",       "cita": "Salmo 39, 2 y 5. 7-8a. 8b-9. 10"},
                {"tipo": "Evangelio",   "cita": "san Marcos 1, 29-39"}]},
            "IMPAR": {"titulo": "Miercoles de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "Hebreos 2, 14-18"},
                {"tipo": "Salmo",       "cita": "Salmo 104, 1-2. 3-4. 6-7. 8-9"},
                {"tipo": "Evangelio",   "cita": "Marcos 1, 29-39"}]}},
/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - JUEVES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
    "ordinario_s1_ju": {
            "PAR": {"titulo": "Jueves de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "1 Samuel 4, 1-11"},
                {"tipo": "Salmo",       "cita": "Salmo 43, 10-11. 14-15. 24-25"},
                {"tipo": "Evangelio",   "cita": "san Marcos 1, 40-45"}]},
            "IMPAR": {"titulo": "Jueves de la 1ª semana del Tiempo Ordinario","lecturas": [
                {"tipo": "1ª Lectura",  "cita": "Hebreos 3, 7-14"},
                {"tipo": "Salmo",       "cita": "Salmo 94, 6-7. 8-9. 10-11"},
                {"tipo": "Evangelio",   "cita": "Marcos 1, 40-45"}]}
            },

/*
╔═══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - VIERNES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚═══════════════════════════════════════════════════════╝*/
  "ordinario_s1_vi": {
    "PAR": {"titulo": "Viernes de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Samuel 8, 4-7. 10-22a"},
        {"tipo": "Salmo",       "cita": "Salmo 88, 16-17. 18-19"},
        {"tipo": "Evangelio",   "cita": "Marcos 2, 1-12"}]},
    "IMPAR": {"titulo": "Viernes de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 4, 1-5. 11"},
        {"tipo": "Salmo",       "cita": "Salmo 77, 3 y 4bc. 6c-7. 8"},
        {"tipo": "Evangelio",   "cita": "Marcos 2, 1-12"}]}
    },

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SÁBADO 1ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
  "ordinario_s1_sa": {
    "PAR": {"titulo": "Sabado de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Samuel 9, 1-4. 17-19; 10, 1a"},
        {"tipo": "Salmo",       "cita": "Salmo 20, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Marcos 2, 13-17"}]},
    "IMPAR": {"titulo": "Sabado de la 1ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 4, 12-16"},
        {"tipo": "Salmo",       "cita": "Salmo 18, 8. 9. 10. 15"},
        {"tipo": "Evangelio","cita": "Marcos 2, 13-17"}]}
      },

/*
╔═════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - LUNES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚═════════════════════════════════════════════════════╝*/
    "ordinario_s2_lu": {
        "PAR": {"titulo": "Lunes de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "1 Samuel 15, 16-23"},
            {"tipo": "Salmo",       "cita": "Salmo 49, 8-9. 16bc-17. 21 y 23"},
            {"tipo": "Evangelio",   "cita": "Marcos 2, 18-22"}]},
        "IMPAR": {"titulo": "Lunes de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "Hebreos 5,1-10"},
            {"tipo": "Salmo",       "cita": "Salmo 109, 1. 2. 3. 4"},
            {"tipo": "Evangelio",   "cita": "Marcos 2, 18-22"}]}
        },

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - MARTES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
  "ordinario_s2_ma": {
    "PAR": {"titulo": "Martes de la 2ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Samuel 16, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 88, 20. 21-22. 27-28"},
        {"tipo": "Evangelio",   "cita": "Marcos 2, 23-28"}]},
    "IMPAR": {"titulo": "Martes de la 2ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 6, 10-20"},
        {"tipo": "Salmo",       "cita": "Salmo 110, 1-2. 4-5. 9 y 10c"},
        {"tipo": "Evangelio",   "cita": "Marcos 2, 23-28"}]}
  },

/*
╔═════════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - MIERCOLES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚═════════════════════════════════════════════════════════╝*/
  "ordinario_s2_mi": {
    "PAR": {"titulo": "Miercoles de la 2ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Samuel 17, 32-33. 37. 40-51"},
        {"tipo": "Salmo",       "cita": "Salmo 143, 1. 2. 9-10"},
        {"tipo": "Evangelio",   "cita": "Marcos 3, 1-6"}]},
    "IMPAR": {"titulo": "Miercoles de la 2ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 7, 1-3. 15-17"},
        {"tipo": "Salmo",       "cita": "Salmo 109, 1. 2. 3. 4"},
        {"tipo": "Evangelio",   "cita": "Marcos 3, 1-6"}]}
    },

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - JUEVES 1ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
    "ordinario_s2_ju": {
        "PAR": {"titulo": "Jueves de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "1 Samuel 18, 6-9; 19, 1-7"},
            {"tipo": "Salmo",       "cita": "Salmo 55, 2-3. 9-10. 11-12. 13"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 7-12"}]},
        "IMPAR": {"titulo": "Jueves de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "Hebreos 7, 25—8, 6"},
            {"tipo": "Salmo",       "cita": "Salmo 39, 7-8a. 8b-9. 10. 17"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 7-12"}]}
        },

/*
╔═══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - VIERNES 2ª SEMANA, AÑO PAR/IMPAR  ║
╚═══════════════════════════════════════════════════════╝*/
    "ordinario_s2_vi": {
        "PAR": {"titulo": "Viernes de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "1 Samuel 24, 3-21"},
            {"tipo": "Salmo",       "cita": "Salmo 56, 2. 3-4. 6 y 11"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 13-19"}]},
        "IMPAR": {"titulo": "Viernes de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "Hebreos 8, 6-13"},
            {"tipo": "Salmo",       "cita": "Salmo 84, 8 y 10. 11-12. 13-14"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 13-19"}]}
        },

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - SABADO 2ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
    "ordinario_s2_sa": {
        "PAR": {"titulo": "Sabado de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "1 Samuel 1, 1-4. 11-12. 19. 23-27"},
            {"tipo": "Salmo",       "cita": "Salmo 79, 2-3. 5-7"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 20-21"}]},
        "IMPAR": {"titulo": "Sabado de la 2ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "Hebreos 9, 2-3. 11-14"},
            {"tipo": "Salmo",       "cita": "Salmo 46, 2-3. 6-7. 8-9"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 20-21"}]}},

/*
╔═════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - LUNES 3ª SEMANA, AÑO PAR/IMPAR  ║
╚═════════════════════════════════════════════════════╝*/
    "ordinario_s3_lu": {
        "PAR": {"titulo": "Lunes de la 3ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "2 Samuel 5, 1-7. 10"},
            {"tipo": "Salmo",       "cita": "Salmo 88, 20. 21-22. 25-26"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 22-30"}]},
        "IMPAR": {"titulo": "Lunes de la 3ª semana del Tiempo Ordinario","lecturas": [
            {"tipo": "1ª Lectura",  "cita": "Hebreos 9, 15. 24-28"},
            {"tipo": "Salmo",       "cita": "Salmo 97, 1. 2-3ab. 3cd-4. 5-6"},
            {"tipo": "Evangelio",   "cita": "Marcos 3, 22-30"}]}},

/*
╔══════════════════════════════════════════════════════╗
║  TIEMPO ORDINARIO - MARTES 3ª SEMANA, AÑO PAR/IMPAR  ║
╚══════════════════════════════════════════════════════╝*/
  "ordinario_s3_ma": {
    "PAR": {"titulo": "Martes de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 6, 12b-15. 17-19"},
        {"tipo": "Salmo",       "cita": "Salmo 23, 7. 8. 9. 10"},
        {"tipo": "Evangelio",   "cita": "Marcos 3, 31-35"}]},
    "IMPAR": {"titulo": "Martes de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 10, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 39, 2 y 4ab. 7-8a. 10. 11"},
        {"tipo": "Evangelio",   "cita": "Marcos 3, 31-35"}]}},

// TIEMPO ORDINARIO - SEMANA 3 MIERCOLES
  "ordinario_s3_mi": {
    "PAR": {"titulo": "Miercoles de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 7, 4-17"},
        {"tipo": "Salmo",       "cita": "Salmo 88, 4-5. 27-28. 29-30"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 1-20"}]},
    "IMPAR": {"titulo": "Miercoles de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 10, 11-18"},
        {"tipo": "Salmo",       "cita": "Salmo 109, 1. 2. 3. 4"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 1-20"}]}},

// TIEMPO ORDINARIO - SEMANA 3 JUEVES
  "ordinario_s3_ju": {
    "PAR": {"titulo": "Jueves de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 7, 18-19. 24-29"},
        {"tipo": "Salmo",       "cita": "Salmo 131, 1-2. 3-5. 11. 12. 13-14"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 21-25"}]},
    "IMPAR": {"titulo": "Jueves de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 10, 19-25"},
        {"tipo": "Salmo",       "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 21-25"}]}},

// TIEMPO ORDINARIO - SEMANA 3 VIERNES
  "ordinario_s3_vi": {
    "PAR": {"titulo": "Viernes de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 11, 1-4a. 5-10a. 13-17"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 3-4. 5-6a. 6bc-7. 10-11"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 26-34"}]},
    "IMPAR": {"titulo": "Viernes de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 10, 32-39"},
        {"tipo": "Salmo",       "cita": "Salmo 36, 3-4. 5-6. 23-24. 39-40"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 26-34"}]}},

// TIEMPO ORDINARIO - SEMANA 3 SABADO
  "ordinario_s3_sa": {
    "PAR": {"titulo": "Sabado de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 12, 1-7a. 10-17"},
        {"tipo": "Salmo",       "cita": "Salmo 50 12-13. 14-15. 16-17"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 35-41"}]},
    "IMPAR": {"titulo": "Sabado de la 3ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 11, 1-2. 8-19"},
        {"tipo": "Salmo",       "cita": "Lucas 1, 69-70. 71-72. 73-75"},
        {"tipo": "Evangelio",   "cita": "Marcos 4, 35-41"}]}},

// TIEMPO ORDINARIO - SEMANA 4 LUNES
  "ordinario_s4_lu": {
    "PAR": {"titulo": "Lunes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 15, 13-14. 30; 16, 5-13"},
        {"tipo": "Salmo",       "cita": "Salmo 3, 2-3, 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Marcos 5, 1-20"}]},
    "IMPAR": {"titulo": "Lunes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 11, 32-40"},
        {"tipo": "Salmo",       "cita": "Salmo 30, 20. 21. 22. 23. 24"},
        {"tipo": "Evangelio",   "cita": "Marcos 5, 1-20"}]}},

// TIEMPO ORDINARIO - SEMANA 4 MARTES
  "ordinario_s4_ma": {
    "PAR": {"titulo": "Martes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 18, 9-10. 14b. 24-25a. 30—19, 3"},
        {"tipo": "Salmo",       "cita": "Salmo 85, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Marcos 5, 21-43"}]},
    "IMPAR": {"titulo": "Martes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 12, 1-4"},
        {"tipo": "Salmo",       "cita": "Salmo 21, 26b-27. 28 y 30. 31-32"},
        {"tipo": "Evangelio",   "cita": "Marcos 5, 21-43"}]}},

// TIEMPO ORDINARIO - SEMANA 4 MIERCOLES
  "ordinario_s4_mi": {
    "PAR": {"titulo": "Miercoles de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Samuel 24, 2. 9-17"},
        {"tipo": "Salmo",       "cita": "Salmo 31, 1-2. 5. 6. 7"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 1-6"}]},
    "IMPAR": {"titulo": "Miercoles de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 12, 4-7. 11-15"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 13-14. 17-18a"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 1-6"}]}},

// TIEMPO ORDINARIO - SEMANA 4 JUEVES
  "ordinario_s4_ju": {
    "PAR": {"titulo": "Jueves de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 2, 1-4. 10-12"},
        {"tipo": "Salmo",       "cita": "1 Crónicas 29, 10. 11ab. 11d-12a. 12"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 7-13"}]},
    "IMPAR": {"titulo": "Jueves de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 12, 18-19. 21-24"},
        {"tipo": "Salmo",       "cita": "Salmo 47, 2-3ab. 3cd-4. 9. 10-11"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 7-13"}]}
      },

// TIEMPO ORDINARIO - SEMANA 4 VIERNES
  "ordinario_s4_vi": {
    "PAR": {"titulo": "Viernes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 47, 2-13"},
        {"tipo": "Salmo",       "cita": "Salmo 17, 31. 47 y 50. 51"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 14-29"}]},
    "IMPAR": {"titulo": "Viernes de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 13, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 26, 1. 3. 5. 8b-9abc"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 14-29"}]}
      },

// TIEMPO ORDINARIO - SEMANA 4 SABADO
  "ordinario_s4_sa": {
    "PAR": {"titulo": "Sabado de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 3, 4-13"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 9. 10. 11. 12. 13. 14"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 30-34"}]},
    "IMPAR": {"titulo": "Sabado de la 4ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 13, 15-17. 20-21"},
        {"tipo": "Salmo",       "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
        {"tipo": "Evangelio",   "cita": "Marcos 6 ,30-34"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 LUNES
  "ordinario_s5_lu": {
    "PAR": {"titulo": "Lunes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 8, 1-7. 9-13"},
        {"tipo": "Salmo",       "cita": "Salmo 131, 6-7. 8-10"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 53-56"}]},
    "IMPAR": {"titulo": "Lunes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 1, 1-19"},
        {"tipo": "Salmo",       "cita": "Salmo 103, 1-2a. 5-6. 10 y 12. 24 y 35c"},
        {"tipo": "Evangelio",   "cita": "Marcos 6, 53-56"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 MARTES
  "ordinario_s5_ma": {
    "PAR": {"titulo": "Martes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 8, 22-23. 27-30"},
        {"tipo": "Salmo",       "cita": "Salmo 83, 3. 4. 5 y 10. 11"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 1-13"}]},
    "IMPAR": {"titulo": "Martes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 1, 20—2, 4a"},
        {"tipo": "Salmo",       "cita": "Salmo 8, 4-5. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 1-13"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 MIERCOLES
  "ordinario_s5_mi": {
    "PAR": {"titulo": "Miercoles de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 10, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 36, 5-6. 30-31. 39-40"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 14-23"}]},
    "IMPAR": {"titulo": "Miercoles de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 2, 4b-9. 15-17"},
        {"tipo": "Salmo",       "cita": "Salmo 103, 1-2a. 27-28. 29bc-30"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 14-23"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 JUEVES
  "ordinario_s5_ju": {
    "PAR": {"titulo": "Jueves de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 11 ,4-13"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 3-4. 35-36. 37 y 40"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 24-30"}]},
    "IMPAR": {"titulo": "Jueves de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 2, 18-25"},
        {"tipo": "Salmo",       "cita": "Salmo 127, 1-2. 3. 4-5"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 24-30"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 VIERNES
  "ordinario_s5_vi": {
    "PAR": {"titulo": "Viernes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 11, 29-32; 12, 19"},
        {"tipo": "Salmo",       "cita": "Salmo 80, 10-11ab. 12-13. 14-15"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 31-37"}]},
    "IMPAR": {"titulo": "Viernes de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 3, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 31, 1-2. 5. 6. 7"},
        {"tipo": "Evangelio",   "cita": "Marcos 7, 31-37"}]}
      },

// TIEMPO ORDINARIO - SEMANA 5 SABADO
  "ordinario_s5_sa": {
    "PAR": {"titulo": "Sabado de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 12, 26-32; 13, 33-34"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 6-7a. 19-20. 21-22"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 1-10"}]},
    "IMPAR": {"titulo": "Sabado de la 5ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 3, 9-24"},
        {"tipo": "Salmo",       "cita": "Salmo 89, 2. 3-4. 5-6. 12-13"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 1-10"}]}
      },

// TIEMPO ORDINARIO - SEMANA 6 LUNES
  "ordinario_s6_lu": {
    "PAR": {"titulo": "Lunes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 1, 1-11"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 67. 68. 71. 72. 75. 76"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 11-13"}]},
    "IMPAR": {"titulo": "Lunes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 4, 1-15. 25"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 1 y 8. 16bc-17. 20-21"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 11-13"}]}},

// TIEMPO ORDINARIO - SEMANA 6 MARTES
  "ordinario_s6_ma": {
    "PAR": {"titulo": "Martes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 1, 12-18"},
        {"tipo": "Salmo",       "cita": "Salmo 93, 12-13a. 14-15. 18-19"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 14-21"}]},
    "IMPAR": {"titulo": "Martes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 6, 5-8; 7, 1-5. 10"},
        {"tipo": "Salmo",       "cita": "Salmo 28, 1a y 2. 3ac-4. 3b y 9c-10"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 14-21"}]}
      },

// TIEMPO ORDINARIO - SEMANA 6 MIERCOLES
  "ordinario_s6_mi": {
    "PAR": {"titulo": "Miercoles de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 1, 19-27"},
        {"tipo": "Salmo",       "cita": "Salmo 14, 2-3ab. 3cd-4ab. 5"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 22-26"}]},
    "IMPAR": {"titulo": "Miercoles de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 8, 6-13. 20-22"},
        {"tipo": "Salmo",       "cita": "Salmo 115, 12-13. 14-15. 18-19"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 22-26"}]}
      },

// TIEMPO ORDINARIO - SEMANA 6 JUEVES
  "ordinario_s6_ju": {
    "PAR": {"titulo": "Jueves de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 2, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 33, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 27-33"}]},
    "IMPAR": {"titulo": "Jueves de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 9, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 101, 16-18. 19-21. 29 y 22-23"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 27-33"}]}
      },

// TIEMPO ORDINARIO - SEMANA 6 VIERNES
  "ordinario_s6_vi": {
    "PAR": {"titulo": "Viernes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 2, 14-24. 26"},
        {"tipo": "Salmo",       "cita": "Salmo 111, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 34 - 9, 1"}]},
    "IMPAR": {"titulo": "Viernes de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 11, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 10-11. 12-13. 14-15"},
        {"tipo": "Evangelio",   "cita": "Marcos 8, 34 - 9, 1"}]}
      },

// TIEMPO ORDINARIO - SEMANA 6 SABADO
  "ordinario_s6_sa": {
    "PAR": {"titulo": "Sabado de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 3, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 11, 2-3. 4-5. 7-8"},
        {"tipo": "Evangelio",   "cita": "san Marcos 9, 2-13"}]},
    "IMPAR": {"titulo": "Sabado de la 6ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Hebreos 11, 1-7"},
        {"tipo": "Salmo",       "cita": "Salmo 144, 2-3. 4-5. 10-11"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 2-13"}]}
      },

// TIEMPO ORDINARIO - SEMANA 7 LUNES
  "ordinario_s7_lu": {
    "PAR": {"titulo": "Lunes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 3, 13-18"},
        {"tipo": "Salmo",       "cita": "Salmo 18, 8. 9. 10. 15"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 14-29"}]},
    "IMPAR": {"titulo": "Lunes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 1, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 92, 1ab. 1c-2. 5"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 14-29"}]}
      },

// TIEMPO ORDINARIO - SEMANA 7 MARTES
  "ordinario_s7_ma": {
    "PAR": {"titulo": "Martes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 4, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 54, 7-8. 9-10a. 10b-11a. 23"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 30-37"}]},
    "IMPAR": {"titulo": "Martes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 2, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 36, 3-4. 18-19. 27-28. 39-40"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 30-37"}]}},

// TIEMPO ORDINARIO - SEMANA 7 MIERCOLES
  "ordinario_s7_mi": {
    "PAR": {"titulo": "Miercoles de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 4, 13-17"},
        {"tipo": "Salmo",       "cita": "Salmo 48, 2-3. 6-7. 8-10. 11"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 38-40"}]},
    "IMPAR": {"titulo": "Miercoles de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 4, 12-22"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 165. 168. 171. 172. 174. 175"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 38-40"}]}},

// TIEMPO ORDINARIO - SEMANA 7 JUEVES
  "ordinario_s7_ju": {
    "PAR": {"titulo": "Jueves de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 5, 1-6"},
        {"tipo": "Salmo",       "cita": "Salmo 48, 14-15ab. 15cd-16. 17-18. 19-20"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 41-50"}]},
    "IMPAR": {"titulo": "Jueves de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 5, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 1, 1-2. 3. 4 y 6"},
        {"tipo": "Evangelio",   "cita": "Marcos 9, 41-50"}]}},

// TIEMPO ORDINARIO - SEMANA 7 VIERNES
  "ordinario_s7_vi": {
    "PAR": {"titulo": "Viernes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 5, 9-12"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 3-4. 8-9. 11-12"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 1-12"}]},
    "IMPAR": {"titulo": "Viernes de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 6, 5-17"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 12. 16. 18. 27. 34. 35"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 7 SABADO
  "ordinario_s7_sa": {
    "PAR": {"titulo": "Sabado de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Santiago 5, 13-20"},
        {"tipo": "Salmo",       "cita": "Salmo 140, 1-2. 3 y 8"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 13-16"}]},
    "IMPAR": {"titulo": "Sabado de la 7ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 17, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 13-14. 15-16. 17-18a"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 13-16"}]}},

// TIEMPO ORDINARIO - SEMANA 8 LUNES
  "ordinario_s8_lu": {
    "PAR": {"titulo": "Lunes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Pedro 1, 3-9"},
        {"tipo": "Salmo",       "cita": "Salmo 110, 1-2. 5-6. 9 y 10c"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 17-27"}]},
    "IMPAR": {"titulo": "Lunes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 17, 20-28"},
        {"tipo": "Salmo",       "cita": "Salmo 31, 1-2. 5. 6. 7"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 17-27"}]}},

// TIEMPO ORDINARIO - SEMANA 8 MARTES
  "ordinario_s8_ma": {
    "PAR": {"titulo": "Martes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Pedro 1, 10-16"},
        {"tipo": "Salmo",       "cita": "Salmo 97, 1. 2-3ab. 3c-4"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 28-31"}]},
    "IMPAR": {"titulo": "Martes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 35, 1-15"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 5-6. 7-8. 14 y 23"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 28-31"}]}},

// TIEMPO ORDINARIO - SEMANA 8 MIERCOLES
  "ordinario_s8_mi": {
    "PAR": {"titulo": "Miercoles de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Pedro 1, 18-25"},
        {"tipo": "Salmo",       "cita": "Salmo 147, 12-13. 14-15. 19-20"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 32-45"}]},
    "IMPAR": {"titulo": "Miercoles de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 36, 1-2a. 5-6. 13-19"},
        {"tipo": "Salmo",       "cita": "Salmo 78, 8. 9. 11. 13"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 32-45"}]}},

// TIEMPO ORDINARIO - SEMANA 8 JUEVES
  "ordinario_s8_ju": {
    "PAR": {"titulo": "Jueves de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Pedro 2, 2-5. 9-12"},
        {"tipo": "Salmo",       "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 46-52"}]},
    "IMPAR": {"titulo": "Jueves de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 42, 15-26"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 2-3. 4-5. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Marcos 10, 46-52"}]}},

// TIEMPO ORDINARIO - SEMANA 8 VIERNES
  "ordinario_s8_vi": {
    "PAR": {"titulo": "Viernes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Pedro 4, 7-13"},
        {"tipo": "Salmo",       "cita": "Salmo 95, 10. 11-12. 13"},
        {"tipo": "Evangelio",   "cita": "Marcos 11, 11-26"}]},
    "IMPAR": {"titulo": "Viernes de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 44, 1. 9-13"},
        {"tipo": "Salmo",       "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
        {"tipo": "Evangelio",   "cita": "Marcos 11, 11-26"}]}},

// TIEMPO ORDINARIO - SEMANA 8 SABADO
  "ordinario_s8_sa": {
    "PAR": {"titulo": "Sabado de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Judas 1, 17. 20b-25"},
        {"tipo": "Salmo",       "cita": "Salmo 62, 2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Marcos 11, 27-33"}]},
    "IMPAR": {"titulo": "Sabado de la 8ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 51, 17-27"},
        {"tipo": "Salmo",       "cita": "Salmo 18, 8. 9. 10. 11"},
        {"tipo": "Evangelio",   "cita": "Marcos 11, 27-33"}]}},

// TIEMPO ORDINARIO - SEMANA 9 LUNES
  "ordinario_s9_lu": {
    "PAR": {"titulo": "Lunes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Pedro 1, 1-7"},
        {"tipo": "Salmo",       "cita": "Salmo 90, 1-2. 14-15ab. 15c-16"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 1-12"}]},
    "IMPAR": {"titulo": "Lunes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 1, 3; 2, 1b-8"},
        {"tipo": "Salmo",       "cita": "Salmo 111, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 9 MARTES
  "ordinario_s9_ma": {
    "PAR": {"titulo": "Martes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Pedro 3 ,12-15a. 17-18"},
        {"tipo": "Salmo",       "cita": "Salmo 89, 2. 3-4. 10. 14 y 16"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 13-17"}]},
    "IMPAR": {"titulo": "Martes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 2, 9-14"},
        {"tipo": "Salmo",       "cita": "Salmo 111, 1-2. 7-8. 9"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 13-17"}]}},

// TIEMPO ORDINARIO - SEMANA 9 MIERCOLES
  "ordinario_s9_mi": {
    "PAR": {"titulo": "Miercoles de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Timoteo 1, 1-3. 6-12"},
        {"tipo": "Salmo",       "cita": "Salmo 122, 1-2a. 2"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 18-27"}]},
    "IMPAR": {"titulo": "Miercoles de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 3, 1-11a. 16-17a"},
        {"tipo": "Salmo",       "cita": "Salmo 24, 2-3a. 4-5ab. 6-7bc. 8-9"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 18-27"}]}},

// TIEMPO ORDINARIO - SEMANA 9 JUEVES
  "ordinario_s9_ju": {
    "PAR": {"titulo": "Jueves de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Timoteo 2, 8-15"},
        {"tipo": "Salmo",       "cita": "Salmo 24, 4bc-5ab. 8-9. 10 y 14"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 28b-34"}]},
    "IMPAR": {"titulo": "Jueves de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 6, 10-11; 7, 1. 9-17; 8, 4-9a"},
        {"tipo": "Salmo",       "cita": "Salmo 127, 1-2. 3. 4-5"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 28b-34"}]}},

// TIEMPO ORDINARIO - SEMANA 9 VIERNES
  "ordinario_s9_vi": {
    "PAR": {"titulo": "Viernes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Timoteo 3, 10-17"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 157. 160. 161. 165. 166. 168"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 35-37"}]},
    "IMPAR": {"titulo": "Viernes de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 11, 5-17"},
        {"tipo": "Salmo",       "cita": "Salmo 145, 1-2. 6b-7. 8-9a. 9bc-10"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 35-37"}]}},

// TIEMPO ORDINARIO - SEMANA 9 SABADO
  "ordinario_s9_sa": {
    "PAR": {"titulo": "Sabado de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Timoteo 4, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 70, 8-9. 14-15ab. 16-17. 22"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 38-44"}]},
    "IMPAR": {"titulo": "Sabado de la 9ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Tobías 12, 1. 5-15. 20"},
        {"tipo": "Salmo",       "cita": "Tobías 13, 2. 6. 7. 8"},
        {"tipo": "Evangelio",   "cita": "Marcos 12, 38-44"}]}},

// TIEMPO ORDINARIO - SEMANA 10 LUNES
  "ordinario_s10_lu": {
    "PAR": {"titulo": "Lunes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 17, 1-6"},
        {"tipo": "Salmo",       "cita": "Salmo 120, 1-2. 3-4. 5-6. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 1-12"}]},
    "IMPAR": {"titulo": "Lunes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 1, 1-7"},
        {"tipo": "Salmo",       "cita": "Salmo 33, 2-3. 4-5. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 10 MARTES
  "ordinario_s10_ma": {
    "PAR": {"titulo": "Martes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 17, 7-16"},
        {"tipo": "Salmo",       "cita": "Salmo 4, 2-3. 4-5. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 13-16"}]},
    "IMPAR": {"titulo": "Martes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 1, 18-22"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 129. 130. 131. 132. 133. 135"},
        {"tipo": "Evangelio",   "cita": "Mateo 5 13-16"}]}},

// TIEMPO ORDINARIO - SEMANA 10 MIERCOLES
  "ordinario_s10_mi": {
    "PAR": {"titulo": "Miercoles de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 18, 20-39"},
        {"tipo": "Salmo",       "cita": "Salmo 15, 1-2a. 4. 5 y 8. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 17-19"}]},
    "IMPAR": {"titulo": "Miercoles de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 3, 4-11"},
        {"tipo": "Salmo",       "cita": "Salmo 98, 5. 6. 7. 8. 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 17-19"}]}},

// TIEMPO ORDINARIO - SEMANA 10 JUEVES
  "ordinario_s10_ju": {
    "PAR": {"titulo": "Jueves de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 18, 41-46"},
        {"tipo": "Salmo",       "cita": "Salmo 64, 10. 10-11. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 20-26"}]},
    "IMPAR": {"titulo": "Jueves de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 3, 15—4, 1. 3-6"},
        {"tipo": "Salmo",       "cita": "Salmo 84, 9ab-10. 11-12. 13-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 20-26"}]}},

// TIEMPO ORDINARIO - SEMANA 10 VIERNES
  "ordinario_s10_vi": {
    "PAR": {"titulo": "Viernes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 19, 9a. 11-16"},
        {"tipo": "Salmo",       "cita": "Salmo 26, 7-8. 8-9. 13-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 27-32"}]},
    "IMPAR": {"titulo": "Viernes de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 4, 7-15"},
        {"tipo": "Salmo",       "cita": "Salmo 115, 10-11. 15-16. 17-18"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 27-32"}]}},

// TIEMPO ORDINARIO - SEMANA 10 SABADO
  "ordinario_s10_sa": {
    "PAR": {"titulo": "Sabado de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 19, 19-21"},
        {"tipo": "Salmo",       "cita": "Salmo 15, 1-2a y 5. 7-8. 9-10"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 33-37"}]},
    "IMPAR": {"titulo": "Sabado de la 10ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 5, 14-21"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 3-4. 8-9. 11-12"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 33-37"}]}},

// TIEMPO ORDINARIO - SEMANA 11 LUNES
  "ordinario_s11_lu": {
    "PAR": {"titulo": "Lunes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 21, 1-16"},
        {"tipo": "Salmo",       "cita": "Salmo 5, 2-3. 5-6. 7"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 38-42"}]},
    "IMPAR": {"titulo": "Lunes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 6, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 97, 1. 2-3ab. 3cd-4"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 38-42"}]}},

// TIEMPO ORDINARIO - SEMANA 11 MARTES
  "ordinario_s11_ma": {
    "PAR": {"titulo": "Martes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Reyes 21, 17-29"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 3-4. 5-6a. 11 y 16"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 43-48"}]},
    "IMPAR": {"titulo": "Martes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 8, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 145, 2. 5-6. 7. 8-9a"},
        {"tipo": "Evangelio",   "cita": "Mateo 5, 43-48"}]}},

// TIEMPO ORDINARIO - SEMANA 11 MIERCOLES
  "ordinario_s11_mi": {
    "PAR": {"titulo": "Miercoles de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 2, 1. 6-14"},
        {"tipo": "Salmo",       "cita": "Salmo 30, 20. 21. 24"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 1-6. 16-18"}]},
    "IMPAR": {"titulo": "Miercoles de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 9, 6-11"},
        {"tipo": "Salmo",       "cita": "Salmo 111, 1-2. 3-4. 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 1-6. 16-18"}]}},

// TIEMPO ORDINARIO - SEMANA 11 JUEVES
  "ordinario_s11_ju": {
    "PAR": {"titulo": "Jueves de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Sirácida 48, 1-15"},
        {"tipo": "Salmo",       "cita": "Salmo 96, 1-2. 3-4. 5-6. 7"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 7-15"}]},
    "IMPAR": {"titulo": "Jueves de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 11, 1-11"},
        {"tipo": "Salmo",       "cita": "Salmo 110, 1-2. 3-4. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 7-15"}]}},

// TIEMPO ORDINARIO - SEMANA 11 VIERNES
  "ordinario_s11_vi": {
    "PAR": {"titulo": "Viernes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 11, 1-4. 9-18. 20"},
        {"tipo": "Salmo",       "cita": "Salmo 131, 11. 12. 13-14. 17-18"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 19-23"}]},
    "IMPAR": {"titulo": "Viernes de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 11, 18. 21b-30"},
        {"tipo": "Salmo",       "cita": "Salmo 33, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 19-23"}]}},

// TIEMPO ORDINARIO - SEMANA 11 SABADO
  "ordinario_s11_sa": {
    "PAR": {"titulo": "Sabado de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Crónicas 24, 17-25"},
        {"tipo": "Salmo",       "cita": "Salmo 88, 4-5. 29-30. 31-32. 33-34"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 24-34"}]},
    "IMPAR": {"titulo": "Sabado de la 11ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Corintios 12, 1-10"},
        {"tipo": "Salmo",       "cita": "Salmo 33, 8-9. 10-11. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 6, 24-34"}]}},

// TIEMPO ORDINARIO - SEMANA 12 LUNES
  "ordinario_s12_lu": {
    "PAR": {"titulo": "Lunes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 17, 5-8. 13-15.18"},
        {"tipo": "Salmo",       "cita": "Salmo 59, 3. 4-5. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 1-5"}]},
    "IMPAR": {"titulo": "Lunes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 12, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 12-13. 18-19. 20 y 22"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 1-5"}]}},

// TIEMPO ORDINARIO - SEMANA 12 MARTES
  "ordinario_s12_ma": {
    "PAR": {"titulo": "Martes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 19, 9-11. 14-21. 31-35. 36"},
        {"tipo": "Salmo",       "cita": "Salmo 47, 2-3a. 3b-4. 10-11"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 6. 12-14"}]},
    "IMPAR": {"titulo": "Martes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 13, 2. 5-18"},
        {"tipo": "Salmo",       "cita": "Salmo 14, 2-3a. 3bc-4ab. 5"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 6. 12-14"}]}},

// TIEMPO ORDINARIO - SEMANA 12 MIERCOLES
  "ordinario_s12_mi": {
    "PAR": {"titulo": "Miercoles de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 22, 13; 23, 1-3"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 33. 34. 35. 36. 37. 40"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 15-20"}]},
    "IMPAR": {"titulo": "Miercoles de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 15, 1-12. 17-18"},
        {"tipo": "Salmo",       "cita": "Salmo 104, 1-2. 3-4. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 15-20"}]}},

// TIEMPO ORDINARIO - SEMANA 12 JUEVES
  "ordinario_s12_ju": {
    "PAR": {"titulo": "Jueves de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 24, 8-17"},
        {"tipo": "Salmo",       "cita": "Salmo 78, 1-2. 3-5. 8. 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 21-29"}]},
    "IMPAR": {"titulo": "Jueves de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 16 ,1-12. 15-16 / Génesis 16, 6b-12, 15-16"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 1-2. 3-4a. 4b-5"},
        {"tipo": "Evangelio",   "cita": "Mateo 7, 21-29"}]}},

// TIEMPO ORDINARIO - SEMANA 12 VIERNES
  "ordinario_s12_vi": {
    "PAR": {"titulo": "Viernes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Reyes 25, 1-12"},
        {"tipo": "Salmo",       "cita": "Salmo 136, 1-2. 3. 4-5. 6"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 1-4"}]},
    "IMPAR": {"titulo": "Viernes de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 17, 1. 9-10. 15-22"},
        {"tipo": "Salmo",       "cita": "Salmo 127, 1-2. 3. 4-5"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 1-4"}]}},

// TIEMPO ORDINARIO - SEMANA 12 SABADO
  "ordinario_s12_sa": {
    "PAR": {"titulo": "Sabado de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Lamentaciones 2, 2. 10-14. 18-19"},
        {"tipo": "Salmo",       "cita": "Salmo 73, 1-2. 3-5a. 5b-7. 20-21"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 5-17"}]},
    "IMPAR": {"titulo": "Sabado de la 12ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 18, 1-15"},
        {"tipo": "Salmo",       "cita": "Lucas 1, 46-47. 48-49. 50 y 53. 54-55"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 5-17"}]}},

// TIEMPO ORDINARIO - SEMANA 13 LUNES
  "ordinario_s13_lu": {
    "PAR": {"titulo": "Lunes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 2, 6-10. 13-16"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 16-17. 18-19. 20-21. 22-23"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 18-22"}]},
    "IMPAR": {"titulo": "Lunes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 18, 16-33"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 3-4. 8-9. 10-11"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 18-22"}]}},

// TIEMPO ORDINARIO - SEMANA 13 MARTES
  "ordinario_s13_ma": {
    "PAR": {"titulo": "Martes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 3, 1-8; 4, 11-12"},
        {"tipo": "Salmo",       "cita": "Salmo 5, 5-6. 7. 8"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 23-27"}]},
    "IMPAR": {"titulo": "Martes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 19, 15-29"},
        {"tipo": "Salmo",       "cita": "Salmo 25. 2-3. 9-10. 11-12"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 23-27"}]}},

// TIEMPO ORDINARIO - SEMANA 13 MIERCOLES
  "ordinario_s13_mi": {
    "PAR": {"titulo": "Miercoles de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 5, 14-15. 21-24"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 7. 8-9. 10-11. 12-13. 16-17"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 28-34"}]},
    "IMPAR": {"titulo": "Miercoles de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 21, 5. 8-20"},
        {"tipo": "Salmo",       "cita": "Salmo 33, 7-8. 10-11. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 8, 28-34"}]}},

// TIEMPO ORDINARIO - SEMANA 13 JUEVES
  "ordinario_s13_ju": {
    "PAR": {"titulo": "Jueves de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 7, 10-17"},
        {"tipo": "Salmo",       "cita": "Salmo 18, 8. 9. 10. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 1-8"}]},
    "IMPAR": {"titulo": "Jueves de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 22, 1-19"},
        {"tipo": "Salmo",       "cita": "Salmo 114, 1-2. 3-4. 5-6. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 1-8"}]}},

// TIEMPO ORDINARIO - SEMANA 13 VIERNES
  "ordinario_s13_vi": {
    "PAR": {"titulo": "Viernes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 8, 4-6. 9-12"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 2. 10. 20. 30. 40. 131"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 9-13"}]},
    "IMPAR": {"titulo": "Viernes de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 23, 1-4. 19; 24, 1-8. 62-67"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 1-2. 3-4a. 4b-5"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 9-13"}]}},

// TIEMPO ORDINARIO - SEMANA 13 SABADO
  "ordinario_s13_sa": {
    "PAR": {"titulo": "Sabado de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Amós 9, 11-15"},
        {"tipo": "Salmo",       "cita": "Salmo 84, 9. 11-12. 13-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 14-17"}]},
    "IMPAR": {"titulo": "Sabado de la 13ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 27, 1-5. 15-29"},
        {"tipo": "Salmo",       "cita": "Salmo 134, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 14-17"}]}},

// TIEMPO ORDINARIO - SEMANA 14 LUNES
  "ordinario_s14_lu": {
    "PAR": {"titulo": "Lunes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Oseas 2, 16. 17b-18. 21-22"},
        {"tipo": "Salmo",       "cita": "Salmo 144, 2-3. 4-5. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 18-26"}]},
    "IMPAR": {"titulo": "Lunes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 28, 10-22a"},
        {"tipo": "Salmo",       "cita": "Salmo 90, 1-2. 3-4. 14-15ab"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 18-26"}]}},

// TIEMPO ORDINARIO - SEMANA 14 MARTES
  "ordinario_s14_ma": {
    "PAR": {"titulo": "Martes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Oseas 8, 4-7. 11. 13"},
        {"tipo": "Salmo",       "cita": "Salmo 113B, 3-4. 5-6. 7-8. 9-10"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 32-38"}]},
    "IMPAR": {"titulo": "Martes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 32, 22-32"},
        {"tipo": "Salmo",       "cita": "Salmo 16, 1. 2-3. 6-7. 8 y 15"},
        {"tipo": "Evangelio",   "cita": "Mateo 9, 32-38"}]}},

// TIEMPO ORDINARIO - SEMANA 14 MIERCOLES
  "ordinario_s14_mi": {
    "PAR": {"titulo": "Miercoles de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Oseas 10, 1-3. 7-8. 12"},
        {"tipo": "Salmo",       "cita": "Salmo 104, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 1-7"}]},
    "IMPAR": {"titulo": "Miercoles de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 41, 55-57; 42, 5-7.1 7-24a"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 2-3. 10-11. 18-19"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 1-7"}]}},

// TIEMPO ORDINARIO - SEMANA 14 JUEVES
  "ordinario_s14_ju": {
    "PAR": {"titulo": "Jueves de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Oseas 11, 1-4. 8-9"},
        {"tipo": "Salmo",       "cita": "Salmo 79, 2ac y 3b. 15-16"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 7-15"}]},
    "IMPAR": {"titulo": "Jueves de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 44, 18-21. 23b-29; 45, 1-5"},
        {"tipo": "Salmo",       "cita": "Salmo 104, 16-17. 18-19. 20-21"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 7-15"}]}},

// TIEMPO ORDINARIO - SEMANA 14 VIERNES
  "ordinario_s14_vi": {
    "PAR": {"titulo": "Viernes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Oseas 14, 2-10"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 3-4. 8-9. 12-13. 14 y 17"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 16-23"}]},
    "IMPAR": {"titulo": "Viernes de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 46, 1-7. 28-30"},
        {"tipo": "Salmo",       "cita": "Salmo 36, 3-4. 18-19. 27-28. 39-40"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 16-23"}]}},

// TIEMPO ORDINARIO - SEMANA 14 SABADO
  "ordinario_s14_sa": {
    "PAR": {"titulo": "Sabado de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 6, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 92, 1. 1-2. 5"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 24-33"}]},
    "IMPAR": {"titulo": "Sabado de la 14ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Génesis 49, 29-32; 50, 15-26a"},
        {"tipo": "Salmo",       "cita": "Salmo 104, 1-2. 3-4. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 24-33"}]}},

// TIEMPO ORDINARIO - SEMANA 15 LUNES
  "ordinario_s15_lu": {
    "PAR": {"titulo": "Lunes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 1, 10-17"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 8-9. 16bc-17. 21 y 23"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 34—11, 1"}]},
    "IMPAR": {"titulo": "Lunes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 1, 8-14. 22"},
        {"tipo": "Salmo",       "cita": "Salmo 123, 1-3. 4-6. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 10, 34—11, 1"}]}},

// TIEMPO ORDINARIO - SEMANA 15 MARTES
  "ordinario_s15_ma": {
    "PAR": {"titulo": "Martes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 7, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 47, 2-3a. 3b-4. 5-6. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 20-24"}]},
    "IMPAR": {"titulo": "Martes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 2, 1-15a"},
        {"tipo": "Salmo",       "cita": "Salmo 68, 3. 14. 30-31. 33-34"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 20-24"}]}},

// TIEMPO ORDINARIO - SEMANA 15 MIERCOLES
  "ordinario_s15_mi": {
    "PAR": {"titulo": "Miercoles de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 10, 5-7. 13-16"},
        {"tipo": "Salmo",       "cita": "Salmo 93, 5-6. 7-8. 9-10. 14-15"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 25-27"}]},
    "IMPAR": {"titulo": "Miercoles de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 3, 1-6. 9-12"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 1-2. 3-4. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 25-27"}]}},

// TIEMPO ORDINARIO - SEMANA 15 JUEVES
  "ordinario_s15_ju": {
    "PAR": {"titulo": "Jueves de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 26, 7-9. 12. 16-19"},
        {"tipo": "Salmo",       "cita": "Salmo 101, 13-14ab y 15. 16-18. 19-21"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 28-30"}]},
    "IMPAR": {"titulo": "Jueves de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 3, 13-20"},
        {"tipo": "Salmo",       "cita": "Salmo 104, 1 y 5. 8-9. 24-25. 26-27"},
        {"tipo": "Evangelio",   "cita": "Mateo 11, 28-30"}]}},

// TIEMPO ORDINARIO - SEMANA 15 VIERNES
  "ordinario_s15_vi": {
    "PAR": {"titulo": "Viernes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Isaías 38, 1-6. 21-22. 7-8"},
        {"tipo": "Salmo",       "cita": "Isaías 38, 10. 11. 12. 16"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 1-8"}]},
    "IMPAR": {"titulo": "Viernes de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 11, 10—12, 14"},
        {"tipo": "Salmo",       "cita": "Salmo 115, 12-13. 15-16bc. 17-18"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 1-8"}]}},

// TIEMPO ORDINARIO - SEMANA 15 SABADO
  "ordinario_s15_sa": {
    "PAR": {"titulo": "Sabado de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Miqueas 2, 1-5"},
        {"tipo": "Salmo",       "cita": "Salmo 9, 1-2. 3-4. 7-8. 14"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 14-21"}]},
    "IMPAR": {"titulo": "Sabado de la 15ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 12, 37-42"},
        {"tipo": "Salmo",       "cita": "Salmo 135, 1. 23. 24. 10. 12. 13-15"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 14-21"}]}},

// TIEMPO ORDINARIO - SEMANA 16 LUNES
  "ordinario_s16_lu": {
    "PAR": {"titulo": "Lunes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Miqueas 6, 1-4. 6-8"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 5-6. 8-9. 16bc-17. 21 y 23"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 38-42"}]},
    "IMPAR": {"titulo": "Lunes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 14, 5-18"},
        {"tipo": "Salmo",       "cita": "Éxodo 15, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 38-42"}]}},

// TIEMPO ORDINARIO - SEMANA 16 MARTES
  "ordinario_s16_ma": {
    "PAR": {"titulo": "Martes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Miqueas 7, 14-15. 18-20"},
        {"tipo": "Salmo",       "cita": "Salmo 84, 2-4. 5-6. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 46-50"}]},
    "IMPAR": {"titulo": "Martes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 14, 21—15, 1"},
        {"tipo": "Salmo",       "cita": "Éxodo 15, 8-9. 10 y 12. 17, 17"},
        {"tipo": "Evangelio",   "cita": "Mateo 12, 46-50"}]}},

// TIEMPO ORDINARIO - SEMANA 16 MIERCOLES
  "ordinario_s16_mi": {
    "PAR": {"titulo": "Miercoles de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 1, 1. 4-10"},
        {"tipo": "Salmo",       "cita": "Salmo 70, 1-2. 3-4a. 5-6ab. 15ab y 17"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 1-9"}]},
    "IMPAR": {"titulo": "Miercoles de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 16, 1-5. 9-15"},
        {"tipo": "Salmo",       "cita": "Salmo 77, 18-19. 23-24. 25-26. 27-28"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 1-9"}]}},

// TIEMPO ORDINARIO - SEMANA 16 JUEVES
  "ordinario_s16_ju": {
    "PAR": {"titulo": "Jueves de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 2, 1-3. 7-8. 12-13"},
        {"tipo": "Salmo",       "cita": "Salmo 35, 6-7ab. 8-9. 10-11"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 10-17"}]},
    "IMPAR": {"titulo": "Jueves de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 19, 1-2. 9-11. 16-20b"},
        {"tipo": "Salmo",       "cita": "Daniel 3, 52. 53. 54. 55. 56"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 10-17"}]}},

// TIEMPO ORDINARIO - SEMANA 16 VIERNES
  "ordinario_s16_vi": {
    "PAR": {"titulo": "Viernes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 3, 14-17"},
        {"tipo": "Salmo",       "cita": "Jeremías 31, 10. 11 -12. 13"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 18-23"}]},
    "IMPAR": {"titulo": "Viernes de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 20, 1-17"},
        {"tipo": "Salmo",       "cita": "Salmo 18, 8. 9. 10. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 18-23"}]}},

// TIEMPO ORDINARIO - SEMANA 16 SABADO
  "ordinario_s16_sa": {
    "PAR": {"titulo": "Sabado de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 7, 1-11"},
        {"tipo": "Salmo",       "cita": "Salmo 83, 3. 4. 5-6 y 8. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 24-30"}]},
    "IMPAR": {"titulo": "Sabado de la 16ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 24, 3-8"},
        {"tipo": "Salmo",       "cita": "Salmo 49, 1-2. 5-6. 14-15"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 24-30"}]}},

// TIEMPO ORDINARIO - SEMANA 17 LUNES
  "ordinario_s17_lu": {
    "PAR": {"titulo": "Lunes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 13, 1-11"},
        {"tipo": "Salmo",       "cita": "Deuteronomio 32, 18-19. 20. 21"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 31-35"}]},
    "IMPAR": {"titulo": "Lunes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 32, 15-24. 30-34"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 19-20. 21-22. 23"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 31-35"}]}},

// TIEMPO ORDINARIO - SEMANA 17 MARTES
  "ordinario_s17_ma": {
    "PAR": {"titulo": "Martes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 14, 17-22"},
        {"tipo": "Salmo",       "cita": "Salmo 78, 8. 9. 11 y 13"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 36-43"}]},
    "IMPAR": {"titulo": "Martes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 33, 7-11; 34, 5b-9. 28"},
        {"tipo": "Salmo",       "cita": "Salmo 102, 6-7. 8-9. 10-11. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 36-43"}]}},

// TIEMPO ORDINARIO - SEMANA 17 MIERCOLES
  "ordinario_s17_mi": {
    "PAR": {"titulo": "Miercoles de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 15, 10. 16-21"},
        {"tipo": "Salmo",       "cita": "Salmo 58, 23. 4-5a. 10-11. 17. 18"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 44-46"}]},
    "IMPAR": {"titulo": "Miercoles de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 34, 29-35"},
        {"tipo": "Salmo",       "cita": "Salmo 98, 5. 6. 7. 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 44-46"}]}},

// TIEMPO ORDINARIO - SEMANA 17 JUEVES
  "ordinario_s17_ju": {
    "PAR": {"titulo": "Jueves de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 18, 1-6"},
        {"tipo": "Salmo",       "cita": "Salmo 145, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 47-53"}]},
    "IMPAR": {"titulo": "Jueves de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Éxodo 40, 16-21. 34-38"},
        {"tipo": "Salmo",       "cita": "Salmo 83, 3. 4. 5-6a y 8a. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 47-53"}]}},

// TIEMPO ORDINARIO - SEMANA 17 VIERNES
  "ordinario_s17_vi": {
    "PAR": {"titulo": "Viernes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 26, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 68, 5. 8-10. 14"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 54-58"}]},
    "IMPAR": {"titulo": "Viernes de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Levítico 23, 1. 4-11. 15-16. 27. 34b-37"},
        {"tipo": "Salmo",       "cita": "Salmo 80, 3-4. 5-6ab. 10-11ab"},
        {"tipo": "Evangelio",   "cita": "Mateo 13, 54-58"}]}},

// TIEMPO ORDINARIO - SEMANA 17 SABADO
  "ordinario_s17_sa": {
    "PAR": {"titulo": "Sabado de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 26, 11-16. 24"},
        {"tipo": "Salmo",       "cita": "Salmo 68, 15-16. 30-31. 33-34"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 1-12"}]},
    "IMPAR": {"titulo": "Sabado de la 17ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Levítico 25, 1. 8-17"},
        {"tipo": "Salmo",       "cita": "Salmo 66, 2-3. 5. 7-8"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 18 LUNES
  "ordinario_s18_lu": {
    "PAR": {"titulo": "Lunes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 28, 1-17"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 29. 43. 79. 80. 95. 102"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 13-21"}]},
    "IMPAR": {"titulo": "Lunes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Números 11, 4b-15"},
        {"tipo": "Salmo",       "cita": "Salmo 80, 12-13. 14-15. 16-17"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 13-21"}]}},

// TIEMPO ORDINARIO - SEMANA 18 MARTES
  "ordinario_s18_ma": {
    "PAR": {"titulo": "Martes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 30, 1-2. 12-15. 18-22"},
        {"tipo": "Salmo",       "cita": "Salmo 101, 16-18. 19-21. 29 y 22-23"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 22-36 / Mateo 15, 1-2. 10-14"}]},
    "IMPAR": {"titulo": "Martes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Números 12, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 3-4. 5-6. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 14, 22-36 / Mateo 15, 1-2. 10-14"}]}},

// TIEMPO ORDINARIO - SEMANA 18 MIERCOLES
  "ordinario_s18_mi": {
    "PAR": {"titulo": "Miercoles de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 31, 1-7"},
        {"tipo": "Salmo",       "cita": "Jeremías 31. 10. 11-12ab. 13"},
        {"tipo": "Evangelio",   "cita": "Mateo 15, 21-28"}]},
    "IMPAR": {"titulo": "Miercoles de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Números 13, 1-2. 25—14, 1. 26-30. 34-35"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 6-7a. 13-14. 21-22. 23"},
        {"tipo": "Evangelio",   "cita": "Mateo 15, 21-28"}]}},

// TIEMPO ORDINARIO - SEMANA 18 JUEVES
  "ordinario_s18_ju": {
    "PAR": {"titulo": "Jueves de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jeremías 31, 31-34"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 12-13. 14-15. 18-19"},
        {"tipo": "Evangelio",   "cita": "Mateo 16, 13-23"}]},
    "IMPAR": {"titulo": "Jueves de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Números 20, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 94, 1-2. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 16, 13-23"}]}},

// TIEMPO ORDINARIO - SEMANA 18 VIERNES
  "ordinario_s18_vi": {
    "PAR": {"titulo": "Viernes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Nahun 2, 1. 3; 3, 1-3. 6-7"},
        {"tipo": "Salmo",       "cita": "Deuteronomio 32, 35-36. 39. 41"},
        {"tipo": "Evangelio",   "cita": "Mateo 16, 24-28"}]},
    "IMPAR": {"titulo": "Viernes de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Deuteronomio 4, 32-40"},
        {"tipo": "Salmo",       "cita": "Salmo 76, 12-13. 14-15. 16 y 21"},
        {"tipo": "Evangelio",   "cita": "Mateo 16 ,24-28"}]}},

// TIEMPO ORDINARIO - SEMANA 18 SABADO
  "ordinario_s18_sa": {
    "PAR": {"titulo": "Sabado de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Habacuc 1, 12—2, 4"},
        {"tipo": "Salmo",       "cita": "Salmo 9, 8-9. 10-11. 12-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 17, 14-20"}]},
    "IMPAR": {"titulo": "Sabado de la 18ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Deuteronomio 6, 4-13"},
        {"tipo": "Salmo",       "cita": "Salmo 17, 28-3a. 3bc-4. 47 y 51ab"},
        {"tipo": "Evangelio",   "cita": "Mateo 17, 14-20"}]}},

// TIEMPO ORDINARIO - SEMANA 19 LUNES
  "ordinario_s19_lu": {
    "PAR": {"titulo": "Lunes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 1, 2-5. 24-28"},
        {"tipo": "Salmo",       "cita": "Salmo 148, 1-2. 11-12. 12-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 17, 22-27"}]},
    "IMPAR": {"titulo": "Lunes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Deuteronomio 10, 12-22"},
        {"tipo": "Salmo",       "cita": "Salmo 147, 12-13. 14-15. 19-20"},
        {"tipo": "Evangelio",   "cita": "Mateo 17, 22-27"}]}},

// TIEMPO ORDINARIO - SEMANA 19 MARTES
  "ordinario_s19_ma": {
    "PAR": {"titulo": "Martes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 2, 8—3, 4"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 14. 24. 72. 103. 111. 131"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 1-5. 10. 12-14"}]},
    "IMPAR": {"titulo": "Martes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Deuteronomio 31, 1-8"},
        {"tipo": "Salmo",       "cita": "Deuteronomio 32, 3-4a. 7. 8. 9 y 12"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 1-5. 10. 12-14"}]}},

// TIEMPO ORDINARIO - SEMANA 19 MIERCOLES
  "ordinario_s19_mi": {
    "PAR": {"titulo": "Miercoles de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 9, 1-7; 10, 18-22"},
        {"tipo": "Salmo",       "cita": "Salmo 112, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 15-20"}]},
    "IMPAR": {"titulo": "Miercoles de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Deuteronomio 34, 1-12"},
        {"tipo": "Salmo",       "cita": "Salmo 65, 1-3a. 5 y 8. 16-17"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 15-20"}]}},

// TIEMPO ORDINARIO - SEMANA 19 JUEVES
  "ordinario_s19_ju": {
    "PAR": {"titulo": "Jueves de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 12, 1-12"},
        {"tipo": "Salmo",       "cita": "Salmo 77, 56-57. 58-59. 61-62"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 21 - 19, 1"}]},
    "IMPAR": {"titulo": "Jueves de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Josué 3, 7-10a. 11. 13-17"},
        {"tipo": "Salmo",       "cita": "Salmo 113A, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 18, 21—19, 1"}]}},

// TIEMPO ORDINARIO - SEMANA 19 VIERNES
  "ordinario_s19_vi": {
    "PAR": {"titulo": "Viernes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 16, 1-15. 60. 63  / Ezequiel Ez 16, 59-63"},
        {"tipo": "Salmo",       "cita": "Isaías 12, 2-3. 4bcd. 5-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 3-12"}]},
    "IMPAR": {"titulo": "Viernes de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Josué 24, 1-13"},
        {"tipo": "Salmo",       "cita": "Salmo 135, 1-3. 16-18. 21-22 y 24"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 3-12"}]}},

// TIEMPO ORDINARIO - SEMANA 19 SABADO
  "ordinario_s19_sa": {
    "PAR": {"titulo": "Sabado de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 18, 1-10. 13b. 30-32"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 12-13. 14-15. 18-19"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 13-15"}]},
    "IMPAR": {"titulo": "Sabado de la 19ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Josué 24, 14-29"},
        {"tipo": "Salmo",       "cita": "Salmo 15, 1-2a y 5. 7-8. 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 13-15"}]}},

// TIEMPO ORDINARIO - SEMANA 20 LUNES
  "ordinario_s20_lu": {
    "PAR": {"titulo": "Lunes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 24, 15-24"},
        {"tipo": "Salmo",       "cita": "Deuteronomio 32, 18-19. 20. 21"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 16-22"}]},
    "IMPAR": {"titulo": "Lunes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jueces 2, 11-19"},
        {"tipo": "Salmo",       "cita": "Salmo 105, 34-35. 36-37. 39-40. 43ab y 44"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 16-22"}]}},

// TIEMPO ORDINARIO - SEMANA 20 MARTES
  "ordinario_s20_ma": {
    "PAR": {"titulo": "Martes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 28, 1-10"},
        {"tipo": "Salmo",       "cita": "Deuteronomio 32, 26-27. 27-28. 30. 35-36"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 23-30"}]},
    "IMPAR": {"titulo": "Martes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jueces 6, 11-24a"},
        {"tipo": "Salmo",       "cita": "Salmo 84, 9. 11-12. 13-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 19, 23-30"}]}},

// TIEMPO ORDINARIO - SEMANA 20 MIERCOLES
  "ordinario_s20_mi": {
    "PAR": {"titulo": "Miercoles de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 34, 1-11"},
        {"tipo": "Salmo",       "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
        {"tipo": "Evangelio",   "cita": "Mateo 20, 1-16"}]},
    "IMPAR": {"titulo": "Miercoles de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jueces 9, 6-15"},
        {"tipo": "Salmo",       "cita": "Salmo 20, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 20, 1-16"}]}},

// TIEMPO ORDINARIO - SEMANA 20 JUEVES
  "ordinario_s20_ju": {
    "PAR": {"titulo": "Jueves de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 36, 23-28"},
        {"tipo": "Salmo",       "cita": "Salmo 50, 12-13. 14-15. 18-19"},
        {"tipo": "Evangelio",   "cita": "Mateo 22, 1-14"}]},
    "IMPAR": {"titulo": "Jueves de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Jueces 11, 29-39a"},
        {"tipo": "Salmo",       "cita": "Salmo 39, 5. 7-8a. 8b-9. 10"},
        {"tipo": "Evangelio",   "cita": "Mateo 22, 1-14"}]}},

// TIEMPO ORDINARIO - SEMANA 20 VIERNES
  "ordinario_s20_vi": {
    "PAR": {"titulo": "Viernes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 37, 1-14"},
        {"tipo": "Salmo",       "cita": "Salmo 106, 2-3. 4-5. 6-7. 8-9"},
        {"tipo": "Evangelio",   "cita": "Mateo 22, 34-40"}]},
    "IMPAR": {"titulo": "Viernes de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Rut 1, 1. 3-6. 14b-16. 22"},
        {"tipo": "Salmo",       "cita": "Salmo 145, 5-6ab. 6c-7. 8-9a. 9bc-10"},
        {"tipo": "Evangelio",   "cita": "Mateo 22, 34-40"}]}},

// TIEMPO ORDINARIO - SEMANA 20 SABADO
  "ordinario_s20_sa": {
    "PAR": {"titulo": "Sabado de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Ezequiel 43, 1-7a"},
        {"tipo": "Salmo",       "cita": "Salmo 84, 9ab-10. 11-12. 13-14"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 1-12"}]},
    "IMPAR": {"titulo": "Sabado de la 20ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Rut 2, 1-3. 8-11; 4, 13-17"},
        {"tipo": "Salmo",       "cita": "Salmo 127, 1-2. 3. 4. 5"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 21 LUNES
  "ordinario_s21_lu": {
    "PAR": {"titulo": "Lunes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Tesalonicenses 1, 1-5. 11b-12"},
        {"tipo": "Salmo",       "cita": "Salmo 95, 1-2a. 2b-3. 4-5"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 13-22"}]},
    "IMPAR": {"titulo": "Lunes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 1, 1-5. 8-10"},
        {"tipo": "Salmo",       "cita": "Salmo 149, 1-2. 3-4. 5-6 y 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 13-22"}]}},

// TIEMPO ORDINARIO - SEMANA 21 MARTES
  "ordinario_s21_ma": {
    "PAR": {"titulo": "Martes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Tesalonicenses 2, 1-3a. 14-17"},
        {"tipo": "Salmo",       "cita": "Salmo 95, 10. 11-12a. 12b-13"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 23-26"}]},
    "IMPAR": {"titulo": "Martes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 2, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 138, 1-3. 4-6"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 23-26"}]}},

// TIEMPO ORDINARIO - SEMANA 21 MIERCOLES
  "ordinario_s21_mi": {
    "PAR": {"titulo": "Miercoles de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "2 Tesalonicenses 3, 6-10. 16-18"},
        {"tipo": "Salmo",       "cita": "Salmo 127, 1-2. 4-5"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 27-32"}]},
    "IMPAR": {"titulo": "Miercoles de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 2, 9-13"},
        {"tipo": "Salmo",       "cita": "Salmo 138, 7-8. 9-10. 11-12"},
        {"tipo": "Evangelio",   "cita": "Mateo 23, 27-32"}]}},

// TIEMPO ORDINARIO - SEMANA 21 JUEVES
  "ordinario_s21_ju": {
    "PAR": {"titulo": "Jueves de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 1, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 144, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",   "cita": "Mateo 24, 42-51"}]},
    "IMPAR": {"titulo": "Jueves de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 3, 7-13"},
        {"tipo": "Salmo",       "cita": "Salmo 89, 3-4. 12-13. 14 y 17"},
        {"tipo": "Evangelio",   "cita": "Mateo 24, 42-51"}]}},

// TIEMPO ORDINARIO - SEMANA 21 VIERNES
  "ordinario_s21_vi": {
    "PAR": {"titulo": "Viernes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 1, 17-25"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 1-2. 4-5. 10ab y 11"},
        {"tipo": "Evangelio",   "cita": "Mateo 25, 1-13"}]},
    "IMPAR": {"titulo": "Viernes de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 4, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 96, 1 y 2b. 5-6. 10. 11-12"},
        {"tipo": "Evangelio",   "cita": "Mateo 25, 1-13"}]}},

// TIEMPO ORDINARIO - SEMANA 21 SABADO
  "ordinario_s21_sa": {
    "PAR": {"titulo": "Sabado de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 1, 26-31"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 12-13. 18-19. 20-21"},
        {"tipo": "Evangelio",   "cita": "Mateo 25, 14-30"}]},
    "IMPAR": {"titulo": "Sabado de la 21ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 4, 9-11"},
        {"tipo": "Salmo",       "cita": "Salmo 97, 1. 7-8. 9"},
        {"tipo": "Evangelio",   "cita": "Mateo 25, 14-30"}]}},

// TIEMPO ORDINARIO - SEMANA 22 LUNES
  "ordinario_s22_lu": {
    "PAR": {"titulo": "Lunes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 2, 1-5"},
        {"tipo": "Salmo",       "cita": "Salmo 118, 97. 98. 99. 100. 101"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 16-30"}]},
    "IMPAR": {"titulo": "Lunes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 4, 13-18"},
        {"tipo": "Salmo",       "cita": "Salmo 95, 1 y 3. 4-5. 11-12a. 12b-13"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 16-30"}]}},

// TIEMPO ORDINARIO - SEMANA 22 MARTES
  "ordinario_s22_ma": {
    "PAR": {"titulo": "Martes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 2, 10b-16"},
        {"tipo": "Salmo",       "cita": "Salmo 144, 8-9. 10-11. 12-13ab. 13cb-14"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 31-37"}]},
    "IMPAR": {"titulo": "Martes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Tesalonicenses 5, 1-6. 9-11"},
        {"tipo": "Salmo",       "cita": "Salmo 26, 1. 4. 13-14"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 31-37"}]}},

// TIEMPO ORDINARIO - SEMANA 22 MIERCOLES
  "ordinario_s22_mi": {
    "PAR": {"titulo": "Miercoles de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 3, 1-9"},
        {"tipo": "Salmo",       "cita": "Salmo 32, 12-13. 14-15. 20-21"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 38-44"}]},
    "IMPAR": {"titulo": "Miercoles de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Colosenses 1, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 51, 10. 11"},
        {"tipo": "Evangelio",   "cita": "Lucas 4, 38-44"}]}},

// TIEMPO ORDINARIO - SEMANA 22 JUEVES
  "ordinario_s22_ju": {
    "PAR": {"titulo": "Jueves de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 3, 18-23"},
        {"tipo": "Salmo",       "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",   "cita": "Lucas 5, 1-11"}]},
    "IMPAR": {"titulo": "Jueves de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Colosenses 1, 9-14"},
        {"tipo": "Salmo",       "cita": "Salmo 97, 2-3ab. 3cd-4. 5-6"},
        {"tipo": "Evangelio",   "cita": "Lucas 5, 1-11"}]}},

// TIEMPO ORDINARIO - SEMANA 22 VIERNES
  "ordinario_s22_vi": {
    "PAR": {"titulo": "Viernes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Corintios 4, 1-5"},
        {"tipo": "Salmo",       "cita": "Salmo 36, 3-4. 5-6. 27-28. 39-40"},
        {"tipo": "Evangelio",   "cita": "Lucas 5, 33-39"}]},
    "IMPAR": {"titulo": "Viernes de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Colosenses 1, 15-20"},
        {"tipo": "Salmo",       "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",   "cita": "Lucas 5, 33-39"}]}},

// TIEMPO ORDINARIO - SEMANA 22 SABADO
  "ordinario_s22_sa": {
    "PAR": {"titulo": "Sabado de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 4, 6b-15"},
        {"tipo": "Salmo",       "cita": "Salmo 144, 17-18. 19-20. 21"},
        {"tipo": "Evangelio",   "cita": "Lucas 6, 1-5"}]},
    "IMPAR": {"titulo": "Sabado de la 22ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Colosenses 1, 21-23"},
        {"tipo": "Salmo",       "cita": "Salmo 53, 3-4. 6 y 8"},
        {"tipo": "Evangelio",   "cita": "Lucas 6, 1-5"}]}},

// TIEMPO ORDINARIO - SEMANA 23 LUNES
  "ordinario_s23_lu": {
    "PAR": {"titulo": "Lunes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "1 Corintios 5, 1-8"},
        {"tipo": "Salmo",       "cita": "Salmo 5, 5-6. 7. 12"},
        {"tipo": "Evangelio",   "cita": "Lucas 6, 6-11"}]},
    "IMPAR": {"titulo": "Lunes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",  "cita": "Colosenses 1, 24—2, 3"},
        {"tipo": "Salmo",       "cita": "Salmo 61, 6-7. 9"},
        {"tipo": "Evangelio",   "cita": "Lucas 6, 6-11"}]}},

// TIEMPO ORDINARIO - SEMANA 23 MARTES
  "ordinario_s23_ma": {
    "PAR": {"titulo": "Martes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 6, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 12-19"}]},
    "IMPAR": {"titulo": "Martes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Colosenses 2, 6-15"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 1-2. 8-9. 10-11"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 12-19"}]}},

      // TIEMPO ORDINARIO - SEMANA 23 MIERCOLES
  "ordinario_s23_mi": {
    "PAR": {"titulo": "Miercoles de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 7, 25-31"},
        {"tipo": "Salmo",           "cita": "Salmo 44, 11-12. 14-15. 16-17"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 20-26"}]},
    "IMPAR": {"titulo": "Miercoles de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Colosenses 3, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 2-3. 10-11. 12-13"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 20-26"}]}},

      // TIEMPO ORDINARIO - SEMANA 23 JUEVES
  "ordinario_s23_ju": {
    "PAR": {"titulo": "Jueves de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 8, 1b-7. 11-13"},
        {"tipo": "Salmo",           "cita": "Salmo 138, 1-3. 13-14ab. 23-24"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 27-38"}]},
    "IMPAR": {"titulo": "Jueves de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Colosenses 3, 12-17"},
        {"tipo": "Salmo",           "cita": "Salmo 150, 1. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 27-38"}]}},

      // TIEMPO ORDINARIO - SEMANA 23 VIERNES
  "ordinario_s23_vi": {
    "PAR": {"titulo": "Viernes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 9, 16-19. 22b-27"},
        {"tipo": "Salmo",           "cita": "Salmo 83, 3. 4. 5-6. 12"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 39-42"}]},
    "IMPAR": {"titulo": "Viernes de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 1, 1-2. 12-14"},
        {"tipo": "Salmo",           "cita": "Salmo 15, 1-2a y 5. 7-8. 11"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 39-42"}]}},

      // TIEMPO ORDINARIO - SEMANA 23 SABADO
  "ordinario_s23_sa": {
    "PAR": {"titulo": "Sabado de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 10, 14-22"},
        {"tipo": "Salmo",           "cita": "Salmo 115, 12-13. 17-18"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 43-49"}]},
    "IMPAR": {"titulo": "Sabado de la 23ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 1, 15-17"},
        {"tipo": "Salmo",           "cita": "Salmo 112, 1-2. 3-4. 5 y 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 6, 43-49"}]}},

      // TIEMPO ORDINARIO - SEMANA 24 LUNES
  "ordinario_s24_lu": {
    "PAR": {"titulo": "Lunes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 11, 17-26. 33"},
        {"tipo": "Salmo",           "cita": "Salmo 39, 7-8a. 8b-9. 10. 17"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 1-10"}]},
    "IMPAR": {"titulo": "Lunes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 2, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 27, 2. 7. 8-9"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 1-10"}]}},

// TIEMPO ORDINARIO - SEMANA 24 MARTES
  "ordinario_s24_ma": {
    "PAR": {"titulo": "Martes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 12, 12-14. 27-31a"},
        {"tipo": "Salmo",           "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 11-17"}]},
    "IMPAR": {"titulo": "Martes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 3, 1-13"},
        {"tipo": "Salmo",           "cita": "Salmo 100, 1-2. 2-3. 5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 11-17"}]}},

// TIEMPO ORDINARIO - SEMANA 24 MIERCOLES
  "ordinario_s24_mi": {
    "PAR": {"titulo": "Miercoles de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 12, 31—13, 13"},
        {"tipo": "Salmo",           "cita": "Salmo 32, 2-3. 4-5. 12 y 22"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 31-35"}]},
    "IMPAR": {"titulo": "Miercoles de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 3, 14-16"},
        {"tipo": "Salmo",           "cita": "Salmo 110, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 31-35"}]}},

// TIEMPO ORDINARIO - SEMANA 24 JUEVES
  "ordinario_s24_ju": {
    "PAR": {"titulo": "Jueves de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 15, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 117, 1-2. 16ab-17, 28"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 36-50"}]},
    "IMPAR": {"titulo": "Jueves de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 4, 12-16"},
        {"tipo": "Salmo",           "cita": "Salmo 110, 7-8. 9. 10"},
        {"tipo": "Evangelio",       "cita": "Lucas 7, 36-50"}]}},

// TIEMPO ORDINARIO - SEMANA 24 VIERNES
  "ordinario_s24_vi": {
    "PAR": {"titulo": "Viernes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 15, 12-20"},
        {"tipo": "Salmo",           "cita": "Salmo 16, 1. 6-7. 8 y 15"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 1-3"}]},
    "IMPAR": {"titulo": "Viernes de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Timoteo 6, 2-12"},
        {"tipo": "Salmo",           "cita": "Salmo 48, 6-7. 8-10. 17-18. 19-20"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 1-3"}]}},

// TIEMPO ORDINARIO - SEMANA 24 SABADO
  "ordinario_s24_sa": {
    "PAR": {"titulo": "Sabado de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Corintios 15, 35-37. 42-49"},
        {"tipo": "Salmo",           "cita": "Salmo 55, 10. 11-12. 13. 14"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 4-15"}]},
    "IMPAR": {"titulo": "Sabado de la 24ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Timoteo 6, 13-16"},
        {"tipo": "Salmo",           "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 4-15"}]}},

// TIEMPO ORDINARIO - SEMANA 25 LUNES
  "ordinario_s25_lu": {
    "PAR": {"titulo": "Lunes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Proverbios 3, 27-34"},
        {"tipo": "Salmo",           "cita": "Salmo 14, 2-3ab. 3cd-4ab. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 16-18"}]},
    "IMPAR": {"titulo": "Lunes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Esdras 1, 1-6"},
        {"tipo": "Salmo",           "cita": "Salmo 125, 1-2. 2-3. 4-5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 16-18"}]}},

// TIEMPO ORDINARIO - SEMANA 25 MARTES
  "ordinario_s25_ma": {
    "PAR": {"titulo": "Martes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Proverbios 21, 1-6. 10-13"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 1. 27. 30. 34. 35. 44"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 19-21"}]},
    "IMPAR": {"titulo": "Martes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Esdras 6, 7-8. 12. 14-20"},
        {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 3-4a. 4b-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 8, 19-21"}]}},

// TIEMPO ORDINARIO - SEMANA 25 MIERCOLES
  "ordinario_s25_mi": {
    "PAR": {"titulo": "Miercoles de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Proverbios 30, 5-9"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 29. 72. 89. 101. 104. 163"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 1-6"}]},
    "IMPAR": {"titulo": "Miercoles de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Esdras 9, 5-9"},
        {"tipo": "Salmo",           "cita": "Tobías 13, 2. 4. 6. 7. 8"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 1-6"}]}},

// TIEMPO ORDINARIO - SEMANA 25 JUEVES
  "ordinario_s25_ju": {
    "PAR": {"titulo": "Jueves de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Qohélet 1, 2-11"},
        {"tipo": "Salmo",           "cita": "Salmo 89, 3-4. 5-6. 12-13. 14 y 17"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 7-9"}]},
    "IMPAR": {"titulo": "Jueves de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Ageo 1, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6. 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 7-9"}]}},

// TIEMPO ORDINARIO - SEMANA 25 VIERNES
  "ordinario_s25_vi": {
    "PAR": {"titulo": "Viernes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Qohélet 3, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 143. 1a y 2abc. 3-4"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 18-22"}]},
    "IMPAR": {"titulo": "Viernes de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Ageo 1, 15b—2, 9"},
        {"tipo": "Salmo",           "cita": "Salmo 42, 1. 2. 3. 4"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 18-22"}]}},

// TIEMPO ORDINARIO - SEMANA 25 SABADO
  "ordinario_s25_sa": {
    "PAR": {"titulo": "Sabado de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Qohélet 11, 9—12, 8"},
        {"tipo": "Salmo",           "cita": "Salmo 89, 3-4. 5-6. 12-13. 14 y 17"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 43b-45"}]},
    "IMPAR": {"titulo": "Sabado de la 25ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Zacarías 2, 5-9. 14-15"},
        {"tipo": "Salmo",           "cita": "Jeremías 31, 10. 11-12. 13"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 43-45"}]}
      },

// TIEMPO ORDINARIO - SEMANA 26 LUNES
  "ordinario_s26_lu": {
    "PAR": {"titulo": "Lunes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 1, 6-22"},
        {"tipo": "Salmo",           "cita": "Salmo 16, 1. 2-3. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 46-50"}]},
    "IMPAR": {"titulo": "Lunes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Zacarías 8, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 101. 16-18. 19-21. 29 y 22-23"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 46-50"}]}
      },

// TIEMPO ORDINARIO - SEMANA 26 MARTES
  "ordinario_s26_ma": {
    "PAR": {"titulo": "Martes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 3, 1-3. 11-17. 20-23"},
        {"tipo": "Salmo",           "cita": "Salmo 87, 2-3. 4-5. 6. 7-8"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 51-56"}]},
    "IMPAR": {"titulo": "Martes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Zacarías 8, 20-23"},
        {"tipo": "Salmo",           "cita": "Salmo 86, 1-3. 4-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 51-56"}]}
      },

// TIEMPO ORDINARIO - SEMANA 26 MIERCOLES
  "ordinario_s26_mi": {
    "PAR": {"titulo": "Miercoles de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 9, 1-12. 14-16"},
        {"tipo": "Salmo",           "cita": "Salmo 87, 10bc-11. 12-13. 14-15"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 57-62"}]},
    "IMPAR": {"titulo": "Miercoles de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Nehemías 2, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 136, 1-2. 3. 4-5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 9, 57-62"}]}},

// TIEMPO ORDINARIO - SEMANA 26 JUEVES
  "ordinario_s26_ju": {
    "PAR": {"titulo": "Jueves de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 19, 21-27"},
        {"tipo": "Salmo",           "cita": "Salmo 26, 7-8a. 8b-9abc. 13-14"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 1-12"}]},
    "IMPAR": {"titulo": "Jueves de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Nehemías 8 ,1-4. 5-6. 7-12"},
        {"tipo": "Salmo",           "cita": "Salmo 18, 8. 9. 10. 11"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 1-12"}]}},

// TIEMPO ORDINARIO - SEMANA 26 VIERNES
  "ordinario_s26_vi": {
    "PAR": {"titulo": "Viernes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 38, 1. 12-21; 40, 3-5"},
        {"tipo": "Salmo",           "cita": "Salmo 138, 1-3, 7-8. 9-10. 13-14ab"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 13-16"}]},
    "IMPAR": {"titulo": "Viernes de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Baruc 1, 15-22"},
        {"tipo": "Salmo",           "cita": "Salmo 78, 1-2. 3-5. 8. 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 13-16"}]}},

// TIEMPO ORDINARIO - SEMANA 26 SABADO
  "ordinario_s26_sa": {
    "PAR": {"titulo": "Sabado de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Job 42, 1-3. 5-6. 12-16"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 66. 71. 75. 91. 125. 130"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 17-24"}]},
    "IMPAR": {"titulo": "Sabado de la 26ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Baruc 4, 5-12. 27-29"},
        {"tipo": "Salmo",           "cita": "Salmo 68, 33-35. 36-37"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 17-24"}]}},

// TIEMPO ORDINARIO - SEMANA 27 LUNES
  "ordinario_s27_lu": {
    "PAR": {"titulo": "Lunes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 1, 6-12"},
        {"tipo": "Salmo",           "cita": "Salmo 110, 1-2. 7-8. 9 y 10"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 25-37"}]},
    "IMPAR": {"titulo": "Lunes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Jonás 1, 1—2, 1. 11"},
        {"tipo": "Salmo",           "cita": "Jonás 2, 3. 4. 5. 8"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 25-37"}]}},

// TIEMPO ORDINARIO - SEMANA 27 MARTES
  "ordinario_s27_ma": {
    "PAR": {"titulo": "Martes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 1, 13-24"},
        {"tipo": "Salmo",           "cita": "Salmo 138, 1-3. 13-14ab. 14c-15"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 38-42"}]},
    "IMPAR": {"titulo": "Martes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Jonás 3, 1-10"},
        {"tipo": "Salmo",           "cita": "Salmo 129, 1-2. 3-4. 7-8"},
        {"tipo": "Evangelio",       "cita": "Lucas 10, 38-42"}]}},

// TIEMPO ORDINARIO - SEMANA 27 MIERCOLES
  "ordinario_s27_mi": {
    "PAR": {"titulo": "Miercoles de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 2, 1-2. 7-14"},
        {"tipo": "Salmo",           "cita": "Salmo 116, 1. 2"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 1-4"}]},
    "IMPAR": {"titulo": "Miercoles de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Jonás 4, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 85, 3-4. 5-6. 9-10"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 1-4"}]}},

// TIEMPO ORDINARIO - SEMANA 27 JUEVES
  "ordinario_s27_ju": {
    "PAR": {"titulo": "Jueves de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 3, 1-5"},
        {"tipo": "Salmo",           "cita": "Lucas 1. 69-70, 71-72. 73-75"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 5-13"}]},
    "IMPAR": {"titulo": "Jueves de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Malaquías 3, 13-20a"},
        {"tipo": "Salmo",           "cita": "Salmo 1, 1-2a. 3. 4 y 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 5-13"}]}},

// TIEMPO ORDINARIO - SEMANA 27 VIERNES
  "ordinario_s27_vi": {
    "PAR": {"titulo": "Viernes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 3, 7-14"},
        {"tipo": "Salmo",           "cita": "Salmo 110, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 15-26"}]},
    "IMPAR": {"titulo": "Viernes de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Joel 1, 13-15; 2 , 1-2"},
        {"tipo": "Salmo",           "cita": "Salmo 9, 2-3. 6 y 16. 8-9"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 15-26"}]}},

// TIEMPO ORDINARIO - SEMANA 27 SABADO
  "ordinario_s27_sa": {
    "PAR": {"titulo": "Sabado de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 3, 22-29"},
        {"tipo": "Salmo",           "cita": "Salmo 104, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 27-28"}]},
    "IMPAR": {"titulo": "Sabado de la 27ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Joel 4, 12-21"},
        {"tipo": "Salmo",           "cita": "Salmo 96, 1-2. 5-6. 11-12"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 27-28"}]}},

// TIEMPO ORDINARIO - SEMANA 28 LUNES
  "ordinario_s28_lu": {
    "PAR": {"titulo": "Lunes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 4, 22-24. 26-27. 31—5, 1"},
        {"tipo": "Salmo",           "cita": "Salmo 112, 1-2. 3-4. 5a y 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 29-32"}]},
    "IMPAR": {"titulo": "Lunes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 1, 1-7"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 3cd-4"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 29-32"}]}},

// TIEMPO ORDINARIO - SEMANA 28 MARTES
  "ordinario_s28_ma": {
    "PAR": {"titulo": "Martes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 5, 1-6"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 41. 43. 44. 45. 47. 48"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 37-41"}]},
    "IMPAR": {"titulo": "Martes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 1, 16-25"},
        {"tipo": "Salmo",           "cita": "Salmo 18, 2-3. 4-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 37-41"}]}},

// TIEMPO ORDINARIO - SEMANA 28 MIERCOLES
  "ordinario_s28_mi": {
    "PAR": {"titulo": "Miercoles de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Gálatas 5, 18-25"},
        {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 42-46"}]},
    "IMPAR": {"titulo": "Miercoles de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 2, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 61, 2-3. 6-7. 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 42-46"}]}},

// TIEMPO ORDINARIO - SEMANA 28 JUEVES
  "ordinario_s28_ju": {
    "PAR": {"titulo": "Jueves de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 1, 1-10"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 3cd-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 47-54"}]},
    "IMPAR": {"titulo": "Jueves de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 3, 21-30a"},
        {"tipo": "Salmo",           "cita": "Salmo 129, 1-2. 3-4. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 11, 47-54"}]}},

// TIEMPO ORDINARIO - SEMANA 28 VIERNES
  "ordinario_s28_vi": {
    "PAR": {"titulo": "Viernes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 1, 11-14"},
        {"tipo": "Salmo",           "cita": "Salmo 32. 1-2. 4-5. 12-13"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 1-7"}]},
    "IMPAR": {"titulo": "Viernes de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 4, 1-8"},
        {"tipo": "Salmo",           "cita": "Salmo 31, 1-2. 5. 11"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 1-7"}]}},

// TIEMPO ORDINARIO - SEMANA 28 SABADO
  "ordinario_s28_sa": {
    "PAR": {"titulo": "Sabado de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 1, 15-23"},
        {"tipo": "Salmo",           "cita": "Salmo 8, 2-3a. 4-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 8-12"}]},
    "IMPAR": {"titulo": "Sabado de la 28ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 4, 13. 16-18"},
        {"tipo": "Salmo",           "cita": "Salmo 104, 6-7. 8-9. 42-43"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 8-12"}]}},

// TIEMPO ORDINARIO - SEMANA 29 LUNES
  "ordinario_s29_lu": {
    "PAR": {"titulo": "Lunes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 2, 1-10"},
        {"tipo": "Salmo",           "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 13-21"}]},
    "IMPAR": {"titulo": "Lunes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 4, 20-25"},
        {"tipo": "Salmo",           "cita": "Lucas 1, 69-70. 71-72. 73-75"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 13-21"}]}},

// TIEMPO ORDINARIO - SEMANA 29 MARTES
  "ordinario_s29_ma": {
    "PAR": {"titulo": "Martes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 2, 12-22"},
        {"tipo": "Salmo",           "cita": "Salmo 84, 9ab-10. 11-12. 13-14"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 35-38"}]},
    "IMPAR": {"titulo": "Martes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 5, 12. 15b. 17-19. 20b-21"},
        {"tipo": "Salmo",           "cita": "Salmo 39, 7-8a. 8b-9. 10. 17"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 35-38"}]}},

// TIEMPO ORDINARIO - SEMANA 29 MIERCOLES
  "ordinario_s29_mi": {
    "PAR": {"titulo": "Miercoles de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 3, 2-12"},
        {"tipo": "Salmo",           "cita": "Isaías 12, 2-3. 4bcd. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 39-48"}]},
    "IMPAR": {"titulo": "Miercoles de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 6, 12-18"},
        {"tipo": "Salmo",           "cita": "Salmo 123, 1-3. 4-6. 7-8"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 39-48"}]}},

// TIEMPO ORDINARIO - SEMANA 29 JUEVES
  "ordinario_s29_ju": {
    "PAR": {"titulo": "Jueves de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 3, 14-21"},
        {"tipo": "Salmo",           "cita": "Salmo 32, 1-2. 4-5. 11-12. 18-19"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 49-53"}]},
    "IMPAR": {"titulo": "Jueves de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 6, 19-23"},
        {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 49-53"}]}},

// TIEMPO ORDINARIO - SEMANA 29 VIERNES
  "ordinario_s29_vi": {
    "PAR": {"titulo": "Viernes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 4, 1-6"},
        {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 54-59"}]},
    "IMPAR": {"titulo": "Viernes de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 7, 18-25a"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 66. 68. 76. 77. 93. 94"},
        {"tipo": "Evangelio",       "cita": "Lucas 12, 54-59"}]}},

// TIEMPO ORDINARIO - SEMANA 29 SABADO
  "ordinario_s29_sa": {
    "PAR": {"titulo": "Sabado de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 4, 7-16"},
        {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 3-4a. 4b-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 1-9"}]},
    "IMPAR": {"titulo": "Sabado de la 29ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 8, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 1-9"}]}},

// TIEMPO ORDINARIO - SEMANA 30 LUNES
  "ordinario_s30_lu": {
    "PAR": {"titulo": "Lunes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 4, 32—5, 8"},
        {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 10-17"}]},
    "IMPAR": {"titulo": "Lunes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 8, 12-17"},
        {"tipo": "Salmo",           "cita": "Salmo 67, 2 y 4. 6-7ab. 20-21"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 10-17"}]}},

// TIEMPO ORDINARIO - SEMANA 30 MARTES
  "ordinario_s30_ma": {
    "PAR": {"titulo": "Martes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 5, 21-33"},
        {"tipo": "Salmo",           "cita": "Salmo 127, 1-2. 3. 4-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 18-21"}]},
    "IMPAR": {"titulo": "Martes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 8, 18-25"},
        {"tipo": "Salmo",           "cita": "Salmo 125, 1-2ab. 2cd-3. 4-5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 18-21"}]}},

// TIEMPO ORDINARIO - SEMANA 30 MIERCOLES
  "ordinario_s30_mi": {
    "PAR": {"titulo": "Miercoles de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 6, 1-9"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 10-11. 12-13ab. 13cd-14"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 22-30"}]},
    "IMPAR": {"titulo": "Miercoles de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 8, 26-30"},
        {"tipo": "Salmo",           "cita": "Salmo 12, 4-5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 22-30"}]}},

// TIEMPO ORDINARIO - SEMANA 30 JUEVES
  "ordinario_s30_ju": {
    "PAR": {"titulo": "Jueves de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Efesios 6, 10-20"},
        {"tipo": "Salmo",           "cita": "Salmo 143, 1. 2. 9-10"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 31-35"}]},
    "IMPAR": {"titulo": "Jueves de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 8, 31b-39"},
        {"tipo": "Salmo",           "cita": "Salmo 108, 21-22. 26-27. 30-31"},
        {"tipo": "Evangelio",       "cita": "Lucas 13, 31-35"}]}},

// TIEMPO ORDINARIO - SEMANA 30 VIERNES
  "ordinario_s30_vi": {
    "PAR": {"titulo": "Viernes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 1, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 110, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 1-6"}]},
    "IMPAR": {"titulo": "Viernes de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 9, 1-5"},
        {"tipo": "Salmo",           "cita": "Salmo 147, 12-13. 14-15. 19-20"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 1-6"}]}},

// TIEMPO ORDINARIO - SEMANA 30 SABADO
  "ordinario_s30_sa": {
    "PAR": {"titulo": "Sabado de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 1, 18b-26"},
        {"tipo": "Salmo",           "cita": "Salmo 41, 2. 3. 5bcd"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 1. 7-11"}]},
    "IMPAR": {"titulo": "Sabado de la 30ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 11, 1-2a. 11-12. 25-29"},
        {"tipo": "Salmo",           "cita": "Salmo 93, 12-13a. 14-15. 17-18"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 1. 7-11"}]}},

// TIEMPO ORDINARIO - SEMANA 31 LUNES
  "ordinario_s31_lu": {
    "PAR": {"titulo": "Lunes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 2, 1-4"},
        {"tipo": "Salmo",           "cita": "Salmo 130, 1. 2. 3"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 12-14"}]},
    "IMPAR": {"titulo": "Lunes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 11 ,29-36"},
        {"tipo": "Salmo",           "cita": "Salmo 68, 30-31. 33-34. 36-37"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 12-14"}]}},

// TIEMPO ORDINARIO - SEMANA 31 MARTES
  "ordinario_s31_ma": {
    "PAR": {"titulo": "Martes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 2, 5-11"},
        {"tipo": "Salmo",           "cita": "Salmo 21, 26b-27. 28-30a. 31-32"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 15-24"}]},
    "IMPAR": {"titulo": "Martes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 12, 5-16a"},
        {"tipo": "Salmo",           "cita": "Salmo 130, 1. 2. 3"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 15-24"}]}},

// TIEMPO ORDINARIO - SEMANA 31 MIERCOLES
  "ordinario_s31_mi": {
    "PAR": {"titulo": "Miercoles de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 2, 12-18"},
        {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 13-14"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 25-33"}]},
    "IMPAR": {"titulo": "Miercoles de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 13, 8-10"},
        {"tipo": "Salmo",           "cita": "Salmo 111, 1-2. 4-5. 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 14, 25-33"}]}},

// TIEMPO ORDINARIO - SEMANA 31 JUEVES
  "ordinario_s31_ju": {
    "PAR": {"titulo": "Jueves de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 3, 3-8a"},
        {"tipo": "Salmo",           "cita": "Salmo 104. 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 15, 1-10"}]},
    "IMPAR": {"titulo": "Jueves de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 14 ,7-12"},
        {"tipo": "Salmo",           "cita": "Salmo 26, 1. 4. 13-14"},
        {"tipo": "Evangelio",       "cita": "Lucas 15, 1-10"}]}},

// TIEMPO ORDINARIO - SEMANA 31 VIERNES
  "ordinario_s31_vi": {
    "PAR": {"titulo": "Viernes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 3, 17—4, 1"},
        {"tipo": "Salmo",           "cita": "Salmo 121, 1-2. 4-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 16, 1-8"}]},
    "IMPAR": {"titulo": "Viernes de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 15, 14-21"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 3cd-4"},
        {"tipo": "Evangelio",       "cita": "Lucas 16, 1-8"}]}},

// TIEMPO ORDINARIO - SEMANA 31 SABADO
  "ordinario_s31_sa": {
    "PAR": {"titulo": "Sabado de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filipenses 4, 10-19"},
        {"tipo": "Salmo",           "cita": "Salmo 111, 1-2. 5-6. 8a y 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 16, 9-15"}]},
    "IMPAR": {"titulo": "Sabado de la 31ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Romanos 16, 3-9. 16. 22-27"},
        {"tipo": "Salmo",           "cita": "Salmo 144, 2-3. 4-5. 10-11"},
        {"tipo": "Evangelio",       "cita": "Lucas 16, 9-15"}]}},

// TIEMPO ORDINARIO - SEMANA 32 LUNES
  "ordinario_s32_lu": {
    "PAR": {"titulo": "Lunes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Tito 1, 1-9"},
        {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 1-6"}]},
    "IMPAR": {"titulo": "Lunes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 1, 1-7"},
        {"tipo": "Salmo",           "cita": "Salmo 138, 1-3a. 3b-6. 7-8. 9-10"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 1-6"}]}},

// TIEMPO ORDINARIO - SEMANA 32 MARTES
  "ordinario_s32_ma": {
    "PAR": {"titulo": "Martes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Tito 2, 1-8. 11-14"},
        {"tipo": "Salmo",           "cita": "Salmo 36, 3-4. 18 y 23. 27 y 29"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 7-10"}]},
    "IMPAR": {"titulo": "Martes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 2, 23—3, 9"},
        {"tipo": "Salmo",           "cita": "Salmo 33, 2-3. 16-17. 18-19"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 7-10"}]}},

// TIEMPO ORDINARIO - SEMANA 32 MIERCOLES
  "ordinario_s32_mi": {
    "PAR": {"titulo": "Miercoles de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Tito 3, 1-7"},
        {"tipo": "Salmo",           "cita": "Salmo 22, 1-3a. 3b-4. 5. 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 11-19"}]},
    "IMPAR": {"titulo": "Miercoles de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 6, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 81, 3-4. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 11-19"}]}},

// TIEMPO ORDINARIO - SEMANA 32 JUEVES
  "ordinario_s32_ju": {
    "PAR": {"titulo": "Jueves de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Filemón 1,7-20"},
        {"tipo": "Salmo",           "cita": "Salmo 145, 7. 8-9a. 9bc-10"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 20-25"}]},
    "IMPAR": {"titulo": "Jueves de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 7, 22—8, 1"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 89. 90. 91. 130. 135. 175"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 20-25"}]}},

// TIEMPO ORDINARIO - SEMANA 32 VIERNES
  "ordinario_s32_vi": {
    "PAR": {"titulo": "Viernes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "2 Juan 1, 4-9"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 1. 2. 10. 11. 17. 18"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 26-37"}]},
    "IMPAR": {"titulo": "Viernes de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 13, 1-9"},
        {"tipo": "Salmo",           "cita": "Salmo 18, 2-3. 4-5"},
        {"tipo": "Evangelio",       "cita": "Lucas 17, 26-37"}]}},

// TIEMPO ORDINARIO - SEMANA 32 SABADO
  "ordinario_s32_sa": {
    "PAR": {"titulo": "Sabado de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "3 Juan 1, 5-8"},
        {"tipo": "Salmo",           "cita": "Salmo 111, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 18, 1-8"}]},
    "IMPAR": {"titulo": "Sabado de la 32ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Sabiduría 18, 14-16; 19, 6-9"},
        {"tipo": "Salmo",           "cita": "Salmo 104, 2-3. 36-37. 42-43"},
        {"tipo": "Evangelio",       "cita": "Lucas 18, 1-8"}]}},

// TIEMPO ORDINARIO - SEMANA 33 LUNES
  "ordinario_s33_lu": {
    "PAR": {"titulo": "Lunes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 1, 1-4; 2, 1-5a"},
        {"tipo": "Salmo",           "cita": "Salmo 1, 1-2. 3. 4 y 6"},
        {"tipo": "Evangelio",       "cita": "Lucas 18, 35-43"}]},
    "IMPAR": {"titulo": "Lunes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 1, 10-15. 41-43. 54-57. 62-64"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 53. 61. 134. 150. 155. 158"},
        {"tipo": "Evangelio",       "cita": "Lucas 18, 35-43"}]}},

// TIEMPO ORDINARIO - SEMANA 33 MARTES
  "ordinario_s33_ma": {
    "PAR": {"titulo": "Martes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 3, 1-6. 14-22"},
        {"tipo": "Salmo",           "cita": "Salmo 14, 2-3ab. 3cd-4ab. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 1-10"}]},
    "IMPAR": {"titulo": "Martes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 6, 18-31"},
        {"tipo": "Salmo",           "cita": "Salmo 3, 2-3. 4-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 1-10"}]}},

// TIEMPO ORDINARIO - SEMANA 33 MIERCOLES
  "ordinario_s33_mi": {
    "PAR": {"titulo": "Miercoles de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 4, 1-11"},
        {"tipo": "Salmo",           "cita": "Salmo 150, 1-2. 3-4. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 11-28"}]},
    "IMPAR": {"titulo": "Miercoles de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 7, 1. 20-31"},
        {"tipo": "Salmo",           "cita": "Salmo 16, 1. 56. 8ab y 15"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 11-28"}]}},

// TIEMPO ORDINARIO - SEMANA 33 JUEVES
  "ordinario_s33_ju": {
    "PAR": {"titulo": "Jueves de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 5, 1-10"},
        {"tipo": "Salmo",           "cita": "Salmo 149, 1-2. 3-4. 5-6a y 9b"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 41-44"}]},
    "IMPAR": {"titulo": "Jueves de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 2, 15-29"},
        {"tipo": "Salmo",           "cita": "Salmo 49, 1-2. 5-6. 14-15"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 41-44"}]}},

// TIEMPO ORDINARIO - SEMANA 33 VIERNES
  "ordinario_s33_vi": {
    "PAR": {"titulo": "Viernes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 10, 8-11"},
        {"tipo": "Salmo",           "cita": "Salmo 118, 14. 24. 72. 103. 111. 131"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 45-48"}]},
    "IMPAR": {"titulo": "Viernes de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 4, 36-37. 52-59"},
        {"tipo": "Salmo",           "cita": "1 Crónicas 29, 10. 11abc. 11d-12a. 12bcd"},
        {"tipo": "Evangelio",       "cita": "Lucas 19, 45-48"}]}},

// TIEMPO ORDINARIO - SEMANA 33 SABADO
  "ordinario_s33_sa": {
    "PAR": {"titulo": "Sabado de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 11, 4-12"},
        {"tipo": "Salmo",           "cita": "Salmo 143, 1. 2. 9-10"},
        {"tipo": "Evangelio",       "cita": "Lucas 20, 27-40"}]},
    "IMPAR": {"titulo": "Sabado de la 33ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "1 Macabeos 6, 1-13"},
        {"tipo": "Salmo",           "cita": "Salmo 9, 2-3. 4 y 6. 16 y 19"},
        {"tipo": "Evangelio",       "cita": "Lucas 20, 27-40"}]}},

// TIEMPO ORDINARIO - SEMANA 34 LUNES
  "ordinario_s34_lu": {
    "PAR": {"titulo": "Lunes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 14, 1-3. 4b-5"},
        {"tipo": "Salmo",           "cita": "Salmo 23, 1-2. 3-4ab. 5-6"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 1-4"}]},
    "IMPAR": {"titulo": "Lunes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 1, 1-6. 8-20"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 52. 53. 54. 55. 56"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 1-4"}]}},

// TIEMPO ORDINARIO - SEMANA 34 MARTES
  "ordinario_s34_ma": {
    "PAR": {"titulo": "Martes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 14, 14-19"},
        {"tipo": "Salmo",           "cita": "Salmo 95, 10. 11-12. 13"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 5-11"}]},
    "IMPAR": {"titulo": "Martes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 2, 31-45"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 57. 58. 59. 60. 61."},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 5-11"}]}},

// TIEMPO ORDINARIO - SEMANA 34 MIERCOLES
  "ordinario_s34_mi": {
    "PAR": {"titulo": "Miercoles de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 15, 1-4"},
        {"tipo": "Salmo",           "cita": "Salmo 97, 1. 2-3ab. 7-8. 9"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 12-19"}]},
    "IMPAR": {"titulo": "Miercoles de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 5, 1-6. 13-14. 16-17. 23-28"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 62. 63. 64. 65. 66. 67"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 12-19"}]}},

// TIEMPO ORDINARIO - SEMANA 34 JUEVES
  "ordinario_s34_ju": {
    "PAR": {"titulo": "Jueves de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 18, 1-2. 21-23; 19, 1-3. 9a"},
        {"tipo": "Salmo",           "cita": "Salmo 99, 2. 3. 4. 5"},
        {"tipo": "Evangelio",       "cita": "Lucas 21 ,20-28"}]},
    "IMPAR": {"titulo": "Jueves de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 6, 12-28"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 68. 69. 70. 71. 72. 73. 74"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 20-28"}]}},

// TIEMPO ORDINARIO - SEMANA 34 VIERNES
  "ordinario_s34_vi": {
    "PAR": {"titulo": "Viernes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 20, 1-4. 11—21, 2"},
        {"tipo": "Salmo",           "cita": "Salmo 83, 3. 4. 5-6a y 8a"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 29-33"}]},
    "IMPAR": {"titulo": "Viernes de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 7, 2-14"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 75. 76. 77. 78. 79. 80. 81"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 29-33"}]}},

// TIEMPO ORDINARIO - SEMANA 34 SABADO
  "ordinario_s34_sa": {
    "PAR": {"titulo": "Sabado de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Apocalipsis 22, 1-7"},
        {"tipo": "Salmo",           "cita": "Salmo 94, 1-2. 3-5. 6-7"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 34-36"}]},
    "IMPAR": {"titulo": "Sabado de la 34ª semana del Tiempo Ordinario","lecturas": [
        {"tipo": "1ª Lectura",      "cita": "Daniel 7, 15-27"},
        {"tipo": "Salmo",           "cita": "Daniel 3, 82. 83. 84. 85. 86. 87"},
        {"tipo": "Evangelio",       "cita": "Lucas 21, 34-36"}]}}

};

liturgiaLecturas["pascua_as_ju"] = liturgiaLecturas["pascua_as_do"];    // Ascencion del Señor
liturgiaLecturas["cuaresma_s6_sa"] = liturgiaLecturas["pascua_s1_do"];  // Vigilia Pascual


window.liturgiaData = {
  mapAbreviaturas,
  liturgiaFechas,
  liturgiaLecturas
};