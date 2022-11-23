---
layout: default
title: joint seminar
permalink: /asymptotic-models/
description:
nav: true
nav_order: 2
---


<h2> Asymptotic Models in Fluid Dynamics </h2>

<h5 class = "bottom-one"> Joint Research Seminar Lund-Stuttgart </h5>

<b>Organisers:</b> <a href="https://gabrielebruell.wordpress.com">Gabriele Brüll</a> (Lund), Jonas Jansen (Lund), and <a 
href="https://www.iadm.uni-stuttgart.de/team/Lienstromberg/">Christina Lienstromberg</a> (Stuttgart)

The seminar takes place roughly biweekly, Wednesdays at 11:00 (sharp) via Zoom. There will be a 45-60 minute talk plus discussion.

To follow the seminar, please contact me via mail.


<h5> List of Talks </h5>


<table class="table">
<tr>
    <th colspan="4">Season 1: Introduction to Thin-Film Equations</th>
  </tr>
{% assign talks = site.data.season1 | sort:"date"  %}
{% for talk in talks %}
<a class="table"><tr>
   <td width="1"> {{ talk.date | date: "%d/%m/%Y" }} </td>
   <td width="150"> {{ talk.speaker }} </td>
   <td> {{ talk.title }} </td>
   <td width="1" style="vertical-align:center">
   {% if talk.pdf %}
            <a href="{{ talk.pdf | prepend: '/assets/slides/' | relative_url }}" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-pdf-xl"></i></a>
        {% endif %}
  </td>
 </tr>
 {%- if talk.abstract -%}
 <tr style = "border-top-style:none">
 <td></td>
 <td colspan="2">
 <b> Abstract:</b> {{ talk.abstract }}
 </td>
 </tr>
 {%- endif -%}
 </a>
{% endfor %}
</table>
