import Image from 'next/image'
import daisyImg from "../../public/assets/daisy-flowers-blue-3840x2160-12883.jpeg"
import Link from 'next/link'
const page = () => {
    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/d2/e4/ed/d2e4ed3306b60642a22aceb4f49c6e9d.jpg)' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Image src={daisyImg} alt='Daisy flower' />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">What is your name ?</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input type="text" placeholder="username" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <input type="password" placeholder="confirm-password" className="input input-bordered" required />
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Upload your portfolio</span>
                            </label>
                            <input type="file" className="file-input file-input-ghost w-full max-w-xs" />
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Already have an account? 
                                    <Link href='/login' > Login in here</Link>
                                </span>

                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page