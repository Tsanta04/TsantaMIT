set term png
set xzeroaxis
set yzeroaxis
set title 'Dichotomie'
set xlabel 'x'
set ylabel 'f(x) = (5*x*x*x*x)+(-6*x*x*x)+(1*x*x)+(1*x)+(1)'
set output 'function.png'
f(x)=(5*x*x*x*x)+(-6*x*x*x)+(1*x*x)+(1*x)+(1)
plot 'datas.txt' w linespoints pt 28 lw 1 lc 'black' , f(x) w l lw 1 lc 'red'
