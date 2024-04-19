set term png
set xzeroaxis
set yzeroaxis
set title 'Dichotomie'
set xlabel 'x'
set xrange [2:3]
set ylabel 'f(x) = (1*x*x)+(2*x)+(3)'
set output 'function.png'
f(x)=(1*x*x)+(2*x)+(3)
plot 'datas.txt' w linespoints pt 28 lw 1 lc 'black' , f(x) w l lw 1 lc 'red'
