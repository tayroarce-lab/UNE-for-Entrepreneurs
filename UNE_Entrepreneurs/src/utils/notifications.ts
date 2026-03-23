import Swal from 'sweetalert2';
import type { SweetAlertIcon } from 'sweetalert2';
import { toast } from 'sonner';

/**
 * Utility for handling confirmations and messages using SweetAlert2 (styled) and Sonner.
 */
export const notifications = {
  /**
   * Success notification (Sonner)
   */
  success: (message: string) => {
    toast.success(message, {
      duration: 3500,
      position: 'top-right',
      style: {
        background: '#ecfdf5',
        color: '#065f46',
        borderRadius: '16px',
        border: '1px solid #10b981',
        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1)',
        fontWeight: 600,
      },
      icon: '✅',
    });
  },

  /**
   * Error notification (Sonner)
   */
  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: 'top-right',
      style: {
        background: '#fef2f2',
        color: '#991b1b',
        borderRadius: '16px',
        border: '1px solid #ef4444',
        boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.1)',
        fontWeight: 600,
      },
      icon: '❌',
    });
  },

  /**
   * Info notification (Sonner)
   */
  info: (message: string) => {
    toast.info(message, {
      position: 'top-right',
      style: {
        background: '#eff6ff',
        color: '#1e40af',
        borderRadius: '16px',
        border: '1px solid #3b82f6',
        boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)',
        fontWeight: 600,
      },
    });
  },

  /**
   * Confirmation Dialog (SweetAlert2 - Styled to look modern and premium)
   */
  confirm: async (
    title: string,
    text: string,
    icon: SweetAlertIcon = 'warning',
    confirmButtonText: string = 'Confirmar',
    cancelButtonText: string = 'Cancelar'
  ) => {
    const result = await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      reverseButtons: true,
      background: '#fff',
      color: '#4A1525',
      padding: '2rem',
      width: '450px',
      confirmButtonText,
      cancelButtonText,
      customClass: {
        popup: 'premium-swal-popup',
        title: 'premium-swal-title',
        htmlContainer: 'premium-swal-text',
        confirmButton: 'premium-swal-confirm',
        cancelButton: 'premium-swal-cancel',
      },
      buttonsStyling: false,
      showClass: {
        popup: 'premium-swal-show'
      }
    });

    return result.isConfirmed;
  },

  /**
   * Success Dialog (SweetAlert2 - Styled to look modern and premium)
   */
  successDialog: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      background: '#fff',
      color: '#4A1525',
      confirmButtonText: 'Genial',
      buttonsStyling: false,
      customClass: {
        popup: 'premium-swal-popup',
        title: 'premium-swal-title',
        htmlContainer: 'premium-swal-text',
        confirmButton: 'premium-swal-confirm',
      },
      showClass: {
        popup: 'premium-swal-show'
      }
    });
  }
};


