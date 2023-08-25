const authorize = (permittedRole) => {
     return (req, res, next) => {

          if (!permittedRole.includes(req.role)) {
               return res.sendStatus(401)
          }

          next()
     }
}

module.exports = { authorize };