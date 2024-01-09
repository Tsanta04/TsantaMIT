import py5
import random

cells=[1]

def setup():
    py5.size(500,500)
    py5.frame_rate(8)
    global cells
    morte=0
    vivant=0
    for i in range (1,1024):
        if morte<361 and vivant<662:
            k=random.randint(0,1)
            cells.append(k)
            if k==0:
                morte=morte+1
            elif k==1:
                vivant=vivant+1
        elif morte>=361 and vivant<662:
            cells.append(1)
            vivant=vivant+1
        elif vivant>=662 and morte<361:
            cells.append(0)
            morte=morte+1
    x=10
    y=10
    for i in cells:
        if i==0:
            py5.fill(255,0,0)
        elif i==1:
            py5.fill(0,255,0)
        py5.rect(x,y,10,10)
        if x>=(500-25):
            x=10
            y=y+15
        else:
            x=x+15
    #print(len(cells))

def draw():
    global cells
    x=10+15
    y=10
    k=0
    test=0
    py5.frame_rate(3)
    for i in range (1,1024):
        if x>=(500-25):
            x=10+15
            y=y+15
            i=i+1
            continue
        else:
            if cells[i-1]==1:
                test=test+1
            if i<1024 and cells[i+1]==0:
                test=test+1
            for j in range (-1,1):
                if (i+j+31)<1024 and cells[i+j+31]==1:
                    test=test+1
                if i>=-(j-31) and cells[i+j-31]==1:
                    test=test+1
            if cells[i]==0 and test==3:
                #pour les cellules mortes
                py5.fill(0,255,0)
                py5.rect(x,y,10,10)
                cells[i]=1
            elif cells[i]==1 and (test<2 or test>3):
                #pour les cellules mortes
                py5.fill(255,0,0)
                py5.rect(x,y,10,10)
                cells[i]=0
            x=x+15
            test=0

py5.run_sketch()