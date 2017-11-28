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

exports.events_data = [{
  id: 3,
  name: "Essen und Nachttauchen",
  type: "Tauchen",
  time: "2018-08-29 16:00:00",
  divesite: 1,
  comment: "Erst essen, dann tauchen.",
  canceled: false,
  canceledDate: null,
  participants: [{id: 2, status: "Ja"}, {id: 3, status: "Nein"}, {id: 5, status: "Vielleicht"}],
  creator: 2,
  image: "~/images/event.png",
},{
  id: 2,
  name: "Frühlingstauchen 2018",
  type: "Tauchen",
  time: "2018-04-03 08:00:00",
  divesite: 2,
  comment: "Lasst und das Jahr 2018 mit einem Frühlingstauchen starten!",
  canceled: false,
  canceledDate: null,
  participants: [{id: 1, status: "Ja"}, {id: 2, status: "Nein"}, {id: 4, status: "Vielleicht"}],
  creator: 1,
  image: "~/images/event.png",
},{
  id: 5,
  name: "Weihnachtsfeier",
  type: "Club",
  time: "2018-01-01 20:00:00",
  divesite: null,
  comment: "Wir treffen uns am Restaurant Adler (www.der-adler-link.de).",
  canceled: false,
  canceledDate: null,
  participants: [{id: 5, status: "Ja"}],
  creator: 1,
  image: "~/images/event.png",
}];