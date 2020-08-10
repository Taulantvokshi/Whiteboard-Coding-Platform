const User = require('./user')
const Events = require('./host')
const Stats = require('./stats')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Events.belongsTo(User, {foreignKey: 'userId'})
User.belongsToMany(Events, {as: 'AllEvents', through: 'PastEvents'})
Events.belongsToMany(User, {as: 'Users', through: 'PastEvents'})

// //Creates a UserProject table with ID's for ProjectId, UserId
// User.belongsToMany(Project, { as: 'Task', through: 'UserProject' });
// Project.belongsToMany(User, { as: 'Workers', through: 'UserProject' });
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Events,
  Stats
}
