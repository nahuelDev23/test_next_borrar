import Head from 'next/head'
import dbConnect from '../lib/debConnect'
import Movie from '../models/Movie'
import Link from 'next/link'

const Index = ({ movies }) => {
  return (
    <div className='bg-gray-800 h-screen w-screen'>
      <Head>
        <title>Clase #08</title>
        <meta name="description" content="pagina de aprendizaje" />
      </Head>
      <main className="mx-auto container">
        <h1>movies</h1>
        <Link href="/new"><a>Agregar nuevo</a></Link>
        {
          movies.map(movie => (
            <p key={movie._id}><Link href={`/${movie._id}`}><a>{movie.title}</a></Link></p>
          ))
        }
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    await dbConnect()

    const res = await Movie.find({})
    const movies = res.map(doc => {
      const movie = doc.toObject()
      movie._id = movie._id.toString()
      return movie
    })
    return {
      props: {
        movies
      }
    }
  } catch (error) {

  }
}

export default Index