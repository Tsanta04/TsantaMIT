#include<stdio.h>
	int main(){
	char name[30];
	char firstname[30];
	int age=0;
	int day=0 ;
	char month[30];
	int year=0;

	printf("What's your name?\n");
	scanf("%s", name);

	printf("And your first name?\n");
	scanf("%s",firstname);

	printf("How old are you then?\n");
	scanf("%d",&age);

	printf("When did you born?\n");
	scanf("%d",&day);
	scanf("%s",month);
	scanf("%d",&year);

	printf("Ah!!,Nice to meet you %s %s who is %d years old and was born on %d %s %d.\n", name, firstname, age, day, month, year);
return 0;
}
