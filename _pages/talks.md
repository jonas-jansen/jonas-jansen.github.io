---
layout: page
permalink: /talks/
title: talks
description: talks in reversed chronological order.
years: [2023,2021,2020]
nav: true
nav_order: 6
---
<!-- pages/talks.md -->

<div class="projects">
{%- for year in page.years %}
  <h2 class="category">{{ year }}</h2>
  {%- assign talks = site.data.talks | where: "year", year -%}
  <div class="container">
    <div class="row row-cols-1">
    {%- for talk in talks -%}
      {% include talk_horizontal.html %}
    {%- endfor %}
    </div>
  </div>
{% endfor %}
</div>
