#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("content-type: text/html\n");
///Ne pas le mettre en cache
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");


///Les variables
	int ligne=100;int isValide=0;
	char string[256]="";char line[256]="";char identifiant[256]="";
	INFO* user=(INFO*)malloc(sizeof(INFO)*ligne);
	ID utilisateur;
	
///Test d'authentification
	isValide=authentification(&utilisateur);

	///Si non connectE
	if(isValide==-1){
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/serveur/login.cgi\n\n");				
	}
		
	///Sinon
	else if(isValide==1){
	printf("\n<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Auth.log</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		    printf("<style>");
                    printf(".hover:hover{box-shadow:3px 3px 10px black;}");
                printf("</style>");
            printf("</head>\n");
		printf("<body>");
            printf("<div class='container rounded' style='margin:5vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>Configuration serveur</h1></div>"); 
			printf("<p class='container text-primary' style:'margin-top:5vw'>Cliquer sur ce que vous allez faire:</p>");
			printf("<div align:'center' style='width:100vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin-top:4vw;display:flex;flex-wrap:wrap;justify-content:space-around'>");
				printf("<a HREF='http://www.tsa.com/cgi-bin/serveur/access.cgi' style='text-decoration:none;color:brown;'><p class='container rounded hover' align:'center' style='width:25vw;box-sizing:border-box;padding:10vh;background:linear-gradient(to right,pink,#afffff);'>Afficher les visiteurs de votre site web</p></a>");
				printf("<a HREF='http://www.tsa.com/cgi-bin/serveur/heberger.cgi' style='text-decoration:none;color:brown;'><p class='container rounded hover' align:'center' style='width:25vw;box-sizing:border-box;padding:10vh;background:linear-gradient(to right,pink,#afffff);'>Creer un hebergement serveur web</p></a>");
				printf("<a HREF='http://www.tsa.com/cgi-bin/serveur/activer.cgi' style='text-decoration:none;color:brown;'><p class='container rounded hover' align:'center' style='width:25vw;box-sizing:border-box;padding:10vh;background:linear-gradient(to right,pink,#afffff);'>Activer / Desactiver les serveurs existants</p></a>");
			printf("</div>");
		printf("<p align='right'><a href='http://www.tsa.com/cgi-bin/serveur/logout.cgi'><button style='width:10vw;height:6vh;font-size:1vw;background-color:white;'>Log Out</button></a></p>");
		printf("</body>\n");
	printf("</html>\n");
	}
	return 0;
}
