							///Les en-tete
#ifndef MIT
#define MIT
///structures utilisEs
typedef struct Identite{
	char nom[100];
	char prenom[100];
	char parcours[100];
	char grade[100];
	char num[100];
	char email[100];
	char git[100];
}Identite;

typedef struct {
	char marque[100];
	char MAC[100];
	char label[100];
}PC;

///Prototypes
char **allouer(int a,int b);

int enTete(char* chemin,char* tete);

void sort(PC* datas,int i);
int getFileToStruct(char* chemin,PC* datas);
int getFileToStructEtudiants(char* chemin,Identite* datas);

int max(char* s1,char* s2);
int getFileToChar(char* chemin,char** datas);
void trier(char** datas,int i);
int putFile(char* chemin,char** datas,int i);

Identite getDataId();
PC getDataPc();
int enregistrement1(char* chemin,Identite* mit);
int enregistrement2(char* chemin,PC* mit);
void addURL(char** datas,char** URL,int i,char* tete);

int infoCherchEe(int i,char** info,char* numero, Identite* datas);
void ajoutDinfo(char** resultat);

void etudiantsMIT();
void trieEtudiantsId();
void PcMIT();
void triePcId();
//void ajoutColonne();
void ajoutInfoEtudiant();
#endif
