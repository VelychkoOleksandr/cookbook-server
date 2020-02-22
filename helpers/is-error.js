//BOOLEAN VALUE AS ARGUMENT
function isError(error) {
  return JSON.stringify({error: error})
}

module.exports = isError