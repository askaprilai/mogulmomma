/**
 * MogulMomma Email Capture - Google Apps Script
 * Spreadsheet ID: 14rDZ8iG8Gd6xOVvA66-h1eoCX5IkGHqGkt0A7KL2krs
 */

function doPost(e) {
  try {
    // Your MogulMomma spreadsheet
    const SPREADSHEET_ID = '14rDZ8iG8Gd6xOVvA66-h1eoCX5IkGHqGkt0A7KL2krs';
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Get form data from the POST request
    const data = e.parameter;
    
    // Create timestamp
    const now = new Date();
    
    // Prepare row data
    const rowData = [
      now, // Timestamp
      data['First Name'] || '',
      data['Email'] || '',
      data['Archetype'] || '',
      data['Source'] || 'Landing Page Assessment',
      data['User Agent'] || '',
      now.toDateString() // Date only for easy filtering
    ];
    
    // Add headers if this is the first entry (empty sheet)
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'First Name', 
        'Email',
        'Archetype',
        'Source',
        'User Agent',
        'Date'
      ];
      sheet.appendRow(headers);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#ff8a65');
      headerRange.setFontColor('white');
    }
    
    // Add the new data
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 7);
    
    // Log the capture for debugging
    console.log('New email captured:', data['Email']);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Email captured successfully!',
        timestamp: now.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error capturing email:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to capture email: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Simple test endpoint
  return ContentService
    .createTextOutput('✅ MogulMomma Email Capture API is running!\n\n' +
                     'Spreadsheet: 14rDZ8iG8Gd6xOVvA66-h1eoCX5IkGHqGkt0A7KL2krs\n' +
                     'Ready to capture emails from assessments.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Optional: Function to test the setup
function testEmailCapture() {
  const testData = {
    parameter: {
      'First Name': 'Test User',
      'Email': 'test@example.com', 
      'Archetype': 'The Strategic Builder',
      'Source': 'Test Run'
    }
  };
  
  const result = doPost(testData);
  console.log('Test result:', result.getContent());
}