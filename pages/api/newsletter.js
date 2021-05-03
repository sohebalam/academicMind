import { connectDatabase, insertDocument } from "../../helpers/db"

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ messsage: "Invalid email address" })
      return
    }

    let client
    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ messsage: "Connection to DB failed" })
      return
    }
    try {
      await insertDocument(client, "newsletter", { email: userEmail })
      await client.close()
    } catch (error) {
      res.status(500).json({ messsage: "Data insertion failed" })
      return
    }

    res.status(201).json({ messsage: "signed up !!!" })
  }
}

export default handler
