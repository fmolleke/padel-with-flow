import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createChain, makeRequest } from './helpers';

vi.mock('@/lib/supabase', () => ({ supabase: { from: vi.fn() } }));
vi.mock('@/lib/resend', () => ({
  sendRemovedByAdminNotification: vi.fn().mockResolvedValue(undefined),
}));

import { DELETE } from '@/app/api/admin/registrations/[id]/route';
import { supabase } from '@/lib/supabase';
import { sendRemovedByAdminNotification } from '@/lib/resend';

const mockFrom = vi.mocked(supabase.from);

const mockRegistration = {
  id: 'reg-1',
  name: 'Max Müller',
  email: 'max@test.com',
  training_slots: {
    title: 'Beginner Training',
    date_time: '2026-06-01T10:00:00Z',
  },
};

function makeParams(id: string) {
  return Promise.resolve({ id });
}

describe('DELETE /api/admin/registrations/[id]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns 404 when registration is not found', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: null, error: { message: 'Not found' } }) as never);
    const res = await DELETE(makeRequest('/api/admin/registrations/bad-id', 'DELETE'), { params: makeParams('bad-id') });
    expect(res.status).toBe(404);
  });

  it('returns 200 and sends removal email on success', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never);
    const res = await DELETE(makeRequest('/api/admin/registrations/reg-1', 'DELETE'), { params: makeParams('reg-1') });
    expect(res.status).toBe(200);
    expect(sendRemovedByAdminNotification).toHaveBeenCalledOnce();
  });

  it('sends correct customer info in removal email', async () => {
    mockFrom
      .mockReturnValueOnce(createChain({ data: mockRegistration }) as never)
      .mockReturnValueOnce(createChain({ data: null }) as never);
    await DELETE(makeRequest('/api/admin/registrations/reg-1', 'DELETE'), { params: makeParams('reg-1') });
    expect(sendRemovedByAdminNotification).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'max@test.com', name: 'Max Müller', slotTitle: 'Beginner Training' })
    );
  });

  it('does not send email when registration is not found', async () => {
    mockFrom.mockReturnValueOnce(createChain({ data: null, error: { message: 'Not found' } }) as never);
    await DELETE(makeRequest('/api/admin/registrations/bad-id', 'DELETE'), { params: makeParams('bad-id') });
    expect(sendRemovedByAdminNotification).not.toHaveBeenCalled();
  });
});
