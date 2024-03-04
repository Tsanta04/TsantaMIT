<?php
    session_start();

//Initialisation of variables get to use
    if(!isset($_SESSION['datas'])){
        $_SESSION['datas']=array();
        $_SESSION['indice']=array();
        $_SESSION['prevA']=0;
        $_SESSION['prevB']=0;
    }

//Main form    
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
		<FORM class='formulaire bg-warning' ACTION='main.php' METHOD='POST'>
            <p class='text'>Table de multiplication<p/>
            <p><label for='a'>A = </label><INPUT style='width:14vw;' name='a' type='number' required/></p>
            <p><label for='b'>B = </label><INPUT style='width:14vw;' name='b' type='number' required/></p>
		    <p><INPUT type='submit' value='Envoyer'/></p>
	    </FORM>
    </body>
    </html>   
    ";

//Get datas to be treated
    if(isset($_POST['a'])){
        $_SESSION['datas']=array();
        $_SESSION['indice']=array();
        for($i=1;$i<=$_POST['b'];$i++){
            $_SESSION['datas'][$i -1]=array($i,$_POST['a'],($i * $_POST['a']));
            $_SESSION['indice'][$i -1]=$i-1;
        }
        $_SESSION['prevA']=$_POST['a'];
        $_SESSION['prevB']=$_POST['b'];
    }

//Delete a line  
    //echo $lineSuppr;
    if(isset($_GET['lineSuppr'])){
        for($i=0;$i<count($_SESSION['indice']);$i++){
            if($_SESSION['indice'][$i]==$_GET['lineSuppr']){
                unset($_SESSION['indice'][$i]);
                break;
            }
            $_SESSION['indice']=array_values($_SESSION['indice']);
        }
    }
//Display result
    echo "
        <div class=\"container\"><TABLE class='table rounded'>
            <THEAD class='table-danger'>
                <TH> B </TH>
                <TH> * </TH>                
                <TH> A </TH>
                <TH> = </TH>                
                <TH> C </TH>
                <TH width='20%'>Action</TH>                
            </THEAD>
        ";    
            $_SESSION['indice']=array_values($_SESSION['indice']);        
            for($i=0;$i<count($_SESSION['indice']);$i++){
                if($_SESSION['datas'][$_SESSION['indice'][$i]][0] % 2 == 0){
                    echo "<TR class='table-success'>";
                }
                if($_SESSION['datas'][$_SESSION['indice'][$i]][0] % 2 == 1){
                    echo "<TR class='table-secondary'>";
                }
                echo "
                    <TD>{$_SESSION['datas'][$_SESSION['indice'][$i]][0]}</TD>
                    <TD>*</TD>
                    <TD>{$_SESSION['datas'][$_SESSION['indice'][$i]][1]}</TD>
                    <TD>=</TD>
                    <TD>{$_SESSION['datas'][$_SESSION['indice'][$i]][2]}</TD>
                    <TD class='flex'>
                        <A class='link' href=\"modify.php?lineModif={$_SESSION['indice'][$i]}\">  Modifier|</A>
                        <A class='link' href=\"main.php?lineSuppr={$_SESSION['indice'][$i]}\"> Supprimer  </A>
                    </TD>
                </TR>
                ";
            }
    echo "</div>";
?>