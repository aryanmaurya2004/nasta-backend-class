import { Resend } from 'resend';

const resend = new Resend('process.env.EMAIL_KEY');
const sendotp = async (email, otp) => {
await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'mauryaaryan221306@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
}
export { sendotp }