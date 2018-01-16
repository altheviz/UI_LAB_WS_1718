//keep this until everything moved to the mock backend with services
var divebuddies = require("../divebuddies/static_data.js")

exports.divebuddies_data = divebuddies;

exports.user_data = {
  id: 1,
  divebuddies: [2, 3, 5, 6]
}