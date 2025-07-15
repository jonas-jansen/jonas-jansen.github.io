---
layout: page
title: Fortgeschrittene Aufgaben
description: 
img: 
importance: 2
category: Pythonaufgaben
---

# Iterative numerische Verfahren

### Das Heron-Verfahren

In dieser Aufgabe lernen wir ein Verfahren kennen, dass die Quadratwurzel einer positiven reellen Zahl annähert. Eine Annäherung genügt für numerische Probleme vollständig, da zum Beispiel schon $\sqrt{2}$ irrational ist und nicht als Bruch zweier Zahlen geschrieben werden kann. Das heißt, für einen Computer ist $\sqrt{2}$ am einfachsten als $1.4142135623730950$ darstellbar.

Natürlich könnten wir einfach `math` oder `numpy` importieren und die Funktionen `math.sqrt`oder `numpy.sqrt`verwenden. Hier lernen wir aber das Heron-Verfahren, das sehr schnell die Wurzel einer positiven reellen Zahl berechnet.

Die Idee dabei ist die folgende: sei $A$ die Zahl, deren Quadratwurzel gesucht ist. Dann wissen wir, dass $\sqrt{A}^2 = A$ gelten soll. Das bedeutet, $\sqrt{A}$  ist die Seitenlänge des Quadrats mit Flächeninhalt $A$. Wenn wir also das Quadrat konstruieren können, sind wir fertig. Und dies machen wir iterativ.

Wir beginnen, sehr naiv, mit einem Rechteck mit den Seitenlängen $x_1 = A$ und $y_1 = 1$. Dieses Rechteck hat den Flächeninhalt $x_1\cdot y_1 = A$. Nun möchten wir das Rechteck so verändern, dass es mehr wie ein Quadrat aussieht. Und das machen wir so: stelle dir vor $x_1 > y_1$. Dann wollen wir $x_1$ verkleinern und $y_1$ vergrößern. Eine ganz einfache Möglichkeit das zu tun, ist den Mittelwert der beiden Zahlen zu verwenden, also
$$ x_2 = \frac{x_1+y_1}{2}.$$
Frage: Wie muss $y_2$ gewählt werden, damit das Rechteck mit den Seitenlängen $x_2$ und $y_2$ den Flächeninhalt $A$ hat?

Nun haben wir ein neues Rechteck mit den Seitenlängen $x_2$ und $y_2$. Und damit können wir wieder von vorne anfangen. (Wann immer wir hören, dass sich ein Prozess wiederholt, sollten wir daran denken, eine Schleife zu verwenden.)

Und genau das tun wir und wiederholen diesen Schritt immer und immer wieder. Aber wie lange? Wir sind ja nun nur daran interessiert, eine Näherung zu finden. Also würden wir gerne sagen können, wann $x_k$ (oder $y_k$, das ist egal) ungefähr $\sqrt{A}$ ist. Aber das ist einfach: denn, wenn $x_k^2 \sim A$, dann muss $x_k \sim \sqrt{A}$ sein. Aber wie können wir das ungefähr implementieren? Dafür legen wir ganz am Anfang eine Fehlertoleranz fest. Dafür definieren wir uns eine `float`-Variable `fehlertoleranz` und testen am Ende jeder Iteration, ob $|x_k^2 - A| < fehlertoleranz$ ist. Wenn ja, brechen wir die Schleife ab. Wählen wir jetzt `fehlertoleranz`sehr klein, können wir sicher sein, dass wir $\sqrt{A}$ gut approximiert haben.

Aufgabe: implementiere eine Funktion `Heron`, die die Quadratwurzel jeder positiven reellen Zahl mit einer gegebenen Fehlertoleranz bestimmt.

### Das Newton-Verfahren

In dieser Aufgabe lernen wir eine Möglichkeit kennen, schnell Nullstellen von Funktionen anzunähern, das heißt, wir lösen die Gleichung
$$ f(x) = 0 $$
für eine Funktion $f$. Zum Beispiel könnte $f(x) = 4x^3 - 6x^2 + 1$ sein. Die Idee ist nun folgende: wir wählen uns irgendeinen Startpunkt $x_0$ und bestimmen die Tangente an den Punkt $x_0$.

Erinnerung: die Tangente an den Punkt $x_0$ von $f$ hat die Form $y = f'(x_0) x + n$. Um $n$ zu bestimmen, bemerken wir, dass bei $x=x_0$ also $y=f(x_0)$ gelten muss, also $f(x_0) = f'(x_0)x_0 + n$, oder, nach $n$ aufgelöst, $n= f(x_0) - f'(x_0)x_0$. (Wenn du das nicht sofort siehst, macht das nichts. Probiere die Rechnung mal mit der expliziten Funktion oben und $x_0=1$ selbst aus.) Das gibt uns die Tangentengleichung $y= f'(x_0) x + f(x_0) - f'(x_0)x_0$.

Dann suchen wir einfach die Nullstelle der Tangente und nennen den Punkt $x_1$. Es gilt
$$ x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}.$$
Überzeuge dich selbst davon, dass das Ergebnis stimmt. Wie beim Heron-Verfahren können wir das nun iterativ fortsetzen und genau dann aufhören, wenn $$]f(x_n)| < fehlertoleranz$$ für eine vorher festgelegte Fehlertoleranz ist.

Um das zu implementieren benötigen wir: eine Funktion `f(x)`und eine Funktion `ableitung_f(x)` und dann eine Funktion `Newton(x_0,fehlertoleranz,f,ableitung_f)`.

    1) Implementiere das Newton-Verfahren wie oben.
    2) Momentan müssen wir noch für jede Funktion die Ableitung von Hand berechnen. Das kann aber schnell sehr kompliziert werden. Hast du eine Idee, wie man die Ableitung einer Funktion annäherungsweise bestimmen kann?

