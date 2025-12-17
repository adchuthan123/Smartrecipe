<script>
  import "./styles.css";
  import { page } from '$app/stores';
  
  let { children } = $props();
  let mobileMenuOpen = $state(false);

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }

  // Reaktive Funktion für aktive Route basierend auf $page Store
  function isActive(path) {
    const currentPath = $page.url.pathname;
    
    // Exakte Übereinstimmung für Startseite
    if (path === '/') {
      return currentPath === '/';
    }
    
    // Für andere Routen: prüfe ob aktueller Pfad mit dem Link beginnt
    return currentPath === path || currentPath.startsWith(path + '/');
  }
</script>

<nav class="modern-nav">
  <div class="nav-container">
    <a href="/" class="nav-brand" onclick={closeMobileMenu}>
      <span class="brand-icon">🍳</span>
      <span class="brand-text">SmartRecipe</span>
    </a>

    <button class="mobile-toggle" onclick={toggleMobileMenu} aria-label="Navigation umschalten">
      <span class="hamburger" class:open={mobileMenuOpen}></span>
    </button>

    <div class="nav-menu" class:open={mobileMenuOpen}>
      <a 
        href="/" 
        class="nav-link" 
        class:active={isActive('/')} 
        onclick={closeMobileMenu}
      >
        <span class="link-icon">🏠</span>
        <span>Startseite</span>
      </a>
      
      <a 
        href="/Rezepte" 
        class="nav-link" 
        class:active={isActive('/Rezepte')} 
        onclick={closeMobileMenu}
      >
        <span class="link-icon">📖</span>
        <span>Rezepte</span>
      </a>
      
      <a 
        href="/Zutaten" 
        class="nav-link" 
        class:active={isActive('/Zutaten')} 
        onclick={closeMobileMenu}
      >
        <span class="link-icon">🥕</span>
        <span>Zutaten-Suche</span>
      </a>
      
      <a 
        href="/favorites" 
        class="nav-link" 
        class:active={isActive('/favorites')} 
        onclick={closeMobileMenu}
      >
        <span class="link-icon">❤️</span>
        <span>Favoriten</span>
      </a>
      
      <a 
        href="/Rezepte/create" 
        class="nav-link nav-cta" 
        onclick={closeMobileMenu}
      >
        <span class="link-icon">➕</span>
        <span>Neues Rezept</span>
      </a>
    </div>
  </div>
</nav>

<main class="main-content">
  {@render children()}
</main>

<style>
  .modern-nav {
    background: linear-gradient(135deg, #0f1724 0%, #1a2332 100%);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: white;
    font-weight: 800;
    font-size: 1.4rem;
    transition: transform 0.2s;
  }

  .nav-brand:hover {
    transform: scale(1.05);
  }

  .brand-icon {
    font-size: 1.8rem;
  }

  .brand-text {
    background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .mobile-toggle {
    display: none;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;
  }

  .hamburger {
    display: block;
    width: 28px;
    height: 2px;
    background: white;
    position: relative;
    transition: all 0.3s ease;
  }

  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 28px;
    height: 2px;
    background: white;
    transition: all 0.3s ease;
  }

  .hamburger::before {
    top: -8px;
  }

  .hamburger::after {
    bottom: -8px;
  }

  .hamburger.open {
    background: transparent;
  }

  .hamburger.open::before {
    transform: rotate(45deg);
    top: 0;
  }

  .hamburger.open::after {
    transform: rotate(-45deg);
    bottom: 0;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    color: #cbd5e1;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    position: relative;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateY(-2px);
  }

  .nav-link.active {
    background: rgba(0, 102, 255, 0.15);
    color: white;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 3px;
    background: linear-gradient(90deg, #0066ff, #0046b3);
    border-radius: 2px 2px 0 0;
  }

  .nav-cta {
    background: linear-gradient(135deg, #0066ff, #0046b3);
    color: white;
    margin-left: 0.5rem;
  }

  .nav-cta:hover {
    background: linear-gradient(135deg, #0052cc, #003380);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 102, 255, 0.4);
  }

  .link-icon {
    font-size: 1.1rem;
  }

  .main-content {
    min-height: calc(100vh - 70px);
  }

  @media (max-width: 768px) {
    .mobile-toggle {
      display: block;
    }

    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, #0f1724 0%, #111827 100%);
      flex-direction: column;
      gap: 0;
      padding: 1rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      max-height: calc(100vh - 70px);
      overflow-y: auto;
    }

    .nav-menu.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .nav-link {
      width: 100%;
      padding: 1rem 1.25rem;
      border-radius: 8px;
      justify-content: flex-start;
    }

    .nav-cta {
      margin-left: 0;
      margin-top: 0.5rem;
    }

    .nav-link.active::after {
      display: none;
    }

    .nav-link.active {
      background: rgba(0, 102, 255, 0.2);
      border-left: 4px solid #0066ff;
    }
  }
</style>
