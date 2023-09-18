const validMobile = (phoneNumber) => {
    return /^[5-9]\d{9}$/.test(phoneNumber)
}

module.exports = { validMobile }