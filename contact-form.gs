const DEFAULT_RECIPIENT = "sales@srilee.com";
const SHEET_NAME = "Contact Submissions";

function doPost(e) {
  try {
    const data = parseSubmission(e);
    validateSubmission(data);

    appendToSheet(data);
    sendNotificationEmail(data);

    return jsonResponse({
      ok: true,
      message: "Submission received",
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : "Unknown error",
    });
  }
}

function parseSubmission(e) {
  const params = (e && e.parameter) || {};

  return {
    name: normalizeValue(params.name),
    email: normalizeValue(params.email),
    phone: normalizeValue(params.phone),
    company: normalizeValue(params.company),
    topic: normalizeValue(params.topic),
    timeline: normalizeValue(params.timeline),
    message: normalizeValue(params.message),
    submittedAt: new Date().toISOString(),
  };
}

function validateSubmission(data) {
  if (!data.name) {
    throw new Error("Name is required");
  }
  if (!data.email) {
    throw new Error("Email is required");
  }
  if (!data.message) {
    throw new Error("Message is required");
  }
}

function sendNotificationEmail(data) {
  const recipient =
    PropertiesService.getScriptProperties().getProperty("TO_EMAIL") || DEFAULT_RECIPIENT;
  const subject = `Website enquiry from ${data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Company: ${data.company || "Not provided"}`,
    `Topic: ${data.topic || "Not provided"}`,
    `Timeline: ${data.timeline || "Not provided"}`,
    `Submitted: ${data.submittedAt}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  GmailApp.sendEmail(recipient, subject, body, {
    replyTo: data.email,
    name: "Srilee Contact Form",
  });
}

function appendToSheet(data) {
  const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (!sheetId) {
    return;
  }

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Submitted At",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Topic",
      "Timeline",
      "Message",
    ]);
  }

  sheet.appendRow([
    data.submittedAt,
    data.name,
    data.email,
    data.phone,
    data.company,
    data.topic,
    data.timeline,
    data.message,
  ]);
}

function normalizeValue(value) {
  return (value || "").toString().trim();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
