export async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Fetching failed with status ${res.status}`, {
      cause: res.status,
    });
  }

  return res.json();
}
