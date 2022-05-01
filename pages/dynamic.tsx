import { GetStaticProps, GetServerSideProps } from 'next'
import path from 'path'
//EXECUTION ON SERVER

// called always on every page request. EVEN ON PRODUCTION
export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            myFavNum: Math.random()
        }
    }
}

export default function Dynamic(props) {
    return <h1>Dynamic - {props.myFavNum}</h1>
}