const dateNormalize = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

module.exports = {dateNormalize};