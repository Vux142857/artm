import Navbar from "@/components/Navbar";
import ProductLayout from "@/components/ProductLayout";


export default function Home() {
  return (
    <>
      <Navbar />
      <section data-theme='retro'><ProductLayout /></section>
    </>
  );
}
