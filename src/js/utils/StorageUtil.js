'use strict'

class StorageUtil {
  static get(key, value) {
    return localStorage.getItem(key)
  }

  static set(key, value) {
    localStorage.setItem(key, value)
    return value
  }

  static delete(key) {
    localStorage.removeItem(key)
    return key
  }

  static getIncrementer(incrementerName) {
    let incrementer = StorageUtil.get(incrementerName)
    if (incrementer === null) {
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

  static getAllItems(idPrefix) {
    var itemList = []
    StorageUtil._loopAllItems(idPrefix, (value) => {
      itemList.push(item)
    })
    return itemList
  }

  static getAllObjectItems(idPrefix) {
    var objectList = []
    StorageUtil._loopAllItems(idPrefix, (objectString) => {
      objectList.push(JSON.parse(objectString))
    })
    return objectList
  }

  static updateObject(idToUpdate, newValues) {
    var object = StorageUtil.getObjectValue(idToUpdate)
    for (key in newValues) {
      if (newValues.hasOwnProperty(key)) {
        object[key] = newValues[key]
      }
    }

    StorageUtil.set(idToUpdate, object)
    return object
  }

  static removeAllItems(keyPrefix, incrementerKey) {
    var object
    var count = 1
    while((object = StorageUtil.get(keyPrefix + count)) !== null) {
      StorageUtil.delete(keyPrefix + count)
      count++
    }

    if (typeof(incrementerKey) !== "undefined") {
      StorageUtil.delete(incrementerKey)
    }
  }

  static getObjectValue(key) {
    return StorageUtil.getObjectValueDefault(key, {})
  }

  static getObjectValueDefault(key, defaultValue) {
    var objectString = StorageUtil.get(key)
    return objectString !== null ? JSON.parse(objectString) : defaultValue
  }

  static setObject(objectKey, object) {
    object.id = objectKey
    StorageUtil.set(objectKey, JSON.stringify(object))
    return object
  }

  static isKeyValueExisting(idPrefix, keyName, keyValue) {
    let existing = false
    StorageUtil._loopAllItems(idPrefix, (item) => {
      item = JSON.parse(item)
      existing = item[keyName] === keyValue
      return existing
    })

    return existing
  }

  //if callback explictly has a return type of true we break out.
  //Otherwise there is a void return or we continue then we just increment
  static _loopAllItems(idPrefix, callback) {
    var item
    var count = 1
    while((item = StorageUtil.get(idPrefix + count)) !== null) {
      if (callback(item)) {
        break
      }
      count++
    }
  }
}

module.exports = StorageUtil
