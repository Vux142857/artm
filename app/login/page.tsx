// @ts-nocheck
'use client'
import Image from 'next/image'
import daisyImg from "../../public/assets/daisy-flowers-blue-3840x2160-12883.jpeg"
import TypingEffect from "../../components/TypingEffect"
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const loginForm = new FormData();
            Object.keys(formData).forEach(key => loginForm.append(key, formData[key]))

            const response = await fetch('api/login', {
                method: 'POST',
                body: loginForm
            })
            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loginWithGoogle = () => { signIn('google', { callbackUrl: '/' }) }
    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/d2/e4/ed/d2e4ed3306b60642a22aceb4f49c6e9d.jpg)' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" onChange={handleChange} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" onChange={handleChange} placeholder="password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type='submit'>Login</button>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn" onClick={loginWithGoogle}>
                                Login with Google
                                <FcGoogle className='ml-2' />
                            </button>
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Do not have account?
                                    <Link href='/register' > Sign up here</Link>
                                </span>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="text-center lg:text-left static">
                    <div className="card bg-base-content shadow-xl image-full">
                        <figure><Image src={daisyImg} alt='Daisy flower' ></Image></figure>
                        <div className="card-body">
                            <TypingEffect text='WELCOME BACK HAVE A GOOD DAY <3' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login