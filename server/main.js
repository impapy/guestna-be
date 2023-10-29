import { Meteor } from 'meteor/meteor';
import { Service, Orders, Reviews } from '/imports/api/collections';
import "/imports/methods/signup"

import "../imports/methods/service"
import "../imports/methods/reviews"
import "../imports/methods/admin"
import "../imports/methods/Events"
import "../imports/methods/payment"
import "./notf"
import "./email"
import parse from 'urlencoded-body-parser'
import { EJSON } from 'meteor/ejson'
import moment from 'moment';
var bodyParser = require('body-parser')
import Twilio from 'twilio';

import { Events, Factors, Packges, Places } from '../imports/api/collections';
import { json } from 'body-parser';

const cloudinary = require('cloudinary')
Meteor.startup(() => {


  //process.env.MAIL_URL = 'smtp://guestna.app@gmail.com:guestna2022@smtp.gmail.com:587';
  process.env.MAIL_URL = 'smtp://depaxmail@gmail.com:Gw3pdZ14maFc6yXN@smtp-relay.sendinblue.com:587';

  Meteor.methods({
    sendEmail(to, from, subject, text) {
      // Make sure that all arguments are strings.
      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

      Email.send({ to, from, subject, text });
    }
  })

  // Meteor.call("sendEMail", { userId: "dP5ZXXXxtianbwXWu", packageId: "n3neFBLahcSyM8AoY" }, (err, res) => {
  //   if (err) {
  //     console.log(err);

  //   } else {
  //     console.log(res);
  //   }
  // })


  //Email.send({to : "momenashraf646@gmail.com", from :"depaxmail@gmail.com",subject: "subject", text :"text" });

  Picker.route('/sendmail', async (params, req, res, next) => {
    console.log("23 api work")
    const result = await parse(req)
    console.log(result);
    // var data = JSON.parse(result)
    var to = "momenashraf646@gmail.com"
    var from = "guestna.app@gmail.com"
    var subject = result.subject
    var text = result.text
    console.log(subject);
    Email.send({ to, from, subject, text });
    console.log("done");
    res.end("done");
  });

  // var packges = Packges.find().fetch()
  // var services = Service.find().fetch()
  // packges.forEach(element => {
  //   var events = element.events
  //   var tempArr = []
  //   for (let i = 0; i < events.length; i++) {
  //     const elementId = events[i];
  //     const element = Events.findOne({_id : elementId})
  //     tempArr.push({
  //       id :element._id , 
  //       name : element.name , 
  //       img : element.gallary[0] ,
  //       fromDay : element.fromDay,
  //       toDay : element.toDay 
  //   })

  //   }
  //   console.log(tempArr);
  //      Packges.update({_id : element._id} , {$set :  {events : tempArr}})

  //     Packges.update({_id : element._id} , {$set :  {services : services}})
  //   });




  if (Meteor.users.find({ username: "admin" }).count() === 0) {


    Accounts.createUser({
      username: 'admin',
      email: '',
      password: '123456789',
      profile: {

      }
    });

  }

  cloudinary.config({
    cloud_name: 'dasdo0qus',
    api_key: '327176764673315',
    api_secret: 'hWWGyLmhEKJE0zLyUZ2QxGLGuQc',
    secure: true
  });






  //lib publish 

  Picker.route('/userInfoApi', function (params, req, res, next) {
    console.log("139 api work")


    var user = Meteor.users.findOne({ _id: params.query.userId })

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(user)
    res.end(data);
  });


});


