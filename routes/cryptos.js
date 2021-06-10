import express from "express";
import axios from "axios";
import Crypto from "../models/crypto.js";

const router = express.Router();

router.get("/home", async (req, res) => {
  const savedCrypto = await Crypto.find({});

  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=134&page=1&sparkline=false"
    )
    .then((response) => {
      var cryptoData = response.data;
      function saveValue(cId) {
        for (let i in savedCrypto) {
          if (savedCrypto[i].id === cId) {
            return true;
          }
        }
        return false;
      }

      const useFullData = cryptoData.map((d) => ({
        id: d.id,
        market_cap_rank: d.market_cap_rank,
        name: d.name,
        symbol: d.symbol,
        image: d.image,
        current_price: d.current_price,
        market_cap: d.market_cap,
        saved: saveValue(d.id),
      }));
      // console.log(useFullData)
      res.send(useFullData);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/home", async (req, res) => {
  await Crypto.create(req.body);
  res.sendStatus(200);
});

router.get("/view", async (req, res) => {
  const savedCrypto = await Crypto.find({});
  axios
    .get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=134&page=1&sparkline=false"
    )
    .then((response) => {
      var cryptoData = response.data;
      function saveValue(cId) {
        for (let i in savedCrypto) {
          if (savedCrypto[i].id === cId.id) {
            return true;
          }
        }
        return false;
      }

      const useFullData = cryptoData.filter(saveValue).map((d) => ({
        id: d.id,
        market_cap_rank: d.market_cap_rank,
        name: d.name,
        symbol: d.symbol,
        image: d.image,
        current_price: d.current_price,
        market_cap: d.market_cap,
        saved: true,
      }));

      res.send(useFullData);
    })
    .catch((err) => {
      console.log(err);
    });
});



router.post('/view', async (req, res)=>{
    console.log(req.body.id);
    await Crypto.findOneAndDelete({id:req.body.id});

    res.sendStatus(200);

})

export default router;
