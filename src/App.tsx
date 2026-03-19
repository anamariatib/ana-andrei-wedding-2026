import './App.css'

interface WeddingInfo {
  names: string;
  date: string;
}

const weddingInfo: WeddingInfo = {
  names: "Ana & Andrei",
  date: "12 iulie 2026",
};

function App() {
  return (
    <div className="wrapper">
      <div className="background-overlay"></div>
      
      <main className="content-card">
        <header className="header">
          <span className="save-the-date">SAVE THE DATE</span>
          <h1 className="names">{weddingInfo.names}</h1>
        </header>
        
        <div className="divider">
          <span className="dot"></span>
          <span className="line"></span>
          <span className="dot"></span>
        </div>
        
        <section className="status-section">
          <h2 className="ingenious-status">Suntem în pregătiri...</h2>
          <p className="loading-subtext">
            Noi repetăm „Da”-ul, iar site-ul își pune hainele de petrecere. 
            Reveniți curând pentru locație, RSVP și alte detalii!
          </p>
        </section>
        
        <footer className="footer-date">
          <p>Ziua cea mare:</p>
          <time className="final-date">{weddingInfo.date}</time>
        </footer>
      </main>
    </div>
  )
}

export default App