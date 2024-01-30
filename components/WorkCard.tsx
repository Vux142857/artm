/* eslint-disable @next/next/no-img-element */

'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
const WorkCard = ({ data }: any) => {
    const [indexImg, setIndexImg] = useState(0)

    const nextImg = () => {
        setIndexImg((prevIndex) => (prevIndex + 1) % data.workPhotoURLs.length)
    }

    const prevImg = () => {
        setIndexImg((prevIndex) => (prevIndex - 1 + data.workPhotoURLs.length) % data.workPhotoURLs.length)
    }
    useEffect(() => {

    }, [indexImg])
    return (
        <div className="card card-normal bg-primary shadow-xl border">
            <figure className="relative group">
                <img className="w-full group-hover:opacity-80 transition-opacity duration-300 ease-in-out" src={data.workPhotoURLs[indexImg]} alt="Shoes" />
                <div className="absolute flex justify-between items-center transform -translate-y-1/2 left-5 right-5 top-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                    <i className="btn btn-circle" onClick={prevImg}>❮</i>
                    <i className="btn btn-circle" onClick={nextImg}>❯</i>
                </div>
            </figure>

            <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                {/* <p>{data.description}</p> */}
                <div className="card-actions justify-end relative">
                    <div role="button" className="btn btn-ghost btn-circle avatar absolute left-0">
                        <div className="w-10 rounded-full">
                            <Link href={'/'} className="w-10 rounded-full"><img src={data.creator.profileImageURL as string} alt='Profile image' /></Link>
                        </div>
                    </div>
                    <button className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg">$ {data.price}</button>
                </div>
            </div>
        </div>);
}

export default WorkCard;