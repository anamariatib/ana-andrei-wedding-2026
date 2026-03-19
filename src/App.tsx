import './App.css'

function App() {
  return (
    <div className="wedding-container">
      <header>
        <h1>Ana & Andrei</h1>
        <p className="date">12 IULIE 2026</p>
      </header>
      
      <main>
        <section className="hero">
          <h2>Se lasă cu petrecere, dar mai avem de lucrat un pic...revino ceva mai tarziu!</h2>
          <p>Suntem nerăbdători să vă avem alături.</p>
        </section>

        {/* Aici vom adăuga ulterior componenta de RSVP */}
      </main>

      <footer>
        <p>© 2026 Creat cu ❤️ de noi</p>
      </footer>
    </div>
  )
}

export default App