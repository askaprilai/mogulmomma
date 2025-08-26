/**
 * Google Apps Script for MogulMomma Email Capture
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create new project
 * 3. Paste this code
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the Web App URL and replace YOUR_SCRIPT_ID in landing page
 */

function doPost(e) {
  try {
    // Get the spreadsheet (create one first and get its ID)
    const SPREADSHEET_ID = 'YOUR_GOOGLE_SPREADSHEET_ID'; // Replace with your sheet ID
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Get form data
    const data = e.parameter;
    
    // Create row data
    const rowData = [
      new Date(), // Timestamp
      data['First Name'] || '',
      data['Email'] || '',
      data['Archetype'] || '',
      data['Source'] || 'Landing Page'
    ];
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'First Name', 'Email', 'Archetype', 'Source']);
    }
    
    // Add the data
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('MogulMomma Email Capture API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}