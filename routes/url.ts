import express from "express"
import shortid from "shortid"
import ShortUrl from "../models/ShortUrls";

const routes = express.Router()

routes.post("/shorten", async (req: any, res: any) => {
  try {
      const { url, Auther } = req.body as { url: string , Auther: string };
      
      if (!url.includes("https://") || url.includes("http://"))
          return res.status(400).send("Bad Request");
      
      const find = await ShortUrl.findOne({ $and: [{ Auther: Auther }, { RedirectUrl: url }] });
      if (find) return res.status(200).send({message: "Already shortened", Short_Id: find.shortID, content: find });
      const Short_Id = shortid.generate();
      
      const result = await ShortUrl.create({
          Auther: Auther,
          shortID: Short_Id,
          RedirectUrl: url,
          Analytics: []
      })

      
      return res.status(200).send({message: "Shortened Successfully", Short_Id, content: result });
      
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});
routes.get('/analytics/:shortID', async (req: any, res: any) => {
    try {
        const { shortID } = req.params
        const result = await ShortUrl.findOne({ shortID })
        if(!result) return res.status(404).send("Not Found")
        res.status(200).json(result.Analytics)
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
})
export default  routes