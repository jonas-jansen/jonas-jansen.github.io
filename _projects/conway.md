---
layout: page
title: Conway's Spiel des Lebens
description: 
img: assets/img/img_Conway.png
importance: 1
category: Projektarbeiten
---

Conway's Spiel des Lebens ist ein einfaches Modell für die Ausbreitung einfacher Lebewesen. Das Spielfeld besteht aus quadratischen Zellen. Jede Zelle kann entweder leben oder tot sein. Neue Generationen von Zellen entwickeln sich nach einigen einfachen Regeln. Die nächste Generation wird direkt aus dem Zustand der vorherigen Generation ermittelt. Dabei geht man folgendermaßen vor:
    1. Eine lebende Zelle mit weniger als zwei oder mehr als drei lebenden Nachbarn stirbt (Einsamkeit bzw. Nahrungsmangel). Hierbei zählen auch diagonal aneinander stoßende Zellen als Nachbarn.
    2. Eine lebende Zelle mit zwei oder drei lebenden Nachbarn lebt munter weiter.
    3. Eine tote Zelle mit genau drei lebenden Nachbarn wird lebendig.

<h5 style="color: var(--global-theme-color);"> Conway's Spiel des Lebens ausprobieren</h5>

<a href="/apps/conway/" target="_blank" rel="noopener noreferrer">Conway's Spiel des Lebens</a>