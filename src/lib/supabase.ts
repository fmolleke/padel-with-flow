import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export type TrainingSlot = {
  id: string;
  title: string;
  description: string | null;
  date_time: string;
  duration_minutes: number;
  max_participants: number;
  location: string;
  price: number | null;
  is_visible: boolean;
  created_at: string;
};

export type Registration = {
  id: string;
  slot_id: string;
  name: string;
  email: string;
  playtomic_level: string | null;
  cancellation_token: string;
  cancelled_at: string | null;
  removed_by_admin: boolean;
  registered_at: string;
};
