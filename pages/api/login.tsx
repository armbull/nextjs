import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const KEY = 'jhiadjaosdijoe1j2o1j2ioje12easd123'

export default function(req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end('Error')
        return 
    }
    const { username, password } = req.body
    res.json({
        token: jwt.sign(
            {
                username,
                admin: username === 'admin' && password === 'admin'
            },
            KEY
        )
    })
}

// http://localhost:3000/api/random-number