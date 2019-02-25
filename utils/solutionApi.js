
// this file deals with api calls to Wolfram's API to get solutions for a math problem
// https://products.wolframalpha.com/short-answers-api/documentation/

// use wolfram api to SOLVE
// Wolfram|Alpha Short Answer API
async function solve(value) {
    console.log("SOLVING")
    console.log(value)
    let URL = `https://cors-escape.herokuapp.com/http://api.wolframalpha.com/v1/result?appid=${APPID}&i=${value}%3f`
    let solution = await axios({
        method:'get',
        url: URL,
        responseType:'text'
      })
        .then(function(response) {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            console.log(response.data)
            return response.data

        });
    return solution
}

// export default solve
