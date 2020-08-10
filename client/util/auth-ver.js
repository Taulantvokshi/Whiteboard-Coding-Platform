module.exports = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.status(404).send({message: 'error no auth'})
  }
}
