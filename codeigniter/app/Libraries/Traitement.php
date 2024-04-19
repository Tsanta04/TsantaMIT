<?php
namespace App\Libraries;

abstract class Traitement {
    public $f;
    public $pathImg;
    public $pathDatas;
    public $methode;
  
    public function setFonction(Fonction $fx) {
      $this->f = $fx;
    }
    
    public function gnuplot(string $path, float $pointA, float $pointB) {
      $outputFile = "auxfile.gp";
          $gnuplotScript = fopen($outputFile, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
      fwrite($gnuplotScript, "set term png\n");
      fwrite($gnuplotScript, "set xzeroaxis\n");
      fwrite($gnuplotScript, "set yzeroaxis\n");
      fwrite($gnuplotScript, "set title '" . $this->methode . "'\n");
      fwrite($gnuplotScript, "set xlabel 'x'\n");
      fwrite($gnuplotScript, "set ylabel 'f(x) = " . $this->f->f . "'\n");
      // Removed xrange for clarity
      fwrite($gnuplotScript, "set output '" . $path . "'\n");
      fwrite($gnuplotScript, "f(x)=" . $this->f->f . "\n");
      fwrite($gnuplotScript, "plot '" . $this->pathDatas . "' w linespoints pt 28 lw 1 lc 'black' , f(x) w l lw 1 lc 'red'\n");
      fclose($gnuplotScript);
  
      exec("gnuplot " . $outputFile, $output, $returnCode); // Capture output and return code
      if ($returnCode !== 0) {
        echo "Gnuplot error: " . implode(PHP_EOL, $output) . PHP_EOL;
        $this->pathImg = "null";
      } else {
        $this->pathImg = $path;
      }
    }
  
    public abstract function resolution(string $path);
  }

?>