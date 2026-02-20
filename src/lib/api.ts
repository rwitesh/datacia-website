import axios from "axios";

const WAITLIST_API_BASE = "https://api.getwaitlist.com/api/v1";

/** Waitlist ID for client use (e.g. SignupForm). */
export const WAITLIST_ID = 32023;

/** Fetch waitlist count from our server's API. */
export async function fetchWaitlistCount(id: number): Promise<number | null> {
  if (!id) return null;
  try {
    const { data } = await axios.get<{ statistics?: { total_signups?: number } }>(`${WAITLIST_API_BASE}/waitlist`, {
      params: { waitlist_id: id },
    });
    return typeof data?.statistics?.total_signups === "number" ? data.statistics.total_signups : null;
  } catch {
    return null;
  }
}

/** Submit waitlist signup to our server's API. */
export async function submitWaitlist(id: number, email: string, source: string): Promise<void> {
  try {
    await axios.post(`${WAITLIST_API_BASE}/signup`, {
      waitlist_id: id,
      email: email.trim(),
      source,
    });
  } catch (e: unknown) {
    const message =
      axios.isAxiosError(e) && e.response?.data?.message
        ? String(e.response.data.message)
        : "Failed to join waitlist.";
    throw new Error(message);
  }
}
