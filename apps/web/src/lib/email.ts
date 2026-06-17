interface ReceiptEmailOptions {
  to:        string;
  name:      string;
  amount:    number;
  currency:  string;
  paymentId: string;
}

export async function sendReceiptEmail(opts: ReceiptEmailOptions) {
  const { to, name, amount, currency, paymentId } = opts;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Donation Receipt — Arram Seivom Family Trust</title>
</head>
<body style="font-family:Inter,sans-serif;background:#F9F9F9;padding:40px 0;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#2E7D32,#4CAF50);padding:40px;text-align:center;">
      <h1 style="color:white;font-size:2em;margin:0;font-family:Georgia,serif;">🌱 Arram Seivom Family Trust</h1>
      <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;">Where Sky Meets Earth, Hope Blooms</p>
    </div>
    <!-- Body -->
    <div style="padding:40px;">
      <h2 style="color:#3E2723;font-family:Georgia,serif;font-size:1.6em;margin-bottom:8px;">
        Thank you, ${name}! 🙏
      </h2>
      <p style="color:#616161;line-height:1.7;margin-bottom:24px;">
        Your generous donation has been received and recorded. You are helping us plant seeds of hope for those who need it most.
      </p>

      <!-- Receipt box -->
      <div style="background:#EFEBE9;border-radius:16px;padding:24px;margin-bottom:24px;">
        <h3 style="color:#3E2723;margin:0 0 16px;font-family:Georgia,serif;">Donation Receipt</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="color:#8D6E63;padding:8px 0;font-size:0.9em;">Amount</td>
            <td style="color:#212121;font-weight:700;font-size:1.1em;text-align:right;">
              ${currency} ${amount.toLocaleString('en-IN')}
            </td>
          </tr>
          <tr>
            <td style="color:#8D6E63;padding:8px 0;font-size:0.9em;">Payment ID</td>
            <td style="color:#212121;font-family:monospace;font-size:0.9em;text-align:right;">${paymentId}</td>
          </tr>
          <tr>
            <td style="color:#8D6E63;padding:8px 0;font-size:0.9em;">Date</td>
            <td style="color:#212121;text-align:right;font-size:0.9em;">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
          </tr>
        </table>
      </div>

      <p style="color:#616161;font-size:0.9em;line-height:1.7;">
        This email serves as your official receipt. Please keep it for your records.
        For any queries, contact us at <a href="mailto:donations@seedandserve.org" style="color:#2E7D32;">donations@seedandserve.org</a>
      </p>
    </div>
    <!-- Footer -->
    <div style="background:#3E2723;padding:24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.6);font-size:0.85em;margin:0;">
        © 2026 Arram Seivom Family Trust, Bangalore, Karnataka, India
      </p>
    </div>
  </div>
</body>
</html>
  `;

  if (process.env.SENDGRID_API_KEY) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to, name }] }],
        from: {
          email: process.env.EMAIL_FROM ?? 'noreply@seedandserve.org',
          name: process.env.EMAIL_FROM_NAME ?? 'Arram Seivom Family Trust',
        },
        subject: 'Your donation receipt - Arram Seivom Family Trust',
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (!response.ok) {
      throw new Error(`SendGrid request failed with status ${response.status}`);
    }
  } else {
    // Stub for local dev
    console.log(`[EMAIL STUB] Receipt for ${to}: ${currency} ${amount} | Payment: ${paymentId}`);
    console.log(html.substring(0, 200) + '...');
  }
}
