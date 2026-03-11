# 📘 Discrete Mathematics — Spring 2026 Midterm Prep

A clean, interactive study guide dashboard for the **Discrete Mathematics** midterm at **Southern University Bangladesh (CSE Dept)**. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools.

> **Developed by [Rafsan](https://github.com/rafsan)**

---

## ✨ Features

- **5 study phases** — Pattern Analysis, Slide Map, Priority Matrix, Study Roadmap, and Exam Strategy
- **Liquid glass UI** — frosted glass cards on a soft gradient background, fully light mode
- **Live exam countdown** — counts down to April 1st in the top bar
- **Interactive accordion roadmap** — expands per chapter with slide refs, priorities, and question types
- **Donut chart** — visual breakdown of exam weight distribution (rendered via Chart.js with a canvas center label plugin)
- **Logic translation table** — English phrases → symbolic logic, formatted with MathJax
- **Quick-access buttons** — direct links to NotebookLM notebook and Google Drive materials
- **Fully responsive** — works on desktop, tablet, and Android (with gesture nav bar safe area support)
- **Optimized performance** — static CSS gradient background, minimal `backdrop-filter` blur

---

## 📁 File Structure

```
├── dm-dashboard.html   # Main HTML structure
├── style.css           # All styles (glass theme, layout, responsive)
├── script.js           # All JS (data, chart, navigation, accordion, countdown)
└── README.md
```

---

## 🔗 Quick Links

| Resource | Link |
|----------|------|
| 📔 NotebookLM | [Open Notebook](https://notebooklm.google.com/notebook/56229c4c-bd04-4eee-b39d-ab7fdbafc5fb) |
| 📂 Study Materials | [Google Drive](https://drive.google.com/drive/folders/1t7FW7wQaKyCu-M4KZ5OL5xi8JsOEXUJc?usp=sharing) |

---

## 📚 Content Coverage

| Phase | Section | Description |
|-------|---------|-------------|
| 01 | Pattern Analysis | Past paper breakdown, question type weights, gap analysis |
| 02 | Slide Map | Exact slide page references for every examinable topic |
| 03 | Priority Matrix | Topics ranked High / Medium / Low by exam frequency |
| 04 | Study Roadmap | Chapter-by-chapter accordion with slide refs and question types |
| 05 | Exam Strategy | Quick wins, logic translation cheatsheet, 6 tactical tips |

### Chapters Covered

- **Chapter 1** — Logic & Proofs (Truth Tables, Quantifiers, Conditional Statements)
- **Chapter 2** — Basic Structures (Sets, Functions, Sequences, Summations)
- **Chapter 3** — Counting Theory (Sum/Product Rules, Permutations, Pigeonhole)

---

## 🛠️ Built With

- **HTML5 / CSS3 / Vanilla JS** — zero dependencies in the main codebase
- **[Chart.js](https://www.chartjs.org/)** — donut chart with custom canvas center-label plugin
- **[MathJax 3](https://www.mathjax.org/)** — LaTeX math rendering for logic notation
- **[Google Fonts](https://fonts.google.com/)** — Outfit, JetBrains Mono, Playfair Display

---

## 📱 Mobile & Android Notes

- Uses `viewport-fit=cover` and `env(safe-area-inset-*)` to handle Android gesture navigation bars correctly
- Uses `100dvh` (dynamic viewport height) to avoid the browser UI overlap bug on Android Chrome
- Sidebar slides in as an overlay on screens narrower than 900px

---

## 📄 License

This project is for personal academic use. Feel free to fork and adapt for your own courses.

---

<p align="center">Made with ☕ for the Spring 2026 midterm · Southern University Bangladesh</p>