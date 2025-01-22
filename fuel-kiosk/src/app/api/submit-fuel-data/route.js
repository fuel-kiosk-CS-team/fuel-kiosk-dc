export const revalidate = 0; // Forces regeneration on every request
export async function POST(request) {
    const formData = await request.json();
    console.log('Received data:', formData);
    return new Response(null, { status: 200 });
  }