---
layout: page
title: teaching
permalink: /teaching/
description: My courses.
nav: true
nav_order: 2
display_categories: [current,past]
horizontal: true
---

<!-- pages/teaching.md -->
<div class="projects">
{%- if site.enable_teaching_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }} teaching</h2>
  {%- assign teaching_event = site.data.teaching | where: "category", category -%}
  <!-- Generate cards for each project -->
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
  {% endfor %}
{%- endif -%}
</div>
