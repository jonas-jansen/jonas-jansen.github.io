---
layout: page
title: Aufgaben zu Klassen
description: 
img: 
importance: 3
category: Pythonaufgaben
---


### Aufgabe: Geometrische Formen

Schreibe eine Klasse `Rechteck`. Welche Attribute sollte diese Klassen haben? Schreibe Methoden, die den Flächeninhalt und Umfang zurückgeben. Schreibe eine Methode, die zurückgibt, ob das Rechteck ein Quadrat ist.


### Aufgabe: Klasse rationale Zahlen

Schreibe eine Klasse `Bruch`, die eine rationale Zahl als Bruch darstellen kann. Implementiere folgende Methoden:
- Kürze den Bruch vollständig. (Bestimme dafür den ggT)
- Gebe die Dezimaldarstellung des Bruchs an
- Schreibe eine Funktion `__str__`, die den Bruch ausgibt.
- Schreibe Funktionen, um Brüche zu addieren, subtrahieren, multiplizieren, teilen, potenzieren.


### Aufgabe: Vier gewinnt

In dieser Aufgabe soll das Spiel Vier gewinnt implementiert werden. Wir gehen die Aufgabe Schritt für Schritt an.

##### Aufgabe 1: Spielbrett und Ausgabe des Spielbretts

Überlege dir, wie du das Brett gut darstellen kannst. Ein mehrdimensionales Feld eignet sich beispielsweise gut dafür. Welche Zustände müssen die Zellen dieses Feldes annehmen können?

Schreibe eine Klasse `Spielbrett`, die das Spielbrett enthält. Schreibe eine Methode, die das Spielbrett in das Terminal schreibt.

##### Aufgabe 2: Spielzüge

Wir fügen nun nach und nach weitere Methoden hinzu, die uns langfristig dabei helfen, das Spiel zu implementieren.

Schreibe eine Methode `zug(spalte,symbol)`, die eine Spalte und ein Symbol bekommt und das Symbol korrekt in das Spielbrett einfügt, sodass das Symbol soweit nach unten "fällt", wie möglich. Tipp: nutze die Funktion `reversed()`

Schreibe eine zweite Klasse `Spiel`, die ein Spielbrett als Attribut erhält. Schreibe eine Methode, die aus dem Terminal eine Spalte abfragt, den Zug durchführt und das aktualisierte Spielfeld anzeigt. Überlege dir, wie du mit fehlerhaften Eingaben umgehen möchtest.

##### Aufgabe 3: Gewinnüberprüfung

Überlege dir, was du überprüfen musst, um einen Gewinn zu erkennen. Wann endet das Spiel unentschieden?

Implementiere eine Methode `ist_gewonnen(spielfeld,symbol)` für die Klasse `Spielbrett`, die überprüft, ob es für das Symbol symbol einen Gewinn im aktuellen Spielfeld gibt. Schreibe eine zweite Funktion, die das Spielfeld auf ein unentschieden überprüft. Tipp: Die Funktion `all()` könnte hilfreich sein.

##### Aufgabe 4: Gegeneinander spielen

Schreibe ein Programm, das das Spiel zwischen zwei Menschen ermöglicht. Wähle unterschiedliche Symbole und schreibe eine Logik, die abwechselnde Züge ermöglicht. Um die Spielerlogik abzubilden, macht es Sinn, eine dritte Klasse `Spieler`zu schreiben, die den Namen des Spielers und das Symbol des Spielers speichert.
##### Aufgabe 5: Spielt einige Spiele gegeneinander

Vergewissert euch, dass euer Spiel funktioniert. Testet es und spielt einige Spiele gegeneinander. 

##### Aufgabe 6: Spielt gegen den Computer

Wir möchten nun, dass der Computer automatisiert Züge macht. Wir möchten also eine KI implementieren. Dafür gibt es ganz viele unterschiedliche Möglichkeiten. Habt ihr Ideen, welche Möglichkeiten es gibt?

Implementiert die einfachste Möglichkeit, die euch einfällt.

##### Aufgabe 7: Verbessert eure Idee

Habt ihr Ideen, wie ihr eure KI verbessern könnt? Versucht das zu implementieren.

### Aufgabe: Minimax-Algorithmus für Vier gewinnt

Vier gewinnt ist ein so genanntes Zwei-Personen-Nullsummenspiel. Das sind Spiele, bei denen zwei Personen abwechselnd Züge machen, bis das Ende der Partie erreicht ist. Und die Gewinne der einen Person sind genau die Verluste der anderen Person.

Wie implementiert, besteht ein Spiel nun aus einer Sequenz von Stellungen, die durch Züge entstehen. Eine solche Sequenz endet zwangsläufig in einer Endstellung, bei der entweder Spieler 1 gewonnen hat, Spieler 2 gewonnen hat, oder ein Unentschieden aufgetreten ist.

Man kann nun für jede der Endstellungen eine Zahl zuordnen, einen Gewinn $$w>0$$. Wenn Spieler 1 gewonnen hat, bewerten wir die Stellung mit $$+w$$, wenn Spieler 2 gewonnen hat mit $$-w$$. Und ein Unentschieden bewerten wir mit $$0$$.

Wie kann man, wenn man am Zug ist, vorgehen, um seinen Gewinn zu maximieren? Man muss für jeden der möglichen Züge entscheiden, wie „gut“ oder „schlecht“ er bzw. die Stellung ist, die man mit ihm erreicht, d.h., man muss die Stellungen bewerten können. Man wird dann denjenigen Zug wählen, der auf die Stellung mit der besten Bewertung (höchsten Gewinnerwartung) führt.
Dafür kann man eine Funktion `bewertung`schreiben, die jeder Stellung, also jeder Konfiguration von `spielbrett` der Klasse `Brett`einen Wert zuweist. Die gewonnenen Stellungen haben dabei den Wert $$w$$ bzw. $$-w$$, je nach dem, wer gewonnen hat. Das Problem ist nur, was ist mit den Stellungen, die noch nicht gewonnen sind.

Wir betrachten das Problem aus Sicht von Spieler 1. Wenn Spieler 1 einen Zug macht, möchte er den Zug machen, der das Spielbrett mit der besten Bewertung für ihn ergibt. Würden wir die Bewertung aller neuen Stellungen kennen, könnten wir sagen, dass sein bester Zug die Spalte ist, sodass nach dem Zug die Bewertung maximal ist. Also hätte sein aktuelles Brett die Bewertung

`bewertung(aktuelles_brett) = max(bewertung(brett nach Zug in Spalte k) for k in range(anzahl_spalten))`

Wäre dagegen Spieler 2 am Zug, würde dieser den Zug machen, der für Spieler 1 am ungünstigsten ist: In diesem Fall liegt die Bewertung für Spieler 1 bei

`bewertung(aktuelles_brett) = min(bewertung(brett nach Zug in Spalte k) for k in range(anzahl_spalten))`

Die Bewertung aller Nachfolgerstellungen könnte man wieder aus ihren Nachfolgern bestimmen, usw. bis man am Ende des Spiels angekommen ist. Theoretisch lässt sich auf diese Weise rekursiv die Bewertung für alle 𝑥 ∈𝑋 berechnen. In der Praxis scheitert dies an der Komplexität, da die Anzahl möglicher Stellungen meist exponentiell mit der Anzahl der Züge (im Fall von Vier gewinnt mit Faktor $$m\cdot n$$, wo $$m$$ die Zahl der Spalten und $$n$$ die Zahl der Zeilen.) Deshalb muss man die Zahl der Nachfolger begrenzen. Man legt eine Suchtiefe fest, wie viele Züge man ausprobiert. Danach muss man selbst entscheiden, wie man das aktuelle Spielbrett bewerten möchte. Dafür benötigt man eine Funktion, die einem Brett einen Wert zuweist. Je höher der Wert, desto wahrscheinlicher sollte es sein, dass Spieler 1 gewinnt, je niedriger, desto wahrscheinlicher sollte es sein, dass Spieler 2 gewinnt.

Eine solche Funktion kann man folgendermaßen bauen: für Spieler 1 gewonnene Stellungen erhalten den Wert $$w = 100000$$. Für Spieler 2 gewonnen Stellungen den Wert $$w=-100000$$. Dann betrachten wir nacheinander alle möglichen Brettausschnitte, die waagerecht, senkrecht oder diagonal von Länge 4 sind. Wenn dort nur Plättchen von Spieler 1 liegen, könnte Spieler 1 da gewinnen. In dem Fall, dass dort zwei Plättchen von Spieler 1, aber keine von Spieler 2 liegen, legen wir eine Zahl $$a_2>0$$ als Bewertung aus. Wenn dort sogar drei liegen, eine Zahl $$a_3>0$$. Wenn das für Spieler 2 ist, dann nehmen wir $$-a_2$$ und $$-a_3$$. Schließlich summieren wir über die Zahlen über alle Fenster.

Wenn wir diesen Algorithmus aus Sicht von Spieler 1 implementieren, dann müssen wir daran denken, dass Spieler 1 und Spieler 2 immer abwechselnd Züge machen. Wenn wir alle gültigen Züge für Spieler 1 ausprobieren, suchen wir den besten Zug, wir maximieren also. Als nächstes, wenn Spieler 2 den Zug macht, minimieren wir. Dafür hilft es, eine Variable anzulegen, die wir bei jedem Funktionsaufruf umkehren.

Hinweis: besonders hilfreich sind folgende Funktionen: aus `import copy` die Funktion copy.deepcopy(liste), die eine Kopie einer Liste anlegt. Für eine Liste, die Funktion `.count(symbol)`, die zählt, wie oft das Symbol in der Liste vorkommt. Erinnert euch auch daran, dass ihr mit `[liste[c+i][c+i] for i in range(4)]`zum Beispiel eine Diagonale startend beim Index `c`als Liste schreiben könnt.

Hinweis 2: Ihr benötigt zwei neue Funktionen: `def minimax(spielbrett,suchtiefe,euer_symbol,gegner_symbol)`gibt idealerweise den besten Zug und die Bewertung zurück, und `def bewertung(brett,euer_symbol,gegner_symbol)`gibt die von euch ausgesucht Bewertung des Bretts `brett`zurück. Diese Funktion braucht ihr, in der Abbruchbedingung von `minimax`. Wenn ihr `minimax`mit Tiefe 0 aufruft, soll einfach `bewerte(brett,euer_symbol,gegner_symbol)`zurückgegeben werden. Ansonsten soll `minimax`sich rekursiv selbst aufrufen, aber dabei `suchtiefe`um eins verringern, damit ihr die Suche irgendwann abbrecht.

Hinweis 3: stellt in `minimax`sicher, dass ihr erstmal herausfindet, welche gültigen Züge ihr gerade habt. Vielleicht habt ihr vorher schon eine Methode geschrieben, die das für ein Brett zurückgibt. Ansonsten wäre das eine gute Methode für die Klasse `Brett`, die eine Liste mit Spalten zurückgibt.

Hinweis 4: In `import math` gibt es `math.inf` und es ist `math.inf > zahl`für jede Zahl `zahl`und `-math.inf < zahl`für jede Zahl `zahl`. 