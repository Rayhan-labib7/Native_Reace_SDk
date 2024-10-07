// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const NativeReactSdkContext = createContext();

export const NativeReactSdkProvider = ({ children, email, token }) => {
  const [authInfo] = useState({ email, token });

  return (
    <NativeReactSdkContext.Provider value={authInfo}>
      {children}
    </NativeReactSdkContext.Provider>
  );
};

export const useNativeReactSdk = () => {
  return useContext(NativeReactSdkContext);
};
