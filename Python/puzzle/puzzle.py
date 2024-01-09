import py5
import random

pos_x=[25,138,251,364]
pos_y=[25,138,251,364]
images=[]
#pos_y=[50,175,330]

class img:
    def __init__(self,a,b,c):
        self.id=a
        self.x=b
        self.y=c        

def setup():
    py5.size(500,500)
    global pos_x,pos_y,images
    k=0
    nom_image=0
    # for x in pos_x:
    #     for y in pos_y:
    #         if k==0:
    #             images=[img(k,x,y)]
    #         else:
    #             images.append(img(k,x,y))
    #         if k!=3:
    #             nom_image='Img/'+str(k)+'.jpg'
    #         elif k==3:
    #             nom_image="Img/3.jpeg"
    #         image=py5.load_image(nom_image)
    #         py5.image(image,images[k].x,images[k].y,110,110)        
    #         k=k+1

    for i in range (0,16):
        if i==0:
            a=random.randint(0,3)
            b=random.randint(0,3)
            images=[img(i,pos_x[a],pos_y[b])]
        else:
            test=123
            while test!=0:
                test=0
                a=random.randint(0,3)
                b=random.randint(0,3)
                for j in range (0,len(images)):
                    if pos_x[a]==images[j].x and pos_y[b]==images[j].y:
                        test=1
            images.append(img(i,pos_x[a],pos_y[b]))
        if i!=3:
            nom_image='Img/'+str(i)+'.jpg'
        elif i==3:
            nom_image="Img/3.jpeg"
        image=py5.load_image(nom_image)
        py5.image(image,images[len(images)-1].x,images[len(images)-1].y,110,110)        

def draw():
    global pos_x,pos_y,images
    test=0
    k=0
    for x in pos_x:
        for y in pos_y:
            if images[k].x==x and images[k].y==y:
                test=test+1
            k=k+1
    if test==16:
        win()

def mouse_clicked():
    x=0
    y=0
    id=0
    global pos_x,pos_y
    for i in range (0,4):
        if (py5.mouse_x<(pos_x[i]+110) and py5.mouse_x>pos_x[i]):
            x=pos_x[i]
            break
    for i in range (0,4):
        if (py5.mouse_y<(pos_y[i]+110) and py5.mouse_y>pos_y[i]):
            y=pos_y[i]
            break
    for i in range (0,16):
        if images[i].x==x and images[i].y==y:
            id=i
            break
    if (abs(x-images[3].x)==113 and y==images[3].y) or (abs(y-images[3].y)==113 and x==images[3].x):
        images[id].x=images[3].x
        images[id].y=images[3].y
        images[3].x=x
        images[3].y=y    
    for i in range (0,16):
            if i!=3:
                nom_image='Img/'+str(i)+'.jpg'
            elif i==3:
                nom_image="Img/3.jpeg"
            image=py5.load_image(nom_image)
            py5.image(image,images[i].x,images[i].y,110,110)        

def win():
    #py5.text_font("Arial",60)
    py5.text_size(60)
    py5.fill(0,255,0)
    py5.text("YOU WIN",141,(py5.height/2)-25)
    py5.fill(6,6,6)
    py5.text_size(20)
    py5.text("Press 'q' to quit and 'c' to continue",102,(py5.height/2)+25)

def key_pressed():
    if py5.key=='q':
        py5.exit_sketch()
    if py5.key=='c':
        global pos_x,pos_y,images
        for i in range (0,16):
            if i==0:
                a=random.randint(0,3)
                b=random.randint(0,3)
                images=[img(i,pos_x[a],pos_y[b])]
            else:
                test=123
                while test!=0:
                    test=0
                    a=random.randint(0,3)
                    b=random.randint(0,3)
                    for j in range (0,len(images)):
                        if pos_x[a]==images[j].x and pos_y[b]==images[j].y:
                            test=1
                images.append(img(i,pos_x[a],pos_y[b]))
            if i!=3:
                nom_image='Img/'+str(i)+'.jpg'
            elif i==3:
                nom_image="Img/3.jpeg"
            image=py5.load_image(nom_image)
            py5.image(image,images[len(images)-1].x,images[len(images)-1].y,110,110)        

py5.run_sketch()