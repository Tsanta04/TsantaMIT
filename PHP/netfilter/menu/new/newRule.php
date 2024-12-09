<?php
    session_start();
    include '../../function/f1.php';

    if((!isset($_SESSION["id"]))||((isset($_SESSION["id"]))&&(($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")))){
        header("location: ../../login/login.php");
    }
    else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){

        //If form is sended
        if(isset($_POST["flux"])){
            $commande="sudo iptables -A ";
            $commande.=syntax();
            decision($commande,"Add new rule succeed");
        }

//Datas
        $head=file_get_contents("../head/head.html");
        $body=file_get_contents("newRule.html");
        $head=str_replace('$a',$_SESSION["active"],$head);
        $head=str_replace('$menu',"Add rules",$head);
        foreach($_SESSION["var"] as $v){
            if($v!="a"){
                $head=str_replace('$'.$v,$_SESSION["inactive"],$head);
            }
        }
        echo $head;
        echo $body;
//Form
    echo"
    <div class=\"items-center w-full bg-transparent flex flex-row border-collapse\">
    <div class=\"items-center w-full flex flex-col px-3\">
        <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"flux\">Policy:</label><select class=\"block\" name=\"flux\"/>
    ";
    foreach($_SESSION["chaine"] as $p){
        echo"<option>$p</option>";
    }
    echo"
        </select></p>
        <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"proto\">Protocol:</label><select class=\"block\" name=\"proto\"/>        
            <option>none</option>
            <option>tcp</option>
            <option>udp</option>
            <option>icmp</option>            
        </select></p>
        ";
    echo"
        <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"sport\">Source port(s):</label><select class=\"block\" name=\"sport\"/>                
        <option>none</option>    
    ";
    foreach($_SESSION["port"] as $key=>$p){
        echo"<option>$key</option>";
    }
    echo"
        </select></p><p class=\"flex flex-col w-full\"><label class=\"block\" for=\"dport\">Destination port(s):</label><select class=\"block\" name=\"dport\"/>                
        <option>none</option>
    ";
    foreach($_SESSION["port"] as $key=>$p){
        echo"<option>$key</option>";
    }
    echo"
        </select></p>
            <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"sInp\">Source IP/Network(s):</label><input class=\"block\" type=\"text\" name=\"sInp\"/></p>
        </div>
        <div class=\"items-center w-full flex flex-col px-3\">
            <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"dInp\">Destination IP/Network(s):</label><input class=\"block\" type=\"text\" name=\"dInp\"/></p>
            <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"macInp\">Mac source:</label><input class=\"block\" type=\"text\" name=\"macInp\"/></p>
           <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"iInp\">Input interface:</label><select class=\"block\" name=\"iInp\"/>                
           <option>none</option>
       ";
    foreach($_SESSION["interface"] as $p){
       echo"<option>$p</option>";
    }        
    echo"   
       </select></p>
       <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"oInp\">Output interface:</label><select class=\"block\" name=\"oInp\"/>                       
       <option>none</option>
   ";
    foreach($_SESSION["interface"] as $p){
        echo"<option>$p</option>";
    }
    echo"
       </select></p>
        <p class=\"flex flex-col w-full\"><label class=\"block\" for=\"access\">Policy:</label><select class=\"block\" name=\"access\"/>        
            <option>ACCEPT</option>
            <option>DROP</option>
            <option>REJECT</option>            
        </select></p></div>    
    ";

//Footer
echo "
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FORM>
            </div>
        </div>
    </section>
    </main>
    </body>
    <script src='../../function/script.js'></script>
    </html>        
    ";
    }
?>