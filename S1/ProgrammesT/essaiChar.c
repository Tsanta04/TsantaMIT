#include<stdio.h>
#include<string.h>

int main(){
	printf("Essai type aractère\n");
	
///Entrée des données
	char manana[12]="b";
	
	for(int i=0;i<strlen(manana);i++){
		printf("%c\n",manana[i]);
	}
	
	
	char haha[12]={"a"};
	haha[1]='0'+1;		// ''=ilay caractère fotsiny ex[a], ""=ilay texte ex[a/0] 
	
	printf("%c", haha[0]);
	
	printf("\n%c", haha[1]);
	
	return 0;
}
