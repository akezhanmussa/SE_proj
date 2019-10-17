import React from 'react';
import './App.css';
import './shared/style.css'
import Home from './components/Home';
import { Provider } from 'react-redux';
import { configureStore } from './redux/ConfigureStore';

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <Home/>
      </Provider>
  );
}

export default App;
