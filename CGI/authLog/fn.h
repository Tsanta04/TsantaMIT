#ifndef STR
#define STR

///Structures
typedef struct{
        char time[200];
        char session[200];
        char nameFor[200];
        char nameBy[200];
}INFO;
typedef struct{
        char h[200];
        char min[200];
        char sec[200];
        char partie[200];
}ORA;
typedef struct{
        char sys[100];
        char auth[100];
        char mlg[100];
}VOLANA;
typedef struct{
        char sys[100];
        char mlg[100];
}ANDRO;
typedef struct{
        char andro[100];
        char j[100];
        char volana[100];
		char taona[100];
}ANDROANY;
typedef struct{
        char nom[200];
        char id[200];
        char mail[200];
        char psswd[200];
        char ip[100];
}ID;
typedef struct{
        char id[200];
        char psswd[200];
}LOG;
typedef struct{
        char ip[200];
        char id[200];
}LOGIN;

///Les prototypes

///Outils pour avoir les donnees
char* geturl();
char* reglage(char* data);
int max(int ligne);
void chiffrePagination(char* total,int* rand,int* debut,int* voalohany,int* farany,int mx);
void separerDonnee(char* string, char* line);
char* supprPlus(char* data);

///Obtenir les donnees de authLog (avec les gestions de recherche ...)
INFO* getData(int *ligne,char* string);
char* malagasyDate(char* mois,char* j,char* h);
VOLANA* moisS2M();
ANDRO* jourS2M();

///HTML d'affichage de donnee
void displayResult(char* total,int ligne,INFO* user,char* string,ID us);
void displayData(char* total,int ligne,INFO* user,char* string);
void displayNav(ID us);

///Formulaire de login et signin
void formLogin(int i);
void formSignIn();

///Protopype traitement des donnees hors de login et signin
void registerID();
int verifyID();
int dejaPris(char* file,char* nom);

///Prototypes des fonctions sur changement de mot de passe
void entrerNom();
void changerMdp();

///Test s'il est deja onnecte ou non
int authentification(ID* contain);

#endif
