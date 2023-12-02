import React from "react";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import {store} from "./redux/store";
import MainBoard from "./components/mainBoard/MainBoard";

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <MainBoard />
        </div>
      </Provider>
  );
}

export default App;
