---
layout: page
title: Große lineare Gleichungssysteme schnell lösen
description: 
img:
importance: 4
category: Projektarbeiten
---

Wie verändert sich die Temperatur des Wassers in einem Kochtopf, wenn man die Herdplatte einschaltet? Wie wird das Wetter morgen? Und wie strömt die Luft genau an einem Flugzeugflügel oder Formel 1 Auto vorbei?

Solche Fragen begegnen uns im Alltag ständig. Dahinter stecken Prozesse wie Temperaturveränderung, Wetterverhalten oder Strömungen von Flüssigkeiten und Gasen – also Bewegung und Veränderung in Raum und Zeit.

Aber wie kann man diese Phänomene besser verstehen oder sogar vorhersagen?

### Mathematische Modelle

Mathematikerinnen beschreiben solche Vorgänge mit Hilfe von **mathematischen Modellen**. Ein mathematisches Modell ist eine Art „vereinfachtes Abbild der Wirklichkeit“: Man fasst die wichtigsten Eigenschaften eines Phänomens in Form von Gleichungen zusammen, mit denen man dann rechnen kann.

Zum Beispiel kann man die Temperatur in einem Kochtopf durch eine sogenannte **Differentialgleichung** beschreiben – eine Gleichung, die angibt, wie sich die Temperatur über Ort und Zeit verändert. Solche Gleichungen sind das Herzstück vieler Modelle in Physik, Chemie, Biologie oder Technik.

### Theorie und Praxis – zwei Seiten derselben Medaille

Mathematik kann viele Gesichter haben. Manche beschäftigen sich mit theoretischen Fragen, etwa: Wann hat eine Gleichung überhaupt eine Lösung? Ist diese Lösung eindeutig? Andere Mathematikerinnen bauen praktische Simulationen, z. B. am Computer: Wie verteilt sich die Temperatur in einem Raum über die Zeit? Wie sieht ein Wirbelsturm in einer Computersimulation aus?

Beides hängt eng zusammen: Damit Simulationen realistische und zuverlässige Ergebnisse liefern, braucht man solide theoretische Grundlagen. Und umgekehrt führen praktische Probleme oft zu neuen theoretischen Fragen.
### Simulation statt exakte Lösung

Die meisten Gleichungen, die reale Phänomene beschreiben, sind zu kompliziert, um sie per Hand oder mit einfachen Formeln zu lösen. Deshalb nutzt man den Computer. Man nähert sich der Lösung an – Schritt für Schritt, mit sogenannten numerischen Methoden. Dabei wird aus der ursprünglichen Gleichung ein Algorithmus, den der Computer bearbeiten kann.

# Kapitel 1 - Lineare Gleichungssysteme

# Lineare Gleichungssysteme – ein Einstieg

Bevor wir die Welt der partiellen Differentialgleichungen betreten, wollen wir uns zuerst mit einem grundlegenden mathematischen Werkzeug vertraut machen: **linearen Gleichungssystemen**. Solche Systeme begegnen uns in vielen Zusammenhängen – auch bei der numerischen Lösung von Differentialgleichungen, wie wir später sehen werden. Sie zu verstehen und effizient lösen zu können, ist daher eine wichtige Grundlage.

Ein **lineares Gleichungssystem** besteht aus mehreren Gleichungen, in denen mehrere Unbekannte vorkommen. Diese Gleichungen sind „linear“, weil die Unbekannten nur in erster Potenz auftreten und nicht miteinander multipliziert werden. 

Ein einfaches Beispiel mit zwei Unbekannten ist:

$$
\begin{aligned}
2x + y &= 5 \\
4x + 3y &= 11
\end{aligned}
$$

Unsere Aufgabe ist es, Werte für $$ x $$ und $$ y $$ zu finden, die **beide Gleichungen gleichzeitig erfüllen**. Dies nennt man die **Lösung** des Gleichungssystems. Je nach Anzahl der Gleichungen und Unbekannten kann es eine eindeutige Lösung, unendlich viele Lösungen oder auch keine Lösung geben.

Allgemein schreibt man ein lineares Gleichungssystem mit $$ m $$ Gleichungen und $$ n $$ Unbekannten so:

$$
\begin{aligned}
a_{1,1} x_1 + a_{1,2} x_2 + \ldots + a_{1,n} x_n &= b_1 \\
a_{2,1} x_1 + a_{2,2} x_2 + \ldots + a_{2,n} x_n &= b_2 \\
&\vdots \\
a_{m,1} x_1 + a_{m,2} x_2 + \ldots + a_{m,n} x_n &= b_m
\end{aligned}
$$

Dabei sind $$ x_1, \ldots, x_n $$ die Unbekannten, $$ a_{i,j} $$ die Koeffizienten und $$ b_1, \ldots, b_m $$ die rechte Seite.

---

## Matrix-Vektor-Form

In kompakter Form schreibt man ein lineares Gleichungssystem gerne als:

$$
Ax = b
$$

Hier ist:

- $$ A $$ eine $$ m \times n $$-Matrix mit den Koeffizienten,
- $$ x $$ ein Spaltenvektor mit den Unbekannten,
- $$ b $$ ein Spaltenvektor mit der rechten Seite.

Für unser Beispiel bedeutet das konkret:

$$
A = \begin{pmatrix}
2 & 1 \\
4 & 3
\end{pmatrix}, \quad
x = \begin{pmatrix}
x \\
y
\end{pmatrix}, \quad
b = \begin{pmatrix}
5 \\
11
\end{pmatrix}
$$

---

## Lösungsverfahren im Vergleich

Wir betrachten im Folgenden verschiedene Methoden, um ein lineares Gleichungssystem wie das oben stehende zu lösen. Dabei beginnen wir mit einem direkten Verfahren und nähern uns dann Schritt für Schritt den iterativen Methoden.

---

### 1. Das Gaußsche Eliminationsverfahren

Das **Gaußsche Eliminationsverfahren** ist ein systematischer Weg, das Gleichungssystem durch Rechenschritte in eine einfachere Form zu bringen, bei der man die Lösung direkt ablesen kann.

Unser Beispiel:

$$
\begin{aligned}
(1) \quad 2x + y &= 5 \\
(2) \quad 4x + 3y &= 11
\end{aligned}
$$

**Schritt 1:** Eliminiere $$ x $$ aus Gleichung (2). Dazu subtrahieren wir das Doppelte von Gleichung (1):

$$
(2) - 2 \cdot (1): \quad (4x + 3y) - (4x + 2y) = 11 - 10 \quad \Rightarrow \quad y = 1
$$

**Schritt 2:** Rückeinsetzen in (1):

$$
2x + 1 = 5 \quad \Rightarrow \quad x = 2
$$

**Ergebnis:** $$ x = 2 $$, $$ y = 1 $$

---

### 2. Das Jacobi-Verfahren

Das **Jacobi-Verfahren** ist ein iteratives Verfahren. Es funktioniert nach dem Prinzip: „Rate eine Lösung, verbessere sie, wiederhole das.“

Zuerst lösen wir jede Gleichung nach einer Unbekannten auf:

$$
\begin{aligned}
x &= \frac{1}{2}(5 - y) \\
y &= \frac{1}{3}(11 - 4x)
\end{aligned}
$$

**Startwert:** $$ x^{(0)} = 0 $$, $$ y^{(0)} = 0 $$

**Iteration 1:**

$$
\begin{aligned}
x^{(1)} &= \frac{1}{2}(5 - 0) = 2.5 \\
y^{(1)} &= \frac{1}{3}(11 - 0) = 3.67
\end{aligned}
$$

**Iteration 2:**

$$
\begin{aligned}
x^{(2)} &= \frac{1}{2}(5 - 3.67) \approx 0.665 \\
y^{(2)} &= \frac{1}{3}(11 - 4 \cdot 2.5) = \frac{1}{3}(11 - 10) \approx 0.33
\end{aligned}
$$

Mit jeder weiteren Iteration nähert man sich der exakten Lösung.

---

### 3. Das Gauß–Seidel-Verfahren

Das **Gauß–Seidel-Verfahren** ist ähnlich zum Jacobi-Verfahren, aber effizienter. Hier verwenden wir innerhalb einer Iteration sofort die neuesten Werte.

**Startwert:** $$ x^{(0)} = 0 $$, $$ y^{(0)} = 0 $$

**Iteration 1:**

$$
\begin{aligned}
x^{(1)} &= \frac{1}{2}(5 - 0) = 2.5 \\
y^{(1)} &= \frac{1}{3}(11 - 4 \cdot 2.5) = \frac{1}{3}(1) \approx 0.33
\end{aligned}
$$

**Iteration 2:**

$$
\begin{aligned}
x^{(2)} &= \frac{1}{2}(5 - 0.33) \approx 2.335 \\
y^{(2)} &= \frac{1}{3}(11 - 4 \cdot 2.335) \approx 0.553
\end{aligned}
$$

Das Verfahren konvergiert meist schneller als Jacobi.

---

### 4. Das SOR-Verfahren 

Das **SOR-Verfahren** ist eine Erweiterung des Gauß–Seidel-Verfahrens. Es führt einen sogenannten **Relaxationsfaktor** $$ \omega $$ ein. Der neue Wert wird als Mischung aus altem und neuem Wert berechnet:

$$
x^{(k+1)} := (1 - \omega) x^{(k)} + \omega \cdot \text{(neuer Wert aus Gauß–Seidel)}
$$

Für $$ \omega = 1 $$ ist das Verfahren identisch mit Gauß–Seidel. Für $$ \omega > 1 $$ „übertreibt“ man die Korrektur – dadurch kann die Konvergenz beschleunigt werden, wenn das System dafür geeignet ist.