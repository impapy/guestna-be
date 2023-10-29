const sdk = require('api')('@movider/v1.0#3dy29x1ekssmjp2d');
const cloudinary = require('cloudinary')
const accountSid = "ACcdfba5beecc72b21161180ebced385d6";
const authToken = "5ee6125cbf7222b088c04259e377887d";
const client = require('twilio')(accountSid, authToken);


Picker.route('/userInfoApi', function (params, req, res, next) {
  console.log("7 api work")


  var user = Meteor.users.findOne({ _id: params.query.userId })

  // const data = JSON.stringify({user :user.profile , userId :user._id})
  const data = JSON.stringify(user)
  res.end(data);
});
Meteor.methods({

  //{phoneNum : "01095661396", password : "12341234" ,firstName :"momen" , lastName : "ashraf" , email : email}
  signUp: function (user) {
    console.log(user);
    return Accounts.createUser({
      email: user.email,
      username: user.phoneNum,
      createdOn: new Date(),
      password: user.password,
      profile: {
        isBlocked: false,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNum: user.phoneNum,
        plans: [],
        reviews: [],
        img: "",
        notificationToken: "",
        fav: [],


      }
    });

  },
  async uploadImg(data) {

    console.log(data)

    const bound = Meteor.bindEnvironment((callback) => { callback(); });
    const result = await cloudinary.uploader.upload(data.img, (ress) => {
      bound(() => {
        if (ress) {
          console.log("this is ress", ress);
          var result = ress.url
          return result
        } else {
          console.log("this is err")
        }
      });
    });
    console.log(result.url)
    return result.url
  },
  async phoneOtpReq(data) {
    const result = await client.verify.services('VAa19136390da0c0511003442ac73ee991')
      .verifications
      .create({ to: data.phoneNum, channel: 'whatsapp' })
      .then(verification => verification)
      .catch((err) => {
        console.error(err)
        return false
      });
    console.log(result)
    return result.to
  },

  async acceptOtp(data) {
    const result = await client.verify.services('VAa19136390da0c0511003442ac73ee991')
      .verificationChecks
      .create({ to: data.phoneNum, code: data.code })
      .then(verification_check => verification_check.status)
      .catch((err) => {
        console.error(err)
        return false
      });
    console.log(result)
    return result
  },

  // {id : id , firstName : firstName , lastName : lastName , dateOfBirth : dateOfBirth , gender : gender}
  changeInfo: function (data) {
    return Meteor.users.update({ _id: data.id },
      {
        $set: {
          "profile.firstName": data.firstName,
          "profile.lastName": data.lastName,
          "profile.dateOfBirth": data.dateOfBirth,
          "profile.gender": data.gender,


        }
      });


  },
  removeUser(data) {

    return Meteor.users.remove({ _id: data.userId })



  },
  notificationToken: function (data) {
    console.log("144===");
    return Meteor.users.update({ _id: data.id },
      {
        $set: {
          "profile.notificationToken": data.notificationToken,



        }
      });


  },
  async setProfileImg(data) {

    console.log(data)

    const bound = Meteor.bindEnvironment((callback) => { callback(); });
    const result = await cloudinary.uploader.upload(data.img, (ress) => {
      bound(() => {
        if (ress) {
          console.log("this is ress", ress);
          var result = ress.url
          return result
        } else {
          console.log("this is err")
        }
      });
    });
    console.log(result.url)
    return Meteor.users.update({ _id: data.userId },
      {
        $set: {
          "profile.img": result.url,

        }
      });
  },
  addReview: function (data) {
    return Meteor.users.update({ _id: data.providerID },
      {
        $push: {
          "profile.reviews": data.review,

        }
      });


  },
  setPassword(data) {
    Accounts.setPassword(data.userId, data.newPassword)
    return "done"
  },


})

Picker.route('/userWithNumber', function (params, req, res, next) {
  var phoneNum = params.query.phoneNum
  phoneNum = `\+` + phoneNum.trim()

  console.log(phoneNum);
  var user = Meteor.users.findOne({ username: phoneNum })
  console.log("164 api work", user)

  const data = JSON.stringify(user)
  res.end(data);


});