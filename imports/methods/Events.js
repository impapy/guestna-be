import { Packges, Events, ClonedPackges, Providers } from "../api/collections"

Picker.route('/allEvents', function (params, req, res, next) {
    console.log("4 api work")

    // var userId = Meteor.users.findOne({ _id: params.query.userId })._id

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    var events = Events.find().fetch()
    const data = JSON.stringify(events)
    res.end(data);
});
Picker.route('/allPackages', function (params, req, res, next) {
    console.log("14 api work")

    // var userId = Meteor.users.findOne({ _id: params.query.userId })._id

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    var packges = Packges.find().fetch()
    const data = JSON.stringify(packges)
    res.end(data);
});
Picker.route('/event', function (params, req, res, next) {
    console.log("24 api work")

    var event = Events.findOne({ _id: params.query.eventId })

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(event)
    console.log(data);
    res.end(data);
});

Picker.route('/provider', function (params, req, res, next) {
    console.log("24 api work")

    var provider = Providers.findOne({ _id: params.query.providerId })

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(provider)
    console.log(data);
    res.end(data);
});
Picker.route('/package', function (params, req, res, next) {
    console.log("24 api work")

    var event = Packges.findOne({ _id: params.query.eventId })
    if (event) {
        var theEvents = event.events
        event.events = Events.find({ _id: { $in: theEvents } }).fetch()

    } else {
        var event = Events.findOne({ _id: params.query.eventId })

    }

    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(event)
    res.end(data);
});


Picker.route('/plans', function (params, req, res, next) {
    console.log("48 api work")
    var userPlans = Meteor.users.findOne({ _id: params.query.userId }).profile.plans
    var tempArr = []
    userPlans.forEach(element => {
        if (element.type == "activitie") {
            var event = Events.findOne({ _id: element.theId })
            tempArr.push(event)
        } else {
            var event = Packges.findOne({ _id: element.theId })
            tempArr.push(event)
        }

    });


    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(tempArr)
    res.end(data);
});

Picker.route('/fav', function (params, req, res, next) {
    console.log("71 api work")
    var userPlans = Meteor.users.findOne({ _id: params.query.userId }).profile.fav
    var tempArr = []
    userPlans.forEach(element => {
        if (element.type == "activitie") {
            var event = Events.findOne({ _id: element.theId })
            tempArr.push(event)
        } else {
            var event = Packges.findOne({ _id: element.theId })
            tempArr.push(event)
        }

    });


    // const data = JSON.stringify({user :user.profile , userId :user._id})
    const data = JSON.stringify(tempArr)
    res.end(data);
});


Meteor.methods({
    addToFav(data) {
        console.log(data);
        var theEvent = Events.find({ _id: data.eventId }).fetch()
        if (theEvent.length > 0) {
            var favId = theEvent[0]._id
            var type = "activitie"
            var opj = {
                theId: favId,
                type: type
            }
        } else {
            var theEvent = Packges.find({ _id: data.eventId }).fetch()
            var favId = theEvent[0]._id
            var type = "packge"
            var opj = {
                theId: favId,
                type: type
            }
        }
        allFav = Meteor.users.findOne({ _id: data.userId }).profile.fav
        var isIn = allFav.filter(opj => opj.theId == data.eventId)
        if (isIn.length > 0) {
            console.log("118===");
            Meteor.users.update({ _id: data.userId },
                {
                    $pull:
                    {
                        "profile.fav": { theId: data.eventId }
                    }
                });
            return "removed"
        } else {
            Meteor.users.update({ _id: data.userId },
                {
                    $push: {
                        "profile.fav": opj,

                    }
                });
            return "added"
        }

    },
    addToPlans(data) {
        console.log(data);
        var theEvent = Events.find({ _id: data.eventId }).fetch()
        if (theEvent.length > 0) {
            var favId = theEvent[0]._id
            var type = "activitie"
            var opj = {
                theId: favId,
                type: type,
                paymentId: data.paymentId
            }
        } else {
            var theEvent = Packges.find({ _id: data.eventId }).fetch()
            if (theEvent.length > 0) {
                var favId = theEvent[0]._id
                var type = "packge"
                var opj = {
                    theId: favId,
                    type: type,
                    paymentId: data.paymentId
                }
            } else {
                var theEvent = ClonedPackges.find({ _id: data.eventId }).fetch()
                var favId = theEvent[0]._id
                var type = "clone"
                var opj = {
                    theId: favId,
                    type: type,
                    paymentId: data.paymentId
                }
            }

        }
        return Meteor.users.update({ _id: data.userId },
            {
                $push: {
                    "profile.plans": opj,

                }
            }, (err, docNum) => {
                if (err) {
                    console.log(err);
                } else {
                    Meteor.call("sendEMail", { paymentId: data.paymentId, packgeId: data.packgeId }, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {

                        }
                    })
                }
            });
    },
    updateView: function (data) {

        var pac = Packges.findOne({ _id: data.data._id })
        var clone = { ...pac, packgeId: data.data._id }
        delete clone._id;
        console.log(clone);
        clone.defaultView = data.data
        console.log(data.data);
        var theClone = ClonedPackges.insert(clone)
        Meteor.call("addToPlans", { userId: data.userId, eventId: theClone })

    },


    addReviewToEvent: function (data) {
        var theUser = Meteor.users.findOne({ _id: data.userId })
        var review = {
            clint: `${theUser.profile.firstName}  ${theUser.profile.lastName}`,
            clintId: data.userId,


            createdAt: new Date(),
            comment: (data.comment) ? data.comment : "",
            rate: Number(data.rate)
        }

        var thePackage = Packges.findOne({ _id: data.eventId })


        if (thePackage) {
            var reviewLengh = thePackage.reviews.length
            console.log("185", reviewLengh);
            var rate = ((thePackage.rate) ? Number(thePackage.rate) : 0 + Number(data.rate)) / (reviewLengh + 1)
            console.log("187", thePackage.rate);
            console.log("186", rate);

            return Packges.update({ _id: data.eventId }, { $push: { reviews: review }, $set: { rate: rate.toFixed(1) } })


        } else {
            var theEvent = Events.findOne({ _id: data.eventId })

            var reviewLengh = theEvent.reviews.length
            console.log("185", reviewLengh);
            var rate = ((theEvent.rate) ? Number(theEvent.rate) : 0 + Number(data.rate)) / (reviewLengh + 1)

            return Events.update({ _id: data.eventId }, { $push: { reviews: review }, $set: { rate: rate.toFixed(1) } })

        }

    },
    hideEvent(data) {
        Events.update({ _id: data.eventId },
            {
                $set:
                {
                    hide: data.show
                }
            });
    }

})  