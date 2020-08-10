const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: ['^[a-z]+$', 'i'], //'Only letters'
        msg: 'Only letters'
      },
      notNull: {
        args: true,
        msg: 'No Empty Field'
      },
      length(val) {
        if (val.length > 30) {
          throw new Error('Shorter first name please')
        }
        if (val.length === 1) {
          throw new Error('Longer first name please')
        }
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: ['^[a-z]+$', 'i'], //'Only letters please'
        msg: 'Only letters please'
      },
      notNull: {
        args: true,
        msg: 'No Empty Field'
      },
      length(val) {
        if (val.length > 30) {
          throw new Error('Shorter last name please')
        }
        if (val.length === 1) {
          throw new Error('Longer last name please')
        }
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: {
        args: true,
        msg: 'Valid email please'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 21],
        msg: 'password is too short or too long'
      }
    },
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.\\

    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },

  picture: {
    type: Sequelize.STRING
  },

  googleId: {
    type: Sequelize.STRING
  },
  events: {
    type: Sequelize.ARRAY(Sequelize.TEXT)
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
