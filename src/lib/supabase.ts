import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our tables
export interface SignedProposal {
  id?: string;
  client_name: string;
  client_email: string;
  proposal_type: string;
  setup_total: number;
  base_monthly: number;
  monthly_total: number;
  fb_ads_budget: string;
  selected_addons: AddOn[];
  signature_data: string;
  signed_at: string;
  created_at?: string;
  ip_address?: string;
  user_agent?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
}

export interface IntakeSubmission {
  id?: string;
  proposal_id?: string;
  business_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  website_url?: string;
  target_locations?: string[];
  competitors?: string[];
  target_keywords?: string[];
  business_description?: string;
  services_offered?: string[];
  unique_selling_points?: string;
  logo_url?: string;
  owner_photo_url?: string;
  business_images?: string[];
  video_urls?: string[];
  google_business_email?: string;
  google_ads_access_granted?: boolean;
  facebook_url?: string;
  instagram_url?: string;
  created_at?: string;
  updated_at?: string;
  status?: 'pending' | 'reviewed' | 'completed';
}

// Save a signed proposal
export async function saveSignedProposal(proposal: Omit<SignedProposal, 'id' | 'created_at'>): Promise<{ data: SignedProposal | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('signed_proposals')
    .insert([{
      ...proposal,
      user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
    }])
    .select()
    .single();
  
  return { data, error: error as Error | null };
}

// Save an intake submission
export async function saveIntakeSubmission(intake: Omit<IntakeSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<{ data: IntakeSubmission | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('intake_submissions')
    .insert([intake])
    .select()
    .single();
  
  return { data, error: error as Error | null };
}

// Get all signed proposals (admin use)
export async function getSignedProposals(): Promise<{ data: SignedProposal[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('signed_proposals')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error: error as Error | null };
}

// Get all intake submissions (admin use)
export async function getIntakeSubmissions(): Promise<{ data: IntakeSubmission[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('intake_submissions')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error: error as Error | null };
}

// Upload a file to storage
export async function uploadFile(file: File, path: string): Promise<{ url: string | null; error: Error | null }> {
  const { data, error } = await supabase.storage
    .from('proposal-files')
    .upload(path, file);
  
  if (error) {
    return { url: null, error: error as Error };
  }
  
  const { data: publicUrl } = supabase.storage
    .from('proposal-files')
    .getPublicUrl(data.path);
  
  return { url: publicUrl.publicUrl, error: null };
}
