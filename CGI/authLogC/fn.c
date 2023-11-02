#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

///Les definitions des fonctions de authMlg
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

void separerDonnee(char* string, char* line){
	char tmp1[100]="";char tmp2[100]="";char tmp3[100]="";
	sscanf(string,"%[^&]&%[^\n]",tmp3,line);
	strcpy(string,tmp3);
	//sprintf(id,"%s&%s",tmp1,tmp2);
	//printf("%s++%s",string,line);
}

INFO* getData(int* ligne,char* string){
//Les variables
	char* inutile=(char*)malloc(256);
	char commande[256];INFO* user;FILE* f;
	char mois[10];char jour[10];char heure[50];
	char us[100]="";
	//strcpy(us,string);
	//printf("us=%s,string=%s",us,string);
	sscanf(string,"%[^=]=%[^\n]",inutile,us);

//Recuperer le ligne max
	strcpy(commande,"wc -l /var/log/auth.log");
	f=popen(commande,"r");
	fgets(inutile,256,f);
	pclose(f);
	int len = atoi(inutile);
	//printf("us=%s",us);
	*ligne=0;

//Allocation

	user=(INFO*)malloc(sizeof(INFO)*(len));

//Recuperation des donnees
    int test=0;
	for(int i=0,k=1;i<len;i++,k++){
		sprintf(commande,"tail -n%d /var/log/auth.log | head -n1",k);
		f=popen(commande,"r");
		if(f==NULL){printf("Erreur\n");exit(1);}
		fgets(inutile,256,f);
		pclose(f);

        if(k==len){
            if(i==0){*ligne=0;}
            else if(test==1){
                strcpy(user[i].session,"");
                strcpy(user[i].nameFor,"");
                strcpy(user[i].nameBy,"");
                strcpy(user[i].time,"");
            }
            break;
        }

		sscanf(inutile,"%[^ ] %[^ ] %[^ ] %[^ ] %[^ ] %[^\n]\n",mois,jour,heure,inutile,commande,inutile);
		strcpy ( user[i].time,malagasyDate(mois,jour,heure) );
		if( ((inutile[0]=='p')&&(inutile[1]=='a')&&(inutile[2]=='m')) ){
			sscanf(inutile,"%[^ ] %[^\n]\n",user[i].session,inutile);
			sscanf(inutile,"session %[^ ] for user %[^ ] by %[^\n]\n",user[i].session,user[i].nameFor,user[i].nameBy);
			if(strcmp(us,"")!=0){	
				sscanf(user[i].nameFor,"%[^(](%[^)])",commande,inutile);
				if(strcmp(commande,us)!=0){test=1;i--;}
				else{test=0;(*ligne)++;continue;}
				//printf("i=%d",i);
			}
			else if(strcmp(us,"")==0){test=0;(*ligne)++;continue;}
		}
		else{
			strcpy(user[i].time,"");
			i--;
			continue;
		}
	}
	free(inutile);
	return user;
}

char* malagasyDate(char* mois,char* j,char* h){
//Les variables
	char* date=(char*)malloc(500);
	ORA ora;
	char andro[120];
	char volana[120];
	char taona[120];

	FILE* f;
	int ms=0;	//mois en chiffre-1
	int js=0;	//jours en chiffre-1
	ANDROANY today;
	char tmp[100];

//Les donnees
	VOLANA* donneeV=moisS2M();
	ANDRO* donneeA=jourS2M();
	strcpy(taona,"2023");

//Heure
	sscanf(h,"%[^:]:%[^:]:%[^\n]",ora.h,ora.min,ora.sec);
	if(atoi(ora.h)>12){
		int k=(atoi(ora.h))-12;
		sprintf(ora.h,"%d",k);
		if(k<4){strcpy(ora.partie,"atoandro");}
		else if( (k>=4)&&(k<7) ){strcpy(ora.partie,"ariva");}
		else if(k>=7){strcpy(ora.partie,"alina");}
	}
	else if(atoi(ora.h)<=12){
		if(atoi(ora.h)<10){strcpy(ora.partie,"maraina");}
		else if(atoi(ora.h)>=10){strcpy(ora.partie,"atoandro");}
	}

//Mois

	for(ms=0;ms<12;ms++){
		if(strcmp(mois,donneeV[ms].auth)==0){break;}
	}
	sprintf(volana,"%s",donneeV[ms].mlg);

//Jours
	//Recuperation de la date actuelle
	f=popen("date","r");
	fgets(tmp,100,f);
	//printf("%s",tmp);
	sscanf(tmp,"%[^ ] %[^ ] %[^ ] %[^ ] %[^ ] %[^\n]\n",today.andro,today.volana,today.j,tmp,tmp,today.taona);
	pclose(f);
	//printf("%s",today.volana);
	js=atoi(today.j);

	int anneeSys=atoi(taona);
	int anneeDate=atoi(today.taona);
	//printf("%s",today.taona);
	

	//Verification mois
	while(anneeSys!=anneeDate){	//comme i commence avec 0; donc on inverse tous les conditions
		if(anneeSys%400==0){
			js+=366;
		}
		else{
			js+=365;
		}
		anneeSys++;
	}

	int i=ms;
	while(strcmp(today.volana,donneeV[i].auth)!=0){	//comme i commence avec 0; donc on inverse tous les conditions
		i++;

		if( ( ((i%2)==1)&&(i<=7) )||( ((i%2)==0)&&(i>7) ) ){
			js+=31;
		}
		else if( ( ((i%2)==1)&&(i>7) )||( ( ((i%2)==0)&&(i<=7) )&&(i!=2) ) ){
			js+=30;
		}
		else if(i==2){
			js+=28;
		}

	}

	//Gerer les jours de la semaine
	int v=0;
	for(v=0;v<7;v++){
		if(strcmp(today.andro,donneeA[v].sys)==0){break;}
	}
	for(int k=js;k>atoi(j);k--){
		if(v==0){v=7;}
		v--;
//		printf("v=%d,\n",v);
	}
	sprintf(andro,"%s",donneeA[v].mlg);

//Final
	sprintf(date,"%s faha %s %s %s t@ %s ora sy %s minitra sy %s segondra %s.",andro,j,volana,taona,ora.h,ora.min,ora.sec,ora.partie);
	return date;
}

void chiffrePagination(char* total,int* rand,int* debut,int* voalohany,int* farany,int mx){
	char inutile[100];
	sscanf(total,"line=%[^\n]",total);
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

void displayResult(char* total,int ligne,INFO* user,char* string,ID us){
	
///Affichage
	printf("\n");
	printf("<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
	        printf("<meta charset='UTF-8'>");
	        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
	        printf("<title>Auth.log</title>\n");
            printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");

    		printf("<style>");
				printf(".initialiser:hover{box-shadow: 0px 0px 5px;}");
				printf("@keyframe mivelatra{from{width:3vw;}\nto{width:25vw;}}");
				printf(".passer:hover{animation:mivelatra 2s ease-in-out 1;}");				
			printf("</style>");

        printf("</head>\n");

		printf("<body>\n");
			displayNav(us);
			displayData(total,ligne,user,string);
		printf("</body>\n");
	printf("</html>\n");
}

void displayNav(ID us){
	printf("<div style='box-sizing:border-box;position:fixed;top:0;width:100vw;height:13vh;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:row;justify-content:space-between;align-items:center;box-shadow:2px 5px 3px;'>"); 
		//printf("<h3 class='text-primary' style='font-size:3vw;'>Welcome !!</h3>");	
		printf("<h3 class='text-primary' style='font-size:3vw;'>Welcome %s!!</h3>",reglage(us.id));	
		//reglage(us.id);

		printf("<select>");
			printf("<option>Your informations:</option>");
			printf("<option disabled>Nom: %s </option>",reglage(us.nom));
			printf("<option disabled>Identifiant: %s </option>",reglage(us.id));
			printf("<option disabled>Email: %s </option>",reglage(us.mail));
		printf("</select>");

		printf("<div class='text-info initialiser' style='box-sizing:border-box;width:18vw;padding-top:1vh;height:6vh;border-style:dotted;font-size:1vw;' align='center'><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi' style='text-decoration:none;color:black;'>Revenir a la liste par defaut</a></div>");

		printf("<FORM style='padding:1%%;' ACTION='authLog.cgi' METHOD='GET'>");
			printf("<p><INPUT style='width:14vw;' name='user' type='input' required/>");
			printf("<INPUT type='submit' value='Search'/></p>");
		printf("</FORM>");

		printf("<p><a href='http://www.tsa.com/cgi-bin/authLogC/logout.cgi?id=%s&ip=%s'><button style='width:10vw;height:6vh;font-size:1vw;background-color:white;'>Log Out</button></a></p>",us.ip,us.id);
	printf("</div>");
}

void displayData(char* total,int ligne,INFO* user,char* string){
///Les variables
		sscanf(total,"line=%[^\n]",total);
		int rand=10;int voalohany=1;int farany=10;int mx=max(ligne);int debut=0;
		sscanf(total,"line=%[^\n]",total);
		int prev=atoi(total);
		int suiv=atoi(total);
///gestion user=nomUser
		char us[100]="";char str[100]="";
		sscanf(string,"user=%[^\n]",str);
		sscanf(user[0].nameFor,"%[^(]",us);
		chiffrePagination(total,&rand,&debut,&voalohany,&farany,mx);
		printf("<div class='container rounded' style='margin:8vh;margin-top:11vw;padding:1vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>/var/log/auth.log</h1></div>");
		if(ligne!=0){
		printf("<TABLE class='table table-borderless rounded' style='margin-bottom:8vh;'>\n");
			printf("<THEAD class='table-warning'>\n");
				printf("<TH>NUMBER</TH>\n");
				printf("<TH>TIME</TH>\n");
				printf("<TH>SESSION</TH>\n");
				printf("<TH>FOR THE USER</TH>\n");
				printf("<TH>BY THE  USER</TH>\n");
			printf("</THEAD>\n");
			printf("<TBODY>\n");
				for(int i=debut;i<rand;i++){
					if(strcmp(user[i].session,"opened")==0){
    					printf("<TR class='table-success'><TD>%d</TD>\n",i+1);
					}
					if(strcmp(user[i].session,"closed")==0){
    					printf("<TR class='table-danger'><TD>%d</TD>\n",i+1);
					}
					printf("<TD>%s</TD>\n",user[i].time);
					printf("<TD>%s</TD>\n",user[i].session);
					printf("<TD><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi?user=%s' style='text-decoration:none;'>%s</a></TD>\n",us,user[i].nameFor);
					printf("<TD>%s</TD></TR>\n",user[i].nameBy);
				}
		
			printf("</TBODY>\n");
		printf("</TABLE>\n");
		printf("<div class='container rounded' style='height:12vh;margin:5vh;padding:1vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-wrap:wrap;overflow:scroll;justify-content:space-around;align-items:center;'>");
				
			for(int i=voalohany;i<=farany;i++){printf("<div style='padding:1%%;box-sizing:border-box;'><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi?user=%s&line=%d'>%d</a><br></div>",str,i,i);}
				printf("<div><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi?user=%s&line=%d'>All</a><br></div>",str,(mx+1));
				if(atoi(total)==mx){suiv=(atoi(total)-1);}
				if(atoi(total)==1){prev=(atoi(total)+1);}
				printf("<div><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi?user=%s&line=%d'><<< </a><br></div>",str,prev-1);				
				printf("<div><a href='http://www.tsa.com/cgi-bin/authLogC/authLog.cgi?user=%s&line=%d'> >>></a><br></div>",str,suiv+1);
		printf("</div>");
		}
		else if(ligne==0){
			printf("<div class='rounded' align='center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8;padding:3vw;margin:auto;margin-top:10vw;background:linear-gradient(to right,#aca5a5,#ece5e5);display:flex;flex-direction:column;justify-content:space-around;'>");
				printf("<p align='center' style='font-size:10vw'>OoOPs!!</p>");
				printf("<p class='container text-secondary' style='margin-top:5vw' align='center'>It doesn't exist ! Enter another username :) </p>");
			printf("</div>");
		}
}

VOLANA* moisS2M(){
	VOLANA* data = (VOLANA*)malloc(sizeof(VOLANA)*12);

	strcpy(data[0].auth,"Jan");strcpy(data[0].sys,"Jan");strcpy(data[0].mlg,"Janoary");
	strcpy(data[1].auth,"Feb");strcpy(data[1].sys,"Feb");strcpy(data[1].mlg,"Febroary");
	strcpy(data[2].auth,"Mar");strcpy(data[2].sys,"Mar");strcpy(data[2].mlg,"Martsa");
	strcpy(data[3].auth,"Apr");strcpy(data[3].sys,"Apr");strcpy(data[3].mlg,"Aprily");
	strcpy(data[4].auth,"Mai");strcpy(data[4].sys,"Mai");strcpy(data[4].mlg,"Mey");
	strcpy(data[5].auth,"Jun");strcpy(data[5].sys,"Jon");strcpy(data[5].mlg,"Jona");
	strcpy(data[6].auth,"Jul");strcpy(data[6].sys,"Jol");strcpy(data[6].mlg,"Jolay");
	strcpy(data[7].auth,"Aug");strcpy(data[7].sys,"Aog");strcpy(data[7].mlg,"Aogositra");
	strcpy(data[8].auth,"Sep");strcpy(data[8].sys,"Sep");strcpy(data[8].mlg,"Septambra");
	strcpy(data[9].auth,"Oct");strcpy(data[9].sys,"Okt");strcpy(data[9].mlg,"Oktobra");
	strcpy(data[10].auth,"Nov");strcpy(data[10].sys,"Nov");strcpy(data[10].mlg,"Novambra");
	strcpy(data[11].auth,"Dec");strcpy(data[11].sys,"Dec");strcpy(data[11].mlg,"Desambra");

	return data;
}

ANDRO* jourS2M(){
	ANDRO* data = (ANDRO*)malloc(sizeof(ANDRO)*12);

	strcpy(data[0].sys,"Mon");strcpy(data[0].mlg,"Alatsianiny");
	strcpy(data[1].sys,"Tue");strcpy(data[1].mlg,"Talata");
	strcpy(data[2].sys,"Wed");strcpy(data[2].mlg,"Alarobia");
	strcpy(data[3].sys,"Thu");strcpy(data[3].mlg,"Alakamisy");
	strcpy(data[4].sys,"Fri");strcpy(data[4].mlg,"Zoma");
	strcpy(data[5].sys,"Sat");strcpy(data[5].mlg,"Sabotsy");
	strcpy(data[6].sys,"Sun");strcpy(data[6].mlg,"Alahady");

	return data;
}


///Formulaire d'authentification
void formLogin(int i){
	if(i==1){
		printf("Status: 302 Found\n");
		printf("Location:http://www.tsa.com/cgi-bin/authLogC/authLog.cgi\n\n");		
		//printf("content-type: text/html\n");
	}
	else{
//		printf("content-type: text/html\n");
		printf("\n<!DOCTYPE html>\n");
		printf("<html lang='en'>");
			printf("<head>");
				printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Auth.log</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		printf("</head>\n");
			printf("<body>");
				printf("<div class='container rounded' style='margin:5vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>/var/log/auth.log</h1></div>"); 
				printf("<div align:'center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin:auto;margin-top:8vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:column;justify-content:space-evenly;'>");
					printf("<FORM ACTION='login.cgi#ambany' METHOD='GET'>");
						printf("<p style='padding-bottom:1vw' class='text-primary' align='center'>Veuillez s'authentifier d'abord:</p>");
						printf("<p class='input' align='center'><LABEL for='ID'>Identifiant: <INPUT style='width:25vw' name='ID' type='text' required/></p>");
						printf("<p class='input' align='center'><LABEL for='PWD'>Password: <INPUT style='width:25vw' name='PWD' type='password' required/></p>");
						printf("<p class='input' align='center'><INPUT type='submit' value='LogIn'/></p>");
					printf("</FORM>");
					printf("<p class='input' align='center'><a style='text-decoration-color:grey;font-size:small;' href='http://www.tsa.com/cgi-bin/authLogC/signIn.cgi'><button style='width:5vw;'>SignIn</button></a></p>");
					printf("<p><a style='text-decoration-color:grey;font-size:small;' href='http://www.tsa.com/cgi-bin/authLogC/mdpOublier.cgi'><font color='grey'>Oublier le mot de passe?</font></a></p>");
				printf("</div>");
				if(i==-1){
					printf("<a name='ambany'><h1 class='container' style='margin:8vh;padding:2vw;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'>Erreur d'authentification. Veuillez reessayer...</h1></a>");
				}
			printf("</body>\n");
		printf("</html>\n");
	}	
}

void formSignIn(){
	printf("\n<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Auth.log</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		printf("</head>\n");
		printf("<body>");
            printf("<div class='container rounded' style='margin:5vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>/var/log/auth.log</h1></div>"); 
			printf("<div align:'center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin:auto;margin-top:8vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:column;justify-content:space-evenly;'>");
				printf("<FORM ACTION='signIn.cgi#ambany' METHOD='GET'>");
					printf("<p style='padding-bottom:1vw' class='text-primary' align='center'>Veuillez s'authentifier d'abord:</p>");
					printf("<p class='input' align='center'><LABEL for='Nom'>Your fullname: <INPUT style='width:25vw' name='Nom' type='text' required/></p>");
					printf("<p class='input' align='center'><LABEL for='ID'>Identifiant: <INPUT style='width:25vw' name='ID' type='text' required/></p>");
					printf("<p class='input' align='center'><LABEL for='mail'>Adresse mail: <INPUT style='width:25vw' name='mail' type='text' required/></p>");
					printf("<p class='input' align='center'><LABEL for='PWD'>Password: <INPUT style='width:25vw' name='PWD' type='password' required/></p>");
					printf("<p class='input' align='center'><LABEL for='Vpwd'>Confirm your password: <INPUT style='width:25vw' name='Vpwd' type='password' required/></p>");
					printf("<p class='input' align='center'><INPUT type='submit' value='SignIn'/></p>");
				printf("</FORM>");
				printf("<p class='input' align='center'><a style='text-decoration-color:grey;font-size:small;' href='http://www.tsa.com/cgi-bin/authLogC/login.cgi'><button style='width:5vw;'>Login</button></a></p>");
			printf("</div>");	
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
					printf("Set-Cookie:session=%s; expires=Wed, 25 Oct 2028 00:00:00 GMT; HttpOnly\n",user.id);
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
	char* user=getenv("HTTP_COOKIE");
	char tmp[100]="";
	char inutile[200]="";

///Contenu de File
	if((user==NULL)||strcmp(user,"session=")==0){return -1;}
	else{
		sscanf(user,"session=%[^\n]\n",user);
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

	printf("<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Auth.log</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		printf("</head>\n");
		printf("<body>");
            printf("<div class='container rounded' style='margin:5vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>/var/log/auth.log</h1></div>"); 
			printf("<div align:'center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin:auto;margin-top:8vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:column;justify-content:space-evenly;'>");
			printf("<FORM ACTION='changerMdp.cgi' METHOD='GET'>");
					printf("<p class='text-primary' align='center'>Entrer ici votre Nom Identifiant:</p>");
					printf("<p class='input' align='center'><INPUT style='width:25vw' name='name' type='input' required/></p>");
					printf("<p class='input' align='center'><INPUT type='submit' value='E n t r e r'/></p>");
				printf("</FORM>");
				printf("<p class='input' align='center'><a style='text-decoration-color:grey;font-size:small;' href='http://www.tsa.com/cgi-bin/authLogC/signIn.cgi'><button style='width:5vw;'>SignIn</button></a></p>");
			printf("</div>");

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
		printf("Location: http://www.tsa.com/cgi-bin/authLogC/mdpOublier.cgi?val=-1#ambany\n");	
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
		printf("Location:http://www.tsa.com/cgi-bin/authLogC/mdpOublier.cgi?val=OK#ambany\n");	
	}

	printf("\n<!DOCTYPE html>\n");
	printf("<html lang='en'>");
		printf("<head>");
		        printf("<meta charset='UTF-8'>");
		        printf("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n");
				printf("<title>Auth.log</title>\n");
        	    printf("<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN' crossorigin='anonymous'>");
    		printf("</head>\n");
		printf("<body>");
            printf("<div class='container rounded' style='margin:5vh;padding:1vw;box-sizing:border-box;background:linear-gradient(to right,hsla(157, 72%%, 59%%, 0.549),#53b68096);'><h1 align='center'>/var/log/auth.log</h1></div>"); 
			printf("<div align:'center' style='width:50vw;box-shadow:2px 2px 5px #daa8d8; box-sizing:border-box;padding:10vh;margin:auto;margin-top:8vw;background:linear-gradient(to right,pink,#afffff);display:flex;flex-direction:column;justify-content:space-evenly;'>");
			printf("<FORM ACTION='changerMdp.cgi#ambany' METHOD='GET'>");
					//strcpy(inutile,supprPlus(iden[indice].nom));
					printf("<p class='text-primary' align='center'>Bienvenue %s, entrer votre nouveau mot de passe:</p>",reglage(iden[indice].nom));
					printf("<p class='input' align='center'><LABEL for='name=%s&PWD'>Password: <INPUT style='width:25vw' name='name=%s&PWD' type='password' required/></p>",name,name);
					printf("<p class='input' align='center'><LABEL for='Vpwd'>Confirm password: <INPUT style='width:25vw' name='Vpwd' type='password' required/></p>");
					printf("<p class='input' align='center'><INPUT type='submit' value='Modifier'/></p>");
				printf("</FORM>");
			printf("</div>");
		
	//printf("%s -- %s -- %s -- %s",iden[indice].nom,iden[indice].id,iden[indice].mail,iden[indice].psswd);
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

