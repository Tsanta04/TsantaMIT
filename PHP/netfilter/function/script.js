//Boite de confirmation
function confirm(id,message){
    var confirmation=confirm(message);
    if(confirmation){
        document.getElementById(id).submit();
    }
    else{return false;}
}