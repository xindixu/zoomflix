import type { NextPage } from "next"
import { API_ENDPOINT } from "../lib/api-fetch"
import NextLink from "next/link"

const Home: NextPage = () => {
  return (
    <>
      Zoomflex Home Page
      <NextLink href="/meetings" passHref>
        <a>meetings</a>
      </NextLink>
      <div>Backend url: {API_ENDPOINT}</div>
    </>
  )
}

export default Home
