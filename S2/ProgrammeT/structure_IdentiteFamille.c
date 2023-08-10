#include<stdio.h>
#include<string.h>
#include<stdlib.h>

struct Identite{
	char nom[100];
	char prenom[100];
	char statut[100];
	char filOuCar[100];
	char sitAmour[100];
	int age;
	int jour;
	int mois;
	int annee;
	
};
typedef struct Identite Identite;
void afficherIdentite(Identite structure);
void lireIdentite(Identite* structure);

int main(){
///Les variables
	char reponse[100];
	int nombre;
	Identite* famille;
///Sondage
here:	printf("\tL'identitE de la famille\n");
		printf("Voulez-vous enregistrer tous les informations necessaires de votre famille? (Entrer 'o' si oui et 'n' si non) \n-->");
		scanf("%s",reponse);
	
	if(reponse[0]=='n'){
		exit(1);
	}
	else if (reponse[0]=='o'){
///Entree du nombre de la famille
		printf("\nEntrer le nombre de votre famille:\t");
		scanf("%d",&nombre);
///Allocation du memoire
		famille=(Identite*)malloc(sizeof(Identite)*nombre);
///Traitement de collection
		printf("\nCommencons l'enregistrement...\n\n");
		for(int i=0;i<nombre;i++){
			printf("N*%d---------------------------------------------------------------:\n",i+1);
			lireIdentite((famille+i));
			printf("\n");
		}
///Affichage des donnees
		for(int i=0;i<nombre;i++){
			printf("-----------------------------------------------------------------------------------------\n");
			afficherIdentite(*(famille+i));
		}
	}
	else{
		system("clear");
		goto here;
	}
	
	
/*
	Identite famille[100];
///Dada
	strcpy(famille[0].nom,"RANDRIANARISOA");
	strcpy(famille[0].prenom,"Berthin Edmond");
	strcpy(famille[0].statut,"Employeur");
	strcpy(famille[0].filOuCar,"Securite");
	famille[0].age=53;
	famille[0].jour=06;
	famille[0].mois=03;
	famille[0].annee=1967;

	afficherIdentite(famille[0]);
*/
	return 0;
}

void lireIdentite(Identite *structure){
	char naissance[100];
	char passage[100];
	
	printf("Entrer le nom:\t");
	scanf("%s",structure->nom);

	printf("Entrer le prenom:\t");
	//strcpy(structure->prenom,strcat(structure->prenom,scanf("%[^\n]",structure->prenom)));
	//scanf("%[^ ]",structure->prenom);
	//fgetc(stdin);
	fgets((structure->prenom),100,stdin);
	scanf("%[^\n]",structure->prenom);
	
	printf("Entrer l'age:\t");
	scanf("%d",&(structure->age));//fgetc(stdin);
	
	printf("Entrer la date de naissance (jj/mm/aa):\t");
	scanf("%s",naissance);
	
	int k=0,l=0;
	for(int i=k;(naissance[i]!='/')&&(naissance[i]!='\0');i++){
		passage[i]=naissance[i];
		k++;
	}
	structure->jour=atoi(passage);
	k+=2;
	l=0;
	for(int i=k;(naissance[i]!='/')&&(naissance[i]!='\0');i++){
		passage[l]=naissance[i];
		k++;l++;
	}
	structure->mois=atoi(passage);
	k+=2;
	l=0;
	for(int i=k;(naissance[i]!='/')&&(naissance[i]!='\0');i++){
		passage[l]=naissance[i];
		k++;l++;
	}
	structure->annee=atoi(passage);
	k+=2;
	
	printf("Entrer la situation amoureuse:\t");
	scanf("%s",structure->sitAmour);
	
	printf("Entrer le statut:\t");
	scanf("%s",structure->statut);
	
	printf("Entrer la profession/filiere:\t");
	scanf("%s",structure->filOuCar);
}

void afficherIdentite(Identite structure){
	printf("Nom: %s\n",structure.nom);
	printf("Prenom: %s\n",structure.prenom);
	printf("Age: %d\n",structure.age);
	printf("Date de naissance: %d / %d / %d \n",structure.jour,structure.mois,structure.annee);
	printf("Statut: %s\n",structure.statut);
	printf("Etudiant en / Traivailleur en tant que : %s\n",structure.filOuCar);
	printf("Situation amoureuse : %s\n",structure.sitAmour);
}
