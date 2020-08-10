const router = require('express').Router()
const {User, Events} = require('../db/models')
const Op = require('sequelize').Op

router.put('/join/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    let peoppleCount = await Events.findOne({where: {id}})
    peoppleCount.update({people: (peoppleCount.people -= 1)})
    res.send('sucess')
  } catch (error) {
    next(error)
  }
})

router.post('/event/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const user = await User.findOne({where: {id: req.user.id}})
    await user.update({events: [...user.events, id]})

    const event = await Events.findOne({where: {id}})
    await event.addUsers(req.user.id)

    let peoppleCount = await Events.findOne({where: {id}})
    let people = Number(peoppleCount.people)
    peoppleCount.update({people: (people -= 1)})

    res.send(event)
  } catch (error) {
    next(error)
  }
})

router.get('/allEvents/:id', async (req, res, next) => {
  const id = req.params.id
  const allEvents = await Events.findOne({
    where: {id},
    include: [
      {
        model: User,
        as: 'Users'
      }
    ]
  })

  res.json(allEvents)
})

router.get('/your-events', async (req, res, next) => {
  try {
    const events = await Events.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (events) {
      res.json(events)
    } else {
      res.json([])
    }
  } catch (error) {
    next(error)
  }
})

router.get('/joined-events', async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {id: req.user.id},
      attributes: ['events']
    })
    const joinedEvents = await Events.findAll({
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['id', 'picture']
        }
      ],
      where: {
        id: {
          [Op.in]: data.events
        }
      }
    })
    res.send(joinedEvents)
  } catch (error) {
    next(error)
  }
})

router.get('/remove-joined-event/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    const data = await User.findOne({where: {id: req.user.id}})

    const index = data.events.findIndex(item => item === id)
    data.events.splice(index, 1)
    data.update({events: data.events})

    const event = await User.findOne({where: {id: req.user.id}})
    await event.removeAllEvents(id)

    let peoppleCount = await Events.findOne({where: {id}})
    let people = Number(peoppleCount.people)
    peoppleCount.update({people: (people += 1)})

    res.json({
      message: `Sucesful event with id ${id} has ben removed. --${
        data.events.length
      }--`
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
