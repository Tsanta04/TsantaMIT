/* responsive mode */

function toggleNavbar(collapseID) {
	document.getElementById(collapseID).classList.toggle("hidden");
	document.getElementById(collapseID).classList.toggle("block");
 }
 
 function toggleNavbar(collapseID) {
	document.getElementById(collapseID).classList.toggle("hidden");
	document.getElementById(collapseID).classList.toggle("bg-white");
	document.getElementById(collapseID).classList.toggle("m-2");
	document.getElementById(collapseID).classList.toggle("py-3");
	document.getElementById(collapseID).classList.toggle("px-6");
 }
 /* "dropdowns" si la fenetre est petite */
 function openDropdown(event, dropdownID) {
	  let element = event.target;
		  while (element.nodeName !== "A") {
			  element = element.parentNode;
			}
		  var popper = Popper.createPopper(element, document.getElementById(dropdownID), {
			  placement: "bottom-end"
			});
	  document.getElementById(dropdownID).classList.toggle("hidden");
	  document.getElementById(dropdownID).classList.toggle("block");
 }
 
 document.querySelector("#dim").addEventListener('input',async function(event){
	 var dim=event.target.value;
	 var div = document.getElementById("coef");
	 div.innerHTML="";
	 for(let i=0;i<=dim;i++)
		 div.innerHTML+= (i+1)+"Coefficient: <input type='number' step='0.0001' class='container' name='"+(i+100)+"' required/>";
 });
 
 function input(elt){
	 var val=elt.value;
	 var form = document.getElementById("formulaire");
	 var div = document.getElementById("asiana");
	 div.innerHTML="";
	 if(val!=2)div.innerHTML="Borne A: <input type='number' class='container' name='pointA' required/>Borne B: <input type='number' class='container' name='pointB' required/>";	
	 if(val==2)div.innerHTML="Point Initial: <input type='number' class='container' name='pointI' required/>";		
 }
 
 
 
 