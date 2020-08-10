const router = require('express').Router()
const {Events} = require('../db/models')
const User = require('../db/models/user')
const aws = require('aws-sdk')
const multer = require('multer')
const stream = require('stream')
const streamifier = require('streamifier')
const sharp = require('sharp')

const uploadStream = ({Bucket, Key}) => {
  aws.config.update({
    secretAccessKey: process.env.SecretAccessKey,
    accessKeyId: process.env.AccessKeyId,
    region: 'us-east-1',
  })
  const s3 = new aws.S3()
  const pass = new stream.PassThrough()
  return {
    writeStream: pass,
    promise: s3.upload({Bucket, Key, Body: pass}).promise(),
  }
}

var storage = multer.memoryStorage()
var upload = multer({storage: storage})

router.get('/locations', async (req, res, next) => {
  try {
    const locations = await Events.findAll({attributes: ['address']})
    if (locations) {
      res.json(locations)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const event = await Events.findOne({where: {id}})
    event.destroy()
    res.send('event deleted')
  } catch (error) {
    next(error)
  }
})

router.get('/event/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const event = await Events.findOne({where: {id}})
    if (event) {
      res.json(event)
    }
  } catch (error) {
    next(error)
  }
})

//Getting all the events
router.get('/events', async (req, res, next) => {
  try {
    const events = await Events.findAll({
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['id', 'picture'],
        },
      ],
    })
    if (events) {
      //comparing the dates
      // const finalEvents = events.filter((event) => {
      //   return (
      //     Number(new Date(event.date + ' ' + event.time).getTime()) >
      //     Number(new Date().getTime())
      //   )
      // })
      //res.json(finalEvents)
      res.json(events)
    }
  } catch (error) {
    next(error)
  }
})
router.put('/update/:id', async (req, res, next) => {
  const data = req.body
  const id = req.params.id
  try {
    await Events.update({...data}, {where: {id}})
    res.status(201).json({message: 'Event has ben updated'})
  } catch (error) {
    const messages = error.errors.reduce((obj, current) => {
      obj[current.path] = current.message
      return obj
    }, {})
    res.status(401).json(messages)
  }
})

//Creating a new Event
router.post('/newEvent', async (req, res, next) => {
  try {
    const data = req.body
    await Events.create({
      ...data,
      people: data.people,
      userId: req.user.id,
      createdBy: req.user.email,
      picture: req.user.picture,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    })
    res.status(201).json({message: 'post has ben created'})
  } catch (error) {
    const messages = error.errors.reduce((obj, current) => {
      obj[current.path] = current.message
      return obj
    }, {})
    res.status(422).json(messages)
  }
})
//API endpoint for uploading... User Pictures
router.post('/userPic', upload.single('picture'), async (req, res, next) => {
  let avatar =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  try {
    if (
      req.file.mimetype === 'image/jpeg' ||
      req.file.mimetype === 'image/jpg' ||
      req.file.mimetype === 'image/png'
    ) {
      const fileExt = req.file.mimetype.split('/')[1]
      const {writeStream, promise} = uploadStream({
        Bucket: 'taulantvokshiupload',
        Key: `${Date.now().toString()}.${fileExt}`,
      })
      var transformer = sharp().resize(300)
      streamifier
        .createReadStream(req.file.buffer)
        .pipe(transformer)
        .pipe(writeStream)
      promise.then(async (response) => {
        await User.update(
          {picture: response.Location},
          {returning: true, where: {id: req.user.id}}
        )
        await Events.update(
          {picture: response.Location},
          {returning: true, where: {createdBy: req.user.email}}
        )
        res.redirect('/home/your-events')
      })
    } else {
      await User.update(
        {picture: avatar},
        {returning: true, where: {id: req.user.id}}
      )
      await Events.update(
        {picture: avatar},
        {returning: true, where: {createdBy: req.user.email}}
      )
      res.redirect('/home/your-events')
    }
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router
