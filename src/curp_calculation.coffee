class CurpCalculation
  MALE = "H"
  FEMALE = "M"
  WITHOUT_MATERNAL_LNAME = "X"
  A_POINT = "."

  BIG_SOUND_WORDS = ["BACA","BAKA","BUEI","BUEY","CACA","CACO","CAGA","CAGO","CAKA","CAKO",
                  "COGE","COGI","COJA","COJE","COJI","COJO","COLA","CULO","FALO","FETO",
                  "GETA","GUEI","GUEY","JETA","JOTO","KACA","KACO","KAGA","KAGO","KAKA",
                  "KAKO","KOGE","KOGI","KOJA","KOJE","KOJI","KOJO","KOLA","KULO","LILO",
                  "LOCA","LOCO","LOKA","LOKO","MAME","MAMO","MEAR","MEAS","MEON","MIAR",
                  "MION","MOCO","MOKO","MULA","MULO","NACA","NACO","PEDA","PEDO","PENE",
                  "PIPI","PITO","POPO","PUTA","PUTO","QULO","RATA","ROBA","ROBE","ROBO",
                  "RUIN","SENO","TETA","VACA","VAGA","VAGO","VAKA","VUEI","VUEY","WUEI",
                  "WUEY"]

  ARTICLES = ["DEL", "LAS", "DE", "LA", "Y", "A", "MC", "LOS", "VON", "VAN", "MAC", "MI"]

  COMMON_NAMES = ["JOSE", "J.", "J", "MARIA", "MA", "MA."]

  VOCALS = ["A", "E", "I", "O", "U"]

  STATES = {
    "AGUASCALIENTES": "AS"
    "BAJA CALIFORNIA": "BC"
    "BAJA CALIFORNIA SUR": "BS"
    "CAMPECHE": "CC"
    "COAHUILA": "CL"
    "COLIMA": "CM"
    "CHIAPAS": "CS"
    "CHIHUAHUA": "CH"
    "DISTRITO FEDERAL": "DF"
    "DURANGO": "DG"
    "GUANAJUATO": "GT"
    "GUERRERO": "GR"
    "HIDALGO": "HG"
    "JALISCO": "JC"
    "MÉXICO":   "MC"
    "MICHOACÁN": "MN"
    "MORELOS": "MS"
    "NAYARIT": "NT"
    "NUEVO LEÓN": "NL"
    "OAXACA": "OC"
    "PUEBLA": "PL"
    "QUERÉTARO": "QT"
    "QUINTANA ROO": "QR"
    "SAN LUIS POTOSÍ": "SP"
    "SINALOA": "SL"
    "SONORA": "SR"
    "TABASCO": "TC"
    "TAMAULIPAS": "TS"
    "TLAXCALA": "TL"
    "VERACRUZ": "VZ"
    "YUCATÁN": "YN"
    "ZACATECAS": "ZS"
  }

  constructor: (name, paternalLname, maternalLname, birthDate, gender, birthState) ->
    @name = name
    @paternalLname = paternalLname
    @maternalLname = maternalLname
    @birthDate = birthDate
    @gender = gender
    @birthState = birthState
    @curp = ""
    @letFin = ""

    #Calls to clean up the name and last name
    @_toUpperCase()
    @_removeBlankSpacesForNameAndLastName()
    @_sanitizeNameAndLastName()
    @_removeArticlesFromNameAndLastName()
    @_removeCommonNames()

    #Calls to build the CURP
    @_getFirstToFourthPosition()
    @_getFifthToTenthPosition()
    @_getEleventhPosition()
    @_getTwelvethToThirteenthPosition()
    @_getFourteenToSixteenthPosition()
    @_getSeventeenthPosition()
    @_getEighteenthPosition()

  #Position 1-4
  _getFirstToFourthPosition: =>
    # We first get the first letter of the first last name and the first internal vocal
    @curp = @paternalLname.substring(0, 1)

    #//We search and add the first vocal of the paternal last name
    for i in [1..@paternalLname.length]
      if @_isVocal(@paternalLname[i])
        @curp = "#{@curp}#{@paternalLname[i]}"
        break
    
    if @maternalLname isnt ""
      if @maternalLname isnt WITHOUT_MATERNAL_LNAME
        @curp = "#{@curp}#{@maternalLname.substring(0, 1)}"
      else
        @curp = "#{@curp}#{WITHOUT_MATERNAL_LNAME}"
    else
      @curp = "#{@curp}#{WITHOUT_MATERNAL_LNAME}"

    @curp = "#{@curp}#{@name.substring(0, 1)}"

    if @curp.trim() in BIG_SOUND_WORDS
      @letFin = @curp.substring(2, 4).trim()
      @curp = "#{@curp.substring(0, 1).trim()}X#{@letFin}"


  #Position 5-10
  _getFifthToTenthPosition: =>
    date = @birthDate.split("-") # 1995-03-13
    year = date[0].substring(2,4)
    month = date[1]
    day = date[2]

    @curp = "#{@curp}#{year}#{month}#{day}"

  #Position 11
  _getEleventhPosition: =>
    if @gender is "male"
      @curp = "#{@curp}#{MALE}"
    else
      @curp = "#{@curp}#{FEMALE}"

  #Position 12-13
  _getTwelvethToThirteenthPosition: =>
    @curp = "#{@curp}#{STATES[@birthState]}"


  #Position 14-16
  _getFourteenToSixteenthPosition: =>
    isConsonant = false

    # First internal consonant of the maternal last name
    for i in [1..@paternalLname.length]
      if not @_isVocal(@paternalLname[i])
        isConsonant = true
        if @_isInvalidCharacter(@paternalLname[i])
          @curp = "#{@curp}X"
          break
        else
          @curp = "#{@curp}#{@paternalLname[i]}"
          break

    if not isConsonant
      @curp = "#{@curp}X"

    # First internal consonant of the maternal last name
    isConsonant = false
    if @maternalLname isnt WITHOUT_MATERNAL_LNAME
      for i in [1..@maternalLname.length]
        if not @_isVocal(@maternalLname[i])
          isConsonant = true
          if @_isInvalidCharacter(@maternalLname[i])
            @curp = "#{@curp}X"
            break
          else
            @curp = "#{@curp}#{@maternalLname[i]}"
            break


      if not isConsonant
        @curp = "#{@curp}X"
    else
      @curp = "#{@curp}#{WITHOUT_MATERNAL_LNAME}"

    # First consonant from the name
    isConsonant = false
    for i in [1..@name.length]
      if not @_isVocal(@name[i])
        isConsonant = true
        @curp = "#{@curp}#{@name[i]}"
        break

    @curp = "#{@curp}X" if not isConsonant


  #Position 17
  _getSeventeenthPosition: =>
    date = @birthDate.split("-") # 1995-03-13
    year = parseInt(date[0])

    if year <= 1999
      @curp = "#{@curp}0"
    else
      @curp = "#{@curp}A"

  #Position 18
  _getEighteenthPosition: =>
    @curp = "#{@curp}#{@_calculateVerifiedDigit(@curp)}"


  _isVocal: (char) ->
    char in VOCALS

  _toUpperCase: =>
    @name = @name.toUpperCase()
    @paternalLname = @paternalLname.toUpperCase()
    @maternalLname = @maternalLname.toUpperCase()
    @birthState = @birthState.toUpperCase()

  _removeBlankSpacesForNameAndLastName: =>
    @name = @name.trim()
    @paternalLname = @paternalLname.trim()
    @maternalLname = @maternalLname.trim()

  _sanitizeNameAndLastName: =>
    if @paternalLname is A_POINT
      @paternalLname = @maternalLname
      @maternalLname = A_POINT

    if @maternalLname is A_POINT
      @maternalLname = WITHOUT_MATERNAL_LNAME

  _removeArticlesFromNameAndLastName: =>
    @name = @_removeArticlesFrom(@name)
    @paternalLname = @_removeArticlesFrom(@paternalLname)
    @maternalLname = @_removeArticlesFrom(@maternalLname)

  _removeCommonNames: =>
    strName = ""
    names = @name.split(" ")
    validNames = []

    if names.length > 1
      for name, index in names
        if index is 0
          unless name in COMMON_NAMES
            validNames.push(name)
        else
          validNames.push(name)

      @name = validNames.join(" ")

  _removeArticlesFrom: (aString) ->
    sanitizedString = ""
    splittedString = aString.split(" ")
    validStrings = []

    for string in splittedString
      unless string in ARTICLES
        validStrings.push(string)

    return validStrings.join(" ").trim()

  _isInvalidCharacter: (char) ->
    char is 'Ñ'

  _calculateVerifiedDigit: (curp) ->
    characters = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
    result = ""
    character = ""
    factor = 19
    position = 0
    counter = 0
    total = 0
    digit = 0

    while counter <= curp.length
      if (counter + 1) < curp.length
        character = curp.substring(counter, counter + 1)
        position = characters.indexOf(character)
        factor = factor - 1
        total = total + (position * factor)

      counter += 1

    digit = 10 - (total % 10)

    if digit is 10
      digit = 0

    digit

  module.exports = CurpCalculation