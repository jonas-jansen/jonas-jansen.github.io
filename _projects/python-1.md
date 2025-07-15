---
layout: page
title: Grundlagen der Programmierung in Python
description: Zusammenfassung des Materials und Spickzettel
img: 
importance: 1
category: Python
---


# Grundlagen der Programmierung in Python

Programmieren bedeutet, dem Computer Anweisungen zu geben, damit er Aufgaben erledigt. Stell dir vor, du schreibst eine Anleitung für einen Roboter – genau das machen wir mit Code.

Ein Programm ist eine Liste von Befehlen, die der Computer nacheinander ausführt. Ein Computer liest dabei von oben nach unten.

Computer verstehen erstmal nur Nullen und Einsen. Damit wir nicht in dieser komplizierten Maschinensprache schreiben müssen, gibt es Programmiersprachen. Es gibt viele Programmiersprachen. Wir lernen hier Python. Das hat viele Vorteile:

- Python ist besonders einfach zu lesen und zu schreiben.
- Python wird viel in der Wissenschaft verwendet.

Python wurde in den 1990er Jahren entwickelt und nach der Komikergruppe Monty Python benannt.

Damit der Computer weiß, was er tun soll, muss unser Python-Code zuerst übersetzt werden. Das macht ein spezielles Programm namens Interpreter (bei anderen Sprachen auch oft Compiler genannt). Der Interpreter liest den Python-Code Zeile für Zeile und führt ihn direkt aus. Dadurch können wir Fehler schneller finden und den Code einfach testen.

Damit der Interpreter das richtig kann, müssen wir uns an Regeln halten. Genau wie eine gesprochene Sprache Vokabeln und Grammatik hat, hat eine Programmiersprache Semantik (die Bedeutung der Wörter) und Syntax (die richtige Verwendung und Reihenfolge der Wörter).
### Einführung

Die erste wichtige Funktion ist die `print`-Funktion.

```python
print("Hallo, Welt")
```

gibt "Hallo, Welt" in der Konsole aus.

Mit der `input`-Funktion können wir Zeichenketten aus der Konsole einlesen:

```python
name = input("Was ist dein Name?")
```

### Variablen und Datentypen

Variablen sind dafür da, um Daten zu speichern. Du kannst dir Variablen wie Behälter speichern, in denen du Werte ablegen und später wieder abrufen kannst.

In Python erstellst du eine Variable einfach, indem du einen Namen festlegst und ihr einen Wert gibst. Dafür schreibst du einen Namen, dann ein Gleichheitszeichen `=` und dann den Wert. Das sieht dann so aus:

```python
name = "Ada"
geburtsjahr = 1815
groesse_ihres_computers = 4.5 # Größe in Metern
programmiererfahrung = True
``` 

Damit der Computer weiß, wie er mit der Variable umgehen soll, haben Variablen in Python (und allen anderen Programmiersprachen) unterschiedliche Datentypen. 

##### Zeichenketten, Strings (str)

- Ein String ist eine Kette aus Buchstaben, Zahlen und Symbolen.
- Strings werden in Anführungszeichen gesetzt, entweder doppelte `" "` oder einfache `' '`.

##### Ganze Zahlen, Integers (int)

- Ein Integer speichert eine ganze Zahl: wie beispielsweise das Geburtsjahr oder Alter.

##### Gleitkommazahlen, Floating-Point-Zahlen (float)

- Floating-Point-Zahlen sind Zahlen mit Dezimalstellen, z. B. 4.5 oder 3.14.

##### Wahrheitswerte (bool)
- Wahrheitswerte sind entweder <code>True</code> (Wahr) oder <code>False</code> (Falsch).

##### Listen
- Listen sind geordnete Sammlungen von Werten, die verschiedenartige Datentypen enthalten können.
- Listen werden mit eckigen Klammern `[]` definiert.

```python
zahlen = [1, 2, 3, 4]
namen = ["Ada Lovelace", "Alan Turing", "Mary Tsingou"]
gemischt = [1, "Hallo", True]
```

##### Tupel
- Tupel sind ähnlich wie Listen, aber unveränderlich, das heißt, man kann die Werte nach der Erstellung nicht mehr ändern.
- Tupel werden mit runden Klammern `()` definiert.
```python
punkt = (10,20)
```
##### Mengen, Sets
- Mengen sind ungeordnete Sammlungen von eindeutigen Elementen.
- Du kannst Sets verwenden, um doppelte Werte zu entfernen oder Mengenoperationen durchzuführen (wie Schnittmenge, Vereinigung).
- Sets werden mit geschweiften Klammern `{}` definiert, oder mit dem `set()`-Konstruktor.
```python
zahlen = {1,2,3,4,4}
```

###### Wörterbücher

- Wörterbücher speichern Daten in Schlüssel-Wert-Paaren.
- Sie sind sehr praktisch, um Daten nach einem Schlüssel zu organisieren.
- Wörterbücher werden mit geschweiften Klammern `{}` definiert, wobei Schlüssel und Werte durch Doppelpunkte getrennt sind.

```python
person = {
    "name": "Ada",
    "geburtsjahr": 1815,
    "programmiersprachen": ["Difference Engine", "Ada"]
}
```

Wir müssen dem Computer im Gegensatz zu vielen anderen Sprachen nicht mitteilen, um welchen Datentyp es sich handelt. Er erkennt das automatisch. Du kannst aber auch optional Datentypen angeben, das nennt man Typannotationen und ist nützlich, um im Editor Fehler zu finden.

```python
name: str = "Ada"
geburtsjahr: int = 1815
groesse_ihres_computers: float = 4.5 # Größe in Metern
programmiererfahrung: bool = True
``` 

### Typische Operatoren für die Datentypen

##### Strings

{:.table}
| Operator | Beschreibung              | Beispiel            | Ergebnis       |
| -------- | ------------------------- | ------------------- | -------------- |
| `+`      | Verketten (zusammenfügen) | `"Hallo" + " Welt"` | `"Hallo Welt"` |
| `*`      | Wiederholen               | `"Ha" * 3`          | `"HaHaHa"`     |
| `in`     | Teilstring prüfen         | `"lo" in "Hallo"`   | `True`         |
| `len()`  | Länge der Zeichenkette    | `len("Python")`     | `6`            |
| `[]`     | Index-Zugriff             | `"Hallo"[1]`        | `"a"`          |

##### Integer und Floats

{:.table}
| Operator | Beschreibung               | Beispiel | Ergebnis |
| -------- | -------------------------- | -------- | -------- |
| `+`      | Addition                   | `5 + 3`  | `8`      |
| `-`      | Subtraktion                | `5 - 2`  | `3`      |
| `*`      | Multiplikation             | `4 * 2`  | `8`      |
| `/`      | Division (float)           | `5 / 2`  | `2.5`    |
| `//`     | Ganzzahlige Division       | `5 // 2` | `2`      |
| `%`      | Modulo (Rest bei Division) | `5 % 2`  | `1`      |
| `**`     | Potenzieren                | `2 ** 3` | `8`      |
| `==`     | Gleichheit prüfen          | `5 == 5` | `True`   |
| `>` `<`  | Größer, kleiner            | `3 < 4`  | `True`   |

##### Wahrheitswerte

{:.table}
| Operator | Beschreibung        | Beispiel         | Ergebnis |
| -------- | ------------------- | ---------------- | -------- |
| `and`    | Logisches UND       | `True and False` | `False`  |
| `or`     | Logisches ODER      | `True or False`  | `True`   |
| `not`    | Logische Negation   | `not True`       | `False`  |
| `==`     | Gleichheit prüfen   | `5 == 5`         | `True`   |
| `!=`     | Ungleichheit prüfen | `3 != 4`         | `True`   |

##### Listen

{:.table}
| Befehl / Funktion     | Beschreibung                                | Beispiel                        | Ergebnis / Effekt              |
| --------------------- | ------------------------------------------- | ------------------------------- | ------------------------------ |
| `+`                   | Listen zusammenfügen                        | `[1, 2] + [3, 4]`               | `[1, 2, 3, 4]`                 |
| `*`                   | Wiederholen                                 | `[1] * 3`                       | `[1, 1, 1]`                    |
| `in`                  | Prüfen, ob Element enthalten ist            | `3 in [1, 2, 3]`                | `True`                         |
| `len(liste)`          | Länge der Liste                             | `len([1, 2, 3])`                | `3`                            |
| `liste[0]`            | Zugriff auf ein Element über den Index      | `liste[0]` bei `[1, 2, 3]`      | `1`                            |
| `liste[1:3]`          | Slicing: Teil der Liste von Index 1 bis 2   | `[1, 2, 3, 4][1:3]`             | `[2, 3]`                       |
| `liste.append(9)`     | Fügt `9` am Ende der Liste hinzu            | `[1, 2, 3].append(9)`           | `[1, 2, 3, 9]`                 |
| `liste.insert(2, 25)` | Fügt `25` an Index 2 ein                    | `[1, 2, 3].insert(2, 25)`       | `[1, 2, 25, 3]`                |
| `liste.sort()`        | Sortiert die Liste (verändert sie direkt)   | `[3, 1, 2].sort()`              | `[1, 2, 3]`                    |
| `liste.reverse()`     | Dreht die Reihenfolge der Liste um          | `[1, 2, 3].reverse()`           | `[3, 2, 1]`                    |
| `liste.remove(2)`     | Entfernt das erste Vorkommen von `2`        | `[1, 2, 2, 3].remove(2)`        | `[1, 2, 3]`                    |
| `liste.pop()`         | Entfernt und gibt das letzte Element zurück | `[1, 2, 3].pop()`               | Rückgabe: `3`, Liste: `[1, 2]` |
| `liste[0] = 32`       | Ersetzt das Element an Index 0 durch `32`   | `liste = [1, 2]; liste[0] = 32` | `[32, 2]`                      |

##### Tupel

{:.table}
|Operator / Funktion|Beschreibung|Beispiel|Ergebnis|
|---|---|---|---|
|`[]`|Zugriff auf Elemente|`tupel[1]`|Wert an Index 1|
|`in`|Element enthalten?|`2 in (1, 2, 3)`|`True`|
|`len()`|Länge|`len((1, 2))`|`2`|
|`+`|Verketten|`(1, 2) + (3,)`|`(1, 2, 3)`|

##### Mengen

{:.table}
|Operator / Methode|Beschreibung|Beispiel|Ergebnis|
|---|---|---|---|
|`.add()`|Element hinzufügen|`s.add(4)`|`{1, 2, 3, 4}`|
|`.remove()`|Element entfernen|`s.remove(2)`|`{1, 3}` (wenn 2 enthalten war)|
|`in`|Mitglied testen|`3 in s`|`True`|
|`\|`|Vereinigung (Union)|`{1, 2}|
|`&`|Schnittmenge (Intersection)|`{1, 2} & {2, 3}`|`{2}`|
|`-`|Differenz|`{1, 2, 3} - {2}`|`{1, 3}`|

##### Wörterbücher

{:.table}
|Operator / Methode|Beschreibung|Beispiel|Ergebnis|
|---|---|---|---|
|`[]`|Zugriff auf Wert|`person["name"]`|`"Ada"`|
|`.get()`|Sicherer Zugriff|`person.get("alter", "unbekannt")`|`"unbekannt"` (wenn fehlt)|
|`.keys()`|Liste der Schlüssel|`person.keys()`|`dict_keys([...])`|
|`.values()`|Liste der Werte|`person.values()`|`dict_values([...])`|
|`.items()`|Schlüssel-Wert-Paare|`person.items()`|`dict_items([...])`|
|`in`|Prüfen, ob Schlüssel existiert|`"name" in person`|`True`|

### Datentypen umwandeln

Wir können Datentypen umwandeln. Das ist besonders wichtig für die `input`-Funktion. Diese gibt einen String zurück. Wenn wir aber beispielsweise eine Zahl einlesen wollen, müssen wir diese umwandeln, wenn wir mit ihr Rechenoperationen durchführen können. Hier ist eine Liste der Datenumwandlungen:

{:.table}
| Funktion   | Wandelt um zu  | Beispiel                     | Ergebnis / Erklärung               |
| ---------- | -------------- | ---------------------------- | ---------------------------------- |
| `str(x)`   | Zeichenkette   | `str(123)`                   | `"123"` (aus Zahl wird Text)       |
| `int(x)`   | Ganze Zahl     | `int("42")`                  | `42` (aus String wird Zahl)        |
| `float(x)` | Gleitkommazahl | `float("3.14")`              | `3.14` (aus String wird float)     |
| `bool(x)`  | Wahrheitswert  | `bool("False")`              | `False` (leerer String ist falsch) |
| `list(x)`  | Liste          | `list("abc")`                | `['a', 'b', 'c']`                  |
| `tuple(x)` | Tupel          | `tuple([1, 2])`              | `(1, 2)`                           |
| `set(x)`   | Menge          | `set([1, 2, 2, 3])`          | `{1, 2, 3}` (Duplikate entfernt)   |
| `dict(x)`  | Wörterbuch     | `dict([("a", 1), ("b", 2)])` | `{"a": 1, "b": 2}`                 |

### Bedingungen

Nun wollen wir lernen, wie ein Python-Programm Entscheidungen treffen kann. Dies passiert durch die Verwendung von Bedingungen und Kontrollstrukturen. Bedingungen nehmen dabei immer Wahrheitswerte an, sind also entweder `True`oder `False`. Ein Beispiel für eine Bedingung ist `k > 100`. Diese Bedingung überprüft, ob die vorher definierte Variable `k` größer als 100 ist. Es ist dabei wichtig, dass `k` den Datentyp einer Zahl hat (Integer oder Float). Dies sieht folgendermaßen aus:

```Python
if Bedingung:
	Befehl1
	Befehl2
	...
```

Sowohl der Doppelpunkt als auch die Einrückung mit einem Tab sind dabei sehr wichtig `if` fragt dabei ab, ob die Bedingung wahr ist. Wenn ja, führt es die Befehle aus. Mit `elif` können wir in der gleichen Abfrage eine zweite Bedingung stellen. Mit `else` können wir sagen, welche Befehle ausgeführt werden sollen, wenn keine der vorigen Bedingungen zutrifft:

```Python
if Bedingung1:
	Befehl1
elif Bedingung2:
	Befehl2
else:
	Befehl3
```

### Schleifen
Wenn man Dinge wiederholt erledigen will, braucht man Schleifen. Eine Schleife wiederholt Befehle, solange eine bestimmte Bedingung erfüllt ist.
##### `while`-Schleifen

Mit der `while`-Schleife kannst du Code wiederholt ausführen, solange eine Bedingung wahr ist. Dies sieht folgendermaßen aus:

```Python
while Bedingung:
	Befehl1
else:
	Befehl2
```

Manchmal möchte man eine Schleife vorzeitig beenden, wenn eine bestimmte Bedingung erfüllt ist. Dafür gibt es in Python das Schlüsselwort `break`. Manchmal möchte man frühzeitig in den nächsten Schleifendurchlauf springen. Dafür gibt es das Schlüsselwort `continue`.

```python
i = 0
while True:
    print(i)
    if i == 3:
        break  
    i += 1
```

##### `for`-Schleifen

Eine `for`-Schleife ist ein anderer Schleifentyp. Sie wird verwendet, um eine Aufgabe für alle Elemente einer Sequenz durchzuführen (z. B. eine Liste, ein range()-Objekt oder eine Zeichenkette). Das ist die Syntax:

```Python
for Variable in Sequenz:
	Befehl1
	Befehl2
	...
```

Mit der Funktion `range()` kannst du **Zahlenbereiche** erzeugen, die du z. B. in einer `for`-Schleife durchlaufen kannst.

{:.table}
|Ausdruck|Beschreibung|Ergebnis von `list(range(...))`|
|---|---|---|
|`range(5)`|Von 0 bis 4 zählen|`[0, 1, 2, 3, 4]`|
|`range(2, 6)`|Von 2 bis 5 zählen|`[2, 3, 4, 5]`|
|`range(1, 10, 2)`|Von 1 bis 9, in Zweierschritten|`[1, 3, 5, 7, 9]`|
|`range(10, 0, -1)`|Rückwärts von 10 bis 1 zählen|`[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]`|
|`range(0, 30, 10)`|In Zehnerschritten zählen|`[0, 10, 20]`|
`range()`erzeugt keine Liste, sondern ein Objekt des Typs `Range`. Man kann es mit `list(range())`in eine Liste umwandeln.

### Funktionen

Manchmal möchte man denselben Code mehrfach verwenden oder eine bestimmte Aufgabe klar abgrenzen. Dafür verwendet man in Python Funktionen Eine Funktion ist ein benannter Block von Code, den man beliebig oft aufrufen kann. Das macht den Code
- wiederverwendbar
- übersichtlicher
- flexibler

```python
def name_der_funktion():
   print("Hallo")
```

Man kann die Funktion mit ihrem Namen aufrufen: `name_der_funktion()`

Funktionen können Parameter bekommen – das sind Werte, die du beim Aufruf übergibst:

```python
def begruessung(name):
	print("Hallo", name)

begruessung("Ada")
```

Wenn du möchtest, dass eine Funktion etwas zurückgibt, verwendest du `return`:

```python
def quadrat(x: float) -> float:
    return x * x

ergebnis = quadrat(5)
```

Du kannst das Ergebnis in einer Variable speichern. Die Typannotationen des Parameters und der Funktion (mit `-> float`) sind nicht notwendig, aber guter Stil. Wenn die Funktion kein`return`verwendet, kann man `-> None`verwenden.

### Mehr zu Listen

Manchmal möchtest du Daten in Tabellenform speichern, also in Zeilen und Spalten – zum Beispiel für Spielbretter, Notentabellen oder Matrizen.

```python
matrix = [
    [1, 2, 3], # Zeile 0
    [4, 5, 6], # Zeile 1
    [7, 8, 9]  # Zeile 2
]
```
Mit zwei eckigen Klammern greifst du zuerst auf die Zeile, dann auf die Spalte zu: `matrix[0][1] = 2`.
##### Wichtige Listenfunktionen

Man kann mit so genannten List comprehensions LIsten schnell definieren. Das geht so:

```python
liste = [ausdruck for element in sequenz if bedingung]
```

Also zum Beispiel
```python
quadratzahlen = [x*x for x in range(5)] # [0,1,4,9,16]
gerade_zahlen = [x for x in range(10) if x%2 == 0] # [0,2,4,6,8]
```

{:.table}
|Teil|Bedeutung|Beispiel|
|---|---|---|
|`x for x in ...`|alle Elemente übernehmen|`[x for x in liste]`|
|`x for x in ... if ...`|nur bestimmte Elemente übernehmen|`[x for x in liste if x > 0]`|
|`f(x) for x in ...`|Elemente verändern|`[x*x for x in liste]`|
|`x if ... else y`|mit Bedingung umwandeln|`[x if x > 0 else 0 for x in liste]`|

