#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"../../../serveur/fn.h"

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
		printf("Location:http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/login.cgi\n\n");				
	}
		
	///Sinon
	else if(isValide==1){
		int i=activation();
		printf("\n");
		//head();
		printf("<!DOCTYPE html>\n");
		printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Administration</title>\n");
				printf("<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" integrity=\"sha512-...\" crossorigin=\"anonymous\" />");
				printf("<link rel=\"stylesheet\" href=\"https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css\">");
        	    printf("<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback\">");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    	printf("</head>\n");	
		printf("<style>");
			afficher("adminlte.min.css");	
		printf("</style>");
		afficher("../forms/general2.html");
		int a=0;
		char** sites=getsite(&a);
		FILE* f;
		char commande[100];
		for(int i=0;i<a;i++){
			//strcpy(sites[i],docRoot(sites[i],0));
			sprintf(commande,"test -e /etc/apache2/sites-enabled/%s.conf",docRoot(sites[i],0));
			int k=system(commande);
			if(k==0){
				printf("<tr class=\"table-success\"><td>%d</td><td>%s</td><td>Activated</td></tr>",i,sites[i]);
			}
			else{
				printf("<tr class=\"table-danger\"><td>%d</td><td>%s</td><td>Diactivated</td></tr>",i,sites[i]);
			}
		}
		printf("</tbody></table></div><!-- /.card-body --></div></div></div></div>");

			if(i==-1){
				printf("<a name='ambany'><h1 class=\"card card-header\">Ce nom de domaine n'existe pas dans ce serveur.</h1></a>");
			}
			if(i==0){
				printf("<a name='ambany'><h1 class=\"card card-header\">Operation faite..</h1></a>");
			}
		printf("</div><footer class=\"main-footer\"><div class=\"float-right d-none d-sm-block\"><b>Version</b> 3.2.0</div><strong>Copyright &copy; 2014-2021 <a href=\"https://adminlte.io\">AdminLTE.io</a>.</strong> All rights reserved.</footer><!-- Control Sidebar --><aside class=\"control-sidebar control-sidebar-dark\"><!-- Control sidebar content goes here --></aside><!-- /.control-sidebar --></div><!-- ./wrapper -->");
		printf("<script type=\"text/javascript\">\n");
			afficher("../../plugins/jquery/jquery.min.js");
			printf("\n");
			afficher("../../plugins/bootstrap/js/bootstrap.bundle.min.js");
			printf("\n");
			afficher("../../dist/js/adminlte.js");
			printf("\n");
			afficher("../../plugins/chart.js/Chart.min.js");
			printf("\n");
			afficher("../../dist/js/demo.js");
			printf("\n");
			afficher("../../dist/js/pages/dashboard3.js");
		printf("\n</script>\n");
			printf("</body>\n");
		printf("</html>\n");	
	}	
	return 0;
}
