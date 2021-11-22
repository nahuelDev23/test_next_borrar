// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/debConnect";
import Movie from "../../../models/Movie";

export default async function handler(req, res) {

    await dbConnect()
    //get api/movie/:id
    const { 
        method,
        query: { id }
    } = req

    switch (method) {

        case 'GET':

            try {
                const movie = await Movie.findById(id).lean()
                console.log(movie);
                if (!movie) {
                    return res.status(404).json({ success: false })
                }

                return res.json({ success: true, data: movie })

            } catch (error) {
                return res.status(500).json({ success: false })
            }
            case 'PUT':

                try {
                    const movie = await Movie.findByIdAndUpdate(
                        id,
                        req.body,
                        {
                            new:true,
                            runValidators:true
                        }
                        )
                    if (!movie) {
                        return res.status(404).json({ success: false })
                    }
    
                    return res.json({ success: true, data: movie })
    
                } catch (error) {
                    return res.status(500).json({ success: false,error })
                }
    
            case 'DELETE':

                try {
                    const movie = await Movie.findByIdAndDelete(id)
                    if (!movie) {
                        return res.status(404).json({ success: false })
                    }
    
                    return res.json({ success: true, data: movie })
    
                } catch (error) {
                    return res.status(500).json({ success: false })
                }
    
        default:
            return res.status(500).json({ success: false, error: 'Falla del servidor' })
    }
}
