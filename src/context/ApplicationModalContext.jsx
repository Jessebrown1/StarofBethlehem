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
    // The trigger can be gone by the time the modal closes (e.g. Apply Now
    // clicked from inside the mobile menu, which unmounts itself as part
    // of the same click) — guard against focusing a detached node.
    if (triggerRef.current && document.body.contains(triggerRef.current)) {
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
