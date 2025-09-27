import React, { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import Contact from "@/pages/Contact";
import { useNavigate, useLocation } from "react-router-dom";

interface ContactModalProps {
  open: boolean;
  onClose?: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    // Always navigate to home page when closing the modal
    navigate("/", { replace: true });
    
    // Call the onClose callback if provided (for cleanup)
    if (onClose) {
      onClose();
    }
  };

  // Handle escape key press
  useEffect(() => {
    if (!open) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, handleClose]);
  
  // Handle browser back button
  useEffect(() => {
    if (!open) return;
    
    const handlePopState = () => {
      handleClose();
    };
    
    window.history.pushState({ modal: true }, '');
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [open, handleClose]);

  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Contact dialog" className="max-w-4xl">
      <div className="relative p-4 sm:p-6">
        <Contact />
      </div>
    </Modal>
  );
}
