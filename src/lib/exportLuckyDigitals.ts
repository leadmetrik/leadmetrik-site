import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export interface IntakeData {
  // Client Info
  clientName: string;
  email: string;
  orderNumber?: string;
  
  // SEO Essentials
  url: string;
  keywords: string[];
  additionalDetails?: string;
  
  // Citation Details (NAPW)
  businessName: string;
  contactPerson: string;
  streetAddress: string;
  suite?: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  tollFree?: string;
  fax?: string;
  category1: string;
  category2?: string;
  category3?: string;
  website: string;
  primaryEmail: string;
  secondaryEmail?: string;
  brands?: string;
  productsServices: string;
  yearEstablished?: string;
  hoursOfOperation?: string;
  languagesSpoken?: string;
  paymentMethods?: string;
  tagline?: string;
  serviceAreas?: string;
  licenseNumber?: string;
  shortDescription: string;
  longDescription: string;
  
  // Google Stacking (Optional)
  gmailAccount?: string;
  gmailPassword?: string;
  recoveryEmail?: string;
  recoveryPhone?: string;
}

export function exportToLuckyDigitalsFormat(data: IntakeData, filename?: string) {
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  
  // Build the data array matching Lucky Digitals exact format
  const wsData: (string | null)[][] = [
    [], // Row 0 - empty
    ["Quality Services At Unbeatable Price"], // Row 1
    ["Client Name:", data.clientName], // Row 2
    ["Email Address:", data.email], // Row 3
    ["Order Number:", data.orderNumber || ""], // Row 4
    [], // Row 5 - empty
    ["Information Required"], // Row 6
    ["Essentials", "URL", "Keyword1", "Keyword2", "Keyword3", "Keyword4", "Keyword5"], // Row 7
    ["1st URL:", data.url, data.keywords[0] || "", data.keywords[1] || "", data.keywords[2] || "", data.keywords[3] || "", data.keywords[4] || ""], // Row 8
    [], // Row 9 - empty
    ["Additional Details (IF ANY)"], // Row 10
    [data.additionalDetails || ""], // Row 11
    [], [], [], // Rows 12-14 - empty
    [], // Row 15 - empty
    ["Citation Details - NAPW"], // Row 16
    ["Essentials", null, "Details"], // Row 17
    ["Business Name", null, data.businessName], // Row 18
    ["Company Owner/Contact Person:", null, data.contactPerson], // Row 19
    ["Street Address:", null, data.streetAddress], // Row 20
    ["Suite/Office (if any):", null, data.suite || ""], // Row 21
    ["City:", null, data.city], // Row 22
    ["State:", null, data.state], // Row 23
    ["Zip/Postal Code:", null, data.zipCode], // Row 24
    ["Business Primary Phone Number:", null, data.phone], // Row 25
    ["Toll Free # (if any):", null, data.tollFree || ""], // Row 26
    ["Fax# (if any):", null, data.fax || ""], // Row 27
    ["Business Category #1 (at least one is required):", null, data.category1], // Row 28
    ["Business Category #2:", null, data.category2 || ""], // Row 29
    ["Business Category #3:", null, data.category3 || ""], // Row 30
    ["Website Address:", null, data.website], // Row 31
    ["Primary Email Address :", null, data.primaryEmail], // Row 32
    ["Secondary Email Address (if any):", null, data.secondaryEmail || ""], // Row 33
    ["Brands you sell or use (if any):", null, data.brands || ""], // Row 34
    ["Products/Services:", null, data.productsServices], // Row 35
    ["Year Established:", null, data.yearEstablished || ""], // Row 36
    ["Hours of Operation:", null, data.hoursOfOperation || ""], // Row 37
    ["Languages Spoken:", null, data.languagesSpoken || ""], // Row 38
    ["Payment Methods Accepted:", null, data.paymentMethods || ""], // Row 39
    ["Tagline (if any):", null, data.tagline || ""], // Row 40
    ["Company logo:", null, "[See uploaded files]"], // Row 41
    ["Service Areas", null, data.serviceAreas || ""], // Row 42
    ["Contractor#/License# (if any) :", null, data.licenseNumber || ""], // Row 43
    ["Business Images", null, "[See uploaded files]"], // Row 44
    ["Company owner picture", null, "[See uploaded files]"], // Row 45
    ["Video URL's", null, ""], // Row 46
    ["Short description of your business", null, data.shortDescription], // Row 47
    ["Long description of your business", null, data.longDescription], // Row 48
    [], // Row 49 - empty
    ["Login Details (Optional) For Google Stacking Only"], // Row 50
    ["Email/ Gmail Account", null, data.gmailAccount || ""], // Row 51
    ["Password:", null, data.gmailPassword || ""], // Row 52
    ["Recovery Email:", null, data.recoveryEmail || ""], // Row 53
    ["Recovery Phone:", null, data.recoveryPhone || ""], // Row 54
  ];
  
  // Create worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Set column widths
  ws['!cols'] = [
    { wch: 45 }, // Column A - Labels
    { wch: 30 }, // Column B - URL/data
    { wch: 20 }, // Column C - Keywords/Details
    { wch: 20 }, // Column D
    { wch: 20 }, // Column E
    { wch: 20 }, // Column F
    { wch: 20 }, // Column G
  ];
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "StandardPackage");
  
  // Generate filename
  const exportFilename = filename || `LuckyDigitals_${data.businessName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Write and download
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, exportFilename);
}
