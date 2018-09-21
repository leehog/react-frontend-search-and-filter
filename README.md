To run: <br>
$ npm install <br>
$ npm start <br>
------------------------------------------------------------------------------------------------ <br>
download PHP server plugin for vs-code <br>
open data.php and start PHP server <br>
@line-48 in ./src/app.js check that the path in the get request matches with the PHP server path
"const data = axios.get('http://localhost:3000/data.php')"  <br>
------------------------------------------------------------------------------------------------- <br>
If data isnt retrieved, try to enable CORS (chrome plugin is the fastest way)