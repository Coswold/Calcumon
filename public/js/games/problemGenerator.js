// this file contains functions that randomly generate math problems for different topics
// call a class's 'getEquation' function to get a random equation
// use pattern functions to get equations based on level

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// for printing problem to html
// ex. 6 plus 5 returns 6 + 5
function makeProblemReadable(problem) {
    problem = problem.replace(/plus/g, "+")
    problem = problem.replace(/minus/g, "-")
    problem = problem.replace(/divided by/g, "/")
    problem = problem.replace(/multiplied by/g, "x")
    return problem 
}

// Simple Adding and Subtracting
class Simple {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 100
    }

    // class functions
    getOp() {
        let opNum = getRandomInt(this.max)
        let op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        return op
    }
    
    pattern1() {
        let num1 = getRandomInt(this.max)
        let num2 = getRandomInt(this.max)
        // determine random operand
        let op = this.getOp()
        let equation = `${num1} ${op} ${num2}`
        return equation
    }
    
    pattern2() {
        let num = getRandomInt(this.max)
        // determine random operand
        let op = this.getOp()
        let equation = `${pattern1()} ${op} ${num}`
        return equation
    }
    
    pattern3() {
        // determine random operand
        let op = this.getOp()
        let equation = `${this.pattern1()} ${op} ${this.pattern1()}`
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}

// add/subtract fractions
class SimpleFractions {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 100
    }

    getOp() {
        let opNum = getRandomInt(this.max)
        let op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        return op
    }
    
    pattern1() {
        // get ints
        let max = 50
        let num1 = getRandomInt(max)
        let num2 = getRandomInt(max)
        let den1 = getRandomInt(max) + 1
        let den2 = getRandomInt(max) + 1
    
        // determine random operand
        let op = this.getOp()
    
        // create equation
        equation = `${num1} divided by ${den1} ${op} ${num2} divided by ${den2}`
        return equation
    }
    
    pattern2() {
        let op = this.getOp()
        let eq1 = this.pattern1()
        let eq2 = this.pattern1()
        let equation = eq1 + ` ${op} ` + eq2
        return equation
    }
    
    pattern3() {
        let op = this.getOp()
        let eq1 = this.pattern2()
        let eq2 = this.pattern1()
        let equation = eq1 + ` ${op} ` + eq2
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}

// multiplying fractions
class MultiplyFractions {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 50
    }

    pattern1() {
        // get ints
        let num1 = getRandomInt(this.max)
        let num2 = getRandomInt(this.max)
        let den1 = getRandomInt(this.max) + 1
        let den2 = getRandomInt(this.max) + 1
        let op = "divided by"
        // create equation
        equation = `(${num1} ${op} ${den1}) multiplied by (${num2} ${op} ${den2})`
        return equation
    }
    
    pattern2() {
        let op = "multiplied by"
        let eq1 = pattern1()
        let eq2 = pattern1()
        let equation = `(${eq1}) ${op} (${eq2})`
        return equation
    }
    
    pattern3() {
        let op = "multiplied by"
        let eq1 = pattern2()
        let eq2 = pattern1()
        let equation = `(${eq1}) ${op} (${eq2})`
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}

// dividing fractions
class DivideFractions {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 50
    }

    pattern1() {
        // get ints
        let num1 = getRandomInt(this.max)
        let num2 = getRandomInt(this,max)
        let den1 = getRandomInt(this.max) + 1
        let den2 = getRandomInt(this.max) + 1
        let op = "divided by"
        // create equation
        equation = `(${num1} ${op} ${den1})   ${op}   (${num2} ${op} ${den2})`
        return equation
    }
    
    pattern2() {
        let op = "divided by"
        let eq1 = pattern1()
        let eq2 = pattern1()
        let equation = `(${eq1}) +    ${op}    + (${eq2})`
        return equation
    }
    
    pattern3() {
        let op = "divided by"
        let eq1 = pattern2()
        let eq2 = pattern1()
        let equation = `(${eq1}) +    ${op}    + (${eq2})`
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}

// equations with one variable
class SimpleEquations {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 100
    }

    getOp() {
        let opNum = getRandomInt(this.max)
        let op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        return op
    }
    
    pattern1() {
        let num1 = getRandomInt(this.max/2)
        let num2 = getRandomInt(this.max/2)
        let num3 = getRandomInt(this.max/2)
        // determine random operand
        let op = this.getOp()
        let equation = `${num1}a ${op} ${num2} = ${num3}`
        return equation
    }
    
    pattern2() {
        let num1 = getRandomInt(this.max/2)
        let num2 = getRandomInt(this.max/2)
        let num3 = getRandomInt(this.max/2)
        // determine random operand
        let op = this.getOp()
        let equation = `${num1} ${op} ${num2} = ${num3}a`
        return equation
    }
    
    pattern3() {
        let num1 = getRandomInt(this.max/2)
        let num2 = getRandomInt(this.max/2)
        let num3 = getRandomInt(this.max/2)
        let num4 = getRandomInt(this.max/2)
        // determine random operand
        let op = this.getOp()
        let op2 = this.getOp()
        let equation = `${num1}a ${op} ${num2} = ${num3} ${op2} ${num4}a`
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}

// equations with two variables
class IntermediateEquations {
    constructor() {
        // any initial variables : this.varName = value
        this.patterns = 3
        this.max = 100
    }

    getOp() {
        let opNum = getRandomInt(this.max)
        let op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        return op
    }
    
    equation1() {
        let num1 = getRandomInt(this.max/2)
        let num2 = getRandomInt(this.max/2)
        let num3 = getRandomInt(this.max/2)
        // determine random operand
        let op = this.getOp()
        let equation = `${num1}a ${op} ${num2}b = ${num3}`
        return equation
    }
    
    equation2() {
        let num1 = getRandomInt(this.max/2)
        let num2 = getRandomInt(this.max/2)
        let num3 = getRandomInt(this.max/2)
        // determine random operand
        let op = this.getOp()
        let equation = `${num1} ${op} ${num2}b = ${num3}a`
        return equation
    }
    
    pattern1() {
        let eq1 = equation1()
        let eq2 = equation1()
        let equation = `${eq1} and ${eq2}`
        return equation
    }
    
    pattern2() {
        let eq1 = equation2()
        let eq2 = equation2()
        let equation = `${eq1} and ${eq2}`
        return equation
    }
    
    pattern3() {
        let eq1 = equation2()
        let eq2 = equation1()
        let equation = `${eq1} and ${eq2}`
        return equation
    }

    getEquation() {
        let num = getRandomInt(this.max)
        if (num%this.patterns == 0) {
            return this.pattern1()
        } 
        if (num%this.patterns == 1) {
            return this.pattern2()
        }
        if (num%this.patterns == 2) {
            return this.pattern3()
        }
        return this.pattern1()
    }
}