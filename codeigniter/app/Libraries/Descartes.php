<?php
namespace App\Libraries;

class Descartes extends Traitement {
    public $iteration = 0;
    public $pointA;
    public $pointB;
    public $resultat;
  
    public function __construct() {
      
    }  

    public function setPointA(float $i) {
      $this->pointA = $i;
    }
  
    public function setPointB(float $i) {
      $this->pointB = $i;
    }
  
    public function resolution(string $path) {
      $this->methode = "Descartes";
      try {
          $outputFile = fopen($path, "w");
          if (!$outputFile) {
            throw new Exception("Failed to open file: " . $path);
          }
        $r = 0;
        $a = $this->pointA;
        $b = $this->pointB;
        $tol = 0.005;
  
        while ((float)abs($this->f->f($r)) > $tol && $b !== $a && $this->iteration < 10000) {
          $r = (float)($b - ($this->f->f($b) * (($b - $a) / ($this->f->f($b) - $this->f->f($a)))));
          $a = $b;
          $b = $r;
          fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
          $this->iteration++;
        }
  
        if ($this->iteration >= 10000) {
          $this->iteration = -1;
        } 
        else if ($b === $a) {
          $this->iteration = -2;
        }
  
        $this->resultat = $r;
        $this->pathDatas = $path;
        fclose($outputFile);
      } catch (Exception $e) {
        echo $e->getMessage() . PHP_EOL;
        $this->pathDatas = "null";
      }
    }
  }
?>