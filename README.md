# Projektdokumentation – [Projekttitel]

## Inhaltsverzeichnis

1. [Einordnung & Zielsetzung](#1-einordnung--zielsetzung)
2. [Zielgruppe & Stakeholder](#2-zielgruppe--stakeholder)
3. [Anforderungen & Umfang](#3-anforderungen--umfang)
4. [Vorgehen & Artefakte](#4-vorgehen--artefakte)
    - [Understand & Define](#41-understand--define)
    - [Sketch](#42-sketch)
    - [Decide](#43-decide)
    - [Prototype](#44-prototype)
    - [Validate](#45-validate)
5. [Erweiterungen [Optional]](#5-erweiterungen-optional)
6. [Projektorganisation [Optional]](#6-projektorganisation-optional)
7. [KI‑Deklaration](#7-ki‑deklaration)
8. [Anhang [Optional]](#8-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Einordnung & Zielsetzung

Viele Menschen stehen täglich vor der Frage, was sie kochen sollen, obwohl Zutaten bereits zu Hause vorhanden sind. Klassische Rezeptplattformen setzen voraus, dass Nutzende aktiv nach einem Gericht suchen, statt von ihren vorhandenen Zutaten auszugehen. Dies führt zu Zeitverlust, Frustration und unnötiger Lebensmittelverschwendung.

- **Ziele:** 
SmartRecipe verfolgt das Ziel, die Rezeptsuche zu vereinfachen und inspirierender zu gestalten. Nutzende sollen schnell passende Rezepte auf Basis ihrer vorhandenen Zutaten finden, neue Kochideen entdecken und eigene Rezepte unkompliziert speichern und teilen können. Zusätzlich soll Community-Feedback in Form von Bewertungen und Kommentaren Orientierung bieten.

- **Abgrenzung 
Nicht Bestandteil des Projekts sind Benutzerkonten, Authentifizierung, Einkaufslisten oder eine Anbindung an Online-Shops.

## 2. Zielgruppe & Stakeholder
Wem nützt die Lösung, wer ist beteiligt oder betroffen?

- **Primäre Zielgruppe:** 
Alltagsköch:innen, Studierende und berufstätige Personen, die wenig Zeit haben, aber dennoch abwechslungsreich und bewusst kochen möchten. Besonders angesprochen werden Nutzende, die vorhandene Zutaten verwerten und sich inspirieren lassen wollen.

- **Weitere Stakeholder:** 
Das Lehrteam als bewertende Instanz sowie potenzielle Mitstudierende als Testpersonen.

- **Annahmen:**
Es wird angenommen, dass Nutzende eine visuell inspirierende Darstellung (ähnlich Streaming-Plattformen) bevorzugen und bereit sind, anonym Bewertungen und Kommentare abzugeben.


## 3. Anforderungen & Umfang

- **Kernfunktionalität (Mindestumfang):** 

SmartRecipe deckt alle geforderten Kern-Workflows durchgängig ab. Der Fokus liegt auf einer einfachen, nachvollziehbaren Nutzung ohne technische Hürden. Die zentralen Workflows sind:

-   Rezepte entdecken:
    Nutzende können verfügbare Rezepte in einer übersichtlichen Darstellung durchstöbern und sich inspirieren lassen.

-   Rezepte gezielt suchen und filtern:
    Rezepte lassen sich anhand von Kriterien wie Kategorie (z. B. vegan, vegetarisch, proteinreich), Zubereitungszeit oder Suchbegriffen eingrenzen.

-   Zutatenbasierte Rezeptsuche:
    Nutzende geben vorhandene Zutaten ein und erhalten passende Rezepte inklusive einer visuellen Übereinstimmung (Match).

-   Rezeptdetails anzeigen:
    Jedes Rezept verfügt über eine Detailansicht mit Bild, Zutatenliste, Zubereitungsschritten, Nährwertangaben sowie Bewertungen.

-   Rezepte bewerten und kommentieren:
    Nutzende können Rezepte bewerten und Kommentare hinterlassen, die für andere sichtbar sind.

-   Rezepte favorisieren:
    Rezepte lassen sich speichern und in einer persönlichen Favoritenübersicht wiederfinden.

-   Eigene Rezepte erfassen:
    Nutzende können neue Rezepte inklusive Basisinformationen, Kategorien, Zutaten und Zubereitungsschritten hinzufügen.

Alle genannten Workflows sind vom Einstieg bis zum Abschluss ohne Medienbruch oder externe Abhängigkeiten nutzbar.

- **Akzeptanzkriterien:**

Die Akzeptanzkriterien definieren, wann die Kernfunktionalität als erfolgreich umgesetzt gilt. Für SmartRecipe wurden folgende Kriterien festgelegt:

-   Nutzende können jeden Kern-Workflow vollständig und ohne Fehlermeldungen durchführen.

-   Die Navigation ist jederzeit klar verständlich, und der aktuelle Kontext (z. B. Seite, Filterzustand) ist erkennbar.

-   Filter- und Suchfunktionen liefern nachvollziehbare und konsistente Ergebnisse.

-   Bewertungs- und Favoritenaktionen werden unmittelbar visuell bestätigt.

-   Rezepte ohne Bild werden korrekt mit einem Platzhalter dargestellt, ohne die Nutzererfahrung zu beeinträchtigen.

-   Die Anwendung bleibt auch bei längeren Rezeptlisten übersichtlich und gut bedienbar. 

- **Erweiterungen:** 

Über den Mindestumfang hinaus wurden mehrere funktionale und qualitative Erweiterungen umgesetzt, die den Nutzwert und die Benutzererfahrung erhöhen:

-   Inspirierende Startseite mit thematischen Carousels
    (z. B. „Beliebte Rezepte“, „Top bewertet“, „Vegan geniessen“)

-   Zufallsrezept-Funktion
    zur spontanen Inspiration ohne gezielte Suche

-   Anzeige der neuesten Kommentare
    als Social-Proof-Element für Vertrauen und Orientierung

-   Visuelle Hervorhebung von Rezeptmerkmalen
    durch Kategorien-Badges, Match-Labels und Nährwertübersichten

Diese Erweiterungen sind klar vom Mindestumfang abgegrenzt und dienen primär der Verbesserung der Nutzererfahrung.

## 4. Vorgehen & Artefakte
Die Umsetzung erfolgte phasenbasiert entlang des im Unterricht vermittelten Design-Thinking-Prozesses. Die Phasen wurden iterativ durchlaufen und bei Bedarf erneut aufgegriffen.

### 4.1 Understand & Define
- **Ausgangslage & Ziele:** 
Ziel war es, das Entscheidungsproblem beim Kochen zu verstehen und eine Lösung zu entwickeln, die sowohl Inspiration als auch gezielte Suche unterstützt.

- **Zielgruppenverständnis:** 
Durch Analyse typischer Alltagssituationen wurde deutlich, dass Nutzende zwischen zwei Modi wechseln: gezieltes Suchen und offenes Stöbern.

- **Wesentliche Erkenntnisse:** _[Stichpunkte]_
-Inspiration spielt eine zentrale Rolle bei Kochentscheidungen.
-Zu viele Filter auf einmal wirken überfordernd.
-Bilder und Kategorien erleichtern die Orientierung.

### 4.2 Sketch
- **Variantenüberblick:** _[kurz]_
Es wurden mehrere Konzeptvarianten skizziert, darunter:

- eine rein listenbasierte Rezeptübersicht,
- eine stark visuelle Startseite,
- eine Kombination aus Inspiration und Filteransicht.

- **Skizzen:** _Mehrere Varianten; Unterschiede kurz dokumentieren._
![alt text](image.png)

Untersucht wurden u. a. eine einfache Grid-Übersicht, eine kategorisierte Rezeptdarstellung, ein Split-Layout mit gleichzeitiger Detailansicht, eine Swipe-basierte Inspirationslösung sowie eine klassische Filteransicht mit Seitenleiste. Varianten mit starkem Medien- oder Profilfokus wurden als zu komplex verworfen.

Erkenntnis:
Eine Kombination aus inspirierender Übersicht und klar strukturierter Filter-/Suchansicht bietet das beste Verhältnis zwischen Übersichtlichkeit, Entscheidungsunterstützung und Projektumfang.

### 4.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
Entschieden wurde sich für eine Kombination aus inspirierender Startseite und klassischer Such- und Filteransicht, um beide Nutzungsszenarien abzudecken.

- **End‑to‑End‑Ablauf:** _[kurz beschreiben]_  
Startseite → Inspiration oder Suche → Rezeptdetail → Bewerten/Favorisieren oder neues Rezept erstellen.

- **Referenz‑Mockup:** _[URL, Screenshots mit kurzen Beschreibungen]_  
Link: https://www.figma.com/make/HXtxRKfVG083PzndyISUYw/Webseite-Prototyp-erstellen

Das Referenz-Mockup zeigt einen vollständig navigierbaren Prototypen einer modernen Rezept-App mit minimalistischem, ruhigem Design. Es visualisiert den gesamten Nutzerfluss von der Inspiration über die Rezeptauswahl bis zur Detailansicht und Rezepterstellung. Der Fokus liegt auf klarer Navigation, visuell ansprechenden Rezeptkarten und einer Kombination aus Inspiration (Übersichten) und gezielter Suche (Filter).

### 4.4 Prototype
- **Kernfunktionalität:**
Der Prototyp bildet alle Kernfunktionen ab. Nutzende können Rezepte entdecken, filtern, nach Zutaten suchen, ein Zufallsrezept anzeigen lassen und eigene Rezepte erfassen. Community-Elemente wie Bewertungen und letzte Kommentare sind sichtbar integriert.

- **Deployment:** _[URL]_  
Link: 
https://smartrecipe123.netlify.app/

#### 4.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die 
technische Umsetzung]_

Die Informationsarchitektur von SmartRecipe ist bewusst seitenbasiert und klar strukturiert aufgebaut. Zentrale Bereiche wie Startseite, Rezeptübersicht, Rezeptdetail, Zutaten-Suche, Favoriten sowie das Formular zur Erstellung neuer Rezepte sind eindeutig voneinander getrennt. Dadurch behalten Nutzende jederzeit den Überblick über ihren aktuellen Kontext und können schnell zwischen den Hauptfunktionen wechseln. Die Navigation ist durchgehend sichtbar und konsistent gestaltet, was Orientierung und Wiedererkennung unterstützt.

- **Oberflächenentwürfe:** _[wichtige Screens: Screenshots mit kurzer Erläuterung]

Die Oberflächen sind auf visuelle Klarheit und leichte Erfassbarkeit ausgelegt. Grosse, hochwertige Bilder stehen im Vordergrund und dienen als zentrales Orientierungselement. Eine klare Typografie mit deutlicher Hierarchie sorgt dafür, dass Titel, Metainformationen und Inhalte schnell unterscheidbar sind. Kategorien-Badges wie vegan, proteinreich oder glutenfrei sind gut sichtbar platziert und ermöglichen eine schnelle Einordnung der Rezepte. Interaktive Elemente wie Favoriten-Symbole oder Filter-Chips geben unmittelbares visuelles Feedback und fördern eine intuitive, spielerische Bedienung.

![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)

_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

Eine zentrale Designentscheidung war die Orientierung an einem „Netflix-Style“-Layout mit horizontalen Reihen und klaren visuellen Gruppen. Dieses Muster unterstützt schnelles Stöbern, senkt die Einstiegshürde und weckt Neugier, ohne Nutzende zu überfordern. Gleichzeitig bleibt die Anwendung funktional und kontrollierbar, da gezielte Suche und Filter jederzeit verfügbar sind.

#### 4.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie‑Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
Der Prototyp wurde mit SvelteKit umgesetzt.

- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud‑Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
Entwicklung erfolgte in Visual Studio Code. Der Einsatz von KI-Tools wird in Kapitel 7 beschrieben.

- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
Die Anwendung ist modular aufgebaut. Wiederverwendbare Komponenten wie Rezeptkarten, Navigationsleisten, Filterelemente und Listenansichten sorgen für Konsistenz im Interface und erleichtern spätere Anpassungen. Seiten sind klar nach Nutzungskontext getrennt (z. B. Übersicht, Detailansicht, Erstellung), wodurch sowohl Wartbarkeit als auch Verständlichkeit verbessert werden.

- **Daten & Schnittstellen [Optional]:** _[Datenquellen, API‑Entwürfe, Modelle]_
Die Datenstruktur ist bewusst einfach gehalten und auf die Anforderungen des Prototyps abgestimmt. Rezepte, Kategorien, Bewertungen und Favoriten werden einheitlich modelliert, um realistische Nutzungsszenarien abzubilden, ohne unnötige technische Komplexität einzuführen.

- **Besondere Entscheidungen:** _[z. B. Trade‑offs, Vereinfachungen]_  
Technische Entscheidungen wurden gezielt zugunsten von Übersichtlichkeit, Stabilität und Nutzererfahrung getroffen. Auf komplexe Optimierungen oder zusätzliche Funktionalität wurde bewusst verzichtet, wenn diese keinen direkten Mehrwert für den Prototyp oder die Usability gebracht hätten. Der Fokus lag klar darauf, die Interaktion, Navigation und Informationsdarstellung möglichst realitätsnah und verständlich umzusetzen.

### 4.5 Validate
- **URL der getesteten Version** (separat deployt)
    Link: Link: https://smartrecipe123.netlify.app/
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
Ziel der Evaluation war es zu überprüfen, ob Nutzende die Anwendung ohne Anleitung verstehen und bedienen können. Im Fokus standen insbesondere:

- die Verständlichkeit der Navigation,
- das Zusammenspiel von Inspiration und gezielter Suche,
- die Nachvollziehbarkeit zentraler Workflows wie Filtern, Bewerten und Rezepterstellung.

- **Vorgehen:** _[moderiert/unmoderiert; remote/on‑site]_  
Die Evaluation erfolgte als unmoderierter Test. Den Testpersonen wurden klar formulierte Aufgaben gestellt, die sie selbstständig bearbeiten sollten. Währenddessen wurden Beobachtungen zu Bedienung, Unsicherheiten und Fehlinterpretationen festgehalten.

- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
Getestet wurde mit mehreren Studierenden aus dem gleichen Studienumfeld. Die Testpersonen verfügten über unterschiedliche Koch- und Technikaffinität, was eine realistische Einschätzung der Alltagstauglichkeit ermöglichte.

- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_ 
Die Testpersonen sollten unter anderem:

- ein Rezept anhand bestimmter Kriterien (z. B. vegan, kurze Zubereitungszeit) finden,
- ein Rezept aufrufen und bewerten,
- ein Rezept zu den Favoriten hinzufügen,
- ein neues Rezept erfassen und in der Übersicht wiederfinden. 

- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
Alle Testpersonen konnten die Kernaufgaben erfolgreich abschliessen. Die Navigation wurde als intuitiv wahrgenommen, insbesondere die Startseite mit den thematischen Übersichten. Kleinere Unsicherheiten traten vereinzelt bei erweiterten Filteroptionen auf, führten jedoch nicht zu Abbrüchen.

- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2–4 Sätze]_  
Die Evaluation zeigt, dass der Prototyp verständlich aufgebaut ist und die zentralen Nutzungsszenarien unterstützt. Die Kombination aus visueller Inspiration und funktionaler Suche wurde als hilfreich und angenehm empfunden.

- **Abgeleitete Verbesserungen:** _[priorisiert, kurz begründet]_  
Als mögliche Verbesserungen wurden Komfortfunktionen wie eine Autovervollständigung bei der Suche oder zusätzliche Sortieroptionen identifiziert. Grundlegende Usability-Probleme zeigten sich nicht.

- **Umgesetzte Anpassungen [Optional]:** _[Im Prototyp umgesetzte Verbesserungen aufgrund der Erkenntnisse in der Evaluation]_ Idealerweise: Zwischenstände separat deployen, Änderungen dokumentieren.

Aufgrund der Evaluation wurden kleinere Anpassungen an Beschriftungen und visuellen Hervorhebungen vorgenommen, um die Orientierung weiter zu verbessern.


## 5. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
Über den in den Übungen definierten Mindestumfang hinaus wurden mehrere funktionale und gestalterische Erweiterungen umgesetzt. Diese Erweiterungen verfolgen das Ziel, die Nutzererfahrung zu verbessern, die Anwendung inspirierender zu gestalten und reale Nutzungsszenarien möglichst authentisch abzubilden. Sie sind bewusst als Ergänzungen konzipiert und nicht notwendig, um die Kernanforderungen zu erfüllen.

- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
Eine zentrale Erweiterung ist die inspirierende Startseite mit thematisch kuratierten Rezeptreihen (z. B. „Beliebte Rezepte“, „Top bewertet“, „Vegan geniessen“). Diese Darstellung unterstützt Nutzende insbesondere in Situationen, in denen sie keine konkrete Idee haben, was sie kochen möchten, und senkt die Einstiegshürde in die Anwendung.

Zusätzlich wurde eine Zufallsrezept-Funktion integriert, die spontane Inspiration ermöglicht und spielerische Elemente in den Nutzungskontext einbringt. Diese Funktion richtet sich gezielt an Nutzende, die schnell eine Entscheidung treffen möchten, ohne aktiv zu suchen oder zu filtern.

Ein weiteres Erweiterungselement ist die Anzeige der neuesten Kommentare. Diese fungiert als Social-Proof-Mechanismus und vermittelt Vertrauen, indem sichtbar wird, dass Rezepte aktiv genutzt und bewertet werden. Dadurch erhalten Nutzende zusätzliche Orientierung bei der Auswahl eines Rezepts.

Ergänzend wurden visuelle Hervorhebungen wie Kategorien-Badges, Match-Anzeigen bei der Zutaten-Suche sowie übersichtliche Nährwertinformationen integriert. Diese unterstützen eine schnelle Informationsaufnahme und erleichtern den Vergleich zwischen Rezepten.

- **Umsetzung in Kürze:** _[Wie wurde es gemacht?]_  
Die Erweiterungen wurden als zusätzliche UI-Elemente und Interaktionsmuster in den bestehenden Prototyp integriert. Dabei wurde darauf geachtet, dass sie sich nahtlos in das bestehende Design- und Navigationskonzept einfügen und keine neuen Nutzungshürden entstehen. Bestehende Komponenten wurden wiederverwendet oder leicht erweitert, um Konsistenz und Wartbarkeit zu gewährleisten.

- **Abgrenzung zum Mindestumfang:** _[klar darstellen]_  
Der verpflichtende Mindestumfang umfasst die grundlegenden Workflows wie Rezeptübersicht, Suche, Filter, Detailansicht, Bewertung und Rezepterstellung. Die beschriebenen Erweiterungen sind klar davon abgegrenzt und dienen ausschliesslich der qualitativen Verbesserung der Anwendung. Der Prototyp wäre auch ohne diese Erweiterungen vollständig funktionsfähig und bewertbar.


## 6. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
Link: https://github.com/adchuthan123/Smartrecipe

Das Projekt wurde in einem zentralen Git-Repository geführt. Die Struktur ist so aufgebaut, dass sich Hauptbereiche wie Seiten/Views und wiederverwendbare UI-Bausteine klar trennen lassen. Dadurch konnten Änderungen am Design oder an einzelnen Features gezielt umgesetzt werden, ohne andere Teile unnötig zu beeinflussen.

- **Issue‑Management:** _[Vorgehen kurz beschreiben]_  
Statt eines formalen Issue-Boards wurde leichtgewichtig gearbeitet: Aufgaben ergaben sich direkt aus den Übungsphasen (Understand/Sketch/Decide/Prototype/Validate) und wurden iterativ umgesetzt. Priorisiert wurde jeweils, was für die End-to-End-Workflows und die Prototyp-Qualität (Navigation, Verständlichkeit, Konsistenz) am wichtigsten ist.

- **Commit‑Praxis:** _[z. B. sprechende Commits]_
Die Versionshistorie dokumentiert die schrittweise Entwicklung der wichtigsten Funktionen und UI-Bausteine. Commits wurden feature-orientiert gesetzt, z. B. für Startseite, Navigation, Filteransicht, Rezeptkarten/Carousels und den Random-Generator. Zusätzlich zeigen einzelne Commits gezielte Qualitätsverbesserungen (z. B. Umbenennung/Refactoring von Komponenten) sowie die Zusammenführung von Änderungen über Merges. Dadurch ist nachvollziehbar, wie der Prototyp iterativ ausgebaut und verfeinert wurde.

## 7. KI‑Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### Eingesetzte KI‑Werkzeuge
Die nachfolgende KI-Deklaration beschreibt transparent den Einsatz von KI-Werkzeugen im Projekt SmartRecipe. Ziel ist es klar darzustellen, in welchem Umfang, zu welchem Zweck und mit welcher Verantwortung KI eingesetzt wurde.

Eingesetzte KI-Werkzeuge:

- ChatGPT (OpenAI)
- GitHub Copilot

### Zweck & Umfang
_[**wie, wofür und in welchem Ausmass** wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring) sowie **Überlegungen** zu Qualität, Urheberrecht/Quellen und Prompt‑Vorgehen]_

KI wurde im Projekt unterstützend in mehreren Phasen eingesetzt, insbesondere:

- zur Ideenfindung und Strukturierung während der frühen Konzeptionsphase,
- zur Formulierung von Textentwürfen für die Projektdokumentation,
- zur Unterstützung bei UI- und UX-Überlegungen (z. B. alternative Layout-Varianten),
- punktuell zur Generierung und Optimierung von Code-Vorschlägen während der Prototyp-Umsetzung.

Der Einsatz erfolgte selektiv und kontrolliert. KI-Vorschläge dienten stets als Ausgangspunkt und wurden kritisch geprüft, angepasst oder verworfen. Es wurden keine vollständigen Lösungen ungeprüft übernommen.

Besonderes Augenmerk lag auf der Qualitätssicherung, der Nachvollziehbarkeit der Ergebnisse sowie der inhaltlichen Übereinstimmung mit den Projektanforderungen aus dem Unterricht.

### Art der Beiträge

KI-Unterstützung floss teilweise in folgende Bereiche ein:

- Textvorschläge und Formulierungen für einzelne Kapitel der Dokumentation
- Vorschläge für mögliche UI-Strukturen und Nutzerflüsse
- Code-Snippets oder Refactoring-Ideen zur Verbesserung von Lesbarkeit und Konsistenz

Alle KI-generierten Inhalte wurden:

- inhaltlich überprüft,
- sprachlich angepasst,
- strukturell in das Gesamtkonzept integriert.

Es wurden keine fremden, urheberrechtlich geschützten Inhalte übernommen.


### Eigene Leistung (Abgrenzung)
_[was ist eigenständig erarbeitet/überarbeitet worden?]_

Die folgenden Leistungen wurden eigenständig erbracht:

- Entwicklung der Projektidee und Zielsetzung
- Definition der Anforderungen und Kern-Workflows
- Erstellung der Skizzen und Auswahl der finalen Designrichtung
- Umsetzung des interaktiven Prototyps
- Strukturierung der Anwendung und Navigation
- Durchführung und Auswertung der Evaluation
- Finalisierung der Dokumentation und inhaltliche Abstimmung

KI diente ausschliesslich als Unterstützung, nicht als gestaltende Instanz.

### Reflexion
Der Einsatz von KI erwies sich als zeitsparend und hilfreich, insbesondere bei der Strukturierung komplexerer Texte und beim schnellen Durchspielen alternativer Lösungsansätze. Gleichzeitig zeigte sich, dass KI-Vorschläge oft verallgemeinert oder zu technisch ausfallen und daher eine kritische Bewertung zwingend erforderlich ist.

Durch bewusste Kontrolle, eigenes Fachurteil und iterative Überarbeitung konnte KI sinnvoll integriert werden, ohne die Eigenleistung oder Qualität des Projekts zu beeinträchtigen.

### Prompt‑Vorgehen [Optional]
Prompts wurden gezielt und kontextbezogen formuliert, z. B. zur:

- Umformulierung bestehender Texte,
- Präzisierung von UX-Beschreibungen,
- Vereinfachung technischer Erklärungen für eine nicht-technische Zielgruppe.

Die Ergebnisse wurden anschliessend manuell angepasst.

### Quellen & Rechte [Optional]
_[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; Zitierweise]_
Alle Inhalte, Designs und Strukturen wurden eigenständig erstellt. Es wurden keine externen, lizenzpflichtigen Templates oder Assets übernommen. Platzhalterbilder und Icons dienen ausschliesslich der Prototyp-Darstellung.


---

<!-- Prüfliste (nicht abgeben, nur intern nutzen) -->
<!--
[ ] Kernfunktionalität gemäss Übungen umgesetzt (Workflows durchgängig)
[ ] Akzeptanzkriterien formuliert und erfüllt
[ ] Skizzen erstellt (mehrere Varianten, Unterschiede dokumentiert)
[ ] Referenz‑Mockup in Decide verlinkt (URL/Screenshots)
[ ] Deployment erreichbar
[ ] Umsetzung (Technik) vollständig (Technologie‑Stack; Tooling & KI‑Einsatz inkl. Überlegungen; Struktur/Komponenten; Daten/Schnittstellen falls genutzt)
[ ] Evaluation durchgeführt; Ergebnisse dokumentiert; Verbesserungen abgeleitet
[ ] Dokumentation vollständig, klar strukturiert und konsistent
[ ] KI‑Deklaration ausgefüllt (Werkzeuge; Zweck & Umfang; Art der Beiträge; Abgrenzung; Quellen & Rechte; optional: Prompt‑Vorgehen, Reflexion)
[ ] Erweiterungen (falls vorhanden) begründet und abgegrenzt
[ ] Anhang gepflegt (Testskript/Materialien, Rohdaten/Auswertung) [optional]
-->