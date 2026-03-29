import './App.css';
import Events from './components/Events';
import Footer from './components/Footer';
import RSVPForm from './components/RsvpForm';

function App() {
  return (
    <div className="wrapper">
      <Events />
      <RSVPForm />
      <Footer />
    </div>
  );
}

export default App;
