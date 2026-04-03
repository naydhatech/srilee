const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure:
    process.env.SMTP_SECURE != null
      ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
      : Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        ok: false,
        message: "Name, email, and message are required.",
      });
    }

    const to = process.env.CONTACT_TO || "sales@srilee.com";
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
    const subject = `Contact form inquiry from ${name}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Company: ${company || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("SMTP send error:", error);
    res.status(500).json({
      ok: false,
      message: "Unable to send email right now.",
    });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`SMTP contact server running on http://localhost:${PORT}`);
});
