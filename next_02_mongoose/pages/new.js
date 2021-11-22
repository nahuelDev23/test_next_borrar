import Form from '../components/Form'

const New = () => {
   
    const formData = {
        title:'',
        plot:''
    }

    return (
        <div className='bg-gray-800 h-screen w-screen text-white'>
            <h1>Agregar peli</h1>
            
            <Form formData={formData}/>
        </div>
    )
}

export default New