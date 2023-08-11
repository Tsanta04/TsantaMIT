#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>

int main(){
	int x=123;
	char tab[34];
	char tab1[34];
	char corbeille[34];
	printf("%d\n",x);
	//char h[100000];

	//fflush(stdin);
	
	x=sleep(4);
	

	//if(x!=0)
	//scanf("%s",h);
	printf("scancorbeille\n");
	rewind(stdin);
	scanf("%s",corbeille);
	printf("\nscan\n");
    scanf("%s",tab);
    printf("\nscan1\n");
    //fflush(stdout);
	scanf("%s",tab1);
	printf("%d\n",x);
	printf("%s\n",corbeille);
	printf("%s\n",tab);
    printf("%s\n",tab1);
   // x=sleep(3);
   // printf("%d",x);
	return 0;
}
