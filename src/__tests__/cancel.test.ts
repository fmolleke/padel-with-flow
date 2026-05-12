import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChain, makeRequest } from './helpers';

vi.mock('@/lib/supabase', () => ({ supabase: { from: vi.fn() } }));
vi.mock('@/lib/resend', () => ({
  sendCancellationConfirmation: vi.fn().mockResolvedValue(undefined),
  sendAdminCancellation: vi.fn().mockResolvedValue(undefined),
}));

import { GET, POST } from '@/app/api/cancel/route';
import { supabase } from '@/lib/supabase';
import { sendCancellationConfirmation, sendAdminCancellation } from '@/lib/resend';

const mockFrom = vi.mocked(supabase.from);

const mockRegistration = {
  id: 'reg-1',
  name: 'Max Müller',
  email: 'max@test.com',
  training_slots: {
    title: 'Beginner Training',
    date_time: '2026-06-01T10:00:00Z',
    location: 'Osnabrück',
  },
};

describe('GET /api/cancel', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 400 when no token is provided', async () => {
    const res = await GET(makeRequest('/api/cancel', 'GET'));
    expect(res.status).toBe(400);
  });

  it('returns 404 when token is invalid', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: null, error: { message: 'Not found' } }) as never);
    const res = await GET(makeRequest('/api/cancel?token=bad-token', 'GET'));
    expect(res.status).toBe(404);
  });

  it('returns slot info for a valid token', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: mockRegistration }) as never);
    const res = await GET(makeRequest('/api/cancel?token=valid-token', 'GET'));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.name).toBe('Max Müller');
    expect(json.slotTitle).toBe('Beginner Training');
    expect(json.slotLocation).toBe('Osnabrück');
  });
});

describe('POST /api/cancel', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 400 when no token is provided', async () => {
    const res = await POST(makeRequest('/api/cancel', 'POST', {}));
    expect(res.status).toBe(400);
  });

  it('returns 404 when token is invalid', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: null, error: { message: 'Not found' } }) as never);
    const res = await POST(makeRequest('/api/cancel', 'POST', { token: 'bad-token' }));
    expect(res.status).toBe(404);
  });

  it('cancels registration and sends both emails on success', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never);
    const res = await POST(makeRequest('/api/cancel', 'POST', { token: 'valid-token' }));
    expect(res.status).toBe(200);
    expect(sendCancellationConfirmation).toHaveBeenCalledOnce();
    expect(sendAdminCancellation).toHaveBeenCalledOnce();
  });

  it('sends customer name and slot title in cancellation email', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never);
    await POST(makeRequest('/api/cancel', 'POST', { token: 'valid-token' }));
    expect(sendCancellationConfirmation).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Max Müller', slotTitle: 'Beginner Training' })
    );
  });
});
