import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor() {}

  /**
   * Generates and downloads an Excel report.
   * @param {string} searchedAddress The address that was searched.
   * @param {{ name: string }[]} networkServices The list of network services available.
   */
  downloadReport(searchedAddress: string, networkServices: { name: string }[]): void {
    const wsData = [
      ["Geo-Risk Information Platforms"],
      [],
      ["Searched Address", searchedAddress],
      [],
      ["Available Services"]
    ];

    networkServices.forEach(service => {
      wsData.push([service.name]);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Styling for the title
    if (ws['A1']) {
      ws['A1'].s = {
        font: {
          sz: 24,
          bold: true
        }
      };
    }

    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, 'NetworkServicesReport.xlsx');
  }
}
