# curp-calculation

`curp-calculation` is a JavaScript dependency for calculating mexican CURP.

## Version
0.1.0

## Instalation

```console
 npm install curp-calculation
```

## Usage

To calculate a CURP, you'll need to provide the following parameters:

- Name
- Paternal Lastname
- Maternal Lastname
- Birthdate
- Gender
- Birth State


```
var curp = require('curp-calculation')

let name = "Alejandro"
let pLname = "Gutierrez"
let mLname = "Sanchez"

// YYYY-MM-DD
let bDate = "1990-04-28"

// male or female
let gender = "male"

// Complete state name
let bState = "Nuevo León"

let result = new curp(name, pLname, mLname, bDate, gender, bState)
console.log(result.curp)
```

And that's it! Just make sure that your formats are correct and you'll have your CURP.

## Acknowledgements
This code was based on [@banregiolabs](https://github.com/banregiolabs) java's version.

## License
MIT License

Copyright (c) 2017 Icalia Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.