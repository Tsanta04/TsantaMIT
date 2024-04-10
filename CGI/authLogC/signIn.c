#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include"fn.h"

int main(){
	printf("content-type: text/html\n");
	formSignIn();
	registerID();
	return 0;
}
