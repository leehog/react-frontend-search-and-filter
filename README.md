To run:  
$ npm install  
$ npm start  
------------------------------------------------------------------------------------------------  
download PHP server plugin for vs-code  
open data.php and start PHP server  
@line-48 in ./src/app.js check that the path in the get request matches with the PHP server path  
"const data = axios.get('http://localhost:3000/data.php')"  
-------------------------------------------------------------------------------------------------  
If data isnt retrieved, try to enable CORS (chrome plugin is the fastest way)  