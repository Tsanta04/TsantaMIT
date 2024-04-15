import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

public class NewtonR extends Traitement{
	public int iteration=0;
	public float pointI;
	public float resultat;
	
	public NewtonR() {
		
	}

	public Fonction getFonction(){return this.f; }
	public int getIteration(){return this.iteration; }	
	public float getPointI(){return this.pointI; }
	public String getPathImg(){return this.pathImg; }
	public float getResultat(){return this.resultat; }
	
	public void setFonction(Fonction fx) {
		this.f = fx;
	}

	public void setPointI(float i) {
		this.pointI = i;
	}

	public void resolution(String path) throws FileNotFoundException {
		try {
			this.methode="Newton";		
			PrintWriter fd = new PrintWriter(new File(path));
			float r=0;
			float a=this.pointI;
			float tol=(float) 0.00001;
			float x=a-(f.f(a)/f.fp(a));
			do{
				if(f.fp(r)==0) {
					this.iteration=-2;
					break;
				}
				r=x;
				x=r-(f.f(r)/f.fp(r));
				fd.println(r+" "+f.f(r));
				this.iteration++;
			}while((Math.abs(f.f(r))>tol) && (this.iteration<10000));
			if(this.iteration>=10000)this.iteration=-1;
			this.pathDatas=path;
			this.resultat=r;
			fd.close();
		}catch(Exception e) {
			e.getStackTrace();
			this.pathDatas="null";
		}
	}
}