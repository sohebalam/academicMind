import { getAllEvents } from "../../helpers/api"
import EventList from "../../components/events/event-list"
import EventsSearch from "../../components/event-detail/events-search"
import { useRouter } from "next/router"
import Head from "next/head"
const Events = ({ events }) => {
  // const events = getAllEvents()
  const router = useRouter()

  const findEventsHandler = (month, year) => {
    // console.log(month, year)
    // router.push = `/events/${year}/${month}`
    // const fullPath = `/events/${year}/${month}`

    router.push(`/events/${year}/${month}`)
  }

  return (
    <>
      <Head>
        <title>All Events!!!</title>
        <meta name="description" content="find great events" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()
  return {
    props: {
      events: events,
    },
    revalidate: 1800,
  }
}

export default Events
