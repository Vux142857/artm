'use client'
import ProductLayout from "@/components/ProductLayout";
import { useEffect, useState } from "react";
// export default async function Page({ params }: { params: { category: string } }) {

//   const data = await response.json()
//   return (<ProductLayout data={data} />)
// }
const FilterCategory = ({ params }: { params: { category: string } }) => {
  const [currentCategory, setCurrentCategory] = useState(params.category)
  const [works, setWorks] = useState([])
  console.log(currentCategory)
  const getWorks = async () => {
    const response = await fetch(`/api/work/list/${currentCategory}`)
    console.log('Response' + response)
    const data = await response.json()
    console.log('Data' + data)
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