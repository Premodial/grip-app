import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { ReportService } from 'src/app/core/report/report.service';

/**
 * Component responsible for displaying a modal with a list of available network services.
 * It allows users to download this information as an Excel report.
 */
@Component({
  selector: 'app-network-services-modal', // Defines the custom HTML tag for this component.
  templateUrl: './NetworkServicesModal.component.html', // Links to the HTML template for the component.
  styleUrls: ['./NetworkServicesModal.component.scss'] // Links to the CSS styles for the component.
})
export class NetworkServicesModalComponent {
  // Inputs allow data to be passed into this component from a parent component.
  
  /**
   * Controls the visibility of the modal. When true, the modal is shown.
   */
  @Input() isVisible: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  /**
   * An array of network services available at the searched address.
   * Each service has a 'name' property.
   */
  @Input() networkServices: { name: string }[] = [];
  
  /**
   * The address that was searched for by the user. This address is used in the report.
   */
  @Input() searchedAddress?: string;

  /**
   * Injects the ReportService to use its functionality for downloading reports.
   * @param {ReportService} reportService The service responsible for generating and downloading reports.
   */
  constructor(private reportService: ReportService) {}

  /**
   * Closes the modal by setting 'isVisible' to false.
   */
  closeModal(): void {
    this.isVisible = false;
    this.modalClosed.emit(); // Emit an event when the modal is closed
  }

  /**
   * Triggers the download of the report through the ReportService.
   * If 'searchedAddress' is undefined, it passes an empty string to avoid errors.
   */
  downloadReport(): void {
    // Ensures that 'searchedAddress' is not undefined by providing a default empty string value.
    // Calls the report generation and download function with the current 'searchedAddress' and 'networkServices'.
    this.reportService.downloadReport(this.searchedAddress || '', this.networkServices);
  }
}
