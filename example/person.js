'use strict'

const Person = require('../src/core').Person

const person = new Person()
person.setFamilyName('Dwyer')
person.setGivenName('Andy')
person.path = '<person path>'

// const person = new Person()
// person.withData({
//   familyName: 'Dwyer',
//   givenName: 'Andy',
//   ...
// })

module.exports = person
