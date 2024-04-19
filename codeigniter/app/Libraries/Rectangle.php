<?php
namespace App\Libraries;

class Rectangle extends Traitement {
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
      $this->methode = "Rectangle";
      try {
          $outputFile = fopen($path, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
        $r = 0;
        $a = min($this->pointA, $this->pointB);
        $b = max($this->pointA, $this->pointB);
        $h =(float) (($b - $a) / $this->pas);
  
        for ($i = 0; $i < $this->pas; $i++) {
          fwrite($outputFile, $a . " " . $this->f->f($a) . PHP_EOL);
          $r +=(float) (($this->f->f($a) * $h));
          $a += $h;
        }
  
        fclose($outputFile);
        $this->resultat = $r;
        $this->pathDatas = $path;
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        $this->pathDatas = "null";
      }
    }
  }
?>