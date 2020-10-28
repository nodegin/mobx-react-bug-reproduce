// Libs
import React from "react";
import { Provider, observer } from "mobx-react";
import { Store } from "./store";

const store = new Store();

const App = () => {
  return (
    <Provider store={store}>
      <h1>
        123
      </h1>
    </Provider>
  );
};

export default observer(App);
