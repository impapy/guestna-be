import { Service, Events, Packges, Providers } from "../api/collections";



Picker.route('/allUsers', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("6 api work", user)
  if (user.username === "admin") {
    var user = Meteor.users.find({ "profile.isProv": true, "profile.spam": false }).fetch()
    const data = JSON.stringify(user)
    res.end(data);
  } else {

  }

});

Picker.route('/services', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("20 api work", user)
  if (user.username === "admin") {
    var services = Service.find({}).fetch()
    const data = JSON.stringify(services)
    res.end(data);
  } else {

  }

});

Picker.route('/allPackgesAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("6 api work", user)
  if (user.username === "admin") {
    var allPackges = Packges.find({}).fetch()
    const data = JSON.stringify(allPackges)
    res.end(data);
  } else {

  }

});

Picker.route('/ThePackgeAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("6 api work", user)
  if (user.username === "admin") {
    var ThePackge = Packges.findOne({ _id: params.query.id })
    var theEvents = ThePackge.events
    ThePackge.events = Events.find({ _id: { $in: theEvents } }).fetch()
    const data = JSON.stringify(ThePackge)
    res.end(data);
  } else {

  }

});

Picker.route('/allEventsAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("6 api work", user)
  if (user.username === "admin") {
    var allPackges = Events.find({}).fetch()
    const data = JSON.stringify(allPackges)
    res.end(data);
  } else {

  }

});
Picker.route('/allProvidersAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("6 api work", user)
  if (user.username === "admin") {
    var allProviders = Providers.find({}).fetch()
    const data = JSON.stringify(allProviders)
    res.end(data);
  } else {

  }

});

Picker.route('/providerAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("86 api work", user)
  if (user.username === "admin") {
    var provider = Providers.findOne({ _id: params.query.providerId })
    const data = JSON.stringify(provider)
    res.end(data);
  } else {

  }

});
Picker.route('/serviceAdmin', function (params, req, res, next) {
  var user = Meteor.users.findOne({ _id: params.query.userId })
  console.log("86 api work", user)
  if (user.username === "admin") {
    var service = Service.findOne({ _id: params.query.serviceId })
    const data = JSON.stringify(service)
    res.end(data);
  } else {

  }

});
Meteor.methods({
  addService: function (data) {
    var service = {
      name: data.name,
      icon: (data.icon) ? data.icon : false,


    }
    Service.insert(service)
  },
  addProvider: function (data) {
    var provider = {
      name: data.name,
      logo: (data.icon) ? data.icon : false,
      about: data.about,
      createdAt: new Date(),
      phone: data.phone



    }
    Providers.insert(provider)
  },

  addEvent: function (data) {
    var event = { ...data, purchased: 0, rating: "", reviews: [], favorite: 0 }
    Events.insert(event)
  },
  deleteEvent: function (id) {

    Events.remove({ _id: id })
  },
  editEvent: function (data) {

    Events.update({ _id: data._id }, { $set: data })
  },
  addPackage: function (data) {
    var packges = { ...data, purchased: 0, rating: "", reviews: [], favorite: 0 }
    Packges.insert(packges)
  },
  setDefaultView: function (data) {

    Packges.update({ _id: data.ThePackge._id }, { $set: { defaultView: data.defaultView } })
  },
  editProvider: function (data) {
    Providers.update({ _id: data._id }, { $set: data })
  },
  editService: function (data) {
    Service.update({ _id: data._id }, { $set: data })
  },
  editPack: function (data) {
    Packges.update({ _id: data._id }, { $set: data })
  },
  deletePack: function (id) {

    Packges.remove({ _id: id })
  },
})