// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/debConnect";
import User from "../../../models/User";
import jwt from 'jsonwebtoken'


export default async function handler(req, res) {

  await dbConnect()

  const { method } = req
  const KEY = '123123124124124123423'
  switch (method) {

    case 'POST':

      try {

        if(!req.body){
            res.status = 404,
            res.end('Error')
            return
        }

        const {email,password} = req.body

        const user = await User.findOne({email,password})

        if(email === ''){
            return res.status(404).json({ success: false, error:'email es necesario' })
        }

        if(password === ''){
            return res.status(404).json({ success: false, error:'password es necesario' })
        }

        if(!user){
            return res.status(404).json({ success: false, error:'revisa las credenciales' })
        }

        let token = jwt.sign({
            uid:user._id,
            userName:user.userName,
            admin:user.admin
        },KEY)
        

         return res.status(201).json(
             { 
              success: true,
              token: token,
              username:user.userName,
              admin:user.admin,
              uid:user._uid
            })

      } catch (error) {
        return res.status(500).json({ success: false, error })
      }

    default:
      return res.status(500).json({ success: false, error: 'Falla del servidor' })
  }
}
