import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postedjob from "./models/postedJob.js";
import crawledjob from "./models/crawledjob.js";
import upload from "./middleware/upload.js";
import { Stripe } from "stripe";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import client from "@mailchimp/mailchimp_marketing";

const port = 4000;
const myUuid = uuidv4();
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
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to mongodb successfully"))
  .catch((err) => console.log("Mongodb connection failed", err));

//M----------------------------------------------------------------------------
app.post("/subscribe", async (req, res) => {
  const { name, email } = req.body; // Get email address from form data

  client.setConfig({
    apiKey: process.env.MAILCHIMP_APIKEY,
    server: "us13",
  });

  const addEmailToList = async (email, name) => {
    try {
      const response = await client.lists.addListMember("3c6b6dafc2", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
        },
      });
      res.status(200).json({
        success: true,
        message:
          "You've bee successfully added to the greatest list in the world 🤩.",
      });
      console.log(`Added ${email} to Mailchimp list!`);
    } catch (error) {
      console.error("Error adding subscriber:", error);
      res.status(500).json({
        success: false,
        message:
          "Something went wrong 🥹. Please let me know using the feedback button at the bottom right of your screen :)",
      });
    }
  };
  addEmailToList(email, name);
});

// ----------------------------------------------------------------------------

app.get("/ReadJob", async (req, res) => {
  try {
    const crawledJobs = await crawledjob
      .find({})
      .sort({ posted_date: -1 })
      .lean();
    const postedJobs = await postedjob
      .find({})
      .sort({ posted_date: -1 })
      .lean();
    const jobs = [...postedJobs, ...crawledJobs];
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const crawledJob = await crawledjob.findOne({ _id: req.params.id }).lean();
    const postedJob = await postedjob.findOne({ _id: req.params.id }).lean();
    const job = crawledJob || postedJob;
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----------------------------------------------------------------------------

app.use(
  session({
    genid: (req) => {
      return uuidv4(); // generate unique ID for session
    },
    secret: process.env.MY_SESSION_KEY, // replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to false if not using HTTPS
  })
);
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

    req.session.formData = formData;
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
      const pricing = await stripe.prices.create({
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
      client_reference_id: req.sessionID, // associate the session with the payment
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
    console.log("event.type:", event.type);
    if (event.type === "checkout.session.completed") {
      // Retrieve metadata to get form data
      const session = event.data.object;

      const sessionId = session.client_reference_id;

      const sessionData = await new Promise((resolve, reject) => {
        request.sessionStore.get(sessionId, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      console.log("content of sessionData:", sessionData);

      const paymentIntentId = await session.payment_intent;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      console.log("paymentIntent content:", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        const newJob = new postedjob(sessionData.formData);

        postedjob.create(newJob, (err, savedJob) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Job created!");
            // respond.status(201).json(savedJob);
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
