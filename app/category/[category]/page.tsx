'use client'
import ProductLayout from "@/components/ProductLayout";
import { useEffect, useState } from "react";

const FilterCategory = ({ params }: { params: { category: string } }) => {
  const [currentCategory, setCurrentCategory] = useState(params.category)
  const [works, setWorks] = useState([])
  const getWorks = async () => {
    const response = await fetch(
      `/api/work/list/${currentCategory}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    const data = await response.json()
    setWorks(data)
  }

  useEffect(() => {
    getWorks()
  }, [currentCategory])
  return (
    <ProductLayout data={works} />
  );
}

export default FilterCategory;