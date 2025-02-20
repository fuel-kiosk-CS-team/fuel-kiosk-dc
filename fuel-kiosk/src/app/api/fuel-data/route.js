export const revalidate = 0; // Forces regeneration on every request

export async function GET(request) {
  return new Response(
    JSON.stringify({
      previousMax: 123.45,
      fuelSites: ['Site A', 'Site B', 'Site C'],
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}
