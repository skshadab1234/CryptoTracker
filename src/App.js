import { Container } from '@material-ui/core';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Page/CoinPage';
import Homepage from './Page/Homepage';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/" component={Homepage}  exact />
      <Route path="/coin/:id" component={CoinPage}  />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
