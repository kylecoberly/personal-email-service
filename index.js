const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");

const app = express()
app.use(bodyParser.json())
app.use(cors())

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

app.post("/email", (request, response) => {
  const { email, message } = request.body

  sgMail.send({
    from: "kyle.coberly@gmail.com",
    to: "kyle.coberly@gmail.com",
    reply_to: email,
    subject: "Inbound message from kylecoberly.com",
    text: message,
  }).then(() => {
    response.sendStatus(200)
  }).catch(error => {
    console.error(error.message)
    response.sendStatus(500)
  });
})

app.listen(process.env.PORT, () => console.log("Listening"))
