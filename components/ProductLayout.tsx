'use client'
import WorkCard from "./WorkCard";

/* eslint-disable @next/next/no-img-element */
const ProductLayout = ({ data }: any) => {
    return (
        <div className="container columns-4 gap-3 mx-auto space-y-3 pb-28" >
            {
                data.length > 0 && data.map((work: any, index: number) => (
                    <div className="break-inside-avoid" key={index}>
                        <WorkCard data={work} />
                    </div>
                ))
            }
        </div>
    );
}

export default ProductLayout;