<script>
  import "./styles.css";
</script>

<section class="site-hero">
  <div class="hero-inner">
    <h1 class="hero-title">SmartRecipe</h1>
    <p class="hero-sub">Entdecke leckere Rezepte — schnell gekocht und einfach erklärt. Deine persönliche Rezeptsammlung, smart und übersichtlich.</p>

    <div class="hero-cta">
      <a href="/Rezepte" class="btn primary">Jetzt Rezepte entdecken</a>
      <a href="/Rezepte/create" class="btn outline">Neues Rezept hinzufügen</a>
    </div>
  </div>
</section>

<section class="features">
  <div class="container">
    <h2 class="features-title">Warum SmartRecipe?</h2>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🧑‍🍳</div>
        <h3>Einfache Anleitungen</h3>
        <p>Schritt-für-Schritt erklärt — perfekt für Anfänger.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⏱️</div>
        <h3>Schnelle Rezepte</h3>
        <p>Viele Gerichte in unter 30 Minuten zubereitet.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📖</div>
        <h3>Deine Sammlung</h3>
        <p>Eigene Rezepte hinzufügen und Favoriten verwalten.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .site-hero {
    background: linear-gradient(180deg, #0f1724 0%, #111827 60%);
    color: white;
    padding: 4.5rem 0 3.5rem;
  }

  .hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 3.2rem;
    margin: 0 0 0.6rem;
    font-weight: 800;
    letter-spacing: -1px;
  }

  .hero-sub {
    color: #cbd5e1;
    font-size: 1.05rem;
    max-width: 820px;
    margin: 0 auto 1.6rem;
    line-height: 1.6;
  }

  .hero-cta .btn {
    margin: 0 0.5rem;
  }

  .btn.primary {
    background: linear-gradient(90deg,#0066ff,#0046b3);
    color: white;
    padding: 0.8rem 1.25rem;
    border-radius: 10px;
    font-weight: 700;
    text-decoration: none;
    display: inline-block;
  }

  .btn.outline {
    background: transparent;
    color: #cbd5e1;
    border: 2px solid rgba(203,213,225,0.12);
    padding: 0.7rem 1.1rem;
    border-radius: 10px;
    text-decoration: none;
    margin-left: 0.5rem;
  }

  .features {
    padding: 3rem 0 4rem;
    background: #f7fafc;
  }

  .features-title {
    text-align: center;
    font-size: 1.65rem;
    margin-bottom: 1.75rem;
    color: #111827;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .feature-card {
    background: white;
    border-radius: 12px;
    padding: 1.6rem;
    box-shadow: 0 6px 20px rgba(16,24,40,0.06);
    text-align: center;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(16,24,40,0.09);
  }

  .feature-icon {
    font-size: 1.9rem;
    margin-bottom: 0.8rem;
  }

  .feature-card h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
    color: #0f1724;
  }

  .feature-card p {
    color: #475569;
    font-size: 0.95rem;
    margin: 0;
  }

  @media (max-width: 900px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-title { font-size: 2.4rem; }
    .hero-sub { font-size: 1rem; }
  }

  @media (max-width: 560px) {
    .features-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2rem; }
  }
</style>
