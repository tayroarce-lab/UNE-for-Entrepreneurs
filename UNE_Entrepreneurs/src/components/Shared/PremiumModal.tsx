import React, { useEffect } from 'react';
import { Check, AlertCircle, HelpCircle, X, Flower2 } from 'lucide-react';
import '../../styles/Modal.css';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'confirm';
  confirmText?: string;
  cancelText?: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'success',
  confirmText = 'Continuar',
  cancelText = 'Cerrar'
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={40} color="var(--suria-crimson)" />;
      case 'error':
        return <X size={40} color="var(--suria-crimson)" />;
      case 'warning':
        return <AlertCircle size={40} color="var(--suria-orange)" />;
      case 'confirm':
        return <HelpCircle size={40} color="var(--suria-plum)" />;
      default:
        return <Check size={40} color="var(--suria-crimson)" />;
    }
  };

  const getIconContainerColor = () => {
    switch (type) {
      case 'success': return 'var(--suria-crimson)';
      case 'error': return 'var(--suria-crimson)';
      case 'warning': return 'var(--suria-orange)';
      case 'confirm': return 'var(--suria-plum)';
      default: return 'var(--suria-crimson)';
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <div 
          className="modal-icon-container" 
          style={{ color: getIconContainerColor() }}
        >
          {getIcon()}
        </div>
        
        <h2 className="modal-title">{title}</h2>
        <p className="modal-body">{message}</p>
        
        <div className="modal-actions">
          {type === 'confirm' && (
            <button className="modal-btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button 
            className="modal-btn-primary" 
            onClick={onConfirm ? onConfirm : onClose}
          >
            {type === 'confirm' ? confirmText : 'Entendido'}
          </button>
        </div>

        {/* Decorative background flower */}
        <div className="modal-flower-bg">
          <Flower2 size={120} strokeWidth={0.5} />
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
