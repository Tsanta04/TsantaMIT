<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="shortcut icon" href="./assets/img/favicon.ico" />
<!-- Importer Bootstrap -->    
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>
<!-- Importer Tailwind -- Bibliotheque comme Bootstrap -->
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="./assets/img/apple-icon.png"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/compiled-tailwind.min.css"
    />
    <title> E-Fonction | Tableau de bord </title>
  </head>

  <body>
    <noscript>Tu as besoin de Gnuplot installE dans votre systeme</noscript>
    
<!-- Menu -- A droite -->
      <nav
        class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
      >
        <div
          class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
          style="background-color:grey;"
        >
          <button
            class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onclick="toggleNavbar('example-collapse-sidebar')"
          >
            <i class="fas fa-bars"></i></button
          >
          <a
            class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            href="javascript:void(0)"
          >
           Fonction Polynome
          </a>
          <ul class="md:hidden items-center flex flex-wrap list-none">
            <li class="inline-block relative">
              <a
                class="text-blueGray-500 block"
                href="#pablo"
                onclick="openDropdown(event,'user-responsive-dropdown')"
              ></a>
            </li>
          </ul>
          <div
            class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"
            id="example-collapse-sidebar"                                              
          >
            <div
              class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
            >
              <div class="flex flex-wrap"
              >
                <div class="w-6/12"
                >
                  <a
                    class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href="javascript:void(0)"
                  >
                    Fonction Polynome
                  </a>
                </div>
                <div class="w-6/12 flex justify-end"
                >
                  <button
                    type="button"
                    class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onclick="toggleNavbar('example-collapse-sidebar')"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <ul class="text-blueGray-700 md:flex-col md:min-w-full flex flex-col list-none"
            >
            <li class="items-center">
              <a
                class="text-blueGray-70 hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                href="Home.jsp"
                ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
                Acceuil</a
              >
            </li>            
              <li class="items-center">
                <a
                  class="$a hover:text-pink-600 text-xs uppercase py-3 font-bold block"
                  href="Dashboard.jsp?mode=A"
                  ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
                  Resolution f(x) = 0</a
                >
              </li>
              <li class="items-center">
                <a
                  class="$b hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  href="Dashboard.jsp?mode=B"
                  ><i class="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>
                  Recherche minimum</a
                >
              </li>
              <li class="items-center">
                <a
                  class="$c hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                  href="Dashboard.jsp?mode=C"
                  ><i class="fas fa-info-circle text-blueGray-400 mr-2 text-sm"></i>
                  Calcul integrale</a
                >
              </li>
            </ul>
            <hr class="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
<!--Content -->
    <main class="profile-page" style='background-color:'grey;''>
		<form id='formulaire' class='w-1/2 absolute border border-1 right-0' style='margin-right:16vw;' action='Developpement' method='POST'>
			<h1  class='container bg-secondary'>Entrer la fonction</h1>
			Dimension: <input type='number' class='container' id='dim' name='dim'/><div class='container' id='coef'></div>
			<%
				if("A".equals(request.getParameter("mode"))){
					out.println("Methode: <select id='select_methode' onchange='input(this);' name='methode' class='container'><option value=1>Dichotomie</option><option value=2>Newton</option><option value=3>Descartes</option></select><div id='asiana' class container></div>"
					);
				}
				
				else if("B".equals(request.getParameter("mode"))){
					out.println("Methode: <select id='select_methode' name='methode' class='container' ><option value=4>Newton</option><option value=5>Descente du Gradient</option></select>"
							+"Point initial: <input type='number' step='0.001' placeholder='0.00..' class='container' name='pointI'/>"
							+"Pas: <input type='number' step='0.0001' placeholder='0.00..' class='container' name='pas'/>"
					);
				}	
			
				else if("C".equals(request.getParameter("mode"))){
					out.println("Methode: <select id='select_methode' name='methode' class='container'><option value=6>Rectangle</option><option value=7>Trapeze</option><option value=8>Simpson</option></select>"
							+"Borne A: <input type='number' class='container' name='pointA'/>Borne B: <input type='number' class='container' name='pointB'/>"
							+"Pas: <input type='number' step='0.0001' class='container' placeholder='0.00..' type='float' name='pas'/>"
					);					
				}
			%>		
			<input class='container' type='submit' value='Etudier'/>
		</form>
		<!--info method-->

		<div id='ici' class='container absolute right-0 d-flex' style="width:80vw;margin-top:90vh;margin-bottom:10vw;">
		    		<hr>
		    <div class='w-50' style='font-size:2vw;'>
			   <H1 class='container bg-secondary' style='font-size:3vw';> Le resultat </H1>		
				<p class='container'>Fonction: ${fonction}</p>
		        <p class='container'>Method: ${methode}</p>
		        <p class='container'>pointA: ${pointA}</p>
		        <p class='container'>pointB: ${pointB}</p>		        
		        <p class='container'>Nombre iteration: ${iteration}</p>
		        <p class='container'>Resultat final: ${resultat}</p>
		    </div>
		    <!-- <div class='w-50' style='background-image:url("${path}");'>-->
			<div class='w-50'>
				<img src="<%=request.getContextPath()%>/function.png" alt="<%=request.getContextPath()%>" width="100%" height="100%">
		    </div>
		</div>			
    </main>
	<script src='script.js'></script>      
   </body>
 </html>