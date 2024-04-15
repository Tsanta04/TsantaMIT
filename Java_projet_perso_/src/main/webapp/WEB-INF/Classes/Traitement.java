import java.io.FileNotFoundException;
import java.io.IOException;

public interface Traitement {
	public void gnuplot(String path) throws IOException, FileNotFoundException, InterruptedException;
	public void resolution(String path) throws FileNotFoundException;
}
