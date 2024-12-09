<?php
    session_start();
    if((!isset($_SESSION["id"]))||($_SESSION["id"]=="")){
        $message="Log in first";        
    }
    else if($_SESSION["id"]!=""){
        $message="Log in failed. Reverify your information";        
    }
    if(!isset($_SESSION["id"])||($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")){
        $contenu=file_get_contents("./login.html");
        $contenu=str_replace('$message',$message,$contenu);
        echo $contenu;
    }
    else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){
        header("location: ../home/home.php");
    }
?>