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
  }, [open]);
  
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
  }, [open]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // If there is a background page in history, go back, otherwise go home
      if (window.history.length > 1 && location.state) {
        navigate(-1);
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Contact dialog" className="max-w-4xl">
      <div className="relative p-4 sm:p-6">
        <Contact />
      </div>
    </Modal>
  );
}
