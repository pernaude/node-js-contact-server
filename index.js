require("babel-register")
const nodemailer = require("nodemailer");
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000






express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/mail', (req, res) => {





      // async..await is not allowed in global scope, must use a wrapper
    async function main(){

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing


      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: "pernaude.amoussou@gmail.com", // generated ethereal user
          pass: "michel5464" // generated ethereal password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <pernaude.amoussou@gmail.com>', // sender address
        to: "pernaude.amoussou@gmail.com, lovnexrencontres@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "HelloJuste un test", // plain text body
        html: "<b>Hello Dawgs?</b>" // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);



  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
