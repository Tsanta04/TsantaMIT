///Les en-tete
#ifndef MIT
#define MIT
typedef struct Identite{
	char nom[100];
	char prenom[100];
	char parcours[100];
	char grade[100];
	char num[100];	
}Identite;

typedef struct {
	char marque[100];
	char MAC[100];
	char label[100];
}PC;

char **allouer(int a,int b);

int enTete(char* chemin,char* tete);

void sort(PC* datas,int i);
int getFileToStruct(char* chemin,PC* datas);

int max(char* s1,char* s2);
int getFileToChar(char* chemin,char** datas);
void trier(char** datas,int i);
int putFile(char* chemin,char** datas,int i);

Identite getDataId();
PC getDataPc();
int enregistrement1(char* chemin,Identite* mit);
int enregistrement2(char* chemin,PC* mit);
void addURL(char** datas,char** URL,int i);

#endif
