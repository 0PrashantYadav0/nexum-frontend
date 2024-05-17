
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDINGID,
  appId: import.meta.env.VITE_APP_APPID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

// ReactDOM.createRoot(document.getElementById('root')).render(
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <App />
  //     </PersistGate>
  //   </Provider>

export const app = initializeApp(firebaseConfig);






