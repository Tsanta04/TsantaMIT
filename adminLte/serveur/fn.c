#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

///Les definitions des fonctions de authMlg
void head(){
	printf("\n");
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
}

int max(int ligne){
    int max =(int) ((ligne/10)+1);
    return max;
}

char* geturl(){
//Recuperer la valeur entree
	char* us = getenv("QUERY_STRING");
	//printf("mitambatra:''%s''",us);
	return us;
}

void separerDonnee(char* string, char* line,char* mode){
	char tmp1[100]="";char tmp2[100]="";char tmp3[100]="";
	sscanf(string,"%[^&]&%[^&]&%[^\n]",tmp3,line,mode);
	strcpy(string,tmp3);
	//sprintf(id,"%s&%s",tmp1,tmp2);
	//printf("%s++%s",string,line);
}

INFO* getData(int* ligne,char* string){
//Les variables
	char* inutile=(char*)malloc(256);
	char commande[256];INFO* user;FILE* f;
	char site[100]="";
	char us[100]="";
	//printf("us=%s,string=%s",us,string);
	sscanf(string,"user=%[^\n]",us);
//Recuperer le ligne max
	strcpy(commande,"wc -l /var/log/apache2/access.log");
	f=popen(commande,"r");
	fgets(inutile,256,f);
	pclose(f);
	int len = atoi(inutile);
	*ligne=0;
	user=(INFO*)malloc(sizeof(INFO)*(len));

//Le us est-il dans /etc/hosts
	if((strcmp(us,"")!=0)&&(host(us)==0)){*ligne=-1;return user;}

//Recuperation des donnees
    int test=0;
	for(int i=0,k=1;i<len;i++,k++){
		sprintf(commande,"tail -n%d /var/log/apache2/access.log | head -n1",k);
		f=popen(commande,"r");
		if(f==NULL){printf("Erreur\n");exit(1);}
		fgets(inutile,256,f);
		pclose(f);

        if(k==len){
            if(i==0){*ligne=0;}
            else if(test==1){
                strcpy(user[i].IP,"");
                strcpy(user[i].time,"");
                strcpy(user[i].action,"");
                strcpy(user[i].URL,"");
            }
            break;
        }
        
        sscanf(inutile,"%[^-]- - [%[^]]] \"%[^\"]\" %[^ ] %[^ ] \"%[^\"]\"%[^\n]",user[i].IP,user[i].time,user[i].action,commande,commande,user[i].URL,inutile);
/*		sscanf(inutile,"%[^ ] %[^ ] %[^ ] %[^ ] %[^ ] %[^\n]\n",mois,jour,heure,inutile,commande,inutile);
		strcpy ( user[i].time,malagasyDate(mois,jour,heure) );*/

		if(strcmp(us,"")!=0){
			sscanf(user[i].URL,"http://%[^/]/%[^\n]",site,inutile);
			if(strcmp(site,us)!=0){test=1;i--;}
			else{test=0;(*ligne)++;continue;}
			//printf("i=%d",i);
		}
		else if(strcmp(us,"")==0){test=0;(*ligne)++;continue;}
	}
	free(inutile);
//}
	return user;
}

void chiffrePagination(char* total,int* rand,int* debut,int* voalohany,int* farany,int mx){
	char inutile[100];
	//printf("%s",total);
	if(strcmp(total,"")==0){strcpy(total,"1");}
		if(atoi(total)<=mx){
			(*rand)=(atoi(total)*10);(*debut)=(*rand)-10;
			(*voalohany)=(atoi(total));
			if((atoi(total)+9)>=mx){(*farany)=mx;}
			else{(*farany)=(atoi(total))+9;}
		}
		else if(atoi(total)==(1+mx)){(*rand)=( (atoi(total)-1)*10);(*debut)=0;}	
}

void displayResult(char* total,int ligne,INFO* user,char* string,ID us,char* mode){
///Affichage
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
		afficher("../tables/data2.html");
		displayData(total,ligne,user,string,mode);
		printf("</div>\n<!-- /.card-body -->\n</div>\n<!-- /.card -->\n</div>\n<!-- /.col -->\n</div>\n<!-- /.row -->\n</div>\n<!-- /.container-fluid -->\n</section>\n<!-- /.content -->\n</div>\n<!-- /.content-wrapper -->\n<footer class=\"main-footer\">\n<div class=\"float-right d-none d-sm-block\">\n<b>Version</b> 3.2.0\n</div>\n<strong>Copyright &copy; 2014-2021 <a href=\"https://adminlte.io\">AdminLTE.io</a>.</strong> All rights reserved.\n</footer>\n<!-- Control Sidebar -->\n<aside class=\"control-sidebar control-sidebar-dark\">\n<!-- Control sidebar content goes here -->\n</aside>\n<!-- /.control-sidebar -->\n</div><!-- ./wrapper -->\n");
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

char** getsite(int* a){
	char* inutile=(char*)malloc(100);
	char* nomExistants=(char*)malloc(100);
	FILE* f=popen("wc -l hosts","r");
	fgets(inutile,100,f);
	(*a)=atoi(inutile);
	pclose(f);
	
	char**sites=(char**)malloc((sizeof(char*))*(*a));
	for(int i=0;i<(*a);i++){sites[i]=(char*)malloc(100);}

	f=fopen("hosts","r");
	for(int i=0;i<(*a);i++){
		fgets(nomExistants,100,f);
		sscanf(nomExistants,"%[^\t]\t%[^\n]",inutile,sites[i]);
	}
	fclose(f);
	free(inutile);free(nomExistants);
	
	return sites;
}

void displayNav(ID us){
	printf("<div style='box-sizing:border-box;position:fixed;top:0;width:100vw;height:13vh;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:row;justify-content:space-between;align-items:center;box-shadow:2px 5px 3px;'>"); 
		printf("<h3 class='text-primary' style='font-size:3vw;'>Welcome %s!!</h3>",reglage(us.id));	
		printf("<select>");
			printf("<option>Les sites:</option>");
			int a=0;

			char** sites=getsite(&a);
			for(int i=0;i<a;i++){
				printf("<option disabled>--%s-- </option>",sites[i]);
			}
			
		printf("</select>");
		printf("<div class='text-info initialiser' style='box-sizing:border-box;width:15vw;padding-top:1vh;height:6vh;border-style:dotted;font-size:1vw;' align='center'><a href='http://www.tsa.com/cgi-bin/serveur/access.cgi?ServerName=' style='text-decoration:none;color:black;'>Creer un nouveau site web</a></div>");
		printf("<FORM style='padding:1%%;' ACTION='access.cgi' METHOD='GET'>");
			printf("<p><label for='user'>Le nom du site: </label><INPUT style='width:14vw;' name='user' type='input' required/>");
			printf("<INPUT type='submit' value='+ d info'/></p>");
		printf("</FORM>");
		printf("<p><a href='http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/logout.cgi'><button style='width:10vw;height:6vh;font-size:1vw;background-color:white;'>Log Out</button></a></p>");
	printf("</div>");
}

void configuration(char* us,char*line,char* mode){
	printf("<div align:'center' style='width:100vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin-top:4vw;display:flex;flex-wrap:wrap;justify-content:space-around'>");
		printf("<FORM class='container rounded hover' style='width:40vw;box-sizing:border-box;padding:10vh;background:linear-gradient(to right,pink,#afffff);' ACTION='access.cgi?user=%s&line=%s' METHOD='POST' enctype='multipart/form-data'>",us,line);
			printf("<p class='container text-primary'>Heberger des fichiers dans votre site web:</p>");
			printf("<br><br><div style='display:flex;justify-content:space-between;'><p align='center'><INPUT style='width:14vw;' name='fichier' type='file' required/></p>");
			printf("<p><INPUT type='submit' value='Envoyer'/></p></div>");
			int i=heberger(us);
			if(i==-1){
				printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Ce nom de domaine n'existe pas dans ce serveur.</h1></a>");
			}
			if(i==0){
				printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Operation faite..</h1></a>");
			}
		printf("</FORM>");
	
		printf("<div class='container rounded hover' style='width:40vw;box-sizing:border-box;padding:10vh;background:linear-gradient(to right,pink,#afffff);align-items:center'>");
			printf("<p class='container text-primary'>Activer/Desactiver ce web:</p>");
				printf("<a HREF='http://www.tsa.com/cgi-bin/serveur/access.cgi?user=%s&line=%s&mode=Activer' style='text-decoration:none;color:brown;'><p class='container rounded hover' align:'center'>Activer</p></a>",us,line);
				printf("<a HREF='http://www.tsa.com/cgi-bin/serveur/access.cgi?user=%s&line=%s&mode=Desactiver' style='text-decoration:none;color:brown;'><p class='container rounded hover' align:'center'>Desactiver</p></a>",us,line);
			if(activation(us,mode)==-1){
				printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Ce nom de domaine n'existe pas dans ce serveur.</h1></a>");
			}
			else if(activation(us,mode)==0){
				printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Operation faite..</h1></a>");
			}	
		printf("</div>");	

	printf("</div>");
}

void displayData(char* total,int ligne,INFO* user,char* string,char* mode){

///Les variables
		int rand=10;int voalohany=1;int farany=10;int mx=max(ligne);int debut=0;
		sscanf(total,"line=%[^\n]",total);
		int prev=atoi(total);
		int suiv=atoi(total);
///gestion user=nomUser
		char us[100]="";
		sscanf(string,"user=%[^\n]",us);
		chiffrePagination(total,&rand,&debut,&voalohany,&farany,mx);
/*
	if(strcmp(us,"")!=0){
		printf("<div class='container rounded' style='margin:8vh;margin-top:11vw;padding:1vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>%s</h1></div>",us);
	}
	else if(strcmp(us,"")==0){
		printf("<div class='container rounded' style='margin:8vh;margin-top:11vw;padding:1vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>Visiteurs des sites existants</h1></div>");
	}
	if(strcmp(us,"")!=0){
		configuration(us,total,mode);
	}
	printf("<p class='container text-primary' style='margin:5vh;'>Les visiteurs de votre site web:</p>");
*/	
		if(ligne>0){
		//printf("<TABLE class='table table-borderless rounded' style='margin-bottom:8vh;'>\n");
			printf("<THEAD>\n");
				printf("<TH>#</TH>\n");
				printf("<TH>Visitors</TH>\n");
				printf("<TH>Date</TH>\n");
				printf("<TH>Action</TH>\n");
				printf("<TH>URL</TH>\n");
			printf("</THEAD>\n");
			printf("<TBODY>\n");
				for(int i=0;i<ligne;i++){
					if(i%2==0){
    					printf("<TR class='table-success' style='width:7%%;'><TD>%d</TD>\n",i+1);
					}
					else if(i%2==1){
    					printf("<TR class='table-danger'><TD>%d</TD>\n",i+1);
					}
					printf("<TD style='width:13%%;'>%s</TD>\n",user[i].IP);
					printf("<TD style='width:26%%;'>%s</TD>\n",user[i].time);
					printf("<TD>%s</TD>\n",user[i].action);
					printf("<TD>%s</TD></TR>\n",user[i].URL);
				}

			printf("</TBODY>\n");
		printf("</TABLE>\n");
		//printf("<div class='container rounded' style='height:12vh;margin:5vh;padding:1vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-wrap:wrap;overflow:scroll;justify-content:space-around;align-items:center;'>");
/*				
			for(int i=voalohany;i<=farany;i++){printf("<div style='padding:1%%;box-sizing:border-box;'><a href='http://www.tsa.com/cgi-bin/serveur/access.cgi?user=%s&line=%d'>%d</a><br></div>",us,i,i);}
				printf("<div><a href='http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/access.cgi?user=%s&line=%d'>All</a><br></div>",us,(mx+1));
				if(atoi(total)==mx){suiv=(atoi(total)-1);}
				if(atoi(total)==1){prev=(atoi(total)+1);}
				printf("<div><a href='http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/access.cgi?user=%s&line=%d'><<< </a><br></div>",us,prev-1);				
				printf("<div><a href='http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/access.cgi?user=%s&line=%d'> >>></a><br></div>",us,suiv+1);
		printf("</div>");
		*/
		}
		else if(ligne<=0){
			printf("<div class='rounded' align='center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8;padding:3vw;margin:auto;margin-top:10vw;background:linear-gradient(to right,#aca5a5,#ece5e5);display:flex;flex-direction:column;justify-content:space-around;'>");
				printf("<p align='center' style='font-size:10vw'>OoOPs!!</p>");
				if(ligne==-1){printf("<p class='container text-secondary' style='margin-top:5vw' align='center'>This site doesn't exist ! Enter another username :) ---- %s ---- </p>",string);}
				if(ligne==0){printf("<p class='container text-secondary' style='margin-top:5vw' align='center'>No visitors yet!! :) ---- %s ---- </p>",string);}
			printf("</div>");
		}
}

void afficher(char* chemin){
		FILE* f=fopen(chemin,"r");
		char tmp[256];
		for(int i=0;feof(f)!=1;i++){
			if(i>0){
					printf("%s",tmp);
			}
			fgets(tmp,256,f);
		}
		fclose(f);
}

///Formulaire d'authentification
void formLogin(int i){
	if(i==1){
		printf("Status: 302 Found\n");
		printf("Location: http://www.tsa.com/cgi-bin/adminLte/serveur/access.cgi\n\n");		
		//printf("content-type: text/html\n");
	}
	else{
		printf("\n");
		head();
		printf("<style>");
/*
			afficher("all.min.css");
			afficher("icheck-bootstrap.min.css");
*/
			afficher("adminlte.min.css");
		printf("</style>");
		afficher("login-v2.html");
			if(i==-1){
					printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Erreur d'authentification. Veuillez reessayer...</h1></a>");
				}
			printf("</body>\n");
		printf("</html>\n");
	}	
}

void formSignIn(){
	head();
	printf("<style>");
		afficher("adminlte.min.css");
	printf("</style>");
	afficher("register-v2.html");
}

///Traitement d'authentification
void registerID(){
///Les variables
	char* data = getenv("QUERY_STRING");
	ID identite;
	char tmp[120]="";char inutile[100];
	char file[256];
	FILE* f;
	
///initialisation
	strcpy(identite.psswd,"");
	sprintf(file,"identifiants.csv");

///Diviser les donnees
	sscanf(data,"Nom=%[^&]&ID=%[^&]&mail=%[^&]&PWD=%[^&]&Vpwd=%[^\n]",identite.nom,identite.id,identite.mail,identite.psswd,tmp);
	int bool=dejaPris(file,identite.id);
	if(bool==-1){
		printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Cet identifiant est deja pris. Veuillez choisir un autre...</h1></a>");		
	}
	if(strcmp(identite.psswd,tmp)!=0){
		printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Les mots de passe entrEs ne sont pas les meme.</h1></a>");
	}
	else if((bool==0)&&(strcmp(identite.psswd,tmp)==0)&&(strcmp(identite.psswd,"")!=0)){
		if(strlen(identite.psswd)<8){
			printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Le mot de passe doit composer au moins 8 caracteres. Reessayez...</h1></a>");		
			exit(1);
		}
		f=fopen(file,"a");
		if(f==NULL){printf("Erreur d'ouverture");exit(1);}
		fprintf(f,"%s:%s:%s:%s\n",identite.nom,identite.id,identite.mail,identite.psswd);
		fclose(f);
		printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Enregistrement reussit.</h1></a>");
	}
	printf("</body>\n");
	printf("</html>\n");	

}

int dejaPris(char* file,char* nom){
///Ouverture de file
	char tmp[100];
	char inutile[100];
	char nomFile[100];
	FILE* f=fopen(file,"r");
	for(int i=0;feof(f)!=1;i++){
		fgets(tmp,100,f);
		sscanf(tmp,"%[^:]:%[^:]:%[^\n]",inutile,nomFile,tmp);
		if(strcmp(nom,nomFile)==0){return -1;}
	}
	fclose(f);
	return 0;
}

int verifyID(){
	char* data=getenv("QUERY_STRING");
///Les variables
	LOG user;
	ID contain;
	char file[256];//char date[100]="";
	char tmp[256]="";char inutile[256]="";
	int test=-1;
	//ANDROANY today;
	FILE* f;
	sscanf(data,"%[^=]=%[^\n]",tmp,inutile);

/*
///Preparation de la date d'expliration
	f=popen("date","r");
	fgets(date,100,f);
	pclose(f);
	sscanf(date,"%[^ ] %[^ ] %[^ ] %[^ ] %[^ ] %[^\n]\n",today.andro,today.volana,today.j,tmp,tmp,today.taona);
*/

///Si non connectE
	if(strcmp(data,"")==0){
		return 0;
	}

///Diviser les donnees
	else{
		if((strcmp(data,"")!=0)&&(strcmp(tmp,"user")!=0)){
			sscanf(data,"ID=%[^&]&PWD=%[^\n]",user.id,user.psswd);
			sprintf(file,"identifiants.csv");
			f=fopen(file,"r");
			if(f==NULL){printf("Erreur d'ouverture");exit(1);}
			for(int i=0;feof(f)!=1;i++){
				fgets(tmp,256,f);
				sscanf(tmp,"%[^:]:%[^:]:%[^:]:%[^\n]",contain.nom,contain.id,contain.mail,contain.psswd);
				if((strcmp(contain.id,user.id)==0)&&(strcmp(contain.psswd,user.psswd)==0)){
					printf("Set-Cookie:session=%s; expires=Wed, 25 Oct 2028 00:00:00 GMT;HttpOnly\n",user.id);
					test=0;break;
				}
			}
			fclose(f);
	
			if(test==0){
				return 1;
			}
			else if(test==-1){
				return -1;
			}
		}
	}
}

int authentification(ID* contain){
///Les variables
	FILE* f; char file[100];
	char tmp[100]="";
	char inutile[200]="";
	char* user=getenv("HTTP_COOKIE");
///Contenu de File
	if((user==NULL)||strcmp(user,"session=")==0){return -1;}
	else{
		sscanf(user,"session=%[^\n]\n",user);
		//printf("\nUSER=%s",user);
		sprintf(file,"identifiants.csv");
		if(strcmp(user,"")==0){return -1;}
		f=fopen(file,"r");
		if(f==NULL){printf("\nErreur d'ouverture");exit(1);}
		for(int i=0;feof(f)!=1;i++){
			fgets(inutile,200,f);
			sscanf(inutile,"%[^:]:%[^:]:%[^:]:%[^:]:%[^\n]",contain->nom,contain->id,contain->mail,contain->psswd,contain->ip);
			if(strcmp(contain->id,user)==0){
				fclose(f);
				return 1;
			}
		}
		return -1;
	}
}

///MOt de passe oubliE
void entrerNom(){
//Test d'authentification
	char* testAuth=getenv("QUERY_STRING");
	char val[100]="";
	sscanf(testAuth,"val=%[^\n]",val);

	head();
	printf("<style>");
		afficher("adminlte.min.css");
	printf("</style>");
	afficher("forgot-password-v2.html");

	if(strcmp(val,"-1")==0){
		printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>You haven't register yet. Press on 'signIn' to register.</h1></a>");	
	}
	if(strcmp(val,"OK")==0){	
		printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Mot de passe bien modifiE.</h1></a>");
	}
		printf("</body>\n");
	printf("</html>\n");
}

void changerMdp(){
///get the name+declaration
	FILE* f;
	int test=-1;
	char name[200]="";
	char* mdp=(char*)malloc(100);char* vmdp=(char*)malloc(100);
	char file[256];ID* iden;
	char* inutile=(char*)malloc(200);int indice=0;
	char commande[100]="";
	
///Preparation des donnees	
	//len
	strcpy(commande,"wc -l identifiants.csv");
	f=popen(commande,"r");
	fgets(inutile,200,f);
	pclose(f);
	int len = atoi(inutile);
	iden=(ID*)malloc(sizeof(ID)*len);
	//data
	char* data = getenv("QUERY_STRING");
	reglage1(data);
	
	sscanf(data,"name=%[^&]&PWD=%[^&]&Vpwd=%[^\n]",name,mdp,vmdp);
	
///open the file
	sprintf(file,"identifiants.csv");
	f=fopen(file,"r");
	if(f==NULL){printf("Erreur d'ouverture");exit(1);}
		for(int i=0;i<len;i++){
			fgets(inutile,200,f);
			sscanf(inutile,"%[^:]:%[^:]:%[^:]:%[^\n]",iden[i].nom,iden[i].id,iden[i].mail,iden[i].psswd);
			if(strcmp(iden[i].id,name)==0){
				indice=i;
				test=0;
			}
		}
		fclose(f);
		free(inutile);

	if(test==-1){
		printf("Status: 302 Found\n");
		printf("Location: http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/mdpOublier.cgi?val=-1#ambany\n");	
	}
	
	if((strcmp(mdp,"")!=0)&&(strcmp(mdp,vmdp)==0)&&(strlen(mdp)>=8)){
		sprintf(iden[indice].psswd,"%s",mdp);
		f=fopen(file,"w");
		if(f==NULL){printf("\nErreur d'ouverture");exit(1);}
		for(int k=0;k<len;k++){
			fprintf(f,"%s:%s:%s:%s\n",iden[k].nom,iden[k].id,iden[k].mail,iden[k].psswd);
		}
		fclose(f);
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/mdpOublier.cgi?val=OK#ambany\n");	
	}

	head();
	printf("<style>");
		afficher("adminlte.min.css");
	printf("</style>");
	printf("<body class=\"hold-transition login-page\"><div class=\"login-box\"><div class=\"card card-outline card-primary\"><div class=\"card-header text-center\"><a href=\"../../index2.html\" class=\"h1\"><b>Admin</b>LTE</a></div><div class=\"card-body\"><p class=\"login-box-msg\">You are only one step a way from your new password, recover your password now.</p><form action=\"changerMdp.cgi#ambany\" method=\"get\"><div class=\"input-group mb-3\"><input type=\"password\" name='name=%s&PWD' class=\"form-control\" placeholder=\"Password\" required><div class=\"input-group-append\"><div class=\"input-group-text\"><span class=\"fas fa-lock\"></span></div></div></div><div class=\"input-group mb-3\"><input type=\"password\" name='Vpwd' class=\"form-control\" placeholder=\"Confirm Password\" required><div class=\"input-group-append\"><div class=\"input-group-text\"><span class=\"fas fa-lock\"></span></div></div></div><div class=\"row\"><div class=\"col-12\"><button type=\"submit\" class=\"btn btn-primary btn-block\">Change password</button></div></div></form><p class=\"mt-3 mb-1\"><a href=\"http://www.tsa.com/cgi-bin/adminLte/AdminLte/pages/examples/mdpOublier.cgi?val=OK#ambany\n\">Login</a></p></div></div></div>",name);
	if((strcmp(mdp,"")!=0)||(strcmp(vmdp,"")!=0)){
		if(strcmp(mdp,vmdp)==0){
			if(strlen(mdp)<8){
				printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Le mot de passe doit composer au moins 8 caracteres. Reessayez...</h1></a>");		
				exit(1);
			}
		}
		else if(strcmp(mdp,vmdp)!=0){
			printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Les mots de passe entrEs ne sont pas les meme.</h1></a>");
		}
	}
		printf("</body>\n");
	printf("</html>\n");
}

char* reglage(char* a){
	char donne[100]="";
	int i=0;
	for(i=0;i<strlen(a);i++){
		if(a[i]=='+'){
			donne[strlen(donne)]=' ';
		}
        else if(a[i]=='%'){
			char tmp[3];
			tmp[0]=a[i+1];
			tmp[1]=a[i+2];
			int num=0;
			int k=16;
			for(int j=0;j<2;j++){
				if((tmp[j]<='9')&&(tmp[j]>='0')){
					num+=(k*(tmp[j]-48));
				}
				else if((tmp[j]<='F')&&(tmp[j]>='A')){
					num+=(k*(tmp[j]-'A'+10));
				}
                k-=15;
			}
            donne[strlen(donne)]=num;
				i+=2;
		}
        else{donne[strlen(donne)]=a[i];}		
	//printf("<p>Pendant :%c</p>",donne[strlen(donne)]);
	}
	//printf("<p>Apres :%s</p>",donne);
	//donne[strlen(donne)]='\0';
	char* result = &donne[0];
	//printf("----%s",result);
	return result;
}

void reglage1(char* a){
        char* resultat=(char*)malloc(100);
        //char resultat[200];
        strcpy(resultat,"");
        int i=0;
        for(i=0;i<strlen(a);i++){
                if(a[i]=='%'){
                        char tmp[3];
                        tmp[0]=a[i+1];
                        tmp[1]=a[i+2];
                        int num=0;
                        int k=16;
                        for(int j=0;j<2;j++){
                                if((tmp[j]<='9')&&(tmp[j]>='0')){
                                        num+=(k*(tmp[j]-48));
                                }
                                else if((tmp[j]<='F')&&(tmp[j]>='A')){
                                        num+=(k*(tmp[j]-'A'+10));
                                }
                                k-=15;
                        }
                        resultat[strlen(resultat)]=num;
                        i+=2;
                }
                else{resultat[strlen(resultat)]=a[i];}
				if((i+1)==strlen(a)){
					resultat[i+1]='\0';					
				}
        }
		strcpy(a,resultat);
}

///SERVEUR
///formulaire web
void formulaireWeb(int i){
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
		afficher("../forms/validation.html");
	if(i==-1){
		printf("<a name='ambany'><h1 class=\"card card-header\">Ce nom n'est plus disponible.Veuillez choisir un autre...</h1></a>");
	}
	else if(i==0){
		printf("<a name='ambany'><h1 class=\"card card-header\">Erreur d'ouverture!</h1></a>");
	}
	else if(i==1){
		printf("<a name='ambany'><h1 class=\"card card-header\">Creation reussie!!</h1></a>");
	}
	printf("</div><footer class=\"main-footer\"><div class=\"float-right d-none d-sm-block\"><b>Version</b> 3.2.0</div><strong>Copyright &copy; 2014-2021 <a href=\"https://adminlte.io\">AdminLTE.io</a>.</strong> All rights reserved.</footer><!-- Control Sidebar --><aside class=\"control-sidebar control-sidebar-dark\"><!-- Control sidebar content goes here --></aside><!-- /.control-sidebar --></div><!-- ./wrapper -->");
		printf("</body>\n");
	printf("</html>\n");
}

int creationVirtual(){
///Les variables
	char* site=getenv("QUERY_STRING");
	FILE* f;
	char* configuration=(char*)malloc(1000);
	char nom[100]="";
	char* inutile=(char*)malloc(100);
///S'il y en a pas encore
	sscanf(site,"ServerName=%[^\n]",nom);
	if(strcmp(nom,"")==0){return 123;}

///test si ce nom existe deja
	if (host(nom)==-1){return -1;}
///Si on peut continuer le demarche
///Ecrire dans /etc/apache2/sites-available/
	sprintf(inutile,"/etc/apache2/sites-available/%s.conf",nom);
	f=fopen(inutile,"w");
	if(f==NULL){return 0;}
	fprintf(f,"<VirtualHost *:80>\n\tServerName %s\n\tServerAdmin webmaster@localhost\n\tDocumentRoot /var/www/%s\n\t<Directory \"/var/www/%s\">\n\t\tRequire all granted\n\t</Directory>\n\tScriptAlias /cgi-bin/ \"/var/www/%s/cgi-bin/\"\n\t<Directory \"/var/www/%s/cgi-bin/\">\n\t\tOptions +ExecCGI\n\t\tRequire all granted\n\t\tAllowOverride all\n\t\tAddHandler cgi-script .cgi\n\t</Directory>\n\tErrorLog ${APACHE_LOG_DIR}/error.log\n\tCustomLog ${APACHE_LOG_DIR}/access.log combined\n</VirtualHost>",nom,nom,nom,nom,nom);
	fclose(f);
///Ecrire dans /etc/hosts
	f=fopen("/etc/hosts","a");
	if(f==NULL){return 0;}
	fprintf(f,"127.0.1.1\t%s\n",nom);
	fclose(f);

	f=fopen("hosts","a");
	if(f==NULL){return 0;}
	fprintf(f,"127.0.1.1\t%s\n",nom);
	fclose(f);

///Creation de son rep 
	sprintf(inutile,"mkdir -p /var/www/%s/cgi-bin",nom);
	system(inutile);
	free(inutile);
	return 1;
}

int host(char* nom){
///test si ce nom existe deja
	char* inutile=(char*)malloc(100);
	char* nomExistants=(char*)malloc(100);
	FILE* f=fopen("hosts","r");
	for(int i=0;feof(f)!=1;i++){
		fgets(nomExistants,100,f);
		sscanf(nomExistants,"%[^\t]\t%[^\n]",inutile,nomExistants);
		if(strcmp(nom,nomExistants)==0){
			fclose(f);
			return -1;
		}
	}
	fclose(f);		
	return 0;
}

int activation(){
	char* data=getenv("QUERY_STRING");
	char site[100]="";char mode[100]="";
	char commande[300]="";
	sscanf(data,"site=%[^&]&mode=%[^\n]",site,mode);
	if((strcmp(site,"")!=0)&&(strcmp(mode,"")!=0)){
		if(host(site)==0){return -1;}
		if(strcmp(mode,"Activer")==0){
			//printf("Activer");
			sprintf(commande,"ln -s /etc/apache2/sites-available/%s.conf /etc/apache2/sites-enabled/%s.conf",docRoot(site,0),docRoot(site,0));
		}
		else if(strcmp(mode,"Desactiver")==0){
			//printf("Desactiver");
			sprintf(commande,"rm /etc/apache2/sites-enabled/%s.conf",docRoot(site,0));
		}
		else{return -1;}
		system(commande);
		popen("sudo systemctl reload apache2","w");
		return 0;
	}
	return 43;
}

int heberger(){
	char tmp[250]="";
	char site[100]="";
	char inutile[100]="";
	FILE* fv;
	char filename[100]="";

///ENregistrement
	fv=fopen("essai.txt","a");
	if((fv==NULL)){return 0;}
		for(int i=0;feof(stdin)!=1;i++){
			if(i==4){
				strcpy(site,tmp);
				site[strlen(site)-2]='\0';
			}
			if(i==6){
				sscanf(tmp,"%[^;];%[^;]; filename=\"%[^\"]\"\n",inutile,inutile,filename);
				//printf("filename=%s\n\n",filename);
			}
			if((i>7)&&(feof(stdin)!=1)){
				fprintf(fv,"%s",tmp);
			}
			fgets(tmp,250,stdin);
		}
	fclose(fv);
///Le site existe-t-il?
	//strcpy(site,docRoot(site,1));
	if((strcmp(site,"")==0)||(strcmp(filename,"")==0)){return 123;}
	if(host(site)==0){return -1;}
///Enregistrement
	sprintf(tmp,"mv ./essai.txt /var/www/%s/%s",docRoot(site,1),filename);
	system(tmp);

	return 0;
}

char* docRoot(char* host,int mode){
//.conf
	if(mode==0){
		if(strcmp(host,"localhost")==0){
			return "000-default"; 
		}
		else if(strcmp(host,"www.tsa.com")==0){
			return "tsanta"; 
		}
		else{return host;}
	}
//directory
	if(mode==1){
		if(strcmp(host,"localhost")==0){
			return "html"; 
		}
		else if(strcmp(host,"www.tsa.com")==0){
			return "tsanta"; 
		}
		else{return host;}
	}
	
}
