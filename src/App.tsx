import './App.css';
import Events from './components/Events';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Quiz from './components/Quiz';
import RSVPForm from './components/RsvpForm';

function App() {
  return (
    <div className="wrapper">
      <Hero />
      <Events />
      <RSVPForm />
      <Quiz />
      <Footer />
    </div>
  );
}

export default App;
