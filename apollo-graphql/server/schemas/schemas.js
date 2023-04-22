const typeDefs = `
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES NO
  }

  type Query {
    me: User!
    personCount: Int!
    allPersons(hasPhone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editPhone(
      name: String!
      phone: String!
    ): Person

    addAsFriend(
      name: String!
    ): User

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    personAdded: Person!
  }  
`
module.exports = typeDefs;
