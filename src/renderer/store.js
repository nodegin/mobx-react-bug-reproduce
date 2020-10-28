import React from "react";
import PropTypes from "prop-types";
import { observable } from "mobx";

export default class Store {
  @observable someValue = 123;
}

const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// Hook to use store in any functional component
export const useStore = () => React.useContext(StoreContext);

StoreProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  store: PropTypes.object.isRequired,
};
