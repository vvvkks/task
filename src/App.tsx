import React from "react";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import MainBoardContainer from "./components/mainBoard/MainBoardContainer";

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <MainBoardContainer />
        </div>
      </Provider>
  );
}

export default App;
