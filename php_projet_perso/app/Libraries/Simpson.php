<?php
namespace App\Libraries;

class Simpson extends Traitement {
    public $pointA;
    public $pointB;
    public $pas;
    public $resultat;

    public function __construct() {
      
    }  
    
    public function setPointA(float $i) {
      $this->pointA = $i;
    }
  
    public function setPointB(float $i) {
      $this->pointB = $i;
    }
  
    public function setPas(float $i) {
      $this->pas = $i;
    }
  
    public function resolution(string $path) {
      $this->methode = "Simpson";
      try {
          $outputFile = fopen($path, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
        $r = 0;
        $a = min($this->pointA, $this->pointB);
        $b = max($this->pointA, $this->pointB);
        $h =(float) (($b - $a) / $this->pas);
  
        // Even terms (multiples of 2)
        for ($i = 2; $i < $this->pas; $i += 2) {
          $r +=(float) (2 * $this->f->f($a + $i * $h));
          fwrite($outputFile, ($a + $i * $h) . " " . $this->f->f($a + $i * $h) . PHP_EOL);
        }
  
        // Odd terms (multiples of 1)
        for ($i = 1; $i < $this->pas; $i += 2) {
          $r +=(float) (4 * $this->f->f($a + $i * $h));
          fwrite($outputFile, ($a + $i * $h) . " " . $this->f->f($a + $i * $h) . PHP_EOL);
        }
  
        $this->resultat =(float) (($h / 3) * $r);
        fclose($outputFile);
        $this->pathDatas = $path;
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        $this->pathDatas = "null";
      }
    }
  }
?>