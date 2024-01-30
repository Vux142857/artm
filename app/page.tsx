import ProductLayout from "@/components/ProductLayout";

export default async function Home() {
  const response = await fetch(
    'http://localhost:3000/api/work/list/all',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
  const data = await response.json()
  return (
    <>
      <section><ProductLayout data={data} /></section>
    </>
  );
}
