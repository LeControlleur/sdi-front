const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const api_url = "http://127.0.0.1:8080"

//  const api_url = "https://sdi-back.eu-gb.mybluemix.net"

export {
    phoneRegExp,
    api_url
}