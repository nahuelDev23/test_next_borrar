import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
const Form = ({ formData, forNewMovie = true }) => {
    const router = useRouter()
    const [fromValue, setForm] = useState({
        title: formData.title,
        plot: formData.plot
    })

    const { title, plot } = fromValue

    const [message, setMessage] = useState([])


    const handleChange = ({ target }) => {
        const { value, name } = target
        setForm({
            ...fromValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage([])
        if (forNewMovie) {
            postData(fromValue)
        } else {
            putData(fromValue)
        }

    }

    const postData = async (form) => {
        try {
            const res = await fetch('/api/movie', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldMessage => [...oldMessage, { message: error.message }])
                }
            } else {
                router.push('/')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const putData = async (form) => {
        const {id} = router.query
        try {
            const res = await fetch(`/api/movie/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!data.success) {
                for (const key in data.error.errors) {
                    let error = data.error.errors[key]
                    setMessage(oldMessage => [...oldMessage, { message: error.message }])
                }
            } else {
                router.push('/')
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            {
                message.map(({ message }) => (
                    <p key={message}>{message}</p>
                ))
            }
            <form className="text-black" onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={handleChange} name="title" />
                <input type="text" placeholder="Plot" value={plot} onChange={handleChange} name="plot" />
                <button type="submit" className="bg-purple-500 text-white py-2 px-4 mx-4 rounded">{forNewMovie ? 'Guardar' : 'Editar'}</button>
                <Link href="/">
                    <a>Volver al inicio</a>
                </Link>
            </form>
        </div>
    )
}

export default Form