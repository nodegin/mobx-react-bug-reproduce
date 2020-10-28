// Libs
import React from "react";
import Testing from "./component/testing";
import Store, { StoreProvider } from "./store";

const store = new Store();
console.log(store);

const App = () => {
  return (
    <StoreProvider store={store}>
      <Testing />
      123
    </StoreProvider>
  );
};

export default App;
