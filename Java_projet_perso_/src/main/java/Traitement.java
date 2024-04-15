import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.tomcat.jakartaee.commons.io.IOUtils;

public abstract class Traitement {
	public Fonction f;
	public String image;
	public String pathImg;
	public String pathDatas;
	public String methode;
	
	public void getByteImage() throws IOException {
		//obtenir l'image
		Path imgFile= Paths.get(this.pathImg);
		try(InputStream inputStream = Files.newInputStream(imgFile)) {
			byte[] imageTmp = IOUtils.toByteArray(inputStream);
			this.image= java.util.Base64.getEncoder().encodeToString(imageTmp);
		}catch(Exception e) {
			e.printStackTrace();
			this.image=null;
			this.pathImg="nulle";
		}
	}
	
	public void gnuplot(String path,float pointA,float pointB) throws IOException, FileNotFoundException, InterruptedException{
		// TODO Auto-generated method stub
		try {
			FileWriter outF = new FileWriter("auxfile.gp");
	        PrintWriter out = new PrintWriter(outF);
	        // Gnuplot parameters
	        out.println("set term png\n");
	        out.println("set xzeroaxis\n");
	        out.println("set yzeroaxis\n");
	        out.println("set title '"+this.methode+"'\n");
	        out.println("set xlabel 'x'\n");
	        out.println("set ylabel 'f(x) = "+f.f+"'\n");
//	        out.println("set xrange [-100:100]\n");
//	        out.println(String.format("set xrange [%f:%f]\n", (pointA-30), (pointB+30)));
	        out.println("set output '" + path + "'\n");
	        out.write("f(x)=" + f.f + "\n");
	        out.write("plot '" + this.pathDatas + "' w linespoints pt 28 lw 1 lc 'black' , f(x) w l lw 1 lc 'red'\n");  // Use 'replot' for clarity
	        out.close();
	
	        // Exécution de Gnuplot
	        Runtime.getRuntime().exec("gnuplot auxfile.gp");
	        this.pathImg=path;
		}catch(Exception e) {
			e.getStackTrace();
			this.pathImg="null";
		}
	}
	
	public abstract void resolution(String path) throws FileNotFoundException;
}
