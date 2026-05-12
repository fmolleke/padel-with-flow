import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM = 'noreply@padelwithflow.de';
const ADMIN_EMAIL = 'florian@molleker.eu';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

type Locale = 'de' | 'en';

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const copy = {
  de: {
    confirmSubject: (title: string) => `Anmeldung bestätigt: ${title}`,
    confirmHtml: (name: string, title: string, dateTime: string, location: string, cancelUrl: string) => `
      <p>Hallo ${esc(name)},</p>
      <p>deine Anmeldung für <strong>${esc(title)}</strong> am ${esc(dateTime)} in ${esc(location)} ist bestätigt.</p>
      <p>Falls du nicht teilnehmen kannst, kannst du deinen Platz hier freigeben:</p>
      <p><a href="${cancelUrl}">Anmeldung stornieren</a></p>
      <p>Bis auf dem Court!<br/>Florian Molleker</p>
    `,
    cancelSubject: (title: string) => `Stornierung bestätigt: ${title}`,
    cancelHtml: (name: string, title: string, dateTime: string) => `
      <p>Hallo ${esc(name)},</p>
      <p>deine Anmeldung für <strong>${esc(title)}</strong> am ${esc(dateTime)} wurde storniert. Dein Platz ist wieder frei.</p>
      <p>Bis zum nächsten Mal!<br/>Florian Molleker</p>
    `,
    removedSubject: (title: string) => `Deine Anmeldung wurde storniert: ${title}`,
    removedHtml: (name: string, title: string, dateTime: string) => `
      <p>Hallo ${esc(name)},</p>
      <p>deine Anmeldung für <strong>${esc(title)}</strong> am ${esc(dateTime)} wurde vom Trainer storniert.</p>
      <p>Bei Fragen erreichst du mich auf Instagram (@padelwithflow) oder über Playtomic.<br/>Florian Molleker</p>
    `,
  },
  en: {
    confirmSubject: (title: string) => `Registration confirmed: ${title}`,
    confirmHtml: (name: string, title: string, dateTime: string, location: string, cancelUrl: string) => `
      <p>Hi ${esc(name)},</p>
      <p>your registration for <strong>${esc(title)}</strong> on ${esc(dateTime)} at ${esc(location)} is confirmed.</p>
      <p>If you can't make it, you can free up your spot here:</p>
      <p><a href="${cancelUrl}">Cancel registration</a></p>
      <p>See you on the court!<br/>Florian Molleker</p>
    `,
    cancelSubject: (title: string) => `Cancellation confirmed: ${title}`,
    cancelHtml: (name: string, title: string, dateTime: string) => `
      <p>Hi ${esc(name)},</p>
      <p>your registration for <strong>${esc(title)}</strong> on ${esc(dateTime)} has been cancelled. Your spot is now available again.</p>
      <p>See you next time!<br/>Florian Molleker</p>
    `,
    removedSubject: (title: string) => `Your registration has been cancelled: ${title}`,
    removedHtml: (name: string, title: string, dateTime: string) => `
      <p>Hi ${esc(name)},</p>
      <p>your registration for <strong>${esc(title)}</strong> on ${esc(dateTime)} has been cancelled by the trainer.</p>
      <p>If you have any questions, you can reach me on Instagram (@padelwithflow) or via Playtomic.<br/>Florian Molleker</p>
    `,
  },
};

export async function sendRegistrationConfirmation(params: {
  to: string;
  name: string;
  slotTitle: string;
  slotDateTime: string;
  slotLocation: string;
  cancellationToken: string;
  locale: Locale;
}) {
  const { locale } = params;
  const t = copy[locale];
  const cancelUrl = `${BASE_URL}/${locale}/cancel?token=${params.cancellationToken}`;

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: t.confirmSubject(params.slotTitle),
    html: t.confirmHtml(params.name, params.slotTitle, params.slotDateTime, params.slotLocation, cancelUrl),
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
  locale: Locale;
}) {
  const { locale } = params;
  const t = copy[locale];

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: t.cancelSubject(params.slotTitle),
    html: t.cancelHtml(params.name, params.slotTitle, params.slotDateTime),
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
  locale: Locale;
}) {
  const { locale } = params;
  const t = copy[locale];

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: t.removedSubject(params.slotTitle),
    html: t.removedHtml(params.name, params.slotTitle, params.slotDateTime),
  });
}
