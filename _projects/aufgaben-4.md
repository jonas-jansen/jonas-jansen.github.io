---
layout: page
title: Projektaufgabe Bildfilter
description: 
img: 
importance: 4
category: Pythonaufgaben
---

Für ein Beispielsbild [https://jonas-jansen.github.io/assets/img/Schloss2.jpg](https://jonas-jansen.github.io/assets/img/Schloss2.jpg)

Ein Graustufenbild ist horizontal und vertikal in Bildpunkte (Pixel) eingeteilt. Jedes Pixel nimmt dabei einen Wert zwischen 0 und 1 an. Dabei entspricht die Helligkeit 0 der Farbe schwarz und die Helligkeit 1 der Farbe weiß. Wir verwenden hier Portable Greymap File Format.

Schreibe eine Klasse `Bild`, die die Ausmaße des Bilds abspeichert und das Bild in einem `np.array`. Schreibe Methoden, um Bilder automatisiert einzulesen.

Dafür verwenden wir die Library `Pillow` und möchten das Bild in ein Numpy-Array speichern. Eine Methode dafür kann so aussehen:

```python
from PIL import Image
import numpy as np

def read_image(self,speicherort):
	img = Image.open(speicherort).convert('L') 
    return np.array(img, dtype=np.float32) / 255.0 
```

Diese erzeugt automatisch ein Numpy-Array der richtigen Größe mit den entsprechenden Werten. Wenn wir das Bild wieder als .jpg abspeichern wollen, können wir der Klasse folgende Methode geben:

```python
def write_image(self,name):
	img = (self.bild*255).astype(np.uint8)
	image = Image.fromarray(img, mode='L')
	image.save(f"{name}.jpg",format='JPEG')
	print(f"Bild gespeichert als {name}.jpg")
```


Mit diesen Funktionen sind wir in der Lage, Graufstufenbilder einzulesen und auszugeben. Nun möchten wir sie bearbeiten können.

### Bildverarbeitungsoperatoren

Es gibt unterschiedliche Möglichkeiten, BIlder zu bearbeiten. Dabei unterscheiden wir zwischen Operatoren, die einfach Pixel verändern, und Operatoren, die eine Reihe von Pixel in der Nähe eines gegebenen Pixels berücksichtigen.

##### Pixelweise Operatoren

Ein pixelweiser Operator ist eine Funktion, die einfach das Bild durchgeht und jedes Pixel einfach verändert. Die zwei wichtigen Beispiele sind:

###### Helligkeit und Kontrast verändern:

Dafür verwenden wir affin-lineare Funktionen, das heißt, wir iterieren über jedes Pixel und wenden für ein Pixelwert $$z$$ die Funktion $$f(z) = az + b $$ an. Wichtig ist, dass für unser gegebenes Bild $$f(z)$$ die Werte 0 und 1 nicht unterläuft bzw. überschreitet: Häufig sind nicht alle Werte zwischen $$0$$ und $$1$$ vertreten. Wir können zum Beispiel mit `np.min(array)`den kleinsten und mit `np.max(array)`den größten Wert eines Bilds bestimmen. Dann können wir prüfen, ob das für ein gegebenes $$a$$ und $$b$$ auch erlaubt ist. Alternativ kann man mit `np.clip`einfach dafür sorgen, dass jeder Wert zwischen 0 und 1 bleibt.

Nutze diese Funktion insbesondere, um zwei Methoden `konstrast()` und `invertiere()` zu schreiben. `konstrast()`soll dabei den maximalen Kontrast ermöglichen, also alle möglichen Bildwerte zwischen 0 und 1 ausschöpfen. `invertiere()` soll die Graustufen umkehren. 

###### Schwellwertbinarisierung

Diese Funktion macht jedes Pixel entweder schwarz oder weiß. Dafür legen wir einen Schwellwert $$0\leq c \leq 1$$ fest und wenden pixelweise die Funktion $$ f(z) = \begin{cases}0 & \text{für } z < c \\ 1 & \text{für } z \geq c \end{cases}$$ an.

##### Faltungsoperatoren

Bei Faltungsoperatoren hängt der neue Bildpunkt am Ort $$(x,y)$$ nicht nur vom alten Bildpunkt am Ort $$(x,y)$$ ab, sondern auch von Punkten, die nahe dran liegen. Um dies zu erreichen, verwenden wir so genannte Filter und das Prinzip der Faltung. Für eine Matrix $$K = \begin{pmatrix} K(-1,-1) & K(-1,0) & K(-1,1) \\ K(0,-1) & K(0,0) & K(0,1) \\ K(1,-1) & K(1,0) & K(1,1) \end{pmatrix}$$ (die Filtermatrix), definieren wir das neue Bild

$$ \text{Neues\_Bild}(x,y) = \sum_{i=-1}^{1}\sum_{j=-1}^{1} K(i,j)\cdot \text{Altes\_Bild}(x+i,y+j)$$
Für Randpunkte $$(𝑥, 𝑦)$$ des Bildes ergibt sich dabei das Problem, dass gewisse Nachbarpunkte $$(x+i,y+j)$$ gar nicht existieren; aus diesem Grund stelle man sich das Bild über den Rand hinaus fortgesetzt vor, und zwar mit dem Wert des nächstgelegenen Bildpunktes.  Typische Filter findet ihr in folgendem Wörterbuch

```python
filter = {
	"Laplace": np.array([
		[ 0, -1, 0],
		[-1, 4, -1],
		[ 0, -1, 0]
	], dtype=float),

	"Tiefpass": (1/5) * np.array([
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0]
	], dtype=float),

	"Kirsch": np.array([
		[ 1, 3, 3],
		[-1, 0, 1],
		[-3, -3, -1]
	], dtype=float),

	"Sobel_DX": np.array([
		[-1, 0, 1],
		[-2, 0, 2],
		[-1, 0, 1]
	], dtype=float),

	"Sobel_DY": np.array([
		[ 1, 2, 1],
		[ 0, 0, 0],
		[-1, -2, -1]
	], dtype=float)

}
```

Implementiert Methoden der Klasse Bild, mit denen ihr die Filter anwendet.

### Aufgabe

Sucht auf dem Schlossgelände nach spannenden Motiven und macht Bilder mit eurem Smartphone. Importiert diese als .png oder .jpg. Mit folgender Funktion könnt ihr die Datei in ein .ppm umwandeln. Durch geschickte Kombination der von euch erstellten Filter könnt ihr dann Effekte in das Bild bringen. Am Ende vergleichen wir alle Bilder.




