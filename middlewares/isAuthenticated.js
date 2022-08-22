const { expressjwt } = require('express-jwt')

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET,
  algorithms:["HS256"],
  requestProperty: "payload",
  getToken: (req) => {
    if(req.headers === undefined || req.headers.authorization === undefined ){
      console.log("Token not found")
      return null
    }

    console.log(req.headers.authorization)
    const tokenArr = req.headers.authorization.split(" ")
    const tokenType = tokenArr[0]
    const token = tokenArr[1]

    if(tokenType !== "Bearer"){
      console.log("Type of token invalid")
      return null;
    }

    console.log("The token was delivered")
    return token;
  }
});

module.exports = isAuthenticated;