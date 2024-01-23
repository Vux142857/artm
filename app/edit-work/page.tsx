'use client'

import { useState } from "react";
import Form from '@/components/Form';
const CreateWork = () => {
    const [work, setWork] = useState({
        creator: '',
        category: '',
        title: '',
        description: '',
        price: '',
        photos: [],
    })
    return (
        <div>
            <h1>Create Work</h1>
            <Form
                type='Edit'
                work={work}
                setWork={setWork}
            />
        </div>
    )
}

export default CreateWork;