const axios = require('axios');
// this file deals with api calls to Wolfram's API to get solutions for a math problem
// https://products.wolframalpha.com/short-answers-api/documentation/

// use wolfram api to SOLVE
// Wolfram|Alpha Short Answer API
async function solve(value) {
    console.log("SOLVING")
    console.log(value)
    var key = process.env.API_KEY
    let URL = `http://api.wolframalpha.com/v1/result?appid=${key}&i=${value}%3f`
    console.log(URL)
    let solution = await axios({
        method:'get',
        url: URL,
        responseType:'text'
    })
    console.log(solution.data)
    return solution
}

solve("4plus5")

// export default solve
