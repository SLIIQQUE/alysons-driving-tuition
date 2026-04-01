import { Resend } from "resend";
import { Booking, SERVICE_LABELS } from "@/types/booking";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(booking: Booking) {
  const serviceLabel = SERVICE_LABELS[booking.serviceType];

  return resend.emails.send({
    from: "Alyson's Driving Tuition <alysonbaldwin1@mail.co.uk>",
    to: [booking.email],
    subject: `Lesson Confirmed - ${serviceLabel} - Alyson's Driving Tuition`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #f59e0b; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; }
            .logo span { color: #f59e0b; }
            .content { padding: 20px 0; }
            .details { background: #f9f9f9; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .details h3 { margin-top: 0; color: #f59e0b; }
            .details ul { list-style: none; padding: 0; margin: 0; }
            .details li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .details li:last-child { border-bottom: none; }
            .label { font-weight: 600; }
            .cta { display: inline-block; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">Alyson's <span>Driving</span></div>
          </div>
          <div class="content">
            <h2>Your lesson is confirmed!</h2>
            <p>Hi ${booking.customerName},</p>
            <p>Thank you for booking with Alyson's Driving Tuition. Your lesson has been confirmed - here's a summary:</p>
            
            <div class="details">
              <h3>Booking Details</h3>
              <ul>
                <li><span class="label">Service:</span> ${serviceLabel}</li>
                <li><span class="label">Date:</span> ${booking.preferredDate}</li>
                <li><span class="label">Time:</span> ${booking.preferredTime}</li>
                <li><span class="label">Reference:</span> ${booking.id.slice(0, 8).toUpperCase()}</li>
              </ul>
            </div>
            
            <p>Alyson will call you the day before your lesson to confirm everything.</p>
            
            <p>If you need to reschedule or have any questions, just reply to this email or call 07791 489244.</p>
            
            <p>See you soon!</p>
            
            <p>— Alyson Baldwin<br>Alyson's Driving Tuition</p>
          </div>
          <div class="footer">
            <p>Elim Way, Pontllanfraith, Blackwood NP12 2AA, United Kingdom<br>
            <a href="tel:+447791489244">07791 489244</a> | <a href="mailto:alysonbaldwin1@mail.co.uk">alysonbaldwin1@mail.co.uk</a></p>
          </div>
        </body>
      </html>
    `,
  });
}
