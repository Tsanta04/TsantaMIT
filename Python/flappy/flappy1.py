import py5
import random
import math

class obs:
    def __init__(self,a,haut,pos_x):
        self.gap=a
        self.h=haut
        self.x=pos_x

#reference de l'x des obstacle (la variable a manipuler pour gerer les obstacles)
x=800   #on va commencer au 500 
#coordonnee de centre de l'oiseau
xo=56  
yo=10
#i c'est pour regler le 'jump' quand on presse l'espace
i=5
j=2
v=12
#compteur de score
score=0
perd=0
duree=3
niveau=10 #gestion de vitesse
#les obstacles
obs1=obs(random.randint(140,400),random.randint(50,400),x)
obs2=obs(random.randint(140,300),random.randint(50,400),x+200)
obs3=obs(random.randint(140,300),random.randint(50,400),x+400)

def setup():
    global yo
    py5.size(880,650)
    #py5.size(500,650)
    yo=(py5.height/2)   #on va commencer au centre

def draw():
    global perd
    bg=py5.load_image("Bg.jpg")
    py5.image(bg,0,0,py5.width,py5.height)
    #py5.background(200)
    py5.text_align(py5.CENTER,py5.CENTER)
    perdu()
    if perd>=0:
        jeu()

    elif perd<0:
        echouE()

#Les fonctions
def vitesse():
    global niveau,v,j,i,x,yo,score
    if score==niveau:
        v=v+1
        j=j+0.5
        i=i+1
        niveau=niveau+10
    if i<=5:
        i=i+j
    x=x-v
    yo=yo+i

def gameover():
    #py5.text_font("Arial",60)
    py5.text_size(60)
    py5.fill(255,0,0)
    py5.text("GAME OVER",(py5.width/2),(200))
    py5.text_size(20)
    py5.text("Appuyez sur 'q' pour quitter et 'c' pour continuer",(py5.width/2),(py5.height/2))

def echouE():
    global duree,perd,xo,x,yo,obs1 #print(int(dist(yo,xo,obs1.x)))
    #py5.text_font("Arial",50+perd)
    py5.text_size(50+perd)
    if duree>0:
        py5.fill(0)
        py5.text("VOUS N'AVEZ QUE "+str(duree-1)+" CHANCE[S]",(py5.width/2)-(2*perd),(100)-(2*perd))
        perd=perd+0.3
        if perd >= 0:
            duree=duree-1
    else:
        gameover()
    x=800
    obs1.x=x
    xo=56
    yo=(py5.height/2)

def jeu():
    global obs1,obs2,obs3,x,yo,xo,score,duree,perd
    py5.text_size(20)
    py5.text("Score: < "+str(score)+" > ",60,23)
    vie=py5.load_image("vie.png")
    for i in range(1,duree+1):
        py5.image(vie,py5.width-(i*30),16,23,23)
#    py5.text("Chance: < "+str(duree)+" > ",py5.width-70,23)
#gestion de l'espacement
    obs1.x=x
    obs2.x=x+420
    obs3.x=x+840
    obstacle(obs1)
    obstacle(obs2)
    obstacle(obs3)
    oiseau(xo,yo)or int(distP(xo,yo,obs1.x,(obs1.h+obs1.gap))==30)
#si un obstacle disparait un autre apparait
    if (obs1.x+25)<0:
        obs1=obs2
        obs2=obs3
        x=obs1.x
        score=score+1
        obs3=obs(random.randint(140,400),random.randint(50,400),x+350)or int(distP(xo,yo,obs1.x,(obs1.h+obs1.gap))==30)
#gestion de 'jump'
    vitesse()

def dist(yo,xo,c):
    result=1
    result=abs(c-xo) #/(math.sqrt((xo*xo)+(yo*yo)))
    return result

def distP(xo,yo,xa,ya):
    x=xa-xo
    y=ya-yo
    result=math.sqrt((x*x)+(y*y))
    return result

def perdu():
    global perd,obs1,obs2,obs3,x,yo,xo,v
    #if (yo+30>=py5.height) or (yo-30<=0) or (int(dist(yo,xo,obs1.x))<=30+v and int(dist(yo,xo,obs1.x))>=30-v and (yo>=(obs1.h+obs1.gap) or yo<=obs1.h)) or (((int(dist(xo,yo,obs1.h))>=30-v and (int(dist(xo,yo,obs1.h))<=30+v)) or (int(dist(xo,yo,(obs1.h+obs1.gap)))>=30-v and int(dist(xo,yo,(obs1.h+obs1.gap)))<=30+v)) and (xo>=(obs1.x)) and xo<=(obs1.x+60)) or ((int(dist(xo,yo,obs1.h))==30 or (int(dist(xo,yo,(obs1.h+obs1.gap)))==30)) and (xo>=(obs1.x-30)) and xo<=(obs1.x+90)) or (int(distP(xo,yo,obs1.x,obs1.h)>=30-v) and int(distP(xo,yo,obs1.x,obs1.h)<=30+v)) or (int(distP(xo,yo,obs1.x+60,obs1.h)>=30-v) and int(distP(xo,yo,obs1.x+60,obs1.h)<=30+v)) or (int(distP(xo,yo,obs1.x,(obs1.h+obs1.gap))>=30-v) and int(distP(xo,yo,obs1.x,(obs1.h+obs1.gap))<=30+v)) or (int(distP(xo,yo,obs1.x+60,(obs1.h+obs1.gap))>=30-v) and int(distP(xo,yo,obs1.x+60,(obs1.h+obs1.gap))<=30+v)):
    if (((yo<=obs1.h+(v/2) and yo>=obs1.h-(v/2)) or (yo+60<=obs1.h+obs1.gap+(v/2) and yo+60>=obs1.h+obs1.gap-(v/2))) and (xo>=obs1.x-60 and xo<=obs1.x+60)) or (xo+60<=obs1.x+(v/2) and xo+60>=obs1.x-(v/2) and (yo<obs1.h+(v/2) or yo>obs1.h+obs1.gap-(v/2))) or (yo+60>py5.height) or (yo<0):
        perd=-10

def obstacle(obst):
    obsA=py5.load_image("obsA.png")
    obsB=py5.load_image("obsB.png")
    py5.image(obsA,obst.x,0,60,obst.h)
    py5.image(obsB,obst.x,py5.height,60,-(py5.height-(obst.h+obst.gap)))
    
def oiseau(x,y):
    py5.fill(0,0,255)
    py5.no_stroke()
    bird=py5.load_image("bird.png")
    #py5.ellipse(x,y,60,60)
    py5.image(bird,x,y,68,68)

def key_pressed():
    global duree,perd,xo,x,yo,obs1,i,v #print(int(dist(yo,xo,obs1.x)))
    if py5.key==' ':
        i=-18
    if py5.key=='q':
        py5.exit_sketch()
    if py5.key=='c':
        x=800
        obs1.x=x
        xo=56
        yo=(py5.height/2)
        score=0
        duree=3
        perd=0
        draw()

py5.run_sketch()
