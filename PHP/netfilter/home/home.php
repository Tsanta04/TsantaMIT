<?php
    session_start();
//Initialisation    
    if(isset($_POST["id"])){  
        $_SESSION["id"]=$_POST["id"];
        $_SESSION["pwd"]=$_POST["pwd"];
    }
    else if(!isset($_SESSION["id"])){
        $_SESSION["id"]="";
        $_SESSION["pwd"]="";
    }
///Deja connectE ou non
    if($_SESSION["id"]!=""){
        if(($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")){
            header("location: ../login/login.php");
        }
        else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){
            $log="logout";
            $contenu=file_get_contents("./landing.html");
            $contenu=str_replace('$log',$log,$contenu);
            echo $contenu;    
        //Get all needed datas
            if(!isset($_SESSION["var"])){
                $_SESSION["var"]=array("a","b","c","d","e","f");
                $_SESSION["active"]="text-pink-500";
                $_SESSION["inactive"]="text-blueGray-70";
                
                $datas=shell_exec("ls /sys/class/net");
                $_SESSION["interface"]=explode("\n",$datas);

                $_SESSION["port"]=array();

                $datas=shell_exec("cat /etc/services");
                $splited_datas= explode("\n",$datas);
                $pattern="%s\t%d/%s";
                foreach($splited_datas as $data){
                    sscanf($data,$pattern,$nom,$port,$inutile);
                    if($nom[0]!='#')
                        $_SESSION["port"][$nom]=$port;
                }
                $_SESSION["clicked"]="INPUT";
                $_SESSION["history"]=array();
            }                
        }
    }
    else if($_SESSION["id"]==""){
        $log="login";
        $contenu=file_get_contents("./landing.html");
        $contenu=str_replace('$log',$log,$contenu);
        echo $contenu;
    }
?>
