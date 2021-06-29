// import axios from "axios"
// axios.delete({})
const defaultData = {
  status: 200,
  data: [
    {
      id: 1,
      name: "United States dollar",
      iso: "USD",
      symbol: "$",
    },
    {
      id: 2,
      name: "European euro",
      iso: "EUR",
      symbol: "€",
    },
    {
      id: 3,
      name: "Pound sterling",
      iso: "GBP",
      symbol: "£",
    },
  ],
}

export default (axios) => ({
  getAll() {
    // return Promise.resolve(defaultData)
    return axios.get(`https://dev.api.digidoe.com/api/currency`, {})
  },
})
