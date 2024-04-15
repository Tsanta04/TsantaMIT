import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class Dichotomie extends Traitement{
	public int iteration=0;
	public float pointA;
	public float pointB;
	public float resultat;
	
	public Dichotomie() {
		
	}


	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointA(float i) {
		this.pointA = i;
	}

	public void setPointB(float i) {
		this.pointB = i;
	}

	public void resolution(String path) throws FileNotFoundException {
		try {
			this.methode="Dichotomie";
			PrintWriter fd = new PrintWriter(new File(path));
			float r=0;
			float a=this.pointA,b=this.pointB;
			float tol=(float) 0.005;
			while(Math.abs(f.f(r))>tol && this.iteration<10000){
				r=(a+b)/2;
				fd.println(r+" "+f.f(r));
				if((f.f(a)*f.f(r)*f.f(b))==0){
					if(f.f(this.pointA)==0)r=a;
					else if(f.f(b)==0)r=b;
					break;
				}
				else if((f.f(a)*f.f(r))<0){
					b=r;
				}
				else if((f.f(b)*f.f(r))<0){
					a=r;
				}
				else{
					this.iteration=-1;
					break;
				}
				this.iteration++;
			}
			if(this.iteration>=10000)this.iteration=-1;
			if(b==a)this.iteration=-2;
			fd.close();
			this.resultat=r;
			this.pathDatas=path;
		}catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}
