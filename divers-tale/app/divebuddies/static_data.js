exports.divebuddies_data = [
  {
    id: 1,
    name: "Walter White",
    nickname: "Heisenberg",
    profileimage: "~/images/profile.png",
    sex: "Male",
    age: 52,
    city: "Albuquerque",
    region: "New Mexico",
    country: "USA",
    certificates: [1, 2],
    experience: 2,
    divebuddies: [2, 3, 5, 6],
    groups: [{
      id: 1,
      name: "GruppeEins",
      divebuddies: [2, 3]
    }, {
      id: 2,
      name: "GruppeZwei",
      divebuddies: [5, 2]
    }]
  }, {
    id: 2,
    name: "Max Maxi",
    nickname: "Maxi1980",
    profileimage: "~/images/profile.png",
    sex: "Male",
    age: 37,
    city: "Los Angeles",
    region: "California",
    country: "USA",
    certificates: [1, 2, 3],
    experience: 5,
    divebuddies: [1],
    groups: []
  }, {
    id: 3,
    name: "Lisa Hauer",
    nickname: "LisaLisa",
    profileimage: "~/images/profile.png",
    sex: "Female",
    age: 25,
    city: "Karlsruhe",
    region: "Baden-Wuerttemberg",
    country: "Germany",
    certificates: [1, 3],
    experience: 3,
    divebuddies: [1, 4],
    groups: []
  }, {
    id: 4,
    name: "Thorsten Kal",
    nickname: "ThoKal",
    profileimage: "~/images/profile.png",
    sex: "Male",
    age: 30,
    city: "Mannheim",
    region: "Baden-Wuerttemberg",
    country: "Germany",
    certificates: [1],
    experience: 1,
    divebuddies: [3],
    groups: []
  }, {
    id: 5,
    name: "Michaela Tollwut",
    nickname: "Mitoll",
    profileimage: "~/images/profile.png",
    sex: "Female",
    age: 41,
    city: "Frankfurt",
    region: "Hessen",
    country: "Germany",
    certificates: [3],
    experience: 20,
    divebuddies: [1],
    groups: []
  }, {
    id: 6,
    name: "Moritz Bleibtreu",
    nickname: "Moe",
    profileimage: "~/images/profile.png",
    sex: "Male",
    age: 48,
    city: "Stuttgart",
    region: "Baden-Wuerttemberg",
    country: "Germany",
    certificates: [4],
    experience: 3,
    divebuddies: [1],
    groups: []
  }]

exports.certification_data = [
  {
    id: 1,
    name: "Certificate1",
  }, {
    id: 2,
    name: "Certificate2",
  }, {
    id: 3,
    name: "Certificate3",
  }, {
    id: 4,
    name: "Certificate3",
  }]