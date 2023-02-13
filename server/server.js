import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postedjob from "./models/postedJob.js";
import upload from "./middleware/upload.js";
import { Stripe } from "stripe";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`);

// ----------------------------------------------------------------------------
// Pull and display all jobs from DB
app.get("/ReadJob", (req, res) => {
  postedjob.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// ----------------------------------------------------------------------------
// Stripe checkout
app.post("/checkout", async (req, res) => {
  const { totalCost, quantity } = req.body;
  console.log(totalCost, quantity);

  // Search for an existing price with the same unit amount and currency
  const existingPrices = await stripe.prices.list({
    active: true,
    unit_amount: totalCost * 100,
    currency: "cad",
  });

  // Checking if price_id already exist in my stripe dashboard. This is to avoid creating multiple price_ids
  let price;
  if (existingPrices.data.length > 0) {
    price = existingPrices.data[0].id;
    console.log("found a matching Price_ID");
  } else {
    // Otherwise, create a new price
    const pricing = await stripe.existingPrices.create({
      unit_amount: totalCost * 100,
      currency: "cad",
      product: "prod_NLDJAAdnnhGPKJ",
    });
    price = pricing.id;
    console.log("created a new Price_ID");
  }

  // note that the names will have to be exactly "price" and "quantity" cos thats how stripe likes it.
  let lineItems = [{ price: price, quantity: quantity }];

  // creating a session with the line items
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  //sending created session url to the frontend
  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});
// ----------------------------------------------------------------------------
//Push jobs to DB
app.post("/CreateJob", upload.single("companyLogo"), (req, res) => {
  try {
    // retrieve the data sent in the request body
    const newJob = new postedjob({
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      location: req.body.location,
      jobDescription: req.body.jobDescription,
      salaryPrecise: req.body.salaryPrecise,
      salaryRange: {
        min: req.body.min,
        max: req.body.max,
      },
      jobType: {
        commitment: req.body.commitment,
        flexibility: req.body.flexibility,
        contract: req.body.contract,
      },
      websiteURL: req.body.websiteURL,
      contactEmail: req.body.contactEmail,
      applyURL: req.body.applyURL,
      companyLogo: req.file
        ? {
            data: req.file.filename,
            contentType: req.file.mimetype,
          }
        : undefined,

      posted_date: new Date(),
    });
    console.log("req.body: ", req.body);
    console.log("req.file: ", req.file);
    console.log("newJob: ", newJob);

    // check if a file was uploaded
    if (req.file) {
      newJob.companyLogo = {
        data: req.file.filename,
        contentType: req.file.mimetype,
      };
    }

    postedjob.create(newJob, (err, savedJob) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json(savedJob);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
