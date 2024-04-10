#include<stdio.h>
char itoascii (int i);
char lmtoascii (char c);
char lMtoascii (char c);

int main(){
///Les variables

/*
	char	miniscule[26]="abcdefghijklmnopqrstuvwxyz";
	char	majuscule[26]="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
*/
	printf("Affichage des codes ascii des caractères alphanumeriques.\n");
	
///Les digits décimaux
	printf("\n\nLes digits decimaux:\n");
	for(int i=0;i<10;i++){
		printf("%c = %d\t", itoascii(i),itoascii(i));
	}
	
///Les lettres miniscules
	printf("\n\nLes lettres miniscules:\n");
	for(int i=0;i<26;i++){
		printf("%c = %d\t", lmtoascii(i),lmtoascii(i));
	}

///Les lettres majuscules
	printf("\n\nLes lettres majuscules:\n");
	for(int i=0;i<26;i++){
		printf("%c = %d\t",lMtoascii(i), lMtoascii(i));
	}
	
	return 0;
}

///Les fonctions

char itoascii (int i){
	return '0'+i;			//Code ASCII des nombres de 0 et ce qui le suit jusqu'à i ème
}


char lmtoascii (char c){		//Code ASCII de a miniscule et ce qui le suit jusqu'à i ème
	return 'a'+ c;
}


char lMtoascii (char c){		//Code ASCII de a majuscule et ce qui le suit jusqu'à i ème
	return 'A'+ c;
}
