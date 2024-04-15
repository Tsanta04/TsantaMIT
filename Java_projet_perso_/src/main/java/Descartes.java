import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class Descartes extends Traitement{
	public int iteration=0;
	public float pointA;
	public float pointB;
	public float resultat;
	
	public Descartes() {
		
	}

	public void setFonction(Fonction fx) {
		this.f = new Fonction();
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
			this.methode="Descartes";
			PrintWriter fd = new PrintWriter(new File(path));
			float r=0;
			float a=this.pointA,b=this.pointB;
			float tol=(float) 0.005;
			do{
				r =(float) (b-this.f.f(b)* ((b-a) / (this.f.f(b)-this.f.f(a)) ));
				a=b;
				b=r;
				fd.println(r+" "+this.f.f(r));
				this.iteration++;
			}while((Math.abs(this.f.f(r))>tol) && (b!=a) && (this.iteration<10000));
			if(this.iteration>=10000)this.iteration=-1;
			if(b==a)this.iteration=-2;
			this.resultat=r;
			this.pathDatas=path;	
			fd.close();
		}
		catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}
