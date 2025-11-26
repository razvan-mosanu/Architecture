# The Art of Architecture 🏛️

Un site web interactiv și complet responsive dedicat marilor arhitecți (Tadao Ando, Zaha Hadid, Antoni Gaudí), construit folosind tehnologii web standard (Vanilla JS, HTML, CSS), fără framework-uri externe.

🔗 **[Vezi Site-ul Live Aici](https://razvan-mosanu.github.io/Architecture/)**

## 🌟 Funcționalități Principale

### 1. Sistem de Autentificare & Securitate 🔐
* **Login & Înregistrare:** Formulare funcționale cu validare complexă (Regex) pentru email și parolă (inclusiv caractere speciale).
* **Persistență:** Sesiunea utilizatorului rămâne activă chiar și după închiderea browserului (folosind `localStorage`).
* **Protejarea Rutelor (Route Guarding):** Paginile interne (de conținut) nu pot fi accesate direct prin URL fără a fi autentificat. Scriptul `auth.js` redirecționează automat utilizatorii neautorizați.
* **Logout:** Funcționalitate de delogare disponibilă pe toate paginile.

### 2. Interactivitate & Design 🎨
* **Dark Mode:** Temă întunecată persistentă, implementată fără "flash" vizual la încărcare (prin `theme.js` în `<head>`).
* **Conținut Dinamic:** Paginile arhitecților își încarcă datele (text, imagini) dintr-o structură de date JavaScript, simulând un comportament de tip API/AJAX.
* **Responsive Design:** Layout adaptabil pentru Desktop, Tabletă și Mobil, folosind CSS Grid și Flexbox.
* **Animații:** Meniu expandabil CSS, tranziții fluide la hover pe carduri și animații de fundal (`@keyframes`).

### 3. Sistem de Comentarii 💬
* **Postare:** Utilizatorii logați pot lăsa comentarii pe pagina de Portofoliu.
* **Pre-populare:** Email-ul utilizatorului logat este completat automat și blocat în formular.
* **Administrare:** Doar utilizatorul cu email-ul `admin@gmail.com` are drepturi de ștergere a comentariilor (butonul "Șterge" apare doar pentru el).

### 4. Altele ⏱️
* **Ceas Live:** Afișarea orei curente în timp real în footer.
* **Sanitizare:** Protecție împotriva atacurilor XSS prin manipularea corectă a textului (`.textContent`).

## 🛠️ Tehnologii Utilizate

* **HTML5:** Semantic (tag-uri `<section>`, `<header>`, `<main>`, etc.).
* **CSS3:** Variabile CSS, Media Queries, Flexbox, Grid, Tranziții.
* **JavaScript (ES6+):**
    * Manipulare DOM
    * localStorage API
    * Validare Regex
    * Module separate pentru logică (`script.js`, `login.js`, `auth.js`, `theme.js`).

## 📂 Structura Proiectului

* `index.html` (fostul PROIECT.html) - Pagina principală (Landing Page)
* `login.html` - Pagina de autentificare
* `TadaoAndo.html`, `ZahaHadid.html`, `AntoniGaudi.html` - Pagini principale arhitecți
* `script.js` - Logica principală a aplicației
* `auth.js` - Script de securitate (verificare login)
* `theme.js` - Script pentru gestionarea temei (Dark Mode)
* `login.js` - Logica specifică paginii de login

## 🚀 Cum să rulezi proiectul local

Deoarece proiectul folosește module și rute dinamice, este recomandat să îl rulezi pe un server local, nu deschizând fișierele direct (`file://`).

1.  Clonează acest repository sau descarcă fișierele.
2.  Deschide folderul în **Visual Studio Code**.
3.  Instalează extensia **Live Server**.
4.  Dă click-dreapta pe `index.html` și selectează **"Open with Live Server"**.

---
*Proiect realizat pentru laboratorul de Tehnici Web.*
