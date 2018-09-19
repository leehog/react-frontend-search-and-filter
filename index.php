<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="index.css">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
</head>
<body>        
<!-- Main container -->
<div class="container-fluid row">
<!-- Header -->
<div class="header container-fluid row header">
    <div class="col-md-4 left">
        <h1>Games page</h1>
    </div>
    <div class="col-md-4 middle">
        <h3 class="menu-link">Lorem</h3>
        <h3 class="menu-link">Ipsum</h3>
        <h3 class="menu-link">Dolor</h3>
    </div>
    <div class="col-md-4 right">
        <h1>Login</h1>
    </div>
</div>
<!-- Sidebar -->    
<div class="col-md-3 sidebar">
    <h1>Genre</h1>
    <h4>Top games</h4>
    <h4>Action</h4>
    <h4>Adventure</h4>
    <h4>Drama</h4>
    <h4>Indie</h4>
    <h4>Mystery</h4>
    <h4>RPG</h4>
    <h4>Simulations</h4>
    <h4>Sports</h4>

    <h1>Type</h1>
    <h4>All</h4>
    <h4>Offers</h4>
    <h4>Free</h4>
</div>    
<!-- Game grid -->
<div class="col-md-9">
<!-- Search bar -->    
<div class="searchbar-wrap">
    <input class="form-control searchbar" type="text" placeholder="Search" aria-label="Search">
</div>
<!-- Games -->
<?php 
   $data = file_get_contents("games.json");
   $json = json_decode($data,true);
   $output = "<div class='row'>";
   foreach($json['games'] as $game) {
       // .= does not replace it appends it to the variable
       $output .= "<div class='col-md-2 col-sm-2 col-4 game-wrap'><img src='".$game['Image']."' class='game-img' value='".$game['title']."'/> </div>";
   }
   $output .= "</div>";
   echo $output;
?>
</div>
</div>
</body>
</html>
