'use strict'

class StorageUtil {
  static get(key, value) {
    return localStorage.getItem(key)
  }

  static set(key, value) {
    localStorage.setItem(key, value)
  }

  static delete(key) {
    localStorage.removeItem(key)
  }

  static getIncrementer(incrementerName) {
    let incrementer = StorageUtil.get(incrementerName)
    if (typeof(incrementer) === 'undefined') {
      incrementer = 0
    }

    return parseInt(incrementer)
  }

  static increment(incrementerKey) {
    let incrementer = StorageUtil.getIncrementer(incrementerKey)
    incrementer += 1
    StorageUtil.set(incrementerKey, incrementer)
    return incrementer
  }

  static getAllItems(keyPrefix) {
    var itemList = []
    var item
    var count = 1
    while((item = StorageUtil.get(keyPrefix + count) !== null)) {
      itemList.push(item)
      count++
    }

    return itemList
  }

  static getAllObjectItems(keyPrefix) {
    var objectList = []
    var objectString
    var count = 1
    while((objectString = StorageUtil.get(keyPrefix + count) !== null)) {
      objectList.push(JSON.parse(objectString))
      count++
    }

    return objectList
  }

  static removeAllItems(keyPrefix, incrementerKey) {
    var object
    var count = 1
    while((object = StorageUtil.get(keyPrefix + count) !== null)) {
      StorageUtil.delete(keyPrefix + count)
      count++
    }

    if (typeof(incrementerKey) !== "undefined") {
      StorageUtil.delete(incrementerKey)
    }
  }

  static getObjectValue(key) {
    var objectString = StorageUtil.get(key)
    return objectString !== null ? JSON.parse(objectString) : {}
  }

  static setObject(objectKey, object) {
    StorageUtil.set(objectKey, JSON.stringify(object))
  }
}

module.exports = StorageUtil
