import express from "express"
import cors from "cors"
import { ConnectToDatabase } from "./database"
import Url from "./routes/url"
import ShortUrl from "./models/ShortUrls"

const  Port  = process.env.PORT 
ConnectToDatabase()

const app = express()
app.use(express.json())
app.use(cors())


app.use('/app/api', Url)
app.use('/:shortID', async (req:any, res:any) => {
    const { shortID } = req.params
    const result = await ShortUrl.findOne({ shortID })
    await ShortUrl.findOneAndUpdate({
         shortID
    }, {
        $push: {
            Analytics: {
                timestamp: Date.now()
            }
        }
    })
    if (!result) return res.status(404).send("Not Found")
   
    res.redirect(result.RedirectUrl)
})

app.listen(Port, () => {
    console.log(`Listening on http://locolhost:${Port}`)
})