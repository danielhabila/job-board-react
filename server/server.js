import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postedjob from "./models/postedJob.js";
import crawledjob from "./models/crawledjob.js";
import upload from "./middleware/upload.js";
import { Stripe } from "stripe";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static("public"));
app.use("/webhook", bodyParser.raw({ type: "*/*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
//PostedJob DB
mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`);

// ----------------------------------------------------------------------------
// Pull and display all jobs from DB
app.get("/ReadJob", (req, res) => {
  crawledjob.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/:id", (req, res) => {
  crawledjob.findOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// ----------------------------------------------------------------------------

app.post("/CreateJob", upload.single("companyLogo"), async (req, res) => {
  try {
    // retrieve the data sent in the request body
    const formData = {
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
    };
    console.log("req.body: ", req.body);
    // console.log("req.file: ", req.file);
    console.log("totalCost is: ", req.body.totalCost);

    // check if a file was uploaded
    if (req.file) {
      formData.companyLogo = {
        data: req.file.filename,
        contentType: req.file.mimetype,
      };
    }
    // ******************************************************************************************
    const { totalCost } = req.body;
    console.log(totalCost);

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
    let lineItems = [{ price: price, quantity: 1 }];

    // creating a session with the line items
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        // Pass form data to metadata for later retrieval
        formData: JSON.stringify(formData),
      },
    });
    // res.redirect(303, session.url);
    res.send(
      JSON.stringify({
        url: session.url,
      })
    );

    // ******************************************************************************************
  } catch (err) {
    console.log(err.message);
  }
});

//  -------------------------------------------------------------------------------------------------------------
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    // Verifying the event actually comes from stripe
    const sig = request.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        process.env.ENDPOINT_SECRET
      );
      console.log("webhook signature verified");
    } catch (err) {
      console.log(`webhook error: ${err.message}`);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    // ******************************************************************************************
    if (event.type === "checkout.session.completed") {
      // Retrieve metadata to get form data
      const session = event.data.object;
      const metadata = session.metadata;
      const formData = JSON.parse(metadata.formData);

      const paymentIntentId = session.payment_intent;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      console.log(paymentIntent);

      if (paymentIntent.status === "succeeded") {
        const newJob = new postedjob(formData);

        postedjob.create(newJob, (err, savedJob) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Job created!");
          }
        });
      } else {
        // Payment failed, do not create job in database
        console.error("Payment failed");
      }
      // // Return a success status code
      // response.status(200).send("Webhook received");
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }
  }
);

// -------------------------------------------------------------------------------------------------------------

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
