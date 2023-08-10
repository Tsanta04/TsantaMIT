#include<stdio.h>
#include<gtk/gtk.h>

struct donnee1{
///HomePage
	GtkWidget* window1;
	GtkWidget* label;
	GtkWidget* login;
	GtkWidget* signIn;
	GtkWidget* vbox1;
	GtkWidget* vbox2;
	GtkWidget* vbox3;

///Donnees
	const gchar* nom;
	const gchar* prenom;
	const gchar* adresse;
	const gchar* naissance;
	const gchar* mail;
	const gchar* tel;
	const gchar* sexe;
	const gchar* amour;
	const gchar* profession;
	const gchar* nivDetude;
	const gchar* mdp1;
	const gchar* mdp2;
	const gchar* motivation;
	
///Fenetre
	GtkWidget* window2;

	GtkWidget* hbox1;
	GtkWidget* hbox2;
	GtkWidget* hbox3;
	GtkWidget* hbox4;
	GtkWidget* hbox5;
	GtkWidget* hbox6;
	GtkWidget* hbox7;
	
	GtkWidget* titre;
	GtkWidget* ok;
	GtkWidget* retour;
	
	GtkWidget* nomLab;
	GtkWidget* nomEnt;
	
	GtkWidget* prenomLab;
	GtkWidget* prenomEnt;
	
	GtkWidget* telLab;
	GtkWidget* telEnt;
	
	GtkWidget* mailLab;
	GtkWidget* mailEnt;
	
	GtkWidget* adresseLab;
	GtkWidget* adresseEnt;
	
	GtkWidget* naissanceLab;
	GtkWidget* naissanceEnt;

	GtkWidget* sexeLab;
	GtkWidget* sexeEnt;

	GtkWidget* amourLab;
	GtkWidget* amourEnt;
	
	GtkWidget* professionLab;
	GtkWidget* professionEnt;
	
	GtkWidget* etudeLab;
	GtkWidget* etudeEnt;
	
	GtkWidget* motivLab;
	GtkWidget* motivEnt;
	
	GtkWidget* mdp1Lab;
	GtkWidget* mdp1Ent;

	GtkWidget* mdp2Lab;
	GtkWidget* mdp2Ent;
	
///Login
	GtkWidget* window3;
	GtkWidget* label2;
	GtkWidget* mailLab2;
	GtkWidget* mailEnt2;
	GtkWidget* mdpLab;
	GtkWidget* mdpEnt;
	GtkWidget* retour2;
	GtkWidget* ok2;
	
	GtkWidget* hboxA;
	GtkWidget* hboxB;
	
///Fenetre connexion
	GtkWidget* window4;
	GtkWidget* label3;
	GtkWidget* deconnexion;
	GtkWidget* vboxC;
	
};

typedef struct donnee1 donnee1;

gboolean SignIn(GtkWidget* button,GdkEventButton* event,gpointer data);
gboolean retour(GtkWidget* button,GdkEventButton* event,gpointer data);
gboolean Login(GtkWidget* button,GdkEventButton* event,gpointer data);
gboolean enregistrement(GtkWidget* button,GdkEventButton* event,gpointer data);
gboolean Connect(GtkWidget* button,GdkEventButton* event,gpointer data);
donnee1 datas();

int main(int argc,char** argv){
///Activation
	gtk_init(&argc,&argv);

///Les variables
	donnee1 win = datas();

///Pour le Sign In
	g_signal_connect(win.signIn,"button-press-event",G_CALLBACK(SignIn),&win);
	g_signal_connect(win.login,"button-press-event",G_CALLBACK(Login),&win);
	g_signal_connect(win.window1,"button-press-event",G_CALLBACK(gtk_main_quit),NULL);
	g_signal_connect(win.window2,"button-press-event",G_CALLBACK(gtk_main_quit),NULL);
	g_signal_connect(win.window3,"button-press-event",G_CALLBACK(gtk_main_quit),NULL);
	g_signal_connect(win.window4,"button-press-event",G_CALLBACK(gtk_main_quit),NULL);
	
///Refresh
	gtk_widget_show_all(win.window1);
	gtk_main();

///Supprimer
	return 0;
}

donnee1 datas(){
///La variable
	donnee1 principale;
	
///Home page
	principale.window1 = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	principale.label = gtk_label_new("M.I.T");
	principale.login = gtk_button_new_with_label("Login");
	principale.signIn = gtk_button_new_with_label("Sign in");
	principale.vbox1 = gtk_box_new(GTK_ORIENTATION_VERTICAL,1);

///Mise en forme page d'acceuil
	gtk_window_set_default_size(GTK_WINDOW(principale.window1),700,700);
	gtk_box_pack_start(GTK_BOX(principale.vbox1),principale.label,TRUE,TRUE,30);
	gtk_box_pack_start(GTK_BOX(principale.vbox1),principale.login,TRUE,TRUE,30);
	gtk_box_pack_start(GTK_BOX(principale.vbox1),principale.signIn,TRUE,TRUE,30);
	
	gtk_container_add(GTK_CONTAINER(principale.window1),principale.vbox1);
	
///SighIn
		principale.window2 = gtk_window_new(GTK_WINDOW_TOPLEVEL);
		gtk_window_set_default_size(GTK_WINDOW(principale.window2),700,700);
	
        principale.hbox1 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox2 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox3 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox4 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox5 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox6 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        principale.hbox7 = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
        
        principale.vbox2 = gtk_box_new(GTK_ORIENTATION_VERTICAL,1);
        
        principale.titre = gtk_label_new("M.I.T");
        principale.ok = gtk_button_new_with_label("Register");
        principale.retour = gtk_button_new_with_label("Return");
        
        principale.nomLab = gtk_label_new("Nom*:");
        principale.prenomLab = gtk_label_new("Prenom*:");
        principale.adresseLab = gtk_label_new("Adresse*:");
        principale.naissanceLab = gtk_label_new("Naissance*:");
        principale.telLab = gtk_label_new("Tel*:");
        principale.mailLab = gtk_label_new("Mail*:");
        principale.sexeLab = gtk_label_new("Sexe*:");
        principale.amourLab = gtk_label_new("Situation amoureuse:");
        principale.motivLab = gtk_label_new("Motivation*:");
        principale.etudeLab = gtk_label_new("Niveau d'etude:");
        principale.professionLab = gtk_label_new("Profession:");
        principale.mdp1Lab = gtk_label_new("Mot de passe:");
        principale.mdp2Lab = gtk_label_new("Confirmation Mot de passe:");
        
        principale.nomEnt = gtk_entry_new();
        principale.prenomEnt = gtk_entry_new();
        principale.adresseEnt = gtk_entry_new();
        principale.naissanceEnt = gtk_entry_new();
        principale.telEnt = gtk_entry_new();
        principale.mailEnt = gtk_entry_new();
        principale.sexeEnt = gtk_entry_new();
        principale.amourEnt = gtk_entry_new();
        principale.motivEnt = gtk_entry_new();
        principale.etudeEnt = gtk_entry_new();
        principale.professionEnt = gtk_entry_new();
        principale.mdp1Ent = gtk_entry_new();
        principale.mdp2Ent = gtk_entry_new();

///Clear les entries
	gtk_entry_set_text(GTK_ENTRY(principale.nomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale.prenomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale.mailEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale.telEnt),"+261*********");	
	gtk_entry_set_text(GTK_ENTRY(principale.sexeEnt),"F/M");
	gtk_entry_set_text(GTK_ENTRY(principale.amourEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale.adresseEnt),"Adresse Ville Pays");	
	gtk_entry_set_text(GTK_ENTRY(principale.naissanceEnt),"JJ/MM/AA");
	gtk_entry_set_text(GTK_ENTRY(principale.professionEnt),"Etudiant en *** / Travail");	
	gtk_entry_set_text(GTK_ENTRY(principale.etudeEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale.motivEnt),"");		
	gtk_entry_set_text(GTK_ENTRY(principale.mdp2Ent),"");
	gtk_entry_set_text(GTK_ENTRY(principale.mdp1Ent),"");

///Mise en forme de l'affichage

        gtk_box_pack_start(GTK_BOX(principale.hbox1),principale.nomLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox1),principale.nomEnt,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox1),principale.prenomLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox1),principale.prenomEnt,TRUE,TRUE,10);
        
        gtk_box_pack_start(GTK_BOX(principale.hbox2),principale.adresseLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox2),principale.adresseEnt,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox2),principale.naissanceLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox2),principale.naissanceEnt,TRUE,TRUE,10);

        gtk_box_pack_start(GTK_BOX(principale.hbox3),principale.professionLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox3),principale.professionEnt,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox3),principale.etudeLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox3),principale.etudeEnt,TRUE,TRUE,10);
        
        gtk_box_pack_start(GTK_BOX(principale.hbox4),principale.sexeLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox4),principale.sexeEnt,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox4),principale.amourLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox4),principale.amourEnt,TRUE,TRUE,10);

        gtk_box_pack_start(GTK_BOX(principale.hbox5),principale.telLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox5),principale.telEnt,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox5),principale.mailLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox5),principale.mailEnt,TRUE,TRUE,10);


        gtk_box_pack_start(GTK_BOX(principale.hbox7),principale.mdp1Lab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox7),principale.mdp1Ent,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox7),principale.mdp2Lab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox7),principale.mdp2Ent,TRUE,TRUE,10);
        
        gtk_box_pack_start(GTK_BOX(principale.hbox6),principale.motivLab,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.hbox6),principale.motivEnt,TRUE,TRUE,10);

        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.titre,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox1,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox2,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox3,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox4,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox5,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox7,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.hbox6,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.ok,TRUE,TRUE,10);
        gtk_box_pack_start(GTK_BOX(principale.vbox2),principale.retour,TRUE,TRUE,10);
        
		gtk_container_add(GTK_CONTAINER(principale.window2),principale.vbox2);

///Login
	principale.window3 = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	
	gtk_window_set_default_size(GTK_WINDOW(principale.window3),700,700);
	
	principale.label2 = gtk_label_new("M.I.T");
	principale.mailLab2 = gtk_label_new("Votre mail:");
	principale.mdpLab = gtk_label_new("Mot de passe:");
    
    principale.vbox3 = gtk_box_new(GTK_ORIENTATION_VERTICAL,1);
	principale.ok2 = gtk_button_new_with_label("Log in");
	principale.retour2 = gtk_button_new_with_label("Return");
        
    principale.mdpEnt = gtk_entry_new();
	principale.mailEnt2 = gtk_entry_new();
	
	principale.hboxA = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
    principale.hboxB = gtk_box_new(GTK_ORIENTATION_HORIZONTAL,1);
	
	gtk_box_pack_start(GTK_BOX(principale.hboxA),principale.mailLab2,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.hboxA),principale.mailEnt2,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.hboxB),principale.mdpLab,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.hboxB),principale.mdpEnt,TRUE,TRUE,40);
	
	
	gtk_box_pack_start(GTK_BOX(principale.vbox3),principale.label2,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.vbox3),principale.hboxA,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.vbox3),principale.hboxB,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.vbox3),principale.ok2,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.vbox3),principale.retour2,TRUE,TRUE,40);
        
	gtk_container_add(GTK_CONTAINER(principale.window3),principale.vbox3);
	
///Connexion
	principale.window4 = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	principale.label3 = gtk_label_new("M.I.T");
	principale.deconnexion = gtk_button_new_with_label("Log out");
	principale.vboxC = gtk_box_new(GTK_ORIENTATION_VERTICAL,1);
	
	gtk_window_set_default_size(GTK_WINDOW(principale.window4),700,700);
	
	gtk_box_pack_start(GTK_BOX(principale.vboxC),principale.label3,TRUE,TRUE,40);
	gtk_box_pack_start(GTK_BOX(principale.vboxC),principale.deconnexion,TRUE,TRUE,40);
	
	gtk_container_add(GTK_CONTAINER(principale.window4),principale.vboxC);
	
	return principale;
}

gboolean SignIn(GtkWidget* button,GdkEventButton* event,gpointer data){
///Les variables
	donnee1* principale = (donnee1*)data;

///Retour

	g_signal_connect(principale->retour,"button-press-event",G_CALLBACK(retour),principale);
	g_signal_connect(principale->ok,"button-press-event",G_CALLBACK(enregistrement),principale);

///Refresh
	gtk_widget_hide(principale->window4);
	gtk_widget_hide(principale->window1);
	gtk_widget_hide(principale->window3);
	gtk_widget_show_all(principale->window2);
	gtk_main();
	
	return FALSE;
}

gboolean enregistrement(GtkWidget* button,GdkEventButton* event,gpointer data){
	donnee1* principale = (donnee1*)data;

///Recuperation des donnees
	principale->nom = gtk_entry_get_text(GTK_ENTRY(principale->nomEnt));
	principale->prenom = gtk_entry_get_text(GTK_ENTRY(principale->prenomEnt));
	principale->mail = gtk_entry_get_text(GTK_ENTRY(principale->mailEnt));	
	principale->tel = gtk_entry_get_text(GTK_ENTRY(principale->telEnt));	
	principale->sexe = gtk_entry_get_text(GTK_ENTRY(principale->sexeEnt));
	principale->amour = gtk_entry_get_text(GTK_ENTRY(principale->amourEnt));	
	principale->adresse = gtk_entry_get_text(GTK_ENTRY(principale->adresseEnt));	
	principale->naissance = gtk_entry_get_text(GTK_ENTRY(principale->naissanceEnt));
	principale->profession = gtk_entry_get_text(GTK_ENTRY(principale->professionEnt));	
	principale->nivDetude = gtk_entry_get_text(GTK_ENTRY(principale->etudeEnt));	
	principale->motivation = gtk_entry_get_text(GTK_ENTRY(principale->motivEnt));		
	principale->mdp2 = gtk_entry_get_text(GTK_ENTRY(principale->mdp2Ent));
	principale->mdp1 = gtk_entry_get_text(GTK_ENTRY(principale->mdp1Ent));
	
	//g_print("%s",principale->nom);
///Test de validation
	if((principale->nom[0]=='\0')||(principale->prenom[0]=='\0')||(principale->mail[0]=='\0')||(principale->tel[0]=='\0')||(principale->adresse[0]=='\0')||(principale->naissance[0]=='\0')||(principale->mdp1[0]=='\0')||(principale->mdp2[0]=='\0')||((principale->mdp1[0]!='\0')&&(strcmp(((char*)principale->mdp1),((char*)principale->mdp2))!=0))||(strcmp(((char*)principale->tel),("+261*******"))==0)||(strcmp(((char*)principale->sexe),("F/M"))==0)||(strcmp(((char*)principale->adresse),("Adresse Ville Pays"))==0)||(strcmp(((char*)principale->naissance),("JJ/MM/AA"))==0)||(strcmp(((char*)principale->profession),("Etudiant en *** / Travail"))==0)){
		//g_print("%s",principale->prenom);
		gtk_label_set_text(GTK_LABEL(principale->titre),"M.I.T\n\t\t\t\t\tReverifiez votre information");
	}
	else{
		FILE* fichier1 = fopen("/home/mit/Documents/PDF/LoginInfo","a");
		if(fichier1==NULL){g_print("Erreur");}
		else{
			fprintf(fichier1,"Nom:%s\nPrenom:%s\nDate de naissance:%s\nAdresse:%s\nProfession:%s\nNiveau d'etude:%s\nSexe:%s\nSituation amoureuse:%s\nMail:%s\nTelephone:%s\nMotivation:%s\nMot de passe:%s\n\n",principale->nom,principale->prenom,principale->naissance,principale->adresse,principale->profession,principale->nivDetude,principale->sexe,principale->amour,principale->mail,principale->tel,principale->motivation,principale->mdp2);
		}
		fclose(fichier1);
		
		FILE* fichier2 = fopen("/home/mit/Documents/PDF/LoginLog","a");
		if(fichier2==NULL){g_print("Erreur");}
		else{
			fprintf(fichier2,"%s:%s:%s %s\n",principale->mail,principale->mdp2,principale->nom,principale->prenom);
		}
		fclose(fichier2);
		
		gtk_label_set_text(GTK_LABEL(principale->titre),"M.I.T\n\t\t\t\t\tC'est fait\n");

///Clear les entries
	gtk_entry_set_text(GTK_ENTRY(principale->nomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale->prenomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale->mailEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->telEnt),"+261*********");	
	gtk_entry_set_text(GTK_ENTRY(principale->sexeEnt),"F/M");
	gtk_entry_set_text(GTK_ENTRY(principale->amourEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->adresseEnt),"Adresse Ville Pays");	
	gtk_entry_set_text(GTK_ENTRY(principale->naissanceEnt),"JJ/MM/AA");
	gtk_entry_set_text(GTK_ENTRY(principale->professionEnt),"Etudiant en *** / Travail");	
	gtk_entry_set_text(GTK_ENTRY(principale->etudeEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->motivEnt),"");		
	gtk_entry_set_text(GTK_ENTRY(principale->mdp2Ent),"");
	gtk_entry_set_text(GTK_ENTRY(principale->mdp1Ent),"");

	}

///Boucle
	g_signal_connect(principale->retour,"button-press-event",G_CALLBACK(retour),principale);
	g_signal_connect(principale->ok,"button-press-event",G_CALLBACK(enregistrement),principale);
	
	return FALSE;
}

gboolean retour(GtkWidget* button,GdkEventButton* event,gpointer data){
	donnee1* principale = (donnee1*)data;


///Clear les entries
	gtk_label_set_text(GTK_LABEL(principale->titre),"M.I.T");
	gtk_label_set_text(GTK_LABEL(principale->label2),"M.I.T");
	gtk_label_set_text(GTK_LABEL(principale->label3),"M.I.T");

	gtk_entry_set_text(GTK_ENTRY(principale->nomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale->prenomEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale->mailEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->telEnt),"+261*********");	
	gtk_entry_set_text(GTK_ENTRY(principale->sexeEnt),"F/M");
	gtk_entry_set_text(GTK_ENTRY(principale->amourEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->adresseEnt),"Adresse Ville Pays");	
	gtk_entry_set_text(GTK_ENTRY(principale->naissanceEnt),"JJ/MM/AA");
	gtk_entry_set_text(GTK_ENTRY(principale->professionEnt),"Etudiant en *** / Travail");	
	gtk_entry_set_text(GTK_ENTRY(principale->etudeEnt),"");	
	gtk_entry_set_text(GTK_ENTRY(principale->motivEnt),"");		
	gtk_entry_set_text(GTK_ENTRY(principale->mdp2Ent),"");
	gtk_entry_set_text(GTK_ENTRY(principale->mdp1Ent),"");
	
	gtk_entry_set_text(GTK_ENTRY(principale->mdpEnt),"");
	gtk_entry_set_text(GTK_ENTRY(principale->mailEnt2),"");	
	
	gtk_widget_hide(principale->window4);
	gtk_widget_hide(principale->window2);
	gtk_widget_hide(principale->window3);
	gtk_widget_show_all(principale->window1);
	gtk_main();
	 	
	return FALSE;
}

gboolean Login(GtkWidget* button,GdkEventButton* event,gpointer data){
///Les variables
	donnee1* principale = (donnee1*)data;
	
///Retour
	g_signal_connect(principale->retour2,"button-press-event",G_CALLBACK(retour),principale);
	g_signal_connect(principale->ok2,"button-press-event",G_CALLBACK(Connect),principale);

///Refresh
	gtk_widget_hide(principale->window1);
	gtk_widget_hide(principale->window2);
	gtk_widget_show_all(principale->window3);
	
	gtk_main();
	
	return FALSE;
}

gboolean Connect(GtkWidget* button,GdkEventButton* event,gpointer data){
	donnee1* principale = (donnee1*)data;
	char tmp[256];
	char mail[100];
	char pwd[100];
	char name[100];
	principale->mail = gtk_entry_get_text(GTK_ENTRY(principale->mailEnt2));
	principale->mdp1 = gtk_entry_get_text(GTK_ENTRY(principale->mdpEnt));

///Traitement de donnee
	FILE* fichier = fopen("/home/mit/Documents/PDF/LoginLog","r");
	fgets(tmp,100,fichier);
	sscanf(tmp,"%[^:]:%[^:]:%[^\n]",mail,pwd,name);
	while(feof(fichier)!=1){
		fgets(tmp,100,fichier);
		sscanf(tmp,"%[^:]:%[^:]:%[^\n]",mail,pwd,name);
		if(strcmp(mail,(char*)principale->mail)==0){break;};
	}
	fclose(fichier);
	if(strcmp(mail,(char*)principale->mail)==0){
		if(strcmp(pwd,(char*)principale->mdp1)==0){
			gtk_label_set_text(GTK_LABEL(principale->label3),(const gchar*)name);
			//g_print("%s",name);
			gtk_widget_hide(principale->window3);
			gtk_widget_show_all(principale->window4);
			g_signal_connect(principale->deconnexion,"button-press-event",G_CALLBACK(retour),principale);
		}
		else if(strcmp(pwd,(char*)principale->mdp1)!=0){
			gtk_label_set_text(GTK_LABEL(principale->label2),"M.I.T\n\t\t\t Mot de passe invalide");
			//g_print("Hellooo");
			gtk_widget_hide(principale->window4);
			gtk_widget_show_all(principale->window3);			
		}
	}
	else if(strcmp(mail,(char*)principale->mail)!=0){
		gtk_label_set_text(GTK_LABEL(principale->label2),"M.I.T\n\t\t\t Vous n'avez pas encore fait l'inscription");
		//g_print("Hello");
		gtk_widget_hide(principale->window4);
		gtk_widget_show_all(principale->window3);			
	}

	gtk_widget_hide(principale->window1);
	gtk_widget_hide(principale->window2);

	return FALSE;
}
