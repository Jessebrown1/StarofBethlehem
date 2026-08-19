/**
 * Star of Bethlehem International School — Admissions Application backend.
 *
 * This script receives application submissions from the website's
 * "Apply Now" form and appends each one as a row in a Google Sheet.
 *
 * SETUP — see ../GOOGLE_SHEETS_SETUP.md for the full step-by-step guide.
 * Short version:
 *   1. Create/open the Google Sheet you want applications to land in.
 *   2. Extensions > Apps Script, delete the starter code, paste this file in.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Copy the Web app URL into GOOGLE_APPS_SCRIPT_URL in
 *      src/components/ApplicationModal.jsx.
 *   5. Any time you edit this script, redeploy: Deploy > Manage deployments
 *      > pencil icon > Version: New version > Deploy.
 */

const SHEET_NAME = "Applications";

const COLUMNS = [
  "Timestamp",
  "Student Full Name",
  "Date of Birth",
  "Gender",
  "Class Applying For",
  "Previous School",
  "Parent/Guardian Name",
  "Phone",
  "Email",
  "Address",
  "Message / Notes",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    sheet.appendRow([
      new Date(),
      data.studentName || "",
      data.dateOfBirth || "",
      data.gender || "",
      data.classApplyingFor || "",
      data.previousSchool || "",
      data.guardianName || "",
      data.guardianPhone || "",
      data.guardianEmail || "",
      data.guardianAddress || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", message: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Visiting the deployed URL directly (GET) confirms the deployment is live.
function doGet() {
  return ContentService.createTextOutput(
    "Star of Bethlehem application endpoint is live."
  ).setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}
