"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
};

export default ClientLayout;
