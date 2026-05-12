import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = 'noreply@padelwithflow.de';
const ADMIN_EMAIL = 'florian@molleker.eu';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function sendRegistrationConfirmation(params: {
  to: string;
  name: string;
  slotTitle: string;
  slotDateTime: string;
  slotLocation: string;
  cancellationToken: string;
}) {
  const cancelUrl = `${BASE_URL}/cancel?token=${params.cancellationToken}`;

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Anmeldung bestätigt: ${params.slotTitle}`,
    html: `
      <p>Hallo ${esc(params.name)},</p>
      <p>deine Anmeldung für <strong>${esc(params.slotTitle)}</strong> am ${esc(params.slotDateTime)} in ${esc(params.slotLocation)} ist bestätigt.</p>
      <p>Falls du nicht teilnehmen kannst, kannst du deinen Platz hier freigeben:</p>
      <p><a href="${cancelUrl}">Anmeldung stornieren</a></p>
      <p>Bis auf dem Court!<br/>Florian</p>
    `,
  });
}

export async function sendAdminNewRegistration(params: {
  name: string;
  email: string;
  playtomicLevel: string | null;
  slotTitle: string;
  slotDateTime: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Neue Anmeldung: ${params.name} → ${params.slotTitle}`,
    html: `
      <p><strong>Neue Anmeldung eingegangen</strong></p>
      <p>Name: ${esc(params.name)}<br/>
      E-Mail: ${esc(params.email)}<br/>
      Playtomic-Level: ${params.playtomicLevel ? esc(params.playtomicLevel) : '—'}<br/>
      Training: ${esc(params.slotTitle)}<br/>
      Datum: ${esc(params.slotDateTime)}</p>
    `,
  });
}

export async function sendCancellationConfirmation(params: {
  to: string;
  name: string;
  slotTitle: string;
  slotDateTime: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Stornierung bestätigt: ${params.slotTitle}`,
    html: `
      <p>Hallo ${esc(params.name)},</p>
      <p>deine Anmeldung für <strong>${esc(params.slotTitle)}</strong> am ${esc(params.slotDateTime)} wurde storniert. Dein Platz ist wieder frei.</p>
      <p>Bis zum nächsten Mal!<br/>Florian</p>
    `,
  });
}

export async function sendAdminCancellation(params: {
  name: string;
  email: string;
  slotTitle: string;
  slotDateTime: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Stornierung: ${params.name} → ${params.slotTitle}`,
    html: `
      <p><strong>Anmeldung storniert</strong></p>
      <p>Name: ${esc(params.name)}<br/>
      E-Mail: ${esc(params.email)}<br/>
      Training: ${esc(params.slotTitle)}<br/>
      Datum: ${esc(params.slotDateTime)}</p>
    `,
  });
}

export async function sendRemovedByAdminNotification(params: {
  to: string;
  name: string;
  slotTitle: string;
  slotDateTime: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: `Deine Anmeldung wurde storniert: ${params.slotTitle}`,
    html: `
      <p>Hallo ${esc(params.name)},</p>
      <p>deine Anmeldung für <strong>${esc(params.slotTitle)}</strong> am ${esc(params.slotDateTime)} wurde vom Trainer storniert.</p>
      <p>Bei Fragen antworte einfach auf diese E-Mail.<br/>Florian</p>
    `,
  });
}
