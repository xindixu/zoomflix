import type { NextPage } from "next"
import { API_ENDPOINT } from "../lib/api-fetch"

const Home: NextPage = () => {
  return (
    <div>
      Zoomflex Home Page
      <div>Backend url: {API_ENDPOINT}</div>
    </div>
  )
}

export default Home
