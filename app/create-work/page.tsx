'use client'
import { useState } from "react";
import Form from '@/components/Form';
const CreateWork = () => {
    const [work, setWork] = useState({
        creator: '',
        category: '',
        title: '',
        description: '',
        price: 0,
        photos: [],
    })
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(work)
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