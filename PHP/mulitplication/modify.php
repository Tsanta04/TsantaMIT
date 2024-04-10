<?php
    session_start();

//Modify a line    
if(isset($_GET['lineModif'])){
    $_SESSION['lineModif']=$_GET['lineModif'];
}

if(isset($_POST['aM'])){
    $_SESSION['indice']=array_values($_SESSION['indice']);        
    for($i=0;$i<count($_SESSION['indice']);$i++){
        if($_SESSION['indice'][$i]==$_SESSION['lineModif']){
            $_SESSION['datas'][$_SESSION['indice'][$i]]=array($_POST['bM'],$_POST['aM'],($_POST['aM'] * $_POST['bM']));
            break;
        }
    }
    header("Location: main.php");
}
    
//Modify form
    echo "
    <!DOCTYPE html>
    <html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\">
        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>
        <link rel='stylesheet' href='style.css'>
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <title>Document</title>
    </head>
    <body>    
        <h1 class='text text-info'> Multiplication </h1>

        <FORM class='container bg-warning modify' ACTION='modify.php' METHOD='POST'>
            <h1>Modify this value</h1>
            <p><label for='aM'>a  :</label><input type='number' name='aM' value='{$_SESSION['datas'][$_SESSION['indice'][$_SESSION['lineModif']]][1]}' required/></p>
            <p><label for='bM'>b  :</label><input type='number' name='bM' value='{$_SESSION['datas'][$_SESSION['indice'][$_SESSION['lineModif']]][0]}' required/></p>
            <input type=\"submit\" value=\"Modify it\">
        </FORM>
    </body>
    </html>
    ";

?>