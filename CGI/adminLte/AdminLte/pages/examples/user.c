#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include"../../../authLog/fn.h"

///Structure
typedef struct{
	char name[100];
	char pid[100];
}USER;

///Les prototypes
USER* getDataLocal();
int getLineNumber();

int main(){
	printf("content-type: text/html\n");
///Ne pas le mettre en cache
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");


///Les variables
	int ligne=100;int isValide=0;
	char string[256]="";char line[256]="";char identifiant[256]="";
	INFO* us=(INFO*)malloc(sizeof(INFO)*ligne);
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
	//La variable
		int ligne=getLineNumber();
		USER* user=(USER*)malloc(sizeof(USER)*ligne);
	//Recuperation des donnees
		user=getDataLocal(ligne);
	//HTML
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
		printf("<style>\n");
			afficher("adminlte.min.css");	
			printf("\n");
			afficher("../../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css");
			printf("\n");
			afficher("../../plugins/datatables-responsive/css/responsive.bootstrap4.min.css");	
			printf("\n");
			afficher("../../plugins/datatables-buttons/css/buttons.bootstrap4.min.css");	
		printf("\n</style>");
		afficher("../tables/data1.html");					
			printf("<THEAD>\n");
				printf("<TH>#</TH>\n");
				printf("<TH>Name of user</TH>\n");
				printf("<TH>Pid of user</TH>\n");
			printf("<THEAD>\n");
			printf("<TBODY>\n");
				for(int i=0;i<ligne;i++){
					printf("<TR><TD>%d</TD>\n",i);
					printf("<TD>%s</TD>\n",user[i].name);
					printf("<TD>%s</TD></TR>\n",user[i].pid);
				}
			printf("</TBODY>\n");
		printf("</TABLE>\n");

        printf("</div>\n<!-- /.card-body -->\n</div>\n<!-- /.card -->\n</div>\n<!-- /.col -->\n</div>\n<!-- /.row -->\n</div>\n<!-- /.container-fluid -->\n</section>\n<!-- /.content -->\n</div>\n<!-- /.content-wrapper -->\n<footer class=\"main-footer\">\n<div class=\"float-right d-none d-sm-block\">\n<b>Version</b> 3.2.0\n</div>\n<strong>Copyright &copy; 2014-2021 <a href=\"https://adminlte.io\">AdminLTE.io</a>.</strong> All rights reserved.\n</footer>\n<!-- Control Sidebar -->\n<aside class=\"control-sidebar control-sidebar-dark\">\n<!-- Control sidebar content goes here -->\n</aside>\n<!-- /.control-sidebar -->\n</div><!-- ./wrapper -->\n</body>\n</html>");

		printf("<script type=\"text/javascript\">\n");
			afficher("../../plugins/jquery/jquery.min.js");
			printf("\n");
			afficher("../../plugins/bootstrap/js/bootstrap.bundle.min.js");
			printf("\n");
			afficher("../../plugins/datatables/jquery.dataTables.min.js");
			printf("\n");
			afficher("../../plugins/datatables-bs4/js/dataTables.bootstrap4.min.js");
			printf("\n");
			afficher("../../plugins/datatables-responsive/js/dataTables.responsive.min.js");
			printf("\n");
			afficher("../../plugins/datatables-responsive/js/responsive.bootstrap4.min.js");
			printf("\n");
			afficher("../../plugins/datatables-buttons/js/dataTables.buttons.min.js");
			printf("\n");
			afficher("../../plugins/datatables-buttons/js/buttons.bootstrap4.min.js");
			printf("\n");
			afficher("../../plugins/pdfmake/pdfmake.min.js");
			printf("\n");
			afficher("../../plugins/datatables-buttons/js/buttons.html5.min.js");
			printf("\n");
			afficher("../../plugins/datatables-buttons/js/buttons.print.min.js");
			printf("\n");
			afficher("../../plugins/datatables-buttons/js/buttons.colVis.min.js");
			printf("\n");
			afficher("../../dist/js/adminlte.js");
			printf("\n");
			afficher("../../dist/js/demo.js");
			printf("\n");
			afficher("../../plugins/chart.js/Chart.min.js");
			printf("\n");
			afficher("../../dist/js/pages/dashboard3.js");
			printf("\n");
			printf("$(function () {\n$(\"#example1\").DataTable({\n\"responsive\": true, \"lengthChange\": false, \"autoWidth\": false,\n\"buttons\": [\"copy\", \"csv\", \"excel\", \"pdf\", \"print\", \"colvis\"]\n}).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');\n$('#example2').DataTable({\n\"paging\": true,\n\"lengthChange\": false,\n\"searching\": false,\n\"ordering\": true,\n\"info\": true,\n\"autoWidth\": false,\n\"responsive\": true,\n});\n});\n");
		printf("\n</script>\n");
		printf("</body></html>");
	}

	return 0;
}

///Les fonctions
int getLineNumber(){
	int ligne=0;
//Recuperation de nombre de ligne
	char commande[100];char inutile[100];
	strcpy(commande,"wc -l /etc/passwd");
	FILE* p=popen(commande,"r");
	if(p==NULL){printf("Erreur\n");exit(1);}
	fgets(inutile,100,p);
	ligne=atoi(inutile);
	pclose(p);
	//printf("%d",ligne);
	return ligne;
}

USER* getDataLocal(int ligne){
//Les variables
	char inutile[256];USER* user;FILE* f;
//Allocation
	user=(USER*)malloc(sizeof(USER)*ligne);
	f=fopen("/etc/passwd","r");
//Recuperation

	for(int i=0;i<ligne;i++){
		fgets(inutile,256,f);
		sscanf(inutile,"%[^:]:%[^:]:%[^:]:%[^\n]",user[i].name,inutile,user[i].pid,inutile);
		//printf("%s:%s\n",user[i].name,user[i].pid);
	}
	return user;
}
