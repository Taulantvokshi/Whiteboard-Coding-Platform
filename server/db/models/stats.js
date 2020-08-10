const Sequelize = require('sequelize')
const db = require('../db')
const Stats = db.define('Stats', {
  firstName: {
    type: Sequelize.STRING
    // allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    //allowNull: false
  },
  address: {
    type: Sequelize.STRING
    //allowNull: false
  },
  phoneNumber: {
    type: Sequelize.STRING
    //unique: true
  },
  picture: {
    type: Sequelize.STRING
  },
  people: {
    type: Sequelize.STRING
    // allowNull: false
  },
  language: {
    type: Sequelize.STRING
  },
  exactAddress: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.STRING
  },
  wasCreated: {
    type: Sequelize.STRING
  }
})

module.exports = Stats
