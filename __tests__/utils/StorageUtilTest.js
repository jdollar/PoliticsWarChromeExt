'use strict'

import StorageUtil from './../../src/js/utils/StorageUtil'

describe('StorageUtil', () => {

  beforeEach(() => {
    window.localStorage = storageMock()
  })

  describe('get', () => {
    it('should return value from getItem', () => {
      window.localStorage.setItem('test', 'testValue')
      expect(StorageUtil.get('test')).toEqual('testValue')
    })
  })

  describe('set', () => {
    it('should set value on localstorage', () => {
      StorageUtil.set('test', 'testValue')
      expect(window.localStorage.getItem('test')).toEqual('testValue')
    })
  })

  describe('delete', () => {
    it('should delete item from local storage', () => {
      window.localStorage.setItem('test', 'testValue')
      expect(window.localStorage.getItem('test')).toEqual('testValue')

      StorageUtil.delete('test')
      expect(window.localStorage.getLength()).toEqual(0)
      expect(window.localStorage.getItem('test')).toEqual(null)
    })
  })

  describe('getIncrementer', () => {
    it('should return a zero id incrementer not set', () => {
      expect(StorageUtil.getIncrementer('incrementer')).toEqual(0)
    })

    it('should return the incrementer when set', () => {
      window.localStorage.setItem('incrementer', 1)
      expect(StorageUtil.getIncrementer('incrementer')).toEqual(1)
    })
  })

  describe('increment', () => {
    it('if incrementer not set set it to one', () => {
      expect(StorageUtil.increment('incrementer')).toEqual(1)
      expect(window.localStorage.getItem('incrementer')).toEqual(1)
    })

    it('if incrementer set increase it by one', () => {
      window.localStorage.setItem('incrementer', 1)
      expect(StorageUtil.increment('incrementer')).toEqual(2)
      expect(window.localStorage.getItem('incrementer')).toEqual(2)
    })
  })

  describe('getAllItems', () => {
    it('if nothing set return empty array', () => {
      expect(StorageUtil.getAllItems('prefix')).toEqual([])
    })

    it('single set single return', () => {
      window.localStorage.setItem('prefix1', 'test')
      expect(StorageUtil.getAllItems('prefix')).toEqual(['test'])
    })

    it('multiple set multiple return', () => {
      window.localStorage.setItem('prefix1', 'test')
      window.localStorage.setItem('prefix2', 'test2')
      expect(StorageUtil.getAllItems('prefix')).toEqual(['test', 'test2'])
    })

    it('different prefix returns nothing', () => {
      window.localStorage.setItem('other1', 'test')
      expect(StorageUtil.getAllItems('prefix')).toEqual([])
    })
  })

  describe('getAllObjectItems', () => {
    it('if nothing set return empty array', () => {
      expect(StorageUtil.getAllObjectItems('prefix')).toEqual([])
    })

    it('single set single return', () => {
      let expectedObjectString = '{"test": "test"}'
      window.localStorage.setItem('prefix1', expectedObjectString)
      expect(StorageUtil.getAllObjectItems('prefix')).toEqual([JSON.parse(expectedObjectString)])
    })

    it('multiple set multiple return', () => {
      let expectedObjectString = JSON.stringify({"test": "test"})
      window.localStorage.setItem('prefix1', expectedObjectString)
      let expectedObjectString2 = '{"test": "test2"}'
      window.localStorage.setItem('prefix2', expectedObjectString2)
      expect(StorageUtil.getAllObjectItems('prefix')).toEqual([
        JSON.parse(expectedObjectString),
        JSON.parse(expectedObjectString2)
      ])
    })

    it('different prefix returns nothing', () => {
      let expectedObjectString = '{"test": "test"}'
      window.localStorage.setItem('other1', expectedObjectString)
      expect(StorageUtil.getAllObjectItems('prefix')).toEqual([])
    })
  })

  describe('updateObject', () => {
    it('if object not set return an empty object', () => {
      expect(StorageUtil.updateObject('test', {'test': 'test'})).toEqual({})
    })

    it('should update values sent in', () => {
      window.localStorage.setItem('test', JSON.stringify({'test': ''}))
      let expectedObject = {'test': 'test'}
      expect(StorageUtil.updateObject('test', {'test': 'test'})).toEqual(expectedObject)
      expect(window.localStorage.getItem('test')).toEqual(JSON.stringify(expectedObject))
    })
  })

  describe('removeAllItems', () => {
    it('should remove item single', () => {
      let expectedObject = {'test': 'test'}
      window.localStorage.setItem('test1', JSON.stringify(expectedObject))
      window.localStorage.setItem('incrementer', 2)

      expect(window.localStorage.getLength()).toEqual(2)

      StorageUtil.removeAllItems('test', 'incrementer')

      expect(window.localStorage.getLength()).toEqual(0)
    })

    it('should remove item multiple', () => {
      let expectedObject = {'test': 'test'}
      window.localStorage.setItem('test1', JSON.stringify(expectedObject))
      let expectedObject2 = {'test': 'test2'}
      window.localStorage.setItem('test2', JSON.stringify(expectedObject2))
      window.localStorage.setItem('incrementer', 2)

      expect(window.localStorage.getLength()).toEqual(3)

      StorageUtil.removeAllItems('test', 'incrementer')

      expect(window.localStorage.getLength()).toEqual(0)
    })
  })

  describe('getObjectValue', () => {
    it('should return object value if set', () => {
      let expectedObject = {'test': 'test'}
      window.localStorage.setItem('test', JSON.stringify(expectedObject))
      expect(StorageUtil.getObjectValue('test')).toEqual(expectedObject)
    })

    it('should return empty object if not set', () => {
      expect(StorageUtil.getObjectValue('test')).toEqual({})
    })
  })

  describe('getObjectValueDefault', () => {
    it('should return object if set', () => {
      let expectedObject = {'test': 'test'}
      window.localStorage.setItem('test', JSON.stringify(expectedObject))
      expect(StorageUtil.getObjectValueDefault('test', {})).toEqual(expectedObject)
    })

    it('should return default if not set', () => {
      expect(StorageUtil.getObjectValueDefault('test', {})).toEqual({})
    })
  })

  describe('setObject', () => {
    it('should set object with id', () => {
      let setupObject = {'test': 'test'}
      let expectedObject = setupObject
      expectedObject.id = 'test'
      expect(StorageUtil.setObject('test', setupObject)).toEqual(expectedObject)
      expect(window.localStorage.getItem('test')).toEqual(JSON.stringify(expectedObject))
    })
  })

  describe('setObjectValue', () => {
    it('should set object as string on storage', () => {
      let expectedObject = {'test': 'test'}
      expect(StorageUtil.setObjectValue('test', expectedObject)).toEqual(expectedObject)
      expect(window.localStorage.getItem('test')).toEqual(JSON.stringify(expectedObject))
    })
  })

  describe('isKeyValueExisting', () => {
    it('if key is in the storage return true', () => {
      window.localStorage.setItem('test1', JSON.stringify({test: 'test'}))
      expect(StorageUtil.isKeyValueExisting('test', 'test', 'test'))
    })

    it('if key is not in the storage returns false', () => {
      window.localStorage.setItem('test1', JSON.stringify({test: 'test'}))
      expect(StorageUtil.isKeyValueExisting('test', 'test', 'test'))
    })
  })
})

function storageMock() {
  var storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return typeof(storage[key]) === "undefined" ? null : storage[key]
    },
    removeItem: function(key) {
      delete storage[key];
    },
    getLength() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  }
}
