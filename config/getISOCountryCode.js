const countryCodes = {
    'IN': '+91',
    'US': '+1'
};

const getISOCountryCode = (country) => {
    return countryCodes[country] || '';
}

module.exports = getISOCountryCode;