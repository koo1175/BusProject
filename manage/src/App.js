import logo from './logo.svg';
import './App.css';

function App(props) {
  console.log(props);
  const subject = props.subject;
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          {subject}
        </p>
        
      </header>
    </div>
  );
}

export default App;
