<?php
   header("Content-type:application/json");
   $data = file_get_contents("games.json");
   
   print_r($data)

?>