import React, { useState, createContext } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const handleClose = () => {
    SetIsOpen(false);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, SetIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
};
export default SidebarProvider;
