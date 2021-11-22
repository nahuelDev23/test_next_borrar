import dbConnect from "../../lib/debConnect"
import Movie from "../../models/Movie"
import Link from 'next/link'
import { useRouter } from "next/dist/client/router"

const Index = ({ movie, success, error }) => {
    const router = useRouter()
    const handleDelete = async (movieId) => {

        try {
            await fetch(`/api/movie/${movieId}`,{
                method:'DELETE'
            })
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    if (!success) {
        return (
            <div>
                <h1>{error} 👊</h1>
                <Link href="/">Volver</Link>
            </div>
        )
    }
    return (
        <div>
            <h1>detalle de Movie</h1>
            {
                movie && (
                    <div>
                        <h3>{movie.title}</h3>
                        <p>{movie.plot}</p>
                        <Link href="/"><a className="bg-blue-700 text-white p-2 rounded">Volver</a></Link>
                        <Link href={`/${movie._id}/edit` }><a className="bg-purple-700 text-white p-2 rounded">Editar</a></Link>
                        <button className="bg-red-700 text-white p-2 rounded" onClick={()=>handleDelete(movie._id)}>Eliminar</button>
                    </div>

                )
            }

        </div>
    )
}

export async function getServerSideProps({ params }) {
    try {
        await dbConnect()

        const movie = await Movie.findById(params.id).lean()
        if (!movie) {
            return {
                props: {
                    success: false,
                    error: "Pelicula no encontrada"
                }
            }
        }
        movie._id = movie._id.toString()
        return {
            props: {
                success: true,
                movie
            }
        }
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return { props: { success: false, error: 'Id no valido' } }
        }
        return { props: { success: false, error: 'Error de servidor' } }
    }
}

export default Index
