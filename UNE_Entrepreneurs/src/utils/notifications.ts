import Swal from 'sweetalert2';
import type { SweetAlertIcon } from 'sweetalert2';
import { toast } from 'sonner';

/**
 * Utility for handling confirmations and messages using SweetAlert2 and Sonner.
 */
export const notifications = {
  /**
   * Success notification (Sonner)
   */
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    });
  },

  /**
   * Error notification (Sonner)
   */
  error: (message: string) => {
    toast.error(message, {
      duration: 4000,
      position: 'top-right',
    });
  },

  /**
   * Info notification (Sonner)
   */
  info: (message: string) => {
    toast.info(message, {
      position: 'top-right',
    });
  },

  /**
   * Confirmation Dialog (SweetAlert2)
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
      confirmButtonColor: '#9b1b1b', // Corresponde al estilo de la marca
      cancelButtonColor: '#6e7881',
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
    });

    return result.isConfirmed;
  },

  /**
   * Success Dialog (SweetAlert2)
   */
  successDialog: (title: string, text: string) => {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#9b1b1b',
    });
  }
};
