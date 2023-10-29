const cloudinary = require('cloudinary')
import{Service} from "../api/collections"

Meteor.methods({
    
    async  uploadImgForSer (data){
      console.log("7",data)
        const bound = Meteor.bindEnvironment((callback) => {callback();});
        const  result = await cloudinary.uploader.upload(data, (ress)=> { 
          bound(() => {
            if (ress) {
              console.log("this is ress",ress); 
              var result = ress.url
              return result
            } else {
              console.log("this is err" )
            }
          }); 
      });
      console.log(result.url)
      return result.url
      },



  })  