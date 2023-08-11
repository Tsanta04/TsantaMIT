#include<stdio.h>
#include"mit.h"
#include<stdlib.h>
#include<string.h>
#include<ctype.h>

int main(){
	printf("Ajout information\n");
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
	int indice = i+10;	//to make sure that this mark don't exit
///Allocation
	resultat= allouer(7,100);
	valiny=allouer(i,100);
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
		sprintf(valiny[k],"%s,%s,%s,%s,%s,%s,%s\n",datas[k].nom,datas[k].prenom,datas[k].parcours,datas[k].grade,datas[k].num,datas[k].email,datas[k].git);
	}
///Remis dans le fichier
	putFile(contenu,valiny,i);

	return 0;
}

///Les fonctions
