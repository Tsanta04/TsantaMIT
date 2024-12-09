<?php
/*
//Valid a request
    function valid($command){
        exec($command,$return,$value);
        if($value!=0){
            return "block";
        }
        else{
            return "hidden";
        }
    }    
*/    
//Put history
    function put_history($message){
        exec("date",$date,$value);
        $_SESSION["history"][]=array($date,$message);
    }

//To do during execution of a command
    function decision($command,$message){
        exec($command,$datas,$val);
        if($val==0){
            put_history($message);
        }
        else{
            //afficher aucun modification
            echo"<script>alert('There is an error in your request. Please reverifiy it, and try again.')</script>";
        }
    }

//Function to order the command syntax
    function syntax(){
        $commande.=$_POST["flux"];

        if($_POST["proto"]!="none"){
            $commande.=" -p ";
            $commande.=$_POST["proto"];
        }

        //Sport
        if($_POST["sport"]!="none"){
            if(strpos($_POST["sport"],",")){
                $commande.=" -m multiport --sport ";
                $temp=explode($_POST["sport"],",");
                foreach($temp as $t){
                    $commande.=$_SESSION["ports"][$t];
                    $commande.=",";
                }
                $commande.pop_back();
            }
            else{
                $commande.=" --sport ".$_SESSION["ports"][$_POST["sport"]];
            }
        }
        //Dport
        if($_POST["dport"]!="none"){
            if(strpos($_POST["dport"],",")){
                $commande.=" -m multiport --dport ";
                $temp=explode($_POST["dport"],",");
                foreach($temp as $t){
                    $commande.=$_SESSION["ports"][$t];
                    $commande.=",";
                }
                $commande.pop_back();
            }
            else{
                $commande.=" --dport ".$_SESSION["ports"][$_POST["dport"]];
            }
        }

        //Interface input
        if($_POST["iInp"]!=""){
            $commande.=" -i ".$_POST["iInp"];
        }

        //Interface output
        if($_POST["oInp"]!=""){
            //Mila asiana Regex ny input ho gestion d'erreur!!
            $commande.=" -o ".$_POST["oInp"];
        }

        //Source ip
        if($_POST["sInp"]!=""){
            //Mila asiana Regex ny input ho gestion d'erreur!!
            $commande.=" -s ".$_POST["sInp"];
        }

        //Destination ip
        if($_POST["dInp"]!=""){
            //Mila asiana Regex ny input ho gestion d'erreur!!
            $commande.=" -d ".$_POST["dInp"];
        }

        if($_POST["macInp"]!=""){
            //Mila asiana Regex ny input ho gestion d'erreur!!
            $commande.=" -m mac --mac-source ".$_POST["macInp"];
        }
        $commande.=" -j ";
        $commande.=$_POST["access"];
        return $command;
    }

    function find_and_get_value($to_search,$string){
        $pos=strpos($to_search,$string);
        if($pos!=false){
            $other=substr($other,$pos);
            sscanf($other,"%s %s %[^$]",$inutile,$result,$inutile);
            return $result;
        }else{
            return "--";
        }
    }
?>