---
layout: page
title: Objektorientiere Programmierung und Klassen
description: Zusammenfassung des Materials und Spickzettel
img: 
importance: 2
category: Python
---

Klassen sind Baupläne für Objekte. In heutigen Programmiersprachen besteht alles aus Klassen. Eine Klasse besteht aus Attributen und Methoden. Attributen sind das, was ein Objekt weiß, Methoden sind das, was ein Objekt kann.

Wir erzeugen eine Klasse wie folgt:

```python

class Name_der_Klasse:
	def __init__(self,parameter):
		self.attribut_1 =
		self.attribut_2 =
		...
```

`__init__()`nennt man den Konstruktor. Hier erklären wir, wie eine Objekt aufgebaut ist. Jede Klasse hat einen Konstruktor. `self` ist immer das erste Argument in Klassenmethoden – es bedeutet "dieses Objekt selbst". Es ist notwendig, um auf die Attribute und andere Methoden des Objekts zuzugreifen.

Zum Beispiel können wir eine Klasse Person erstellen

```python
class Person:
	def __init__(self,name,geburtsjahr,beruf):
		self.name = name
		self.geburtsjahr = geburtsjahr
		self.beruf = beruf

ada = Person("Ada",1815,"Programmierin")
```

Methoden sind Funktionen innerhalb einer Klasse. Sie beschreiben Verhalten.

```python
class Person:
	def __init__(self,name,geburtsjahr,beruf):
		self.name = name
		self.geburtsjahr = geburtsjahr
		self.beruf = beruf

	def berechne_alter(self,aktuelles_jahr):
		return aktuelles_jahr - self.geburtsjahr

	def steckbrief(self):
		print(self.name + " arbeitet als " + self.beruf + ".")

ada = Person("Ada",1815,"Programmierin")

ada.steckbrief()

adas_alter = ada.berechne_alter(2025)
```

Man kann in Methoden auch Attribute ändern:

```python
class Person:
	def __init__(self,name,geburtsjahr,beruf):
		self.name = name
		self.geburtsjahr = geburtsjahr
		self.beruf = beruf

	def berechne_alter(self,aktuelles_jahr):
		return aktuelles_jahr - self.geburtsjahr

	def steckbrief(self):
		print(self.name + " arbeitet als " + self.beruf + ".")

	def neuer_beruf(self,neuer_job):
		self.beruf = neuer_beruf

ada = Person("Ada",1815,"Programmierin")

ada.steckbrief()

adas_alter = ada.berechne_alter(2025)
```

In Python gibt es eine Reihe von magischen Methoden, so genannten Dunder Methoden (Dunder = Double UNDERscore):

{:.table}
| Methode                 | Zweck / Wird aufgerufen bei …                     | Beispiel            |
| ----------------------- | ------------------------------------------------- | ------------------- |
| `__init__(self, ...)`   | Konstruktor: Beim Erstellen eines Objekts         | `obj = Klasse(...)` |
| `__str__(self)`         | Wenn `print(obj)` oder `str(obj)` aufgerufen wird | `print(obj)`        |
| `__repr__(self)`        | Offizielle Darstellung (z. B. in der Konsole)     | `repr(obj)`         |
| `__eq__(self, other)`   | `==` Vergleich                                    | `obj1 == obj2`      |
| `__ne__(self, other)`   | `!=` Vergleich                                    | `obj1 != obj2`      |
| `__lt__(self, other)`   | `<` Vergleich                                     | `a < b`             |
| `__le__(self, other)`   | `<=` Vergleich                                    | `a <= b`            |
| `__gt__(self, other)`   | `>` Vergleich                                     | `a > b`             |
| `__ge__(self, other)`   | `>=` Vergleich                                    | `a >= b`            |
| `__add__(self, other)`  | `+` Operator                                      | `a + b`             |
| `__sub__(self, other)`  | `-` Operator                                      | `a - b`             |
| `__mul__(self, other)`  | `*` Operator                                      | `a * b`             |
| `__truediv__(self, o)`  | `/` Operator                                      | `a / b`             |
| `__floordiv__(self, o)` | `//` Operator                                     | `a // b`            |
| `__mod__(self, other)`  | `%` Operator                                      | `a % b`             |
| `__pow__(self, other)`  | `**` Operator                                     | `a ** b`            |
