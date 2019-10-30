import React from 'react';
import './App.css';
import './shared/style.css'
import Home from './components/Home';
import { Provider } from 'react-redux';
import { configureStore } from './redux/ConfigureStore';
import NavigationBar from "./components/NavigationBar";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <NavigationBar></NavigationBar>
      </Provider>
  );
}

export default App;
