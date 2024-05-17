import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

{/* <Route path='/profile' element={<Profile />} />
          <Route path='/workers' element={<Worker />} />
          <Route path='/hero' element={<Hero />} />
          <Route path='/worker/:id' element={<SingleWorker />} /> */}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
