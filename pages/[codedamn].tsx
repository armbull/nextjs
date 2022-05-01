import { useEffect, useState } from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'
import jwt from 'jsonwebtoken'
import Link from 'next/link'

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // console.log(context.query.codedamn)
//   // console.log(context)

//   // context.res.statusCode = 418
//   // context.res.write(JSON.stringify({something: 'cool'}))
//   // context.res.end()
//   const data = (await fetch("https://google.com").then((t)=>t.text())).slice(0,200)
//   return {
//     // redirect: {
//     //   destination: 'https://google.com',
//     //   permanent: true // 302
//     // }
//     // notFound: true
//     props: {
//       googleFirst200Chars: data
//     }
//   }
// }

export const getStaticProps: GetStaticProps = (context) => {
  
}
export default function Home(props, req, res) {
  const { rows } = props

  console.log('env value', process.env.SECRET_VARIABLE)
  console.log('env value', process.env.NEXT_PUBLIC_MYFIRSTBROWSERVARIABLE)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [message, setMessage] = useState<string>('You are not logged in')
  const [secret, setSecret] = useState<string>('')

  async function submitForm(e) {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    }).then((t) => t.json())

    const token = res.token

    if(token) {
      const json = jwt.decode(token) as { [key: string]: string }

      console.log(json)
      setMessage(`Welcome ${json.username} and you are ${json.admin ? 'an admin!' : 'not an admin!'}`)

      const res = await fetch('/api/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
      }).then((t) => t.json())

      if(res.secretAdminCode) {
        setSecret(res.secretAdminCode)
      } else {
        setSecret('Nothing available')
      }

    } else {
      setMessage('Something went wrong')
    }
  }

  return (
    <div>
      <pre>
        {props.googleFirst200Chars}
      </pre>
      Welcome to <Link href="/mehul/mehul"><a>Mehul</a></Link>
      <h1>{message}</h1>
      <h1>Secret: {secret}</h1>
      <form>
        <input
          type="text"
          name="username"
          autoComplete=""
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          autoComplete=""
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="login" onClick={submitForm} />
      </form>
    </div>
  )
}
