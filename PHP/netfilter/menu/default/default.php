<?php
    session_start();
    include '../../function/f1.php';
    if((!isset($_SESSION["id"]))||((isset($_SESSION["id"]))&&(($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")))){
        header("location: ../../login/login.php");
    }
    else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){
        //put_history("View the default rules of all chains.");

//If form is sended

        if(isset($_POST["INPUT"])){//mandatory
            $command="";
            foreach($_SESSION["chaine"] as $key=>$value){
                if($value!=$_POST["$key"]){
                    $command.="sudo iptables -P ".$key." ".$_POST[$key].";";
                }
            }
            $command=substr($command,0,-1);
            if($command!=""){
                decision($command,"Modify default values succeed.");
            }
        }

        //Datas
        $head=file_get_contents("../head/head.html");
        $body=file_get_contents("default.html");
        $head=str_replace('$b',$_SESSION["active"],$head);
        $head=str_replace('$menu',"Default rules",$head);

        $policies=array("ACCEPT","REJECT","DROP");
        exec("sudo iptables -S",$datas,$value);
        $_SESSION["chaine"]=array();
        foreach($datas as $dt){
            $pos=strpos("-P",$dt);
            if($pos!=false){
                $pattern="%s %s %s";
                sscanf($dt,$pattern,$opt,$chain,$policy);
                $_SESSION["chaine"][$chain]=$policy;
            }
        }
        //color of nav
        foreach($_SESSION["var"] as $v){
            if($v!="b"){
                $head=str_replace('$'.$v,$_SESSION["inactive"],$head);
            }
        }
        echo $head;
        echo $body;

//Form
    echo"
        <div class=\"items-center w-full bg-transparent border-collapse\">
    ";
    foreach($_SESSION["chaine"] as $key=>$value){
        echo"<p class=\"flex flex-col w-full\"><label class=\"block\" for=\"$key\">$key</label><select class=\"block\" name=\"$key\"/>";
        foreach($policies as $p){
            if($value==$p){$type="selected";}
            else{$type="";}
                echo "
                    <option $type>$p</option>
                </select>
                ";
        }
    }

//Footer
echo "
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></div></section></main></body><script src='../../function/script.js'></script></html>        
";

    }
?>