// @ts-nocheck
'use client'
import { useState } from "react";
import Form from '@/components/Form';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const CreateWork = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const [work, setWork] = useState({
        creator: '',
        category: '',
        title: '',
        description: '',
        price: 0,
        photos: [],
    })
    if (session) {
        work.creator = session?.user?._id.toString()
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const workForm = new FormData();
            for (var key in work) {
                workForm.append(key, work[key])
            }
            console.log(work.photos)
            work.photos.forEach((photo) => {
                workForm.append("workPhotoPaths", photo)
            })
            const response = await fetch('/api/work/new', {
                method: 'POST',
                body: workForm
            })
            if (response.ok) {
                router.push('/')
            } else {
                router.push('/create-work')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="p-12">
            <Form
                type='Create'
                work={work}
                setWork={setWork}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default CreateWork;