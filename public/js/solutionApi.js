// const axios = require('axios');
// this file deals with api calls to Wolfram's API to get solutions for a math problem
// https://products.wolframalpha.com/short-answers-api/documentation/

// use wolfram api to SOLVE
// Wolfram|Alpha Short Answer API
// module.exports = function(app) {
//     async function solve(value) {
//         console.log("SOLVING")
//         console.log(value)
//         var key = process.env.API_KEY
//         let URL = `http://api.wolframalpha.com/v1/result?appid=${key}&i=${value}%3f`
//         console.log(URL)
//         let solution = await axios({
//             method:'get',
//             url: URL,
//             responseType:'text'
//         })
//         console.log(solution.data)
//         return solution
//     }
// }

async function solve(value) {
    console.log("SOLVING")
    console.log(value)
    // let key = process.env.API_KEY
    // let key = env.API_KEY
    let proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let url = `http://api.wolframalpha.com/v1/result?appid=L3KTPE-AQXLLYR4XL&i=${value}%3f`
    console.log(proxyURL+url)
    let solution = await axios({
        method:'get',
        url: proxyURL+url,
        responseType:'text'
    })
    console.log(solution.data)
    return solution.data
}

//export default solve
//module.exports.solve
