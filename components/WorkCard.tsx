/* eslint-disable @next/next/no-img-element */

const WorkCard = ({ data }: any) => {
    return (
        <div className="card card-normal bg-primary shadow-xl border">
            <figure><img className="w-full" src={data.workPhotoURLs[0]} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.description}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">{data.price}</button>
                </div>
            </div>
        </div>);
}

export default WorkCard;