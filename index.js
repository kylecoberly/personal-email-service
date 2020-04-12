exports.handler = async (event, context) => {
  let statusCode = "200";
    
  if (event.httpMethod === "POST"){
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const { email, message } = JSON.parse(event.body)

    try {
      await sgMail.send({
        from: "kyle.coberly@gmail.com",
        to: "kyle.coberly@gmail.com",
        reply_to: email,
        subject: "Inbound message from kylecoberly.com",
        text: message,
      })
    } catch (err) {
      statusCode = "500";
    }
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "https://kylecoberly.com",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "OPTIONS,POST"
    },
  };
};
