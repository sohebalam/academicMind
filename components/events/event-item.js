import Link from "next/link"
import classes from "../../styles/event-item.module.css"
import { Button } from "@material-ui/core"
import DateIcon from "@material-ui/icons/Event"
import AddressIcon from "@material-ui/icons/LocationOn"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import Image from "next/image"

const eventItem = ({ title, image, date, location, id }) => {
  const HRDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const formattedAddress = location.replace(", ", "\n")

  return (
    <li className={classes.item}>
      <Image src={"/" + image} alt={title} height={160} width={250} />
      <div>
        <h2>{title}</h2>
        <div>
          <DateIcon />
          <time>{HRDate}</time>
        </div>
        <div>
          <span>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </span>
        </div>
        <div>
          <Button variant="outlined" href={`/events/${id}`}>
            <span>
              Explore Event
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default eventItem
