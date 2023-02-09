const normalizeDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

module.exports = normalizeDate;