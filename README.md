To run
npm install
npm start
download PHP server plugin for vs-code
open data.php and start php server
@line-48 in app.js check that path matches with php server
"const data = axios.get('http://localhost:3000/data.php')"

If data isnt retrieved, try enable CORS (chrome plugin is the fastest way)