import React, { useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import Contact from "@/pages/Contact";
import { useNavigate } from "react-router-dom";

interface ContactModalProps {
  open: boolean;
  onClose?: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps): JSX.Element {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate("/", { replace: true });
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
  
  return (
    <Modal open={open} onClose={handleClose} ariaLabel="Contact dialog" className="max-w-4xl">
      <div className="relative p-4 sm:p-6">
        <Contact />
      </div>
    </Modal>
  );
}
