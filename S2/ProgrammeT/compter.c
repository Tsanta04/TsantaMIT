#include<stdio.h>

int main(){
	printf("Compter les mots et les caracteres dans un fichiers\n\n");

///Les variables
	FILE* fp;
	int mot=0, caract=0, ligne=0;
	char contenu[100];
	char chemin[256];
///Entree des donnees
	here:	printf("Entrer le chemin du fichier que vous voulez entrer:\t");
			scanf("%s",chemin);

///Ouverture
	fp = fopen(chemin,"r");
	if(fp==NULL){
		printf("On a rencontrE un probleme hors de l'ouverture. Cela pourait causE par la permission de ce fichier ou ce fichier n'existe pas\nVeuillez verifier et entrez a nouveau le fichier:\t");
		goto here;
	}

	else{
///Traitement
	//contenu=fgetc(fp);
	for(caract=0;feof(fp)!=1;caract++){
		contenu[caract]=fgetc(fp);
		if((contenu[caract]==' ')||(contenu[caract]=='\n')){
			mot++;
		}
		if(contenu[caract]=='\n'){
			ligne++;
		}
	}
	
///Fermeture et affichage du resultat
	fclose(fp);
	printf("\nDans le fichier:\n\n%s\n",contenu);
	printf("\nNombre de mot:\t%d\n",mot);
	printf("\nNombre de caracteres:\t%d\n",caract);
	printf("\nNombre de ligne:\t%d\n",ligne);
	}
	return 0;
}
