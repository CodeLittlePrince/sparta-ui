module.exports = () => {
  return {
    'code': '000000',
    'status': 400,
    'errors': {
      'name': '您的名字被占用啦！',
      'xx': 'xx',
      'age': '您的年龄有点小！',
    },
    'message': 'error message',
    'result': [
      { label: 'Tony', value: 1 },
      { label: 'Bob', value: 2 },
      { label: 'Jack', value: 3 }
    ]
  }
}