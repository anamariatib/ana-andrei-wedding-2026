import './App.css';
import Events from './components/Events';
import Footer from './components/Footer';
import Quiz from './components/Quiz';
import RSVPForm from './components/RsvpForm';

function App() {
  return (
    <div className="wrapper">
      <Events />
      <RSVPForm />
      <Quiz />
      <Footer />
    </div>
  );
}

export default App;
