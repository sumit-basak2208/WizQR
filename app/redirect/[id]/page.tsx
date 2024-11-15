import { notFound, redirect } from "next/navigation";

async function getUrl(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/redirect/${id}`
  );
  const data = await res.json();
  if (data.error) return false;
  return data.redirectUrl;
}

export default async function redirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const redirectUrl = await getUrl(id);
  if (redirectUrl) {
    redirect(redirectUrl);
  }
  notFound();
  return <></>;
}
