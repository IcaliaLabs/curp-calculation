curp = require('../lib/curp_calculation')

exports.calculationTest = (test) ->
  name = "Walter"
  paternalLname = "Reyes"
  maternalLname = "Mata"
  birthDate = "1994-02-11"
  gender = "male"
  bState = "Nuevo León"

  result = new curp(name, paternalLname, maternalLname, birthDate, gender, bState)
  test.equal(result.curp, "REMW940211HNLYTL01", ["Success"])

  test.done()