import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * A service to abstract ngx-toastr notifications, providing a centralized
 * point of control for toast notifications throughout the application.
 * This service allows for easy customization and ensures consistency
 * in how notifications are displayed to the user.
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  /**
   * The default toast configuration. This configuration is applied
   * to all toast messages unless overridden in individual methods.
   * It includes settings like the timeout duration, the presence of
   * a close button, and the inclusion of a progress bar to provide
   * feedback on the display duration of the toast.
   */
  private defaultToastOptions = {
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
  };

  /**
   * Constructs the toast service, injecting the ngx-toastr service
   * for displaying toast messages. This allows the toast service to
   * leverage the robust, customizable toastr notifications.
   * 
   * @param {ToastrService} toastr The ngx-toastr service instance.
   */
  constructor(private toastr: ToastrService) { }

  /**
   * Displays a success notification with a custom message and optional title.
   * This method can be used to indicate successful operations, such as the
   * completion of a form submission or a successful data update. The method
   * merges any specified options with the defaultToastOptions to ensure
   * consistency while allowing for customization.
   * 
   * @param {string} message The message to be displayed in the toast.
   * @param {string} [title] An optional title for the toast.
   */
  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title, this.defaultToastOptions);
  }

  /**
   * Displays an error notification with a custom message and optional title.
   * Use this method to communicate errors to the user, such as failed data
   * retrievals or unsuccessful form submissions. It merges specified options
   * with the defaultToastOptions to maintain a consistent look and feel while
   * providing the necessary flexibility for customization.
   * 
   * @param {string} message The message to be displayed in the toast.
   * @param {string} [title] An optional title for the toast.
   */
  showError(message: string, title?: string): void {
    this.toastr.error(message, title, this.defaultToastOptions);
  }
}
