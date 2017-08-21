'use strict'

const expect = require('chai').expect
const Base = require('../src/base')
const sort = require('../src/util').sort

const {
  describe,
  it
} = require('mocha')

const context = '<context placeholder>'
const type = '<type placeholder>'

let instance,
    sub1,
    sub2,
    subsub

describe('Base', () => {
  it('creates instances', () => {
    instance = new Base(context, type)
    sub1 = new Base(context, type)
    sub2 = new Base(context, type)
    subsub = new Base(context, type)
  })
  it('configures instances', () => {
    instance.set('name', 'instance')
    instance.add('sub', sub1)
    instance.add('sub', sub2)
    sub1.set('name', 'sub1')
    sub1.add('sub', subsub)
    sub2.set('name', 'sub2')
    subsub.set('name', 'subsub')
  })
  it('validates tree', () => {
    expect(sub1.tree()).to.deep.equal([
      subsub, sub1
    ])
    expect(instance.tree()).to.deep.equal(
      sub1.tree().concat([ sub2, instance ])
    )
  })
  it('validates data', () => {
    expect(sub2.data()).to.deep.equal({
      '@context': context,
      '@type': type,
      name: 'sub2'
    })
    expect(subsub.data()).to.deep.equal({
      '@context': context,
      '@type': type,
      name: 'subsub'
    })
    expect(sub1.data()).to.deep.equal({
      '@context': context,
      '@type': type,
      name: 'sub1',
      sub: [subsub.data()]
    })
    expect(instance.data()).to.deep.equal({
      '@context': context,
      '@type': type,
      name: 'instance',
      sub: [
        sub1.data(),
        sub2.data()
      ]
    })
  })
  it('comparisons', () => {
    expect(sub1.compare(sub2)).to.equal(1)
    expect(sub2.compare(subsub)).to.equal(-1)
    expect(instance.compare(sub1)).to.equal(-1)
  })
})
