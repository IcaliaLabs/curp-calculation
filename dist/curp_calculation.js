// Generated by CoffeeScript 1.12.4
var CurpCalculation,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

CurpCalculation = (function() {
  var ARTICLES, A_POINT, BIG_SOUND_WORDS, COMMON_NAMES, FEMALE, MALE, STATES, VOCALS, WITHOUT_MATERNAL_LNAME;

  MALE = "H";

  FEMALE = "M";

  WITHOUT_MATERNAL_LNAME = "X";

  A_POINT = ".";

  BIG_SOUND_WORDS = ["BACA", "BAKA", "BUEI", "BUEY", "CACA", "CACO", "CAGA", "CAGO", "CAKA", "CAKO", "COGE", "COGI", "COJA", "COJE", "COJI", "COJO", "COLA", "CULO", "FALO", "FETO", "GETA", "GUEI", "GUEY", "JETA", "JOTO", "KACA", "KACO", "KAGA", "KAGO", "KAKA", "KAKO", "KOGE", "KOGI", "KOJA", "KOJE", "KOJI", "KOJO", "KOLA", "KULO", "LILO", "LOCA", "LOCO", "LOKA", "LOKO", "MAME", "MAMO", "MEAR", "MEAS", "MEON", "MIAR", "MION", "MOCO", "MOKO", "MULA", "MULO", "NACA", "NACO", "PEDA", "PEDO", "PENE", "PIPI", "PITO", "POPO", "PUTA", "PUTO", "QULO", "RATA", "ROBA", "ROBE", "ROBO", "RUIN", "SENO", "TETA", "VACA", "VAGA", "VAGO", "VAKA", "VUEI", "VUEY", "WUEI", "WUEY"];

  ARTICLES = ["DEL", "LAS", "DE", "LA", "Y", "A", "MC", "LOS", "VON", "VAN", "MAC", "MI"];

  COMMON_NAMES = ["JOSE", "J.", "J", "MARIA", "MA", "MA."];

  VOCALS = ["A", "E", "I", "O", "U"];

  STATES = {
    "AGUASCALIENTES": "AS",
    "BAJA CALIFORNIA": "BC",
    "BAJA CALIFORNIA SUR": "BS",
    "CAMPECHE": "CC",
    "COAHUILA": "CL",
    "COLIMA": "CM",
    "CHIAPAS": "CS",
    "CHIHUAHUA": "CH",
    "DISTRITO FEDERAL": "DF",
    "DURANGO": "DG",
    "GUANAJUATO": "GT",
    "GUERRERO": "GR",
    "HIDALGO": "HG",
    "JALISCO": "JC",
    "MÉXICO": "MC",
    "MICHOACÁN": "MN",
    "MORELOS": "MS",
    "NAYARIT": "NT",
    "NUEVO LEÓN": "NL",
    "OAXACA": "OC",
    "PUEBLA": "PL",
    "QUERÉTARO": "QT",
    "QUINTANA ROO": "QR",
    "SAN LUIS POTOSÍ": "SP",
    "SINALOA": "SL",
    "SONORA": "SR",
    "TABASCO": "TC",
    "TAMAULIPAS": "TS",
    "TLAXCALA": "TL",
    "VERACRUZ": "VZ",
    "YUCATÁN": "YN",
    "ZACATECAS": "ZS"
  };

  function CurpCalculation(name, paternalLname, maternalLname, birthDate, gender, birthState) {
    this._removeCommonNames = bind(this._removeCommonNames, this);
    this._removeArticlesFromNameAndLastName = bind(this._removeArticlesFromNameAndLastName, this);
    this._sanitizeNameAndLastName = bind(this._sanitizeNameAndLastName, this);
    this._removeBlankSpacesForNameAndLastName = bind(this._removeBlankSpacesForNameAndLastName, this);
    this._toUpperCase = bind(this._toUpperCase, this);
    this._getEighteenthPosition = bind(this._getEighteenthPosition, this);
    this._getSeventeenthPosition = bind(this._getSeventeenthPosition, this);
    this._getFourteenToSixteenthPosition = bind(this._getFourteenToSixteenthPosition, this);
    this._getTwelvethToThirteenthPosition = bind(this._getTwelvethToThirteenthPosition, this);
    this._getEleventhPosition = bind(this._getEleventhPosition, this);
    this._getFifthToTenthPosition = bind(this._getFifthToTenthPosition, this);
    this._getFirstToFourthPosition = bind(this._getFirstToFourthPosition, this);
    this.name = name;
    this.paternalLname = paternalLname;
    this.maternalLname = maternalLname;
    this.birthDate = birthDate;
    this.gender = gender;
    this.birthState = birthState;
    this.curp = "";
    this.letFin = "";
    this._toUpperCase();
    this._removeBlankSpacesForNameAndLastName();
    this._sanitizeNameAndLastName();
    this._removeArticlesFromNameAndLastName();
    this._removeCommonNames();
    this._getFirstToFourthPosition();
    this._getFifthToTenthPosition();
    this._getEleventhPosition();
    this._getTwelvethToThirteenthPosition();
    this._getFourteenToSixteenthPosition();
    this._getSeventeenthPosition();
    this._getEighteenthPosition();
  }

  CurpCalculation.prototype._getFirstToFourthPosition = function() {
    var i, j, ref, ref1;
    this.curp = this.paternalLname.substring(0, 1);
    for (i = j = 1, ref = this.paternalLname.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      if (this._isVocal(this.paternalLname[i])) {
        this.curp = "" + this.curp + this.paternalLname[i];
        break;
      }
    }
    if (this.maternalLname !== "") {
      if (this.maternalLname !== WITHOUT_MATERNAL_LNAME) {
        this.curp = "" + this.curp + (this.maternalLname.substring(0, 1));
      } else {
        this.curp = "" + this.curp + WITHOUT_MATERNAL_LNAME;
      }
    } else {
      this.curp = "" + this.curp + WITHOUT_MATERNAL_LNAME;
    }
    this.curp = "" + this.curp + (this.name.substring(0, 1));
    if (ref1 = this.curp.trim(), indexOf.call(BIG_SOUND_WORDS, ref1) >= 0) {
      this.letFin = this.curp.substring(2, 4).trim();
      return this.curp = (this.curp.substring(0, 1).trim()) + "X" + this.letFin;
    }
  };

  CurpCalculation.prototype._getFifthToTenthPosition = function() {
    var date, day, month, year;
    date = this.birthDate.split("-");
    year = date[0].substring(2, 4);
    month = date[1];
    day = date[2];
    return this.curp = "" + this.curp + year + month + day;
  };

  CurpCalculation.prototype._getEleventhPosition = function() {
    if (this.gender === "male") {
      return this.curp = "" + this.curp + MALE;
    } else {
      return this.curp = "" + this.curp + FEMALE;
    }
  };

  CurpCalculation.prototype._getTwelvethToThirteenthPosition = function() {
    return this.curp = "" + this.curp + STATES[this.birthState];
  };

  CurpCalculation.prototype._getFourteenToSixteenthPosition = function() {
    var i, isConsonant, j, k, l, ref, ref1, ref2;
    isConsonant = false;
    for (i = j = 1, ref = this.paternalLname.length; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      if (!this._isVocal(this.paternalLname[i])) {
        isConsonant = true;
        if (this._isInvalidCharacter(this.paternalLname[i])) {
          this.curp = this.curp + "X";
          break;
        } else {
          this.curp = "" + this.curp + this.paternalLname[i];
          break;
        }
      }
    }
    if (!isConsonant) {
      this.curp = this.curp + "X";
    }
    isConsonant = false;
    if (this.maternalLname !== WITHOUT_MATERNAL_LNAME) {
      for (i = k = 1, ref1 = this.maternalLname.length; 1 <= ref1 ? k <= ref1 : k >= ref1; i = 1 <= ref1 ? ++k : --k) {
        if (!this._isVocal(this.maternalLname[i])) {
          isConsonant = true;
          if (this._isInvalidCharacter(this.maternalLname[i])) {
            this.curp = this.curp + "X";
            break;
          } else {
            this.curp = "" + this.curp + this.maternalLname[i];
            break;
          }
        }
      }
      if (!isConsonant) {
        this.curp = this.curp + "X";
      }
    } else {
      this.curp = "" + this.curp + WITHOUT_MATERNAL_LNAME;
    }
    isConsonant = false;
    for (i = l = 1, ref2 = this.name.length; 1 <= ref2 ? l <= ref2 : l >= ref2; i = 1 <= ref2 ? ++l : --l) {
      if (!this._isVocal(this.name[i])) {
        isConsonant = true;
        this.curp = "" + this.curp + this.name[i];
        break;
      }
    }
    if (!isConsonant) {
      return this.curp = this.curp + "X";
    }
  };

  CurpCalculation.prototype._getSeventeenthPosition = function() {
    var date, year;
    date = this.birthDate.split("-");
    year = parseInt(date[0]);
    if (year <= 1999) {
      return this.curp = this.curp + "0";
    } else {
      return this.curp = this.curp + "A";
    }
  };

  CurpCalculation.prototype._getEighteenthPosition = function() {
    return this.curp = "" + this.curp + (this._calculateVerifiedDigit(this.curp));
  };

  CurpCalculation.prototype._isVocal = function(char) {
    return indexOf.call(VOCALS, char) >= 0;
  };

  CurpCalculation.prototype._toUpperCase = function() {
    this.name = this.name.toUpperCase();
    this.paternalLname = this.paternalLname.toUpperCase();
    this.maternalLname = this.maternalLname.toUpperCase();
    return this.birthState = this.birthState.toUpperCase();
  };

  CurpCalculation.prototype._removeBlankSpacesForNameAndLastName = function() {
    this.name = this.name.trim();
    this.paternalLname = this.paternalLname.trim();
    return this.maternalLname = this.maternalLname.trim();
  };

  CurpCalculation.prototype._sanitizeNameAndLastName = function() {
    if (this.paternalLname === A_POINT) {
      this.paternalLname = this.maternalLname;
      this.maternalLname = A_POINT;
    }
    if (this.maternalLname === A_POINT) {
      return this.maternalLname = WITHOUT_MATERNAL_LNAME;
    }
  };

  CurpCalculation.prototype._removeArticlesFromNameAndLastName = function() {
    this.name = this._removeArticlesFrom(this.name);
    this.paternalLname = this._removeArticlesFrom(this.paternalLname);
    return this.maternalLname = this._removeArticlesFrom(this.maternalLname);
  };

  CurpCalculation.prototype._removeCommonNames = function() {
    var index, j, len, name, names, strName, validNames;
    strName = "";
    names = this.name.split(" ");
    validNames = [];
    if (names.length > 1) {
      for (index = j = 0, len = names.length; j < len; index = ++j) {
        name = names[index];
        if (index === 0) {
          if (indexOf.call(COMMON_NAMES, name) < 0) {
            validNames.push(name);
          }
        } else {
          validNames.push(name);
        }
      }
      return this.name = validNames.join(" ");
    }
  };

  CurpCalculation.prototype._removeArticlesFrom = function(aString) {
    var j, len, sanitizedString, splittedString, string, validStrings;
    sanitizedString = "";
    splittedString = aString.split(" ");
    validStrings = [];
    for (j = 0, len = splittedString.length; j < len; j++) {
      string = splittedString[j];
      if (indexOf.call(ARTICLES, string) < 0) {
        validStrings.push(string);
      }
    }
    return validStrings.join(" ").trim();
  };

  CurpCalculation.prototype._isInvalidCharacter = function(char) {
    return char === 'Ñ';
  };

  CurpCalculation.prototype._calculateVerifiedDigit = function(curp) {
    var character, characters, counter, digit, factor, position, result, total;
    characters = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    result = "";
    character = "";
    factor = 19;
    position = 0;
    counter = 0;
    total = 0;
    digit = 0;
    while (counter <= curp.length) {
      if ((counter + 1) < curp.length) {
        character = curp.substring(counter, counter + 1);
        position = characters.indexOf(character);
        factor = factor - 1;
        total = total + (position * factor);
      }
      counter += 1;
    }
    digit = 10 - (total % 10);
    if (digit === 10) {
      digit = 0;
    }
    return digit;
  };

  module.exports = CurpCalculation;

  return CurpCalculation;

})();