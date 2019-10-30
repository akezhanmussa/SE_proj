import React from 'react';
import './App.css';
import './shared/style.css'
import Main from './components/Main';
import { Provider } from 'react-redux';
import { configureStore } from './redux/ConfigureStore';
import { BrowserRouter } from 'react-router-dom'

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
