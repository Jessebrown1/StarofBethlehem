import { createContext, useCallback, useContext, useRef, useState } from "react";
import ApplicationModal from "../components/ApplicationModal.jsx";

const ApplicationModalContext = createContext(null);

export function ApplicationModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const openModal = useCallback((event) => {
    triggerRef.current = event?.currentTarget || null;
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  return (
    <ApplicationModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <ApplicationModal isOpen={isOpen} onClose={closeModal} />
    </ApplicationModalContext.Provider>
  );
}

export function useApplicationModal() {
  const ctx = useContext(ApplicationModalContext);
  if (!ctx) {
    throw new Error("useApplicationModal must be used within ApplicationModalProvider");
  }
  return ctx;
}
