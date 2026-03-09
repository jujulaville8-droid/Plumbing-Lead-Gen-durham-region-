// ============================================================
// GOOGLE APPS SCRIPT — Paste this into your Google Sheet
// ============================================================
//
// SETUP INSTRUCTIONS:
// 1. Create a new Google Sheet
// 2. Name the columns in Row 1: Timestamp | Name | Phone | Postal Code | Issue | Urgency | Best Time to Call
// 3. Click Extensions > Apps Script
// 4. Delete any code in the editor and paste this entire file
// 5. Click Deploy > New deployment
// 6. Select type: "Web app"
// 7. Set "Execute as": Me
// 8. Set "Who has access": Anyone
// 9. Click Deploy and authorize when prompted
// 10. Copy the Web App URL — that's your GOOGLE_SHEETS_URL
//
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || '',
      data.phone || '',
      data.postalCode || '',
      data.issue || '',
      data.urgency || '',
      data.callTime || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Lead capture endpoint is active.')
    .setMimeType(ContentService.MimeType.TEXT);
}
