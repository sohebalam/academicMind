// import { MongoClient } from "mongodb"

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ messsage: "Invalid email address" })
      return
    }

    // const client = MongoClient.connect(
    //   "mongodb+srv://SebAlam:Mmilo123@cluster0.lb1qj.mongodb.net/newsletter?retryWrites=true&w=majority"
    // )
    // const db = client.db()
    // await db.collection("emails").insertOne({ email: userEmail })

    // await client.close()
    res.status(201).json({ messsage: "signed up !!!" })
  }
}

export default handler
