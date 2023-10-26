import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
}

export default App;
