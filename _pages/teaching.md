---
layout: default
title: teaching
permalink: /teaching/
description: My courses.
nav: true
nav_order: 2
display_categories: [current,past]
horizontal: true
---
<h2> Teaching </h2>

<h5 class = "bottom-one"> My courses. </h5>

<!-- pages/teaching.md -->
<div class="projects">
{%- if page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }} teaching</h2>
  {%- assign teaching_event = site.data.teaching | where: "category", category -%}
  {% if category == "current" -%}
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for event in teaching_event -%}
      {% include teaching_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for event in teaching_event -%}
      {% include teaching_horizontal.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {%- else -%}
    {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-1">
    {%- for event in teaching_event -%}
      {% include teaching_horizontal_past.html %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for event in teaching_event -%}
      {% include teaching_horizontal_past.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {%- endif -%}
  {% endfor %}
{%- endif -%}
</div>
