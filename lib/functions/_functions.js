import { createHmac } from 'node:crypto'

export const isString = (str) => {
    str = str.trim().length > 0 &&
        typeof(str) === 'string'
        str != null
        str != undefined
        ? true : false;
    return str    
}

export const isNumber = (num) => {
    num = isNaN(num) === false 
        && typeof(num) === 'number' 
        && num > 0
        ? num : false
    return num
}

export const hash = (str) => {
    const mySecret = 'hello my bitch'
    const hashing = createHmac('sha256',mySecret)
    const updated = hashing.update(str)
    const digest = updated.digest('hex')
    return digest
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


export default {
    isString,
    hash,
    createId
}