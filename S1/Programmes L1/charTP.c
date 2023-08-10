#include<stdio.h>
#include<string.h>

int main(){

	char	texte[20]="Hello world!";	//même si on a reserver 20 dimensions , si la chaîne de caractères est terminé,il aura un /0 et il ne va plus considérer ce qui le précède
	printf("\nLongueur de texte =%ld\n",strlen(texte));

	for(int i=0;i<=strlen(texte);i++){
		printf("%c\t",texte[i]);
	}

	printf("\nCodes ASCII:\n");
	for(int i=0;i<=strlen(texte);i++){	//Raha te hi-afficher ny conteny anle raha (ilay caractère mihintsy zany), dia %c no ampiasaina code format any. Fa raha te- hampiseho ilay code ASCII an'ilay caractère dia %d fotsiny no atao 
		printf("%d\t,", texte[i]);
	}


	printf("\nLe texte à l'envers:\n");
	for(int i=strlen(texte);i>=0;i--)
	printf("%c\t",texte[i]);	//Raha iray ihany ny instruction ao anatiny dia afaka tsy asiana accolade {}
	
		
	return 0;
}

char itoascii (int i){
	return '0'+i;
}


char lmtoascii (int i){
	return 'a'+i;
}


char lMtoascii (int i){
	return 'A'+i;
}
