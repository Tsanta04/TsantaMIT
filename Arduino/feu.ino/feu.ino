void setup() {
//Ouverture des pins
  for(int i=3;i<=8;i++){
    if(i!=7)
      pinMode(i,OUTPUT);
  }
  pinMode(2,INPUT);
  Serial.begin(9600);
}

void loop() {
  int test=0;	//pour tester si le boutton est cliquE
  for(int i=3;i<=5;i++){
    Serial.println(digitalRead(2));
//Si le bouton est cliquE quand le feu de la voiture est rouge    
    if((i==3)&&(digitalRead(2)==1)){
	//Allumer le rouge
      	digitalWrite(i,1);
    	digitalWrite(i+3,1);
	//Attendre 2 secondes
      	delay(2000);
        digitalWrite(i,0);
    	digitalWrite(i+3,0);
  		test=1;
      continue;
  	}

    digitalWrite(i,1);
// (1) Si l'orange du feu voiture s'allume alors on allume le rouge de pieton
    if(i==4)digitalWrite(6,1);
    else digitalWrite(i+3,1);
//Si le bouton a ete cliquE en bon moment on allume l'orange pendant 2 secondes avant de passer au feu rouge
    if(test==1){delay(2000);test=0;}
//Delay normal
    else delay(4000);
    digitalWrite(i,0);
//Meme que (1)
    if(i==4)digitalWrite(6,0);
    else digitalWrite(i+3,0);
  }
}
