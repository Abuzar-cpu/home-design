---
title: Tour split into src/ files
author: Reis
date: 2026-11-16
branch: main
id: l-89452df7
scope: repo
status: active
src: agent
---

The tour is published as one HTML page but edited as src/: template + style.css + src/js/NN-*.js joined in name order into one shared-scope <script> by tools/build.py (output build/index.html, git-ignored). The split was verified byte-identical to the published page. tools/check.py builds first. In tour_sim.py the Start Tour button is clicked from inside the page (document.getElementById('tourBtn').click()): Playwright's pg.click times out because the swiftshader render loop keeps the page busy.
