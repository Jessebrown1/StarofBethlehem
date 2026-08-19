# Connecting the Application Form to Google Sheets

The website's "Apply Now" form is already built to submit to a Google Apps
Script Web App, which writes each application as a new row in a Google
Sheet. This takes about 5 minutes and needs no code deployment or server —
everything lives inside your Google account.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet.
2. Name it something like **"Star of Bethlehem — Applications"**.
3. You can leave it empty — the script creates its own "Applications" tab
   and header row automatically on the first submission.

## 2. Add the script

1. In the sheet, go to **Extensions > Apps Script**.
2. Delete any placeholder code in the editor (e.g. `function myFunction() {}`).
3. Open [`google-apps-script/Code.gs`](google-apps-script/Code.gs) from this
   project, copy its entire contents, and paste it into the Apps Script
   editor.
4. Click the disk icon (or `Cmd+S` / `Ctrl+S`) to save. Give the project a
   name if prompted, e.g. "Applications Backend".

## 3. Deploy it as a Web App

1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Applications form endpoint` (or anything)
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Google will ask you to authorize the script — click **Authorize access**,
   choose your Google account, and if you see an "unverified app" warning,
   click **Advanced > Go to Applications Backend (unsafe)**. This warning
   is normal for scripts you write yourself; you're only authorizing it to
   edit this one spreadsheet.
6. Copy the **Web app URL** shown after deployment. It looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Connect it to the website

1. Open [`src/components/ApplicationModal.jsx`](src/components/ApplicationModal.jsx).
2. Find this line near the top:
   ```js
   const GOOGLE_APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_URL"` with the URL you copied, e.g.:
   ```js
   const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save, rebuild (`npm run build`) or restart the dev server if it's running.

## 5. Test it

1. Open the site, click **Apply Now**, fill in the form with test data, and
   submit.
2. Open your Google Sheet — a new "Applications" tab should appear with a
   header row and your test submission as the first data row.
3. Delete the test row once you've confirmed it worked.

## Viewing submissions in Excel

The sheet is a normal Google Sheet, so any of these work:

- **In the browser**: just open the sheet at sheets.google.com — that's the
  live view, updated instantly on every submission.
- **In Excel**: File > Download > Microsoft Excel (.xlsx), or set up
  File > Share > Publish to web if you want a read-only link others can
  open without a Google account.
- **Notifications**: in the Sheet, go to Tools > Notification rules if
  you'd like an email every time a row is added (i.e. every application).

## If you ever change `Code.gs`

Apps Script deployments are pinned to a specific version of the code. If
you edit `Code.gs` later, the live URL won't pick up the change until you:

1. **Deploy > Manage deployments**.
2. Click the pencil (edit) icon on the existing deployment.
3. Under **Version**, choose **New version**.
4. Click **Deploy**.

The Web app URL stays the same — no need to update the React code again.

## Troubleshooting

- **Nothing appears in the sheet after submitting**: open the Web app URL
  directly in your browser — you should see "Star of Bethlehem application
  endpoint is live." If you get an error instead, the deployment or
  authorization step needs to be redone.
- **"Authorization required" errors**: re-run step 3 above and make sure
  you completed the authorization prompt.
- **The form always shows the demo/simulated success message**: check that
  `GOOGLE_APPS_SCRIPT_URL` in `ApplicationModal.jsx` no longer says
  `"YOUR_GOOGLE_APPS_SCRIPT_URL"` — the code falls back to a fake delay when
  that placeholder is still in place, purely so the UI can be demoed before
  the sheet is connected.
