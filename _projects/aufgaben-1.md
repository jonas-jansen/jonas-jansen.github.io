---
layout: page
title: Aufgaben zur Einführung in Python
description: 
img: 
importance: 1
category: Pythonaufgaben
---

### Aufgabe: print()
Teste den unten stehenden Code und versuche zu raten, was passiert sein könnte.
```python
print("Hallo")
print("Welt")

print("Hallo", "Welt")

print("Hallo" + " Welt")

print("Hallo\nWelt")

text = "Hallo Welt"
print(text)

name = "Welt"
print(f"Hallo {name}")

print("""
Hallo Welt!
Wie geht es dir?
""")

jahr = 2024
print("Hallo Welt, im Jahr", jahr)
```
---
### Aufgabe: Ausgabe

Schreibe ein Programm, das folgendes ausgibt:
```
***********
*  Hallo  *
*  Welt   *
***********
```
---
### Aufgabe: Wo ist der Fehler?

Probiere folgenden Code aus:
```python
pi = 3.14159265
radius = 2.
kreisflaeche = radius**2 * pi
print("Ein Kreis mit Radius", radius, "hat eine Fläche von", kreisflaeche)
radius = 3.
print("Hat ein Kreis mit", radius, "eine Fläche von", kreisflaeche, "?")
```

Wo liegt das Problem?

---
### Aufgabe: Wahrheitswerte

Welche Wahrheitswerte erwartest du bei folgenden Variablen?

```python
pi = 3.14159265 groesse_ihres_computers = 4.5 großer_computer = groesse_ihres_computers > 2 ist_pi_gleich_drei = pi == 3 und_operator = großer_computer and ist_pi_gleich_drei oder_operator = großer_computer or ist_pi_gleich_drei not_operator = not(ist_pi_gleich_drei)
```
---
### Aufgabe: Benutzereingaben
1) Schreibe ein Programm, das den Benutzer erst nach seinem Namen und dann nach seinem Geburtsjahr fragt. Gib dann den Namen des Benutzers und sein Geburtsjahr in einem ganzen Satz aus.
2) Schreibe ein Programm, das eine ganze Zahl einliest und dann das Quadrat dieser Zahl ausgibt.
3) Schreibe ein Programm, das zwei ganze Zahlen einliest und die größere der beiden Zahlen ausgibt.

---

# Arbeiten mit Listen und Schleifen

### Aufgabe: Erzeuge Listen

Erzeuge folgende Listen, die folgende Elemente beinhalten:
- Alle geraden Zahlen zwischen 2 und 20
- Die Zahlen 11,14,17,20,23 und 26.
- Die Zahlen 100,98,96, und so weiter bis 2,0.

---
### Aufgabe: Zahlen raten

Schreibe ein Ratespiel, bei dem eine Zahl zwischen $1$ und $20$ geraten werden soll. Nutze die Funktion `random.randint(1,20)`, um eine zufällige ganze Zahl zwischen $1$ und $20$ zu erzeugen. Gebe dem Spieler Hinweise, ob seine Vermutung zu groß oder zu klein war.

---
### Aufgabe: Schnick-Schnack-Schnuck

Entwickle ein Python-Programm für das Spiel Schnick-Schnack-Schnuck, in dem ein Mensch gegen den Computer antritt. Sieger soll sein, wer zuerst drei Spiele gewonnen hat. Überlege dir zuerst, wie du Stein,Schere und Papier darstellen kannst, dass das für den Computer einfach ist.

---
### Aufgabe: Der kleine Gauß

Entwickle ein Programm, bei dem der Nutzer die ganze Zahl $n$ eingibt und der Computer dann 
die Summe aller Zahlen bis $n$ ausgibt, also $1+2+\ldots+n$.

---
### Aufgabe: Summen

In der vorigen Aufgabe hast du die Summe aller natürlichen Zahlen bis $n$ bestimmt. Mathematiker haben sich dafür eine tolle Notation ausgedacht:

$$ 1 + 2+ \ldots + n = \sum_{k=1}^{n} k$$

Wie ist das zu verstehen: $k$ ist der Laufparameter: er beginnt bei $1$ und endet bei $n$ und nimmt alle ganzzahligen Werte zwischen $1$ und $n$ an. Das $\Sigma$ bedeutet dann, dass all die Werte, die dahinter stehen, aufaddiert werden. Also auch

$$ \sum_{k=1}^{n} k^2 = 1^1 + 2^2 + 3^2 + \ldots + (n-1)^2 + n^2.$$

Zur Übung: schreibe von Hand folgende Summen auf

$$ \sum_{k=1}^{5} k^3,\quad \sum_{k=3}^{6} (k-1),\quad \sum_{k=0}^{2} k! $$

Implementiere ein Programm, das $n$ einliest und die Summe

$$ \sum_{k=1}^{n} k*(k-1)$$

ausgibt.

---
### Aufgabe: Reihen

Implementiere ein Programm, das eine natürliche Zahl $$n$$ und eine Gleitkommzahl $$x$$ einliest und

$$\sum_{k=0}^{n} \frac{1}{n!}x^n$$

ausgibt. Teste die Funktion mit $$x=1$$
und $$n$$ groß. Kennst du das Ergebnis schon?

Man nennt dieses Verhalten Konvergenz: wenn $$n$$ größer und größer wird, kommt die Summe $$e^x$$ immer näher, wir schreiben auch:

$$\sum_{k=0}^{n} \frac{1}{n!}x^n \longrightarrow e^x \quad \text{für } n\to \infty.$$

Verwende die Konvergenz

$$\sum_{k=1}^{n} \frac{1}{k!} \longrightarrow \frac{\pi^2}{6} \quad \text{für } n\to \infty,$$

um $$\pi$$ anzunähern.

---
# Die ersten Funktionen

### Aufgabe: pq-Formel

Implementiere eine Funktion, die die reellen Zahlen $a,b,c$ einliest und die Nullstellen des Polynoms

$$ ax^2 + bx + c = 0 $$

ausgibt.

---
### Aufgabe: Bestimmung des Flächeninhalts eines Kreises

Um den Flächeninhalt eines Kreises mit Radius $$r>0$$ zu bestimmen, kann man natürlich die Formel $$A = \pi r^2$$ verwenden. Aber was ist, wenn man $$\pi$$ nicht kennt?
Wir können umgekehrt versuchen, $$\pi$$ zu bestimmen, indem wir den Flächeninhalt eines Kreises approximieren. Eine Möglichkeit geht so: wir betrachten das Quadrat mit Seitenlänge $$2r,$$in dem der Kreis liegt. Wir erzeugen ganz viele zufällige Punkte im Quadrat und entscheiden, ob ein Punkt im Kreis liegt oder nicht. Wenn wir dann die Punkte im Kreis durch die Gesamtzahl der Punkte teilen, erhalten wir eine gute Annäherung an den Flächeninhalt des Kreises.

Man kann sich den Prozess vorstellen, als würde es gleichmäßig auf das Quadrat herabregnen. Die Wahrscheinlichkeit, dass ein Regentropfen innerhalb des Kreises landet, entspricht dem Verhältnis der Flächeninhalte von Kreis zu Quadrat. Multipliziert man diese Wahrscheinlichkeit mit der Fläche des Quadrats, erhält man die Fläche des Kreises.

Implementiere eine Funktion, die die Anzahl an Punkten $$n$$ erhält und dann den Flächeninhalt des Kreises mit Radius $$r=1$$ so approximiert.

Hilfe: Mit Hilfe der Funktion `random.uniform(-1,1)`kannst du eine Zufallszahl zwischen -1 und 1 erzeugen. Wenn du einen Punkt $$(x,y)$$ gewählt hast, kannst du prüfen, ob $$ x^2 + y^2 < 1$$ gilt, um herauszufinden, ob er im Kreis mit Radius 1 liegt.


---
### Die Collatz-Vermutung

Implementiere folgende Funktion: die Funktion soll eine ganze Zahl $n$ erhalten. Sie soll dann die Folge von Zahlen mit folgenden Eigenschaften bestimmen: $x_1 = n$. Für das nächste Element $x_2$ der Folge gilt dann: wenn $x_1$ gerade ist, ist $x_2 = \frac{n}{2}$; wenn $x_1$ ungerade ist, ist $x_2 = 3n+1$. Genauso bestimmen wir $x_3$ aus $x_2$ und so weiter. Lass die Funktion eine Liste mit den so erhaltenen Zahlen ausgeben. Teste deine Funktion mit ganz vielen Anfangswerten $n$. Erkennst du ein Muster?

(Dieses Muster ist auch unter dem Namen Collatz-Vermutung bekannt. Lothar Collatz hat 1937 die Vermutung aufgestellt, dass für jede natürliche Zahl $n$ irgendwann dieses Muster entsteht. Aber bisher konnte das niemand beweisen.)

---
### Aufgabe: Fakultät

Besondere Funktionen sind rekursive Funktionen. Das sind Funktionen, die sich selbst wieder aufrufen. Ein einfaches Beipspiel ist die Fakultät einer positive ganzen Zahl, geschrieben $n!$. $n!$ ist einfach das Produkt aller positiven ganzen Zahlen bis $n$, also $n! = 1\cdot 2\cdot 3 \cdots (n-1)\cdot n$. Wir könnten das natürlich einfach über eine Schleife implementieren.
Aber manchmal ist es besser, etwas anderes zu bemerken. Und zwar: $n! = (n-1)! \cdot n$. Also, wenn wir schon die Fakultät von $n-1$ kennen, können wir diese einfach mit $n$ multiplizieren. Aber wie können wir die Fakultät von $n-1$ kennen? Naja, wenn wir $(n-2)!$ kennen würden, wäre das einfach, und so weiter. Aber wie hört das auf? Naja, $1! = 1$ ist eine gute Abbruchbedingung.
Wir können das nun auch Python beibringen: schreibe eine Funktion `fakultaet(n)`, die folgendes macht: wenn $n=1$ ist, gibt sie einfach $1$ zurück. Sonst gibt sie `fakultaet(n-1) * n`zurück.

---
### Aufgabe: Fibonacci-Zahlen

Ein anderes Problem, das man rekursiv lösen kann, sind Fibonacci-Zahlen. Fibonacci-Zahlen sind die Zahlen $1,1,2,3,5,8,13,21,34,55,\ldots$ und so weiter. Erkennst du das Muster? Wenn ja, kannst du bestimmt erklären, warum wenn $x_k$ die $k$-te Fibonacci-Zahl ist, gilt, dass
$$x_k = x_{k-1} + x_{k-2}$$
gilt. Bestimme die $k$-te Fibonacci-Zahl mit einem rekursiven Algorithmus. (Hinweis: wie viele Grundfälle benötigst du? Überlege mal, was du festlegen musst, um $x_3$ eindeutig zu bestimmen.)

Nachdem du das implementiert hast, berechne mal die 50-te, 60-te und 70-te Fibonacci-Zahl. Was stellst du fest? Hast du eine Idee, warum? Findest du einen anderen Weg, die Fibonacci-Zahlen zu bestimmen?

---
# Mehrdimensionale Listen

### Tic-Tac-Toe

Implementiere das Spiel Tic-Tac-Toe. Verwende für die Darstellung des Spielbretts eine mehrdimensionale Liste.