<?php
session_start();
///Les objets

class Fonction {
  public $dim;
  public $coefficient;
  public $coeffD;
  public $coeffDD;
  public $f;
  public $fp;
  public $F;

  public function __construct() {
    // Empty constructor
  }

  public function setDim(int $x) {
    $this->dim = $x;
  }

  public function setCoeff(array $x) {
    $this->f = "";
    $this->coefficient = array_fill(0, $this->dim + 1, 0);
    for ($i = 0; $i <= $this->dim; $i++) {
      $this->coefficient[$i] = $x[$i];
      if ($i > 0) {
        $this->f .= "+";
      }
      $this->f .= "(" . $this->coefficient[$i];
      for ($j = 0; $j < ($this->dim - $i); $j++) {
        $this->f .= "*x";
      }
      $this->f .= ")";
    }
  }

  public function f(float $x) {
    $result = $this->coefficient[0];
    for ($i = 1; $i <= $this->dim; $i++) {
      $result = ($result * $x) + $this->coefficient[$i];
    }
    return $result;
  }

  public function fp(float $x) {
    $result = 0;
    $this->coeffD = array_fill(0, $this->dim, 0);
    for ($i = 0; $i <= $this->dim - 1; $i++) {
      $this->coeffD[$i] = (($this->dim - $i) * $this->coefficient[$i]);
    }
    $result = $this->coeffD[0];
    for ($i = 1; $i <= $this->dim - 1; $i++) {
      $result = ($result * $x) + $this->coeffD[$i];
    }
    return $result;
  }

  public function fpp(float $x) {
    $result = 0;
    $this->coeffDD = array_fill(0, $this->dim - 1, 0);

    for ($i = 0; $i <= $this->dim - 2; $i++) {
      $this->coeffDD[$i] = (($this->dim - $i) * $this->coeffD[$i]);
    }
    $result = $this->coeffDD[0];
    for ($i = 1; $i <= $this->dim - 2; $i++) {
      $result = ($result * $x) + $this->coeffDD[$i];
    }
    return $result;
  }
}

abstract class Traitement {
  public $f;
  public $pathImg;
  public $pathDatas;
  public $methode;

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

class Descente extends Traitement {
  public $iteration;
  public $pointI;
  public $pas;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
  }

  public function setPointI(float $i) {
    $this->pointI = $i;
  }

  public function setPas(float $alpha) {
    $this->pas = $alpha;
  }

  private function An_1(float $Da0, float $a0n, float $alpha) {
    return (float) $a0n - ($alpha * $Da0);
  }

  public function resolution(string $path) {
    $this->methode = "Descente du Gradient";
    try {
        $outputFile = fopen($path, "w");
        if (!$outputFile) {
          throw new Exception("Failed to open file: " . $path);
        }
      $dx = 0;
      $x = 0;
      $a0 = $this->pointI;
      $alpha = $this->pas;
      $tol = 0.0005;

      while ((float)abs($a0 - $x) > $tol && $this->iteration < 10000) {
        fwrite($outputFile, $a0 . " " . $this->f->f($a0) . PHP_EOL);
        $x = (float)$a0;
        $dx = 0;
        $dx =(float) $this->f->fp($x); // Assuming fp is defined in Fonction class for derivative
        $a0 = $this->An_1($dx, $x, $alpha);
        $this->iteration++;
      }

      if ($this->iteration >= 10000) {
        $this->iteration = -1;
      }

      fclose($outputFile);
      $this->resultat = $a0;
      $this->pathDatas = $path;
    } catch (Exception $e) {
      echo $e->getMessage() . PHP_EOL;
      $this->pathDatas = "null";
    }
  }
}

class NewtonM extends Traitement {
  public $iteration = 0;
  public $pointI;
  public $pas;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
  }

  public function setPointI(float $i) {
    $this->pointI = $i;
  }

  public function setPas(float $alpha) {
    $this->pas = $alpha;
  }

  public function resolution(string $path) {
    $this->methode = "Newton";
    try {
        $outputFile = fopen($path, "w");
        if (!$outputFile) {
          throw new Exception("Failed to open file: " . $path);
        }
      $r = 0;
      $x = $this->pointI;
      $tol = 0.005;

      do {
        if ($this->f->fpp($r) === 0) {
          $this->iteration = -2;
          break;
        }

        $r = $x;
        $x = (float)($r - ($this->f->fp($r) / $this->f->fpp($r)));
        fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
        $this->iteration++;
      } while ((float)abs($this->f->fp($r)) > $tol && $this->iteration < 10000);

      if ($this->iteration >= 10000) {
        $this->iteration = -1;
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

class Descartes extends Traitement {
  public $iteration = 0;
  public $pointA;
  public $pointB;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
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

class Dichotomie extends Traitement {
  public $iteration = 0;
  public $pointA;
  public $pointB;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
  }

  public function setPointA(float $i) {
    $this->pointA = $i;
  }

  public function setPointB(float $i) {
    $this->pointB = $i;
  }

  public function resolution(string $path) {
   $this->methode = "Dichotomie";
    try {
            $outputFile = fopen($path, "w");
            if (!$outputFile) {
              throw new Exception("Failed to open file: " . $path);
            }
      $r = 0;
      $a = $this->pointA;
      $b = $this->pointB;
      $tol = 0.005;

      while ((float)abs($this->f->f($r)) > $tol && $this->iteration < 10000) {
        $r = (float)(($a + $b) / 2);
        fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);

        if ($this->f->f($a) * $this->f->f($r) * $this->f->f($b) === 0) {
          $r = ($this->f->f($this->pointA) === 0) ? $a : $b;
          break;
        } else if ($this->f->f($a) * $this->f->f($r) < 0) {
          $b = $r;
        } else if ($this->f->f($b) * $this->f->f($r) < 0) {
          $a = $r;
        } else {
          $this->iteration = -1;
          break;
        }
        $this->iteration++;
      }

      if ($this->iteration >= 10000) {
        $this->iteration = -1;
      } elseif ($b === $a) {
        $this->iteration = -2;
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

class NewtonR extends Traitement {
  public $iteration = 0;
  public $pointI;
  public $resultat;

  public function __construct(Fonction $fx, float $pointI) {
    $this->f = $fx;
    $this->pointI = $pointI;
  }

  public function getFonction(): Fonction {
    return $this->f;
  }

  public function getIteration(): int {
    return $this->iteration;
  }

  public function getPointI(): float {
    return $this->pointI;
  }

  // No setter for pathImg as it's not defined in the original class

  public function getResultat(): float {
    return $this->resultat;
  }

  public function resolution(string $path) {
    $this->methode = "Newton";
    try {
        $outputFile = fopen($path, "w");
        if (!$outputFile) {
          throw new Exception("Failed to open file: " . $path);
        }
      $r = 0;
      $x = $this->pointI;
      $tol = 0.00001;

      do {
        if ($this->f->fp($r) === 0) {
          $this->iteration = -2;
          break;
        }

        $r = $x;
        $x =(float) ($r - ($this->f->f($r) / $this->f->fp($r)));
        fwrite($outputFile, $r . " " . $this->f->f($r) . PHP_EOL);
        $this->iteration++;
      } while ((float)(abs($this->f->f($r))) > $tol && $this->iteration < 10000);

      if ($this->iteration >= 10000) {
        $this->iteration = -1;
      }

      fclose($outputFile);
      $this->resultat = $r;
    } catch (Exception $e) {
      echo $e->getMessage() . PHP_EOL;
    }
  }
}

class Rectangle extends Traitement {
  public $pointA;
  public $pointB;
  public $pas;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
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

class Simpson extends Traitement {
  public $pointA;
  public $pointB;
  public $pas;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
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

class Trapeze extends Traitement {
  public $pointA;
  public $pointB;
  public $pas;
  public $resultat;

  public function setFonction(Fonction $fx) {
    $this->f = $fx;
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
    $this->methode = "Trapeze";
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
        $y = $a;
        $x = $a + $h;
        if ($this->f->f($a) > $this->f->f($a + $h)) {
          $y = $a;
          $x = $a + $h;
        }
        $r +=(float) ((($this->f->f($x) + $this->f->f($y)) * $h) / 2);
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

///Les fonctions utiles
function getFonction(){
  $fx = new Fonction();
  $fx->setDim((int)$_POST["dim"]);
  $coef = array_fill(0, $fx->dim + 1, 0);
  for ($i = 0; $i <= $fx->dim; $i++) {
    $coef[$i] = (float)$_POST[($i + 100)];
  }

  $fx->setCoeff($coef);
  return $fx;
}

function traitement() {
      $fx = getFonction();
        
      if (isset($_POST['methode']) && $_POST['methode'] == 1) {
        $f = new Dichotomie();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointA']);
        $f->setPointB((float)$_POST['pointB']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
    
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->iteration;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;

        $_SESSION["url"] = "Dashboard.php?mode=A";
      }
      if (isset($_POST['methode']) && $_POST['methode']  == 2) {
        $f = new NewtonR();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointI']);
        $f->setPointB((float)$_POST['pointI']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB);

        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->iteration;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;

        $_SESSION["url"] = "Dashboard.php?mode=A";
    }		
    else if (isset($_POST['methode']) && $_POST['methode'] == 3) {
        $f = new Descartes();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointA']);
        $f->setPointB((float)$_POST['pointB']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB);
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->iteration;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;
      
        $_SESSION["url"] = "Dashboard.php?mode=A"; // Assuming $this is an object with a url property
      }
      
      else if (isset($_POST['methode']) && $_POST['methode'] == 4) {
        $f = new NewtonM();
        $f->setFonction($fx);
        $f->setPointI((float)$_POST['pointI']);
        $f->setPas((float)$_POST['pas']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointI, $f->pointI); // Assuming gnuplot function exists
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->iteration;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointI;
        $_SESSION["pointB"] = "--"; // No pointB for Newton's method
      
        $_SESSION["url"] = "Dashboard.php?mode=B"; // Assuming $this is an object with a url property
      } 
      
      else if (isset($_POST['methode']) && $_POST['methode'] == 5) {
        $f = new Descente();
        $f->setFonction($fx);
        $f->setPointI((float)$_POST['pointI']);
        $f->setPas((float)$_POST['pas']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointI, $f->pointI); // Assuming gnuplot function exists
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->iteration;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointI;
        $_SESSION["pointB"] = "--"; // No pointB for descent method
      
        $_SESSION["url"] = "Dashboard.php?mode=B"; // Assuming $this is an object with a url property
      }
      
      else if (isset($_POST['methode']) && $_POST['methode'] == 6) {
        $f = new Rectangle();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointA']);
        $f->setPointB((float)$_POST['pointB']);
        $f->setPas((float)$_POST['pas']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->pas; // Assuming 'pas' represents iterations for rectangle rule
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;
      
        $_SESSION["url"] = "Dashboard.php?mode=C"; // Assuming $this is an object with a url property
      } 
      
      else if (isset($_POST['methode']) && $_POST['methode'] == 7) {
        $f = new Trapeze();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointA']);
        $f->setPointB((float)$_POST['pointB']);
        $f->setPas((float)$_POST['pas']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB); // Assuming gnuplot function exists
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->pas; // Assuming 'pas' represents iterations for trapezoidal rule
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;
      
        $_SESSION["url"] = "Dashboard.php?mode=C"; 
      } 
      
      else if (isset($_POST['methode']) && $_POST['methode'] == 8) {
        $f = new Simpson();
        $f->setFonction($fx);
        $f->setPointA((float)$_POST['pointA']);
        $f->setPointB((float)$_POST['pointB']);
        $f->setPas((float)$_POST['pas']);
        $f->resolution("datas.txt");
        $f->gnuplot("function.png", $f->pointA, $f->pointB);
      
        $_SESSION["methode"] = $f->methode;
        $_SESSION["fonction"] = $f->f->f;
        $_SESSION["iteration"] = $f->pas;
        $_SESSION["path"] = $f->pathImg;
        $_SESSION["resultat"] = $f->resultat;
        $_SESSION["coef"] = $f->f->coefficient;
        $_SESSION["pointA"] = $f->pointA;
        $_SESSION["pointB"] = $f->pointB;
      
        $_SESSION["url"] = "Dashboard.php?mode=C";
      }
      
    if($_SESSION["iteration"]==-1) {
        $_SESSION["iteration"]="indefinie";
        $_SESSION["resultat"] = "Aucune solution";
    }
    else if($_SESSION["iteration"]==-2) {
        $_SESSION["iteration"]="indefinie";
        $_SESSION["resultat"] = "Les donnees entrees ne sont pas compatibles avec cette methode.";
    }
    else if($_SESSION["iteration"]>=0) {}
}

    traitement();
    header('Location:'.$_SESSION["url"]."'");

?>