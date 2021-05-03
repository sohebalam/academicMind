import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { getFeaturedEvents } from "../helpers/api"
import EventList from "../components/events/event-list"
import NewsletterRegistration from "../components/input/newsletter-registration"

function Home({ events }) {
  return (
    <>
      <Head>
        <title>Great Events!!!</title>
        <meta name="description" content="find great events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}

export default Home
