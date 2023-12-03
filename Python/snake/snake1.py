import py5
import random

#Les classes
class position:
    def __init__(self,xo,yo,num):
        self.x=xo
        self.y=yo
        self.num=num
    def food(self):
        py5.fill(255,0,0)
        py5.no_stroke()
        py5.rect(self.x,self.y,16,16)
    def snakeBody(self,image):
        py5.image(image,self.x,self.y,16,16)

#Les variables
direction=2     #up=1 , down=2, left=3, right=4
avant=2
perd=0
duree=3
score=0
i=8
niveau=10
fd=position((round(random.randint(20,800)//16))*16,(round(random.randint(20,400)//16))*16,0)
snake=[position(16,16,0),position(32,16,0),position(48,16,0)]
#snake=[position(70,10)]

def setup():
    global fd,snake,direction
    py5.size(880,660)
    py5.text_align(py5.CENTER,py5.CENTER)
    py5.frame_rate(8)
    while fd.x==snake[0].x and fd.y==snake[0].y:
        fd=position((round(random.randint(20,800)//16))*16,(round(random.randint(20,400)//16))*16,0)
        direction=2

def draw():
    global fd,snake,score,perd,niveau,i

    tete=[py5.load_image("headRight.png"),py5.load_image("headLeft.png"),py5.load_image("headUp.png"),py5.load_image("headDown.png")]
    corps=[py5.load_image("bodyHorizontal.png"),py5.load_image("bodyHorizontal.png"),py5.load_image("bodyVert.png"),py5.load_image("bodyVert.png")]
    queue=[py5.load_image("queueRight.png"),py5.load_image("queueLeft.png"),py5.load_image("queueUp.png"),py5.load_image("queueDown.png")]
    pli=[py5.load_image("pliRight.png"),py5.load_image("pliLeft.png"),py5.load_image("pliUp.png"),py5.load_image("pliDown.png")]
    grass=py5.load_image("bg.png")

    py5.image(grass,0,0,py5.width,py5.height)
    if score==niveau:
        i=i+1
        py5.frame_rate(i)
        niveau=niveau+10
    if perd>=0:
        py5.fill(255,0,0)
        py5.text_size(15)
        py5.text("Score: < "+str(score)+" > ",60,23)
        vie=py5.load_image("vie.png")
        for i in range(1,duree+1):
            py5.image(vie,py5.width-(i*30),16,20,20)
        fd.food()
        for i in range(0,len(snake)):
            if i==0:
                snake[i].snakeBody(tete[snake[i].num])
            elif (i>0) and (i<len(snake)-1) and ((abs(snake[i+1].x - snake[i-1].x)==32 and snake[i+1].y==snake[i-1].y) or (abs(snake[i+1].y-snake[i-1].y)==32 and snake[i+1].x==snake[i-1].x)):
                snake[i].snakeBody(corps[snake[i].num])
            elif i==len(snake)-1:
                snake[i].snakeBody(queue[snake[i].num])
            else:
                snake[i].snakeBody(pli[snake[i].num])
        mvt()
    elif perd<0:
        echouE()

def mvt():
    global score,perd,direction,snake,fd
    if direction==4:
        tmp=position(snake[0].x+16,snake[0].y,0)
    elif direction==3:
        tmp=position(snake[0].x-16,snake[0].y,1)
    elif direction==1:
        tmp=position(snake[0].x,snake[0].y-16,2)
    elif direction==2:
        tmp=position(snake[0].x,snake[0].y+16,3)
    snake.insert(0,tmp)
    if (fd.x==snake[0].x and fd.y==snake[0].y):
        fd=position((round(random.randint(20,800)//16))*16,(round(random.randint(20,400)//16))*16,0) 
        score=score+1
        print(len(snake))
    elif snake[0].x<=0 or snake[0].x>=py5.width or snake[0].y>=py5.height or snake[0].y<=0 or luiMeme(snake)>=1:#+an'ilay mitovy @tenany
        perd=-5
        snake.pop()
    else:
        snake.pop()

def luiMeme(snake):
    i=-1
    for corps in snake:
        if corps.x==snake[0].x and corps.y==snake[0].y:
            i=i+1
    return i

#if fd.x>=snake[0].x-3 and fd.x<=snake[0].x+3 and fd.y>=snake[0].x-3 and fd.y<=snake[0].y+3:
def gameover():
    py5.text_size(60)
    py5.text("Game Over",(py5.width/2),(200))
    py5.text_size(20)
    py5.text("Appuyez sur 'q' pour quitter et 'c' pour continuer",(py5.width/2),(py5.height/2))

def echouE():
    global direction,duree,perd,fd,snake #print(int(dist(yo,xo,obs1.x)))
    py5.text_size(50+perd)
    if duree>0:
        py5.text("Ohh!!Vous n'avez que "+str(duree-1)+" chance(s).",(py5.width/2)-(2*perd),(100)-(2*perd))
        perd=perd+0.3
        if perd >= 0:
            duree=duree-1
            i=0
            for corps in snake:
                corps.x=32-(16*i)
                corps.y=16
                i=i+1
            fd=position((round(random.randint(20,800)//16))*16,(round(random.randint(20,400)//16))*16,0)
            direction=2
            while fd.x==snake[0].x and fd.y==snake[0].y:
                fd=position((round(random.randint(20,800)//16))*16,(round(random.randint(20,400)//16))*16,0)
                direction=2
    else:
        gameover()

def key_pressed():
    global direction,avant
    avant=direction
    if py5.key_code==py5.RIGHT and direction!=3:
        direction=4
    if py5.key_code==py5.LEFT and direction!=4:
        direction=3
    if py5.key_code==py5.UP and direction!=2:
        direction=1
    if py5.key_code==py5.DOWN and direction!=1:
        direction=2
                
    if(direction==2 and avant==3) or (direction==4 and avant==1):
        snake[0]=position(snake[0].x,snake[0].y,0)
    if(direction==1 and avant==3)or(direction==4 and avant==2):
        snake[0]=position(snake[0].x,snake[0].y,2)
    if(direction==2 and avant==4)or(direction==3 and avant==1):
        snake[0]=position(snake[0].x,snake[0].y,3)
    if(direction==1 and avant==4)or(direction==3 and avant==2):
        snake[0]=position(snake[0].x,snake[0].y,1)

py5.run_sketch()