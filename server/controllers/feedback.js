const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.emailFeedback = (req, res) => {
  const { name, email, message, phone } = req.body;
  const emailData = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: 'Feedback Form',
    html: `
      <h1>Costumer Feedback Form</h1>
      <hr/>
      <h3>Sender name: </h3><h4>${name}</h4>
      <h3>Sender email: </h2><h4>${email}</h4>
      <h3>Sender phone: </h3><h4>${phone}</h4>
      </br>
      <h3>Message:</h3>
      <p>${message}</p>
    `
  }

  sgMail.send(emailData)
    .then(sent => {
      console.log('sent');
      return res.json({
        success: true
      });
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        const { message, code, response } = error;
        const { headers, body } = response;
        console.log(body);
      }
      return res.json({
        success: false
      });
    })
};