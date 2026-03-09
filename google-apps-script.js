// ============================================================
// GOOGLE APPS SCRIPT — Logs leads to sheet + emails you
// ============================================================
//
// SETUP:
// 1. Open your Google Sheet
// 2. Click Extensions > Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Click Deploy > Manage deployments > Edit (pencil icon)
// 5. Set version to "New version" and click Deploy
// 6. Authorize when prompted (allow Gmail + Sheets access)
//
// ============================================================

var EMAIL_TO = 'jujulaville8@gmail.com';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    var timestamp = data.timestamp || new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' });
    var name = data.name || '';
    var phone = data.phone || '';
    var postalCode = data.postalCode || '';
    var issue = data.issue || '';
    var urgency = data.urgency || '';
    var callTime = data.callTime || '';

    // Log to spreadsheet
    sheet.appendRow([timestamp, name, phone, postalCode, issue, urgency, callTime]);

    // Send email notification
    var subject = 'New Plumbing Lead — Durham Region';
    var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">'
      + '<div style="background:#1e40af;padding:20px;border-radius:8px 8px 0 0">'
      + '<h2 style="color:#ffffff;margin:0">New Plumbing Lead</h2>'
      + '<p style="color:#93c5fd;margin:4px 0 0">Durham Region — durhamemergencyplumber.ca</p>'
      + '</div>'
      + '<div style="background:#ffffff;border:1px solid #e2e8f0;padding:24px;border-radius:0 0 8px 8px">'
      + '<table style="width:100%;border-collapse:collapse">'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b;width:140px"><strong>Timestamp</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0">' + timestamp + '</td></tr>'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b"><strong>Name</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0">' + name + '</td></tr>'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b"><strong>Phone</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0"><a href="tel:' + phone + '">' + phone + '</a></td></tr>'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b"><strong>Postal Code</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0">' + postalCode + '</td></tr>'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b"><strong>Issue</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#1e40af">' + issue + '</td></tr>'
      + '<tr><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;color:#64748b"><strong>Urgency</strong></td><td style="padding:10px 8px;border-bottom:1px solid #e2e8f0;font-weight:bold;color:#dc2626">' + urgency + '</td></tr>'
      + '<tr><td style="padding:10px 8px;color:#64748b"><strong>Best Time to Call</strong></td><td style="padding:10px 8px">' + callTime + '</td></tr>'
      + '</table>'
      + '</div>'
      + '</div>';

    var plainBody = 'NEW PLUMBING LEAD — DURHAM REGION\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n'
      + 'Timestamp: ' + timestamp + '\n'
      + 'Name: ' + name + '\n'
      + 'Phone: ' + phone + '\n'
      + 'Postal Code: ' + postalCode + '\n'
      + 'Issue: ' + issue + '\n'
      + 'Urgency: ' + urgency + '\n'
      + 'Best Time to Call: ' + callTime + '\n'
      + '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: subject,
      body: plainBody,
      htmlBody: htmlBody
    });

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
