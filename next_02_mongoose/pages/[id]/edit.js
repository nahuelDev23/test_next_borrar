import Form from "../../components/Form"
import useSWR from "swr"
import { useRouter } from "next/dist/client/router"
import { data } from "autoprefixer"

const fetcher = async url =>
(fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)
)



const Edit = () => {

    const router = useRouter()
    const { id } = router.query

    const { error, data: movie } = useSWR(id ? `/api/movie/${id}` : null, fetcher)


    if (error) {
        return (
            <div>
                <h1>Error</h1>
            </div>
        )
    }

    if (!movie) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    }
    const formData = {
        title: movie.title,
        plot: movie.plot
    }

    return (
        <div>
            Editar{movie.title}{movie.plot}
            <Form
                forNewMovie={false}
                formData={formData} />
        </div>
    )
}

export default Edit