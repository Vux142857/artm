'use client'
import ProductLayout from "@/components/ProductLayout";
import { useEffect, useState } from "react";

const Home = () => {
  const [works, setWorks] = useState([])
  const getWorks = async () => {
    const response = await fetch(
      '/api/work/list/feed',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    const data = await response.json()
    setWorks(data)
  }

  useEffect(() => {
    getWorks()
  }, [])
  return (
    <>
      <section><ProductLayout data={works} /></section>
    </>
  );
}

export default Home;