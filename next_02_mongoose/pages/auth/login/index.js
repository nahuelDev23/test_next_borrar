import React, { useState } from 'react'
import Cookies from 'js-cookie';

 const Index = () => {
    const [formValue, setForm] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formValue

    const handleChange = ({ target }) => {
        const { value, name } = target
        setForm({
            ...formValue,
            [name]: value
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/auth`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                credentials:'include',
                body: JSON.stringify(formValue)
            })
            
            const data = await res.json()
            
            if(data.token){

                Cookies.set('token', data.token);
            }
            // if (!data.success) {
            //     for (const key in data.error.errors) {
            //         let error = data.error.errors[key]
            //         setMessage(oldMessage => [...oldMessage, { message: error.message }])
            //     }
            // } 

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onClick={handleLogin}>
                <input type="text" placeholder="Email" value={email} onChange={handleChange} name="email" />
                <input type="text" placeholder="Password" value={password} onChange={handleChange} name="password" />
                <button type="submit" className="bg-purple-500 text-white py-2 px-4 mx-4 rounded">loggin</button>
            </form>
        </div>
    )
}

export default Index