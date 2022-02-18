<?php
if(!isset($_GET["connected"])){
    require("./View/index.html");
}else{
    require("./View/carte.html");
}
?>