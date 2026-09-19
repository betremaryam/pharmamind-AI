/**
 * Formspree Submission Service
 * Handles transmitting form responses, pilot inquiries, and case assessment results
 * to Formspree so they are delivered directly to betremaryameshete@gmail.com.
 */

export const FORMSPREE_FALLBACK_EMAIL = 'betremaryameshete@gmail.com';
export const FORMSPREE_STORAGE_KEY = 'pharmamind_formspree_form_id';

export interface FormspreeResult {
  ok: boolean;
  error?: string;
  isConfirmationNeeded?: boolean;
}

/**
 * Resolves the active Formspree endpoint.
 * Priority:
 * 1. Explicitly configured form ID or full URL in localStorage
 * 2. Vite environment variable VITE_FORMSPREE_FORM_ID or VITE_FORMSPREE_ENDPOINT
 * 3. Default Formspree endpoint (betremaryameshete@gmail.com or default form endpoint)
 */
export function getFormspreeTarget(): { endpoint: string; displayTarget: string; isCustom: boolean } {
  const localFormId = typeof window !== 'undefined' ? localStorage.getItem(FORMSPREE_STORAGE_KEY) : null;
  const envEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
  const envFormId = import.meta.env.VITE_FORMSPREE_FORM_ID;

  if (localFormId && localFormId.trim()) {
    const trimmed = localFormId.trim();
    if (trimmed.startsWith('https://formspree.io/')) {
      return { endpoint: trimmed, displayTarget: trimmed, isCustom: true };
    }
    if (trimmed.includes('@')) {
      return { endpoint: `https://formspree.io/${trimmed}`, displayTarget: trimmed, isCustom: true };
    }
    return { endpoint: `https://formspree.io/f/${trimmed}`, displayTarget: `Form ID: ${trimmed}`, isCustom: true };
  }

  if (envEndpoint && envEndpoint.trim()) {
    return { endpoint: envEndpoint.trim(), displayTarget: envEndpoint.trim(), isCustom: true };
  }

  if (envFormId && envFormId.trim()) {
    return {
      endpoint: `https://formspree.io/f/${envFormId.trim()}`,
      displayTarget: `Form ID: ${envFormId.trim()}`,
      isCustom: true
    };
  }

  // Default fallback to betremaryameshete@gmail.com
  return {
    endpoint: `https://formspree.io/${FORMSPREE_FALLBACK_EMAIL}`,
    displayTarget: FORMSPREE_FALLBACK_EMAIL,
    isCustom: false
  };
}

/**
 * Submits structured form response data to Formspree.
 */
export async function submitFormspreeResponse(
  payload: Record<string, any>
): Promise<FormspreeResult> {
  const { endpoint } = getFormspreeTarget();

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        _timestamp: new Date().toISOString(),
        _app: 'PharmaMind AI (Ethiopian Clinical Pharmacy Platform)',
      }),
    });

    if (response.ok) {
      return { ok: true };
    }

    const data = await response.json().catch(() => ({}));

    // Formspree specific error formats
    if (data && data.errors && Array.isArray(data.errors)) {
      const messages = data.errors.map((e: any) => e.message || e.field).join(', ');
      return { ok: false, error: messages || 'Submission rejected by Formspree.' };
    }

    if (data && data.error) {
      return { ok: false, error: data.error };
    }

    if (response.status === 404) {
      return {
        ok: false,
        error: `Formspree target returned 404. Please verify the Formspree Form ID in settings.`
      };
    }

    return {
      ok: false,
      error: `Formspree responded with status code ${response.status}.`
    };
  } catch (err: any) {
    console.error('Failed to submit to Formspree:', err);
    return {
      ok: false,
      error: err?.message || 'Network connection failed while connecting to Formspree.'
    };
  }
}
