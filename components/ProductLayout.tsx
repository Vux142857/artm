import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const ProductLayout = () => {
    return (
        <div className="container columns-4 gap-3 mx-auto space-y-3 pb-28" >
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19139388/pexels-photo-19139388/free-photo-of-cafe-in-corner-tenement.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19295636/pexels-photo-19295636/free-photo-of-aerial-view-of-a-man-fishing-in-the-sea-at-sunset.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19862554/pexels-photo-19862554/free-photo-of-elderly-woman-in-coat-using-phone-on-sidewalk-at-night.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19415783/pexels-photo-19415783/free-photo-of-elegant-man-in-suit-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19736836/pexels-photo-19736836/free-photo-of-entrance-to-swimming-pool-in-overhead-view.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/14020153/pexels-photo-14020153.jpeg?auto=compress&cs=tinysrgb&w=150&lazy=load" alt="" />
            </div>
            <div className="break-inside-avoid">
                <img src="https://images.pexels.com/photos/19736836/pexels-photo-19736836/free-photo-of-entrance-to-swimming-pool-in-overhead-view.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
            </div>
            <div className="break-inside-avoid">
                <div className="card card-normal bg-primary shadow-xl border">
                    <figure><img className="w-full" src="https://images.pexels.com/photos/19415783/pexels-photo-19415783/free-photo-of-elegant-man-in-suit-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load" alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductLayout;