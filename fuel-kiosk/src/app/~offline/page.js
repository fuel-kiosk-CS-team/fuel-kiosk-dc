// Backup for if no internet connection

export const metadata = {
  title: "Offline",
};

export default function Page() {
  return (
    <>
      <h1>This is offline fallback page</h1>
      <h2>When offline, any page route will fallback to this page</h2>
    </>
  );
}