<?php
    session_start();
    include '../../function/f1.php';

    if((!isset($_SESSION["id"]))||((isset($_SESSION["id"]))&&(($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")))){
        header("location: ../../login/login.php");
    }
    else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){

//How to list our data
        if(isset($_GET["chain"])){
            $_SESSION["clicked"]=$_GET["chain"];
        }

//If delete clicked
        if(isset($_GET["lineD"])){
            $command="sudo iptables -D ".$_SESSION["clicked"]." ".$_GET["lineD"];
            $_SESSION["messGuise"]="block";
            decision($command,"Rule number ".$_GET["lineD"]." in ".$_SESSION["clicked"]." deleted.");
        }
        else{
            put_history("View current rules.");
        }
        
        if(isset($_POST["flux"])){
            //
        }

//If modify clicked
if(isset($_GET["lineM"])){
///A REPARER
    $command="sudo iptables -D ".$_SESSION["clicked"]." ".$_GET["lineD"];
    $_SESSION["messGuise"]="block";
    decision($command,"Rule number ".$_GET["lineM"]." in ".$_SESSION["clicked"]." modified.");
}
else{
    put_history("View current rules.");
}

if(isset($_POST["flux"])){
    //
}

//Datas
        $inactive="bg-indigo-600";
        $active="bg-pink-600";
        exec("sudo iptables -S",$datas,$val);
        $pattern="%s %s %s";
        $_SESSION["chaine"]=array();
        
        foreach($datas as $data){
            sscanf($data,$pattern,$tmp1,$tmp2,$tmp3);
            if($tmp1=="-P"){
                $_SESSION["chaine"][]=$tmp2;
            }
        }

        $_SESSION["rules"]=array();
        foreach($_SESSION["chaine"] as $chain){
            $command="sudo iptables -L".$chain;
            $temp=shell_exec($command);
            $_SESSION["rules"][$chain]=explode("\n",$temp);
        }

//Html        
        $head=file_get_contents("../head/head.html");
        $body=file_get_contents("current.html");
        $footer=file_get_contents("../head/footer.html");
        $head=str_replace('$c',$_SESSION["active"],$head);
        $head=str_replace('$menu',"Current Rules",$head);
        foreach($_SESSION["var"] as $v){
            if($v!="c"){
                $head=str_replace('$'.$v,$_SESSION["inactive"],$head);
            }
        }
        echo $head;
        echo $body;

//Les bouttons: les chaines
        foreach($_SESSION["chaine"] as $chain){
            if($chain==$_SESSION["clicked"]){
                $bg=$active;
            }
            else{
                $bg=$inactive;
            }
            echo"
                <div class=\"relative w-full px-4 max-w-full flex-grow flex-1 text-right\">
                <a href=\"current.php?chain=$chain\"><button
                class=\"$bg text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1\"
                type=\"button\"
                style=\"transition:all .15s ease\"
                >
                    $chain
                </button></a>
            </div>
            ";
        }

//Les heads
    echo"
        </div>
        </div>
        <div class=\"block w-full overflow-x-auto\">
        <table class=\"items-center w-full bg-transparent border-collapse\">
            <thead class=\"thead-light\">
            <tr>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Target
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Protocol
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Option
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Source(s)
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Destination
                </th>                            
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Source ports(s)
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Destination ports(s)
                </th>                
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Mac source(s)
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Modify
                </th>
                <th class=\"px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left\">
                Delete
                </th>
            </tr>
            </thead>
            <tbody>
    ";

//Chargement du contenu de tableau
        $i=0;
            foreach($_SESSION["rules"][$_SESSION["clicked"]] as $dt){
                $pattern="%s\t%s\t%s\t%s\t%s\t%s";
                sscanf($dt,$pattern,$target,$proto,$opt,$src,$dest,$other);
        //Split other
                $sport=find_and_get_value("spt",$other);
                $dport=find_and_get_value("dpt",$other);
                $mac=find_and_get_value("MAC",$other);
                echo"
                    <tr id='value$i'>
                    <th class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left\">
                        $target
                    </th>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $proto
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $opt
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $src
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $dest
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $sport
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $dport
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        $mac
                    </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                        <button onclick='activeModify(this,$i);'><i class=\"fas fa-edit\"></i>
                        </button>
                    </td>
                    // <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                    //     <a href=\"current.php?lineM=$i&target=$target&proto=$proto&src=$src&dest=$dest&sport=$sport&dport=$dport&mac=$mac\"><i class=\"fas fa-edit\"></i>
                    //     </a>
                    // </td>
                    <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                    <a href=\"current.php?lineD=$i\"><i class=\"fas fa-trash\"></i>
                    </td>
                </tr>
                ";
                $i++;
        }
//Footer
    echo "
        </tbody></table></div></div></div></div></div></div></div></section></main></body><script src='../../function/script.js'></script></html>
    ";
    echo $footer;
}
?>
