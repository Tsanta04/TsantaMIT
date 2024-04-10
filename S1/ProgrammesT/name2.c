#include<stdio.h>
int main(){
	char name[30];
	char firstname[30];
	char country[30];
	char study[30];
	char food[30];
	int age=0;
	float high=0;

	printf("Hello! What's your name?\n");
	scanf("%s", name);

	printf("What's your firstname?\n");
	scanf("%s",firstname);

	printf("Where are you from?\n");
	scanf("%s",country);


	printf("How old are you?\n");

	scanf("%d",&age);

	printf("How high are you?\n");
	scanf("%f",&high);

	printf("What course do you ensue now?\n");
	scanf("%s",study);

	printf("What's your favorite food ?\n");
	scanf("%s",food);

	printf("\nThanks for your informations %s %s from %s who is %d years old , %f meters, who studies about %s,and likes %s!\n\n", name,firstname, country, age,high,study,food );

return 0;
}
