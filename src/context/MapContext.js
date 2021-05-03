import React, { useReducer } from "react";

export const MapContext = React.createContext();

const initialState = {
  name: "",
  address: "",
  longtitude: "",
  latitude: "",
  time: "10 - 15 menit",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "EDIT_MAP":
      return {
        ...state,
        name: action.payload.name,
        address: action.payload.address,
        longtitude: action.payload.longtitude,
        latitude: action.payload.latitude,
        time: "10 - 15 menit",
      };

    default:
      throw new Error();
  }
};

export const MapContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MapContext.Provider value={[state, dispatch]}>
      {children}
    </MapContext.Provider>
  );
};
