'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';

type SlotInfo = {
  name: string;
  slotTitle: string;
  slotDateTime: string;
  slotLocation: string;
};

export default function CancelPage() {
  const t = useTranslations('cancel');
  const locale = useLocale();
const dateLocale = locale === 'en' ? 'en-GB' : 'de-DE';
  const clockSuffix = locale === 'en' ? '' : ' Uhr';

  const [token, setToken] = useState<string | null>(null);
  const [info, setInfo] = useState<SlotInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const tok = new URLSearchParams(window.location.search).get('token');
    setToken(tok);
    if (!tok) { setLoading(false); setError(t('errorNoToken')); return; }

    fetch(`/api/cancel?token=${tok}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setInfo(data);
        setLoading(false);
      })
      .catch(() => { setError(t('errorLoad')); setLoading(false); });
  }, []);

  async function handleCancel() {
    setSubmitting(true);
    const res = await fetch('/api/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, locale }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!res.ok) setError(data.error ?? t('errorCancel'));
    else setCancelled(true);
  }

  if (loading) return (
    <section className="page-head">
      <div className="wrap">
        <p style={{ color: 'var(--fg-muted)' }}>{t('loading')}</p>
      </div>
    </section>
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: '24px' }}>{t('eyebrow')}</div>
          <h1 className="display page-title">{t('title')}</h1>
          {info && (
            <p className="body-lg page-subtitle">
              {new Date(info.slotDateTime).toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              {' · '}
              {new Date(info.slotDateTime).toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}{clockSuffix}
            </p>
          )}
        </div>
      </section>

      <section className="training-detail">
        <div className="wrap">

          {!info && error && (
            <div className="training-info-card" style={{ maxWidth: '560px' }}>
              <p style={{ color: 'var(--fg-muted)' }}>{error}</p>
            </div>
          )}

          {info && (
            <div className="training-detail-grid">

              <div className="training-info-card">
                <div className="training-info-section">
                  <div className="eyebrow" style={{ marginBottom: '8px' }}>{t('labelTraining')}</div>
                  <p style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>{info.slotTitle}</p>
                </div>
                <div className="training-info-section">
                  <div className="eyebrow" style={{ marginBottom: '8px' }}>{t('labelLocation')}</div>
                  <p style={{ fontSize: '16px', fontWeight: 500 }}>{info.slotLocation}</p>
                </div>
              </div>

              <div className="training-form-card">
                {cancelled ? (
                  <>
                    <div className="eyebrow" style={{ marginBottom: '20px' }}>{t('labelConfirmation')}</div>
                    <p style={{ fontWeight: 600, fontSize: '18px', marginBottom: '8px' }}>{t('successTitle')}</p>
                    <p style={{ fontSize: '15px', color: 'var(--fg-muted)', lineHeight: '1.6' }}>{t('successBody')}</p>
                  </>
                ) : (
                  <>
                    <div className="eyebrow" style={{ marginBottom: '20px' }}>{t('labelConfirmation')}</div>
                    <p style={{ fontSize: '15px', lineHeight: '1.65', color: 'var(--fg-muted)', marginBottom: '32px' }}>
                      {t.rich('confirmText', {
                        name: info.name,
                        title: info.slotTitle,
                        b: (chunks) => <strong style={{ color: 'var(--fg)' }}>{chunks}</strong>,
                      })}
                    </p>
                    {error && <p style={{ fontSize: '14px', color: '#dc2626', marginBottom: '16px' }}>{error}</p>}
                    <div style={{ marginTop: 'auto' }}>
                      <button
                        onClick={handleCancel}
                        disabled={submitting}
                        className="btn btn-destructive"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        {submitting ? t('submitting') : t('submit')}
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

        </div>
      </section>
    </>
  );
}
