require("babel-register")
const nodemailer = require("nodemailer")
const smtpPool = require('nodemailer-smtp-pool')
const express = require('express')
var cors = require("cors")
const path = require('path')
const PORT = process.env.PORT || 5000






express()
  .use(cors())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/v1', (req, res) => res.send("Welcome to Test API V1"))
  .get('/users', (req, res) => {
    res.send(`List of members ${ PORT }`)
  })
  .get('/v1/test', (req, res) => {
    const queries = req.query
    var resultReturned
    let msgBuilt
    let errorSent = 1
    if(!queries.from || !queries.fullname || !queries.phone || !queries.subject || !queries.msg){
      console.log("Missing Params")
      resultReturned = "Missing Params"
    }else{
      
      let regexEmail = /^[a-zA-Z-0-9]+[a-zA-Z-0-9\-\.]+@[a-zA-Z-0-9]+[a-zA-Z-0-9\-\.]+\.[a-zA-Z]{2,15}$/
      let regexPhone = /^((00|\+)[1-9]{1,3})?[0-9]{6,15}$/
      let regexShortString = /^.{2,255}$/
      let regexLongString = /^.{20,5000}$/
      if(!queries.from.match(regexEmail)){
        resultReturned = "Email de l'expéditeur invalide"
      }else if(!queries.fullname.match(regexShortString)){
        resultReturned = "Nom de l'expéditeur invalide"
      }else if(!queries.phone.match(regexPhone)){
        resultReturned = "Numéro de téléphone invalide"
      }else if(!queries.subject.match(regexShortString)){
        resultReturned = "L'objet du message est trop court"
      }else if(!queries.msg.match(regexLongString)){
        resultReturned = "Le message est trop court"
      }else{

      msgBuilt = "<div style='border-radius: 3px; max-width: 600px; margin: 20px auto; font-size: 13px;line-height: 25px; color: #333; font-family: segoe ui; padding: 20px; box-sizing: border-box; border: 1px solid #dedfde'><b>Nom de l'expéditeur:</b> "+queries.fullname
      msgBuilt += "<br/><b>Numéro de téléphone:</b> "+queries.phone
      msgBuilt += "<br/><b>Email de l'expéditeur:</b> "+queries.from
      msgBuilt += "<br/><b>Objet du message:</b> "+queries.subject
      msgBuilt += "<br/><br/><b>Message</b><hr><br><div style='font-size: 15px; line-height: 28px;'>"+queries.msg+"<br/><hr></div>"
      


      


        var transport = nodemailer.createTransport(smtpPool({
                host: 'ssl0.ovh.net',
                port: 465,
                tls: {
              rejectUnauthorized:false,//Laisser à false si vos certificat ne sont pas à jour
                },
                auth: {
                    user: 'info@pernaude.fr',
                    pass: 'Angele5464K@'
                },
                maxConnections: 3,
                maxMessages: 300
        }));

        var mail_object = {
            from: `"Pernaude Amoussou" info@pernaude.fr`, // remplacer par l'email emetteur de votre domaine
            to: '"Pernaude Amoussou" info@pernaude.fr', // remplacer par l'email de la personne qui recoit
            subject: `${queries.subject}`, // sujet du mail
            text: `${msgBuilt}`, // plaintext body
            html: `<html><body>${msgBuilt}</body></html>` // html body
        };

        transport.sendMail(mail_object, function(error, info){
            if(error) {
            console.log(error.response);
          }
          console.log(info);
        });






        errorSent = 0
        resultReturned = "Message envoyé"
      }
      
    }
    res.send({"error": errorSent, "msg": resultReturned})
    
    





  })
  .get('/', (req, res) => res.redirect('/v1'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
