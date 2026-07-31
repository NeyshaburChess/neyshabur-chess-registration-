import nodemailer from "nodemailer";
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
 
export async function sendRegistrationMail(data: {
  name: string;
  fideId?: string;
  tournament: string;
}) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "ثبت نام جدید مسابقات شطرنج",
    html: `
      <h2>ثبت نام جدید مسابقات</h2>
      <p><b>نام:</b> ${data.name}</p>
      <p><b>آیدی فیده:</b> ${data.fideId ?? "-"}</p>
      <p><b>مسابقه:</b> ${data.tournament}</p>
    `,
  });
}
 