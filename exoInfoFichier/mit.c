#include "mit.h"
#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<ctype.h>

							///Les fonctions
///Allouer 2D
char ** allouer(int a,int b){
	char** tab = malloc(sizeof(char*)*a);
	for(int i=0;i<a;i++){
		*(tab+i)=(char*)malloc(b);
	}

	return tab;
}

///Obtenir "le max_length" entre 2 char*
int max(char* s1,char* s2){
	int maxim=0;
	if(strlen(s1)>strlen(s2)){
		maxim=strlen(s1);
	}
	if(strlen(s2)>=strlen(s1)){
		maxim=strlen(s2);
	}
	return maxim;
}

///Ecrire dans le fichier concernant l'ID des etudiants
int enregistrement1(char* chemin,Identite* mit){
///Les variables
	FILE* fichier = fopen(chemin,"a");

///Test d'ouverture
	if(fichier == NULL){
		return -1;
	}
	
///Enregistrement
	fprintf(fichier,"%s,%s,%s,%s,%s,%s,%s\n",mit->nom,mit->prenom,mit->parcours,mit->grade,mit->num,mit->git,mit->email);

///Fermeture
	fclose(fichier);
	return 0;
}


///Ecrire dans le fichier concernant l'Info sur PC
int enregistrement2(char* chemin,PC* mit){
///Les variables
	FILE* fichier = fopen(chemin,"a");

///Test d'ouverture
	if(fichier == NULL){
		return -1;
	}
	
///Enregistrement
	fprintf(fichier,"%s,%s,%s\n",mit->marque,mit->MAC,mit->label);

///Fermeture
	fclose(fichier);
	return 0;
}


///Faire scaner les infos PC a partir du clavier
PC getDataPc(){
///Les variables
	PC mit;
	
///Entree des donnees
	printf("Marque:\t");
	fgets(mit.marque,100,stdin);

	printf("Adresse MAC:\t");
	fgets(mit.MAC,100,stdin);
	
	printf("Label:\t");
	fgets(mit.label,100,stdin);

///Suppression \n
	mit.marque[strlen(mit.marque)-1]='\0';
	mit.MAC[strlen(mit.MAC)-1]='\0';
	mit.label[strlen(mit.label)-1]='\0';

	return mit;	
}


///Faire scaner les infos ID etudiants a partir du clavier
Identite getDataId(){
///Les variables
	Identite mit;
///Entree des donnees
	printf("NOM:\t");
	fgets(mit.nom,100,stdin);

	printf("PRENOM:\t");
	fgets(mit.prenom,100,stdin);
	
	printf("PARCOURS:\t");
	fgets(mit.parcours,100,stdin);

	printf("GRADE:\t");
	fgets(mit.grade,100,stdin);
	
	printf("NUMERO:\t");
	fgets(mit.num,100,stdin);
	
	printf("E-mail:\t");
	fgets(mit.email,100,stdin);
	
	printf("URL Git:\t");
	fgets(mit.git,100,stdin);
	
///Suppresssion \n
	mit.nom[strlen(mit.nom)-1]='\0';
	mit.prenom[strlen(mit.prenom)-1]='\0';
	mit.parcours[strlen(mit.parcours)-1]='\0';
	mit.grade[strlen(mit.grade)-1]='\0';
	mit.num[strlen(mit.num)-1]='\0';
	mit.email[strlen(mit.email)-1]='\0';
	mit.git[strlen(mit.git)-1]='\0';

	return mit;
}

///Triage par alphabet (a partir de test char par char)
void trier(char** datas,int i){
///Les variables
	char tmp[256];
	int len=0; 
///Traitement
	for(int j=1;j<i;j++){
		for(int k=j+1;k<i;k++){
			len = max(datas[j],datas[k]);
			if( toupper((datas[j][0])) < toupper((datas[k][0])) ){
				continue;
			}
			else if( toupper((datas[j][0])) > toupper((datas[k][0])) ){
				strcpy(tmp,datas[j]);
				strcpy(datas[j],datas[k]);
				strcpy(datas[k],tmp);
			}
			else if( toupper((datas[j][0])) == toupper((datas[k][0])) ){
				for(int l=1;l<len;l++){
					if( toupper((datas[j][l])) < toupper((datas[k][l])) ){
						break;
					}
					if( toupper((datas[j][l])) > toupper((datas[k][l])) ){
						strcpy(tmp,datas[j]);
						strcpy(datas[j],datas[k]);
						strcpy(datas[k],tmp);
						break;
					}
				}
			}
		}
	}

}

///Remis des donnees dans le fichier
int putFile(char* chemin,char** datas,int i){
///Declaration
	FILE* fichier1 = fopen(chemin,"w");
	
///Test d'ouverture
	if(fichier1==NULL){return -1;}

///Recuperation des donnees
	for(int j=0;j<i;j++){
		fprintf(fichier1,"%s",datas[j]);
	}
	fclose(fichier1);
	//printf("OKE bee");
	
	return i;	
}

///recuperer tous les infos dans les fichier dit (dans char*)
int getFileToChar(char* chemin,char** datas){
///Declaration
	FILE* fichier1 = fopen(chemin,"r");
	int i=0;
	
///Test d'ouverture
	if(fichier1==NULL){return -1;}

///Recuperation des donnees
	for(i=0;feof(fichier1)!=1;i++){
		fgets(datas[i],256,fichier1);
	}
	fclose(fichier1);
	
	return i;	
}


///Triage par alphabet (a partir de strcmp)
void sort(PC* datas,int i){
	PC tempo;
	int len=0;
	for(int j=1;j<i;j++){
		for(int k=j+1;k<i;k++){
/*
			if(strcmp(datas[j].label,datas[k].label)<0){
				tempo = datas[j];
				datas[j] = datas[k];
				datas[k] = tempo;
			}
*/	
			len = max(datas[j].label,datas[k].label);
			if( (toupper(datas[j].label[0])) < toupper((datas[k].label[0])) ){
				continue;
			}
			else if( toupper((datas[j].label[0])) > toupper((datas[k].label[0])) ){
				tempo = datas[j];
				datas[j] = datas[k];
				datas[k] = tempo;
			}
			else if( toupper((datas[j].label[0])) == toupper((datas[k].label[0])) ){
				for(int l=1;l<len;l++){
					if( toupper((datas[j].label[l])) < toupper((datas[k].label[l])) ){
						break;
					}
					if( toupper((datas[j].label[l])) > toupper((datas[k].label[l])) ){
						tempo = datas[j];
						datas[j] = datas[k];
						datas[k] = tempo;
						break;
					}
				}
			}
		}
	}	
}


///recuperer tous les infos dans les fichier dit (dans le sttruct specifiE)
int getFileToStruct(char* chemin,PC* datas){
	int i=0;
	char tmp[256];

	FILE* fichier =fopen(chemin,"r");

///Get File Datas
	for(i=0;feof(fichier)!=1;i++){
		fgets(tmp,256,fichier);
		sscanf(tmp,"%[^,],%[^,],%[^\n]",datas[i].marque,datas[i].MAC,datas[i].label);
	}	
	return i;
}

///recuperer tous les infos dans les fichier dit (dans le sttruct specifiE)
int getFileToStructEtudiants(char* chemin,Identite* datas){
	int i=0;
	char tmp[256];
	FILE* fichier =fopen(chemin,"r");
	if(fichier==NULL)return -1;
///Get File Datas
	for(i=0;feof(fichier)!=1;i++){
		fgets(tmp,256,fichier);
		sscanf(tmp,"%[^,],%[^,],%[^,],%[^,],%[^,],%[^,],%[^\n]",datas[i].nom,datas[i].prenom,datas[i].parcours,datas[i].grade,datas[i].num,datas[i].git,datas[i].email);
	}
	return i;
}

///Generer l'e titre de chaque colonne
int enTete(char* chemin,char* tete){
	char existence[100];
	int test=123;
	sprintf(existence,"test -e %s",chemin);
	
	test=system(existence);
	if(test!=0){
		FILE* fichier1 = fopen(chemin,"a");
		fprintf(fichier1,"%s",tete);
		fclose(fichier1);
	}
	return 0;
}
/*
///Ajout d'URL dans les Infos etudiants
void addURL(char** datas,char** URL,int i,char* tete){
	strcpy(URL[0],tete);
	datas[0][strlen(datas[0])-1]='\0';	
	sprintf(datas[0],"%s,%s",datas[0],URL[0]);
	for(int j=1;j<i;j++){
		datas[j][strlen(datas[j])-1]='\0';
		fprintf(stdout,"\t\n- %s -\n\n Entrez votre %s :\t",datas[j],tete);
		fgets(URL[j],256,stdin);
		sprintf(datas[j],"%s,%s",datas[j],URL[j]);
		datas[j][strlen(datas[j])]='\0';
	}
}
*/
///Trouver l'info de celle qui va ajouter son info
int infoCherchEe(int i,char** info,char* numero, Identite* datas){
        numero[strlen(numero)-1]='\0';
        int indice = i+10;
        char test[14];
///Truver son information
        for(int j=0;j<i;j++){
                if(strcmp(datas[j].num,numero)==0){
                        indice = j;
                        break;
                }
        }
///Make sure it's true
        if(indice!=i+10)printf("Est-ce votre nom '%s %s'? (0 si oui et autre que 0 si non) ->  ",datas[indice].nom,datas[indice].prenom);
        fgets(test,14,stdin);
        if((test[0]!='0')&&(test[1]!='\n'))return i+10;
        strcpy(info[0],datas[indice].nom);
        strcpy(info[1],datas[indice].prenom);
        strcpy(info[2],datas[indice].parcours);
        strcpy(info[3],datas[indice].grade);
        strcpy(info[4],datas[indice].num);
        strcpy(info[5],datas[indice].git);
        strcpy(info[6],datas[indice].email);

        return indice;
}

///Ajout d'information entrEe
void ajoutDinfo(char** resultat){
        char numero[10];
	char tmp[256];
        printf("Quelles informations voulez-vous en ajouter?\n1-Nom\n2-Prenom\n3-Parcours\n4-Grade\n5-Number\n6-git\n7-E-mail\n=>");
        fgets(numero,10,stdin);
        int test=atoi(numero);
        printf("Entrez le 'contenu'\t:");
        fgets(tmp,256,stdin);
	tmp[strlen(tmp)-1]='\0';
	sprintf(resultat[test-1],"%s",tmp);
       // for(int k=0;k<7;k++){printf("%s\n",resultat[k]);}
}

///Les fonctions principales
//EtudiantsMITId
void etudiantsMIT(){
///Les variables
        Identite mit;
        char contenu[100] = "EtudiantsMIT.csv";
        char tete[100] = "NOM\tPRENOM\tPARCOURS\tGRADE\tNUMERO\n";
        int test=0;
        char** datas;
        int i=0;
        char oui[10];

///En-tete
        test = enTete(contenu,tete); //Si le fichier n'existe pas encore, on met les titres
        if(test==-1){
                printf("Erreur d'ouverture\n");
                exit(1);
        }

        for(int i=0;i<46;i++){
                printf("\t\t\tInformations sur les L1 MIT\n\n");

///Get data
                mit = getDataId();      //Scaner les donnees entrees des etudiants

///Enregistrement
                test=enregistrement1(contenu,&mit);     //enregistrer dans les fichiers
                if(test==-1){
                        printf("\nErreur d'ouverture!!\n");
                        break;
                }
///Continuer pour en ajouter ou quitter
                printf("\nAppuyez sur 0 pour quitter et autre pour en ajouter et :\t"); //Continuer les enregistrements
                fgets(oui,10,stdin);
                if((oui[0]=='0')&&(oui[1]=='\n')){break;}
                sleep(2);
         system("clear");
        }
}

//Trier etudiants.csv
void trieEtudiantsId(){
///Les variables
        char** datas;
        char contenu[100]="EtudiantsMIT.csv";
        int i=0;
	printf("\tTrier par ordre alphabetique les informations sur les etudiants MIT\n\n");

///Allocation
        datas = (char**)malloc(sizeof(char*)*100);
        for(int i=0;i<100;i++){
                *(datas+i) = (char*)malloc(sizeof(char)*256);
        }

///Get datas's File
        i = getFileToChar(contenu,datas);
        if(i==-1){
                printf("Erreur d'ouverture\n");
                exit(1);
        }
	i=i-1;
///Trier
        trier(datas,i);

///Remis
        i = putFile(contenu,datas,i);

        if(i==-1){
                printf("Erreur d'enregistrement\n");
                exit(1);
        }
	if(i!=-1)printf("\n\t\tFait\t\n");
	sleep(1);
}

///PcMIT
void PcMIT(){
///Les variables
        PC mit;
        int test=0;     
        char tete[100] = "MARQUE\tMAC\tLABEL\n";
        PC datas[100];
        char contenu[100]="PcMIT.csv";
        int i=0;
        char oui[12];
        char** resultat;

///En-tete
        test = enTete(contenu,tete);    //Si le fichier n'existe pas encore, on mets les en-tetes
        if(test==-1){
                printf("Erreur d'ouverture\n");
                exit(1);
        }

///Debut
        for(int i=0;i<46;i++){
                printf("\t\tInformations sur les PC des L1 MIT\n");

///Get data
                mit = getDataPc();      //Obtenir les infos entrees des etudiants

///Enregistrement
                test=enregistrement2(contenu,&mit);     //Enregistrement
                if(test==-1){
                        printf("\nErreur d'ouverture!!\n");
                        break;
                }
///Continuer pour en ajouter ou quitter
                printf("\nAppuyez sur 0 pour quitter et autre pour en ajouter et :\t"); //COntinuer ou quitter l'enreistrement
		fgets(oui,12,stdin);
                if((oui[0]=='0')&&(oui[1]=='\n')){break;}
                sleep(2);
                system("clear");
        }
}

//Trier PcMMIT.csv
void triePcId(){
///Les variables
        PC datas[100];
        char contenu[100]="PcMIT.csv";
        int i=0;
        char** resultat;
	printf("\tTrier par ordre alphabetique les informations sur les PC MIT\n\n");

///Allocation
        resultat = (char**)malloc(sizeof(char*)*100);
        for(int i=0;i<100;i++){
                *(resultat+i) = (char*)malloc(sizeof(char)*256);
        }

///Get file's contain
        i = getFileToStruct(contenu,datas);
        i=i-1;

///Trier
        sort(datas,i);

///Remis
        for(int j=0;j<i;j++){
                sprintf(resultat[j],"%s,%s,%s\n",datas[j].marque,datas[j].MAC,datas[j].label);
        }

        i = putFile(contenu,resultat,i);

        if(i==-1){
                printf("Erreur d'enregistrement\n");
                exit(1);
        }
	if (i!=-1)printf("\tFait\n");
	sleep(1);
}

//Ajout des infos non completEes
void ajoutInfoEtudiant(){
       printf("\t\tAjout information\n\n");
///Variables
        Identite* datas=(Identite*)malloc(sizeof(Identite)*100);
        char contenu[100]="EtudiantsMIT.csv";
        int i=0;
        char** resultat;
        char**  valiny;
        char numero[10];
        int test=0;
///Recuperer tous les infos
        i = getFileToStructEtudiants(contenu,datas);
        if(i==-1){printf("Erreur\n");exit(1);}
        i=i-1;
        int indice = i+10;      //to make sure that this mark don't exit
///Allocation
        resultat= allouer(7,256);
        valiny=allouer(i,256);
///Entree votre numero
        printf("Entrez votre numero:\t");
        fgets(numero,10,stdin);
        indice = infoCherchEe(i,resultat,numero,datas);

///Ajout des informations
        ajoutDinfo(resultat);
///Refaire la place
        for(int k=0;k<i;k++){
                if(k==indice){
                        sprintf(valiny[k],"%s,%s,%s,%s,%s,%s,%s\n",resultat[0],resultat[1],resultat[2],resultat[3],resultat[4],resultat[5],resultat[6]);
                        continue;
                }
		sprintf(valiny[k],"%s,%s,%s,%s,%s,%s,%s\n",datas[k].nom,datas[k].prenom,datas[k].parcours,datas[k].grade,datas[k].num,datas[k].git,datas[k].email);
        }
///Remis dans le fichier
        putFile(contenu,valiny,i);
	printf("\n\t\tFait");
	sleep(1);
}
