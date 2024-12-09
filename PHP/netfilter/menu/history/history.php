<?php
    session_start();
    include '../../function/f1.php';

    if((!isset($_SESSION["id"]))||((isset($_SESSION["id"]))&&(($_SESSION["id"]!="mit")||($_SESSION["pwd"]!="12345678")))){
        header("location: ../../login/login.php");
    }
    else if((isset($_SESSION["id"]))&&(($_SESSION["id"]=="mit")&&($_SESSION["pwd"]=="12345678"))){
        put_history("View history");

//Modification datas necessaires dans le .html
        $head=file_get_contents("../head/head.html");
        $body=file_get_contents("history.html");
        $head=str_replace('$d',$_SESSION["active"],$head);
        $head=str_replace('$menu',"History",$head);
        foreach($_SESSION["var"] as $v){
            if($v!="d"){
                $head=str_replace('$'.$v,$_SESSION["inactive"],$head);
            }
        }
        echo $head;
        echo $body;

//Chargement du contenu de tableau
        foreach($_SESSION["history"] as $dt){
            echo"
                <tr>
                <th class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left\">
                    On $dt[0]
                </th>
                <td class=\"border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4\">
                    $dt[1]
                </td>
            </tr>
            ";
        }
        
//Footer
        echo "
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                </div>
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