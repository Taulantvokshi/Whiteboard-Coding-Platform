const Sequelize = require('sequelize')
const db = require('../db')
const date = new Date()

const Event = db.define('Event', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
    validate: {
      isAllWhiteSpaces(value) {
        if (value.length) {
          if (!value.trim().length) {
            throw new Error('No only white spaces')
          }
        }
      },
    },
  },

  picture: {
    type: Sequelize.STRING,
  },
  people: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Empty feild not allowed',
      },
      not: {
        args: ['[a-z]', 'i'],
        msg: 'Only numbers are allowed',
      },
      max: {
        args: 20,
        msg: 'No more than 20 people',
      },
      min: {
        args: -1,
        msg: 'No les than 1 person',
      },
    },
  },
  language: {
    type: Sequelize.STRING,
  },
  exactAddress: {
    type: Sequelize.STRING,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Select a date',
      },
      // isAfter: {
      //   args: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() -
      //     1}`,
      //   msg: 'Should be on the future'
      // }
    },
  },
  details: {
    type: Sequelize.TEXT,
    validate: {
      len: {
        args: [0, 2200],
        msg: 'Shorter text please',
      },
      isAllWhiteSpaces(value) {
        if (value.length) {
          if (!value.trim().length) {
            throw new Error('Not only white spaces')
          }
        }
      },
    },
  },
  time: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Set a time',
      },
    },
  },
})

module.exports = Event
