import { Tweet } from "../typings";

export const fetchTweets = async (): Promise<Tweet[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${baseUrl}/api/getTweets`);
  if (!res.ok) {
    throw new Error(`Failed to fetch tweets: ${res.status}`);
  }
  const contentType = res.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    throw new Error("API returned non-JSON response");
  }
  const data = await res.json();
  return data.tweets ?? [];
};
