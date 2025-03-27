import bcrypt from "bcrypt"


const saltRounds = 15 

export const isString = (str) => {
    str = typeof(str) === 'string'
        && str.trim().length > 0 
        && str != null
        && str != undefined
        ? true : false;
    return str    
}

export const isNumber = (num) => {
    num = typeof(num) === 'number' 
        && isNaN(num) === false 
        && num > 0
        ? num : false
    return num
}

export const hash = async (password) => {
    const saltRounds = 10; // Adjust for security vs. performance
    return await bcrypt.hash(password, saltRounds);
  };

export const verifyHash = async (str, hash) => {
    const match = await bcrypt.compare(str, hash)
    return match
}

export const missingError = (obj) => {
    const missing = []
    for(const key in obj){
        if(!obj[key]) missing.push(key)
    }
    if(missing.length === 0) return false
    if(missing.length > 0) return `Missing ${missing.join(', ')}`

}

const randomString = (num) => {
    let str = ''
    const charas = [
        'q','w','e','r','t','y','u','i','o','p',
        'a','s','d','f','g','h','j','k','l','z',
        'x','c','v','b','n','m','1','2','3','4',
        '5','6','7','8','9','0'
    ]
    for(let i = 0; i < num; i++){
        const randomNum = Math.floor(Math.random() * charas.length)
        str += charas[randomNum]
    }
    return str.toUpperCase()
}

export const createId = () => {
    const id = randomString(10) + '-' + randomString(10) + '-' + randomString(10) + '-' + randomString(10)
    return id
}