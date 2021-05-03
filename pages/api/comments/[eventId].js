async function handler(req, res) {
  const eventId = req.query.eventId
  if (req.method === "POST") {
    const { email, name, text } = req.body
    if (
      !email.includes("@") ||
      !name ||
      name.trim === "" ||
      !text ||
      text.trim === ""
    ) {
      res.status(422).json({ messsage: "Invalid Input" })
      return
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    }
    console.log(newComment)
    res.status(201).json({ messsage: "Success !!!" })
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Maz", text: "text" },
      { id: "c2", name: "Seb", text: "text2" },
    ]
    res.status(200).json({ comments: dummyList })
  }
}

export default handler
