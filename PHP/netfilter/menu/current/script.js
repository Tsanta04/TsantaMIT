function activeModify(elt,i){
    var val = document.getElementById("value"+i);
    val.contentEditable=true;
    elt.parentNode.innerHTML="<a href=\"current.php?lineM="+i+"\"><i class=\"fas fa-edit\"></i></a>";
}