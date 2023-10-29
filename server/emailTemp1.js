export const temp = (data) => {
  var htmlTemp =
    `
    <html>

    <body>
      <div style="width: 100%;background-color: #F7F7FC;">
        <div style="width :80% ; margin: auto;padding: 35px ; background-color: #fff;">
          <h2>Confirmation</h2>
          <h4>order number : {{params.paymentId}}</h4>

          <h4>dear {{params.name}}</h4>
          <img src={{params.img}} alt="img" style="width: 100%; max-height: 300px;">
          <h5 style="color: red;"> view package</h4>
            <h3> {{params.packageName}}</h3>
            <h4 style="color: green;">Payment Breakdowen</h4>
    
            <div style="width:  100%;">
              <h4 style="width: 60% ;display: inline-block;">total</h4>
              <h4 style="width: 35% ;display: inline-block;">{{params.total}} SAR</h4>
            </div>
    
    
            <hr>
    
            <div style="width:  100%;">
              <h4 style="width: 60% ;display: inline-block;">VAT</h4>
              <h4 style="width: 35% ;display: inline-block;">{{params.vat}} SAR</h4>
            </div>
    
            <hr>
            <div style="width:  100%;">
            <h4 style="width: 60% ;display: inline-block;">grand</h4>
            <h4 style="width: 35% ;display: inline-block;">{{params.grand}} SAR</h4>
          </div>
            <span style="color: #838383;">if you have any problem please contact us</span>
            <div>Info@guestna.app</div>
            <div>+966563617998 </div>
    
        </div>
    
      </div>
    </body>
    
    </html>
        `
  return htmlTemp
}
