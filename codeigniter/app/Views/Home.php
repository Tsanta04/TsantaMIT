<!DOCTYPE html>
<html style='background-color: grey;'>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="theme-color" content="#000000" />

<!-- Importer les bibliotheque Tailwind -->
<link rel="shortcut icon" href="./assets/img/favicon.ico" />
<link rel="apple-touch-icon" sizes="76x76"
	href="./assets/img/apple-icon.png" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/compiled-tailwind.min.css" />
<title>Fonction-Polynome | Acceuil</title>
</head>
<body class="text-gray-800 antialiased">

	<!-- Menu -- En haut -->
	<nav
		class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
		<div
			class="container px-4 mx-auto flex flex-wrap items-center justify-between">
			<div
				class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
				<a
					class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">Fonction
					Polynome</a>
				<button
					class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
					type="button" onclick="toggleNavbar('example-collapse-navbar')">
					<i class="text-white fas fa-bars"></i>
				</button>
			</div>
			<div
				class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none hidden"
				id="example-collapse-navbar">
				<ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
					<li class="flex items-center"><a
						class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						 href="<?php echo $url ?>/Dashboard/index/A">Resolution f(x)=0</a><i
						class="lg:text-gray-300 text-gray-500 fab text-lg leading-lg "></i></a>
					</li>
						<!-- href="Dashboard.php?mode=A">Resolution f(x)=0</a><i -->							
					<li class="flex items-center"><a
						class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						href="<?php echo $url ?>/Dashboard/index/B">Recherche de
							minimun local</a><i
						class="lg:text-gray-300 text-gray-500 fab text-lg leading-lg "></i></a>
					</li>
					<li class="flex items-center"><a
						class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
						href="<?php echo $url ?>/Dashboard/index/C">Calcul integrale</a><i
						class="lg:text-gray-300 text-gray-500 fab text-lg leading-lg "></i></a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- Corps du menu -- Une petite presentation sur cette application web -->
	<div
		class="relative pt-16 pb-32 flex content-center items-center justify-center"
		style="min-height: 75vh;">
		<div class="absolute top-0 w-full h-full bg-center bg-cover">
			<span id="blackOverlay"
				class="w-full h-full absolute opacity-75 bg-black"></span>
		</div>
		<div class="container relative mx-auto">
			<div class="items-center flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
					<div class="pr-12">
						<h1 class="text-white font-semibold text-5xl">E-Fonction</h1>
						<p class="mt-4 text-lg text-gray-300">Embrasser le pouvoir de
							l'intuition numerique. (Fonction polynome)</p>
					</div>
				</div>
			</div>
		</div>
		<div
			class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
			style="height: 70px;"></div>
	</div>
	<section class="pb-20 bg-gray-300 -mt-24">
		<div class="container mx-auto px-4">
			<div class="flex flex-wrap">
				<div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
						<div class="px-4 py-5 flex-auto">
							<h6 class="text-xl font-semibold">Resolution f(x)=0</h6>
							<p class="mt-2 mb-4 text-gray-600">La resolution numerique de
								l'equation f(x)=0 est fondamentale dans de nombreux domaines de
								la mathematique et de la physique, puisqu'elle permet de trouver
								les points ou un fonction croise l'axe des ordonnees. On peut
								trouver la solution par: Newton, Dichotomie et Descartes.</p>
						</div>
					</div>
				</div>
				<div class="w-full md:w-4/12 px-4 text-center">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
						<div class="px-4 py-5 flex-auto">
							<h6 class="text-xl font-semibold">Recherche de minimum</h6>
							<p class="mt-2 mb-4 text-gray-600">Cela signifie de trouver
								la valeur la plus petite parmi un ensemble de valeurs ou dans le
								domaine d'une fonction. On peut trouver ce point via: Descente
								du Gradient et Newton.</p>
						</div>
					</div>
				</div>
				<div class="pt-6 w-full md:w-4/12 px-4 text-center">
					<div
						class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
						<div class="px-4 py-5 flex-auto">
							<h6 class="text-xl font-semibold">Calcul integrale</h6>
							<p class="mt-2 mb-4 text-gray-600">Le calcul intégral permet
								de définir la notion de valeur moyenne d'une fonction sur un
								intervalle, très proche intuitivement de la notion de moyenne
								d'une série statistique. Des methodes sont: Rectangle, trapeze,
								et Simpson.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</body>
<script src='<?php echo base_url('assets/script.js')?>'>
  </script>
</html>
