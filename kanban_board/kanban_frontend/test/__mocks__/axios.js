// module.exports = {
//     get: jest.fn(() => Promise.resolve({ data: [3] }))
// }

const axios = {
    get: () => new Promise(res => res({ data: 'Mock with Jest' }) )
  }
export default axios