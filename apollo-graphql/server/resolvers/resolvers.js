const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const Person = require('../models/person');
const User = require('../models/user');

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate('friendOf');
      }
      return Person.find({
        phone: {
          $exists: args.phone === 'YES'
          }
        }).populate('friendOf');
    },
    findPerson: async (root, args) =>
      await Person.findOne({ name: args.name}).populate('friendOf')
  },
  Person: {
    address: (root) => ({ street: root.street, city: root.city }),
    friendOf: async (root) => {
      // return list of users 
      const friends = await User.find({
        friends: {
          $in: [root._id]
        } 
      });
      return friends;
    }
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const person = new Person({ ...args });
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person)
        await currentUser.save()
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }
      pubsub.publish('PERSON_ADDED', { personAdded: person });
      return person;
    },
    editPhone: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        });
      }
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }
      return person;
    },
    addAsFriend: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }

      const person = Person.findOne({ name: args.name });
      if (!currentUser.friends.some(f=> f._id.toString() === person._id.toString())) {
        currentUser.friends = currentUser.friends.concat(person);
      }
      return await currentUser.save();
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch(e => {
        throw new GraphQLError('User creation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error: e
          }
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      // hard coded password: 'secret'
      // change to password hash and store in user collection
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator('PERSON_ADDED')
    },
  },
}

module.exports = resolvers;
