import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChain, makeRequest } from './helpers';

vi.mock('@/lib/supabase', () => ({ supabase: { from: vi.fn() } }));
vi.mock('@/lib/resend', () => ({
  sendRegistrationConfirmation: vi.fn().mockResolvedValue(undefined),
  sendAdminNewRegistration: vi.fn().mockResolvedValue(undefined),
}));

import { POST } from '@/app/api/registrations/route';
import { supabase } from '@/lib/supabase';
import { sendRegistrationConfirmation, sendAdminNewRegistration } from '@/lib/resend';

const mockFrom = vi.mocked(supabase.from);

const mockSlot = {
  id: 'slot-1',
  title: 'Beginner Training',
  date_time: '2026-06-01T10:00:00Z',
  duration_minutes: 60,
  max_participants: 4,
  location: 'Osnabrück',
  price: 15,
  is_visible: true,
  registrations: [
    { id: 'r1', cancelled_at: null },
    { id: 'r2', cancelled_at: null },
  ],
};

const mockRegistration = {
  id: 'reg-new',
  slot_id: 'slot-1',
  name: 'Max Müller',
  email: 'max@test.com',
  playtomic_level: '4.5',
  cancellation_token: 'cancel-token-123',
  cancelled_at: null,
  registered_at: new Date().toISOString(),
};

describe('POST /api/registrations', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 400 when required fields are missing', async () => {
    const res = await POST(makeRequest('/api/registrations', 'POST', { name: 'Max' }));
    expect(res.status).toBe(400);
  });

  it('returns 404 when slot is not found', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: null, error: { message: 'Not found' } }) as never);
    const res = await POST(makeRequest('/api/registrations', 'POST', { slot_id: 'bad-id', name: 'Max', email: 'max@test.com' }));
    expect(res.status).toBe(404);
  });

  it('returns 409 when slot is full', async () => {
    const fullSlot = { ...mockSlot, max_participants: 2 };
    mockFrom.mockReturnValueOnce(createChain({ data: fullSlot }) as never);
    const res = await POST(makeRequest('/api/registrations', 'POST', { slot_id: 'slot-1', name: 'Max', email: 'max@test.com' }));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.error).toContain('ausgebucht');
  });

  it('returns 409 when customer is already registered', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockSlot }) as never)
      .mockReturnValueOnce(createChain({ data: { id: 'existing-reg' } }) as never);
    const res = await POST(makeRequest('/api/registrations', 'POST', { slot_id: 'slot-1', name: 'Max', email: 'max@test.com' }));
    expect(res.status).toBe(409);
    const json = await res.json();
    expect(json.error).toContain('bereits');
  });

  it('returns 201 and sends confirmation + admin emails on success', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockSlot }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never)
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never);
    const res = await POST(makeRequest('/api/registrations', 'POST', {
      slot_id: 'slot-1', name: 'Max Müller', email: 'max@test.com', playtomic_level: '4.5',
    }));
    expect(res.status).toBe(201);
    expect(sendRegistrationConfirmation).toHaveBeenCalledOnce();
    expect(sendAdminNewRegistration).toHaveBeenCalledOnce();
  });

  it('sends cancellation token in confirmation email', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockSlot }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never)
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never);
    await POST(makeRequest('/api/registrations', 'POST', {
      slot_id: 'slot-1', name: 'Max Müller', email: 'max@test.com',
    }));
    expect(sendRegistrationConfirmation).toHaveBeenCalledWith(
      expect.objectContaining({ cancellationToken: 'cancel-token-123' })
    );
  });
});
