//keep this until everything moved to the mock backend with services
var divebuddies = require("../divebuddies/static_data.js")

exports.divebuddies_data = divebuddies;

exports.user_data = {
  id: 1,
  divebuddies: [2, 3, 5, 6]
}

exports.divesites_data = [
{
  id: 1,
  name: "Streitköpfle"
},{
  id: 2,
  name: "Baggersee Buxtehude"
},{
  id: 4,
  name: "Totes Meer"
},{
  id: 5,
  name: "Irgendwo"
},{
  id: 6,
  name: "Deglersee"
},{
  id: 7,
  name: "Sämannsee-Süd"
},{
  id: 8,
  name: "Stürmlinger See"
},{
  id: 9,
  name: "Wendelinus-Baggerse"
},{
  id: 10,
  name: "Alte Allmend, Büchenauer Baggersee"
}]