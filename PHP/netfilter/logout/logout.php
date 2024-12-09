<?php
    session_start();
    if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){
        session_destroy();
    }
    header("location: ../home/home.php");
?>