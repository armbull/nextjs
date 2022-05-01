import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
//EXECUTION ON SERVER
export const getStaticProps: GetStaticProps = async (context) => {

    const fs = require('fs')

    return {
        props: {
            revalidate: 10,
            myFavNum: Math.random()
        }
    }
}

// getStaticProps runs at BUILD TIME. It does NOT RUN AT RUNTIME

// START
// localhost:3000/fruit/hello -> take the output -> store on the disk
// localhost:3000/fruit/world -> take the output -> store on the disk

// localhost:3000/fruit/asdasjdkajs -> call the getStaticProps on server -> render the page -> (background) Next.js would add this to the paths list and  would store it locally on the filesystem for faster access

// localhost:3000/fruit/asdasjdkajs  - send the output from file stored
// DONE

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { name: 'hello'}
            },
            {
                params: { name: 'world'}
            }
        ],
        fallback: true
    }
}
export default function MyFruit(props) {
    const router = useRouter()

    if(router.isFallback) {
        return <h1>Loading...</h1>
    }

    return <h1>Hello {props.myFavNum}</h1>
}