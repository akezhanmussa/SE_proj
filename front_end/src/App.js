import React from 'react';
import './App.css';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { configureStore } from './redux/ConfigureStore';

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
        <Main/>
      </Provider>
  );
}

export default App;
