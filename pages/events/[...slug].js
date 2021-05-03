import { useRouter } from "next/router"
import { getFilteredEvents } from "../../helpers/api"
import EventList from "../../components/events/event-list"
import ResultsTitle from "../../components/events/results-title"
import Button from "../../components/ui/button"
import ErrorAlert from "../../components/ui/error-alert"
import useSWR from "swr"
import { useEffect, useState } from "react"
import Head from "next/head"

const FilteredEvents = (props) => {
  const [loadEvents, setLoadEvents] = useState()
  const router = useRouter()

  const filterData = router.query.slug

  const { data, error } = useSWR(
    "https://myapp-1420c-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  )

  useEffect(() => {
    if (data) {
      const events = []

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setLoadEvents(events)
    }
  }, [data])

  if (!loadEvents) {
    return <p className="center"> Loading...</p>
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>Invalid filter</ErrorAlert>
        <div className="center">
          <Button link="/events/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = loadEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    )
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>No events found for the chosen filter</ErrorAlert>
        <div className="center">
          <Button link="/events/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const dateNew = new Date(numYear, numMonth - 1)
  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}`}
        />
      </Head>
      <ResultsTitle date={dateNew} />
      <EventList items={filteredEvents} />
    </>
  )
}

// export async function getServerSideProps(context) {
//   const { params } = context

//   const filterData = params.slug
//   const filteredYear = filterData[0]
//   const filteredMonth = filterData[1]

//   const numYear = +filteredYear
//   const numMonth = +filteredMonth

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       notfound: true,
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   })

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   }
// }

export default FilteredEvents
