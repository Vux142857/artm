/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck
'use client'
import Image from 'next/image'
import daisyImg from "../../public/assets/daisy-flowers-blue-3840x2160-12883.jpeg"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    })
    const [matchPassword, setMatchPassword] = useState(true)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
            [name]: name === 'profileImage' ? (files && files[0]) : value
        }));
    };
    useEffect(() => {
        setMatchPassword(formData.password === formData.confirmPassword)
    }, [formData.password, formData.confirmPassword])

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const registerForm = new FormData();
            Object.keys(formData).forEach(key => registerForm.append(key, formData[key]))

            const response = await fetch('/api/register', {
                method: 'POST',
                body: registerForm
            })
            if (response.ok) {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loginWithGoogle = () => { signIn('google', { callbackUrl: '/' }) }

    return (
        <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/d2/e4/ed/d2e4ed3306b60642a22aceb4f49c6e9d.jpg)' }}>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Image src={daisyImg} alt='Daisy flower' />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">What is your name ?</span>
                            </label>
                            <input name='name' value={formData.name} type="text" placeholder="Type here" className="input input-bordered" onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' value={formData.email} type="email" placeholder="Type here" className="input input-bordered" onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input name='username' value={formData.username} type="text" placeholder="Type here" className="input input-bordered" onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' value={formData.password} type="password" placeholder="Type here" className="input input-bordered" onChange={handleChange} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <input name='confirmPassword' value={formData.confirmPassword} type="password" placeholder="Type here" onChange={handleChange} className="input input-bordered" required />
                        </div>
                        <div className='form-control items-center'>
                            <label className="label">
                                <span className="label-text">Upload your profile's image</span>
                            </label>
                            <input type="file" name='profileImage' className="file-input file-input-ghost w-full max-w-xs" accept='image/*' onChange={handleChange} />
                            {
                                formData.profileImage && <Image src={URL.createObjectURL(formData.profileImage)} alt='profile image' width={50} height={50} />
                            }
                        </div>
                        <div className='form-control'>
                            <label className="label">
                                <span className="label-text">Already have an account?
                                    <Link href='/login' > Login here</Link>
                                </span>
                            </label>
                        </div>
                        <div className="form-control">
                            <button type='submit' className="btn btn-primary" disabled={!matchPassword} >Register</button>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn" onClick={loginWithGoogle}>
                                Login with Google
                                <FcGoogle className='ml-2' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register