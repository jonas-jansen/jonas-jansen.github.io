---
layout: page
title: Wissenschaftliches Programmieren mit Numpy
description: Zusammenfassung des Materials und Spickzettel
img: 
importance: 3
category: Python
---
### Numpy Arrays

{:.table}
| Funktion                             | Beschreibung                           |
| ------------------------------------ | -------------------------------------- |
| `np.array([...])`                    | Wandelt Liste in NumPy-Array           |
| `np.zeros(shape)`                    | Array aus Nullen                       |
| `np.ones(shape)`                     | Array aus Einsen                       |
| `np.arange(start, stop, step)`       | Wie `range()`, aber als Array          |
| `np.linspace(start, stop, num)`      | Gleichmäßige Werte                     |
| `np.random.rand(n)`                  | Zufallszahlen [0, 1)                   |
| `arr.reshape(shape)`                 | Form ändern                            |
| `np.full(shape, value)`              | Erstellt ein Array mit konstantem Wert |
| `np.eye(N)`                          | Einheitsmatrix (Diagonale 1)           |
| `np.identity(N)`                     | Alternative für Einheitsmatrix         |
| `np.random.randint(low, high, size)` | Zufällige Ganzzahlen                   |
| `np.random.normal(loc, scale, size)` | Normalverteilung                       |
| `np.tile(arr, repeats)`              | Wiederholt ein Array                   |
| `np.repeat(arr, repeats)`            | Wiederholt Elemente eines Arrays       |

### Zugriff auf Numpy Arrays

| Syntax      | Bedeutung           | Beispiel    |
| ----------- | ------------------- | ----------- |
| `arr[i]`    | Element bei Index i | `arr[0]`    |
| `arr[i:j]`  | Slice (i bis j-1)   | `arr[1:4]`  |
| `arr[i, j]` | 2D-Zugriff          | `arr[1, 2]` |
| `arr[:, j]` | Ganze Spalte        |             |
| `arr[i, :]` | Ganze Zeile         |             |
| `arr.T`     | Transponiert        |             |
### Rechnen mit Numpy Arrays

{:.table}
| Operation                | Beschreibung                     | Beispiel                          |
| ------------------------ | -------------------------------- | --------------------------------- |
| `arr + 2`                | Elementweise Addition            | `[1, 2, 3] + 2 → [3, 4, 5]`       |
| `arr * 3`                | Skalar-Multiplikation            | `[1, 2, 3] * 3 → [3, 6, 9]`       |
| `arr1 + arr2`            | Elementweise Addition            | `[1, 2] + [3, 4] → [4, 6]`        |
| `np.add(a, b)`           | Addition                         | `np.add([1, 2], [3, 4]) → [4, 6]` |
| `np.multiply(a, b)`      | Multiplikation                   | `[2, 3] * [4, 5] → [8, 15]`       |
| `np.clip(arr, min, max)` | Werte begrenzen                  | `np.clip(arr, 0, 255)`            |
| np.dot(arr1,arr2)        | Vektorprodukt                    | `np.dot([1, 2], [3, 4]) → 11`     |
| `arr1 @ arr2`            | Matrixmultiplikation             | `A @ B`                           |
| `np.where(cond, a, b)`   | Bedingte Auswahl                 | `np.where(arr > 128, 255, 0)`     |
| `np.any(arr > x)'        | Irgendein Wert erfüllt Bedingung | `np.any([1,2]>1.5) → True`        |
| `np.all(arr > x)'        | Alle Werte erfüllt Bedingung     | `np.all([1,2]>1.5) → False`       |

### Eine Liste der wichtigsten Funktionen

{:.table}
| Funktion       | Beschreibung                | Beispiel                   |
| -------------- | --------------------------- | -------------------------- |
| `np.sin(x)`    | Sinuswert                   | `np.sin(np.pi / 2)`        |
| `np.sqrt(x)`   | Quadratwurzel               | `np.sqrt([4, 9]) → [2 3]`  |
| `np.exp(x)`    | e^x                         | `np.exp(1)`                |
| `np.abs(x)`    | Absolutwert                 | `np.abs([-1, 2])`          |
| `np.round(x)`  | Rundet auf nächste Ganzzahl | `np.round(2.4) → 2`        |
| `np.floor(x)`  | Abrunden                    | `np.floor(2.4) → 2`        |
| `np.ceil(x)`   | Aufrunden                   | `np.ceil(2.4) → 3`         |
| `np.min(arr)`  | Minimum                     | `np.min([1, 2, 3]) → 1`    |
| `np.max(arr)`  | Maximum                     | `np.max([1, 2, 3]) → 3`    |
| `np.mean(arr)` | Mittelwert                  | `np.mean([1, 2, 3]) → 2.0` |
| `np.sum(arr)`  | Summe                       | `np.sum([1, 2, 3]) → 6`    |
| `np.std(arr)`  | Standardabweichung          | `np.std([1, 2, 3])`        |

