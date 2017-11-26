const observableModule = require("data/observable");

var ObservableArray = require("data/observable-array").ObservableArray;
var data = require("./static_data");
var divebuddies_data = data.divebuddies_data;

function getDiveBuddyById(id) {
    for (var i = 0; i < data.divebuddies_data.length; i++) {
        var divebuddy = data.divebuddies_data[i];
        if (divebuddy.id === id) {
            return divebuddy;
        }
    }
    return null;
}



function getCertificateById(id) {
    for (var i = 0; i < data.certification_data.length; i++) {
        var certification = data.certification_data[i];
        if (certification.id === id) {
            return certification;
        }
    }
    return null;
}

function DivebuddiesViewModel() {

    var viewModel = new ObservableArray();


    viewModel.load = function () {
        divebuddies_data.forEach(function (element) {

            viewModel.push({
                id: element.id,
                name: element.name,
                nickname: element.nickname,
                profileimage: element.profileimage,
                sex: element.sex,
                age: element.age,
                city: element.city,
                region: element.region,
                country: element.country,
                certificates: element.certificates,
                experience: element.experience,
                divebuddies: element.divebuddies,
                groups: element.groups
            });
        });

        viewModel.sort(function (a, b) {

        });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.getMyDiveBuddies = function (id) {
        var mydiveBuddies = [];

        viewModel.forEach(function (element) {
            if (element.id === id) {
                element.divebuddies.forEach(function (divebuddyid) {
                    mydiveBuddies.push(getDiveBuddyById(divebuddyid))
                })
            }
        }


        );

        return mydiveBuddies;
    };

    viewModel.getMyGroups = function (id) {
        var myGroups = [];

        viewModel.forEach(function (element) {
            if (element.id === id) {
                element.groups.forEach(function (group) {
                    myGroups.push(group)
                })
            }
        }


        );

        return myGroups;
    };

    viewModel.getCertificatesOfUser = function (user) {
        var certificates = [];
        user.certificates.forEach(function (id) {
            certificates.push(getCertificateById(id))
        })
        return certificates;
    }

    viewModel.getDivebuddiesOfGroup = function (group) {
        var divebuddiesOfGroup = [];
        group.divebuddies.forEach(function (divebuddyid) {
            divebuddiesOfGroup.push(getDiveBuddyById(divebuddyid))
        })
        return divebuddiesOfGroup;
    }

    viewModel.getSearchedUser = function (ownid, nickname, sex, age, city, region, country, experience, certificate) {
        var searchedUser = [];

        divebuddies_data.forEach(function (element) {
            if (ownid != element.id) {

                var check = true;
                if (nickname != "") {
                    if (element.nickname.toLowerCase().indexOf(nickname.toLowerCase()) == -1) {
                        check = false;
                    }
                }

                if (sex != "") {
                    if (sex != element.sex) {
                        check = false;
                    }
                }

                if (age.toString() != "") {
                    if (age.toString() != element.age.toString()) {
                        check = false;
                    }
                }

                if (city != "") {
                    if (element.city.toLowerCase().indexOf(city.toLowerCase()) == -1) {
                        check = false;
                    }
                }

                if (region != "") {
                    if (element.region.toLowerCase().indexOf(region.toLowerCase()) == -1) {
                        check = false;
                    }
                }

                if (country != "") {
                    if (element.country.toLowerCase().indexOf(country.toLowerCase()) == -1) {
                        check = false;
                    }
                }

                if (certificate != "" && check) {
                    check = false
                    element.certificates.forEach(function (certificateId) {
                        certificateElement = getCertificateById(certificateId)
                        if (certificateElement.name.indexOf(certificate) != -1) {
                            check = true
                        }
                    })
                }

                if (experience != "") {
                    var parsedInteger = parseInt(experience);
                    if (parsedInteger > element.experience) {
                        check = false
                    }
                }

                if (check) {
                    searchedUser.push(element)
                }
                
            }
        })
        return searchedUser;
    }

    viewModel.addnewGroup = function(userid, groupname){
        var user = getDiveBuddyById(userid);
        var maxid = 0;
        var added = true;
        user.groups.forEach(function(groupelement){
            if(groupelement.id > maxid){
                maxid = groupelement.id;
            }
            if(groupelement.name == groupname){
                added = false;
            }
        })
        if(!added){
            return added
        }
        maxid = maxid + 1;
        var newGroup = {
            id: maxid,
            name: groupname,
            divebuddies: []
        }
        user.groups.push(newGroup);
        return true;
    }

    viewModel.deleteGroup = function(userid, groupid){
        var user = getDiveBuddyById(userid);
        var elementposition = 0;
        for (var i = 0; i < user.groups.length; i++) {
            if(user.groups[i].id === groupid ){
                elementposition = i;
            }
        }
        user.groups.splice(elementposition, 1);
    }

    viewModel.getavailableGroups = function(ownuserid, adduserid){
        var groups = [];
        var user = getDiveBuddyById(ownuserid);
        user.groups.forEach(function(groupelement){
            var available = true;
            groupelement.divebuddies.forEach(function(divebuddyid){
                if(divebuddyid === adduserid){
                    available = false;
                }
            })
            if(available){
                groups.push(groupelement.name)
            }
        })
        return groups;
    }

    viewModel.addUsertoGroup = function(ownuserid, adduserid, groupname){
        var user = getDiveBuddyById(ownuserid);
        user.groups.forEach(function(groupelement){
            if(groupelement.name == groupname){
                groupelement.divebuddies.push(adduserid)
            }
        })
    }
    

    viewModel.deleteUserFromGroup = function(ownuserid, groupid, userid){
        var user = getDiveBuddyById(ownuserid);
        user.groups.forEach(function(groupelement){
            if(groupelement.id == groupid){
                var elementposition = groupelement.divebuddies.indexOf(userid);
                if(elementposition != -1) {
                    groupelement.divebuddies.splice(elementposition, 1);
                }
                
            }
        })
    }

    viewModel.removeDivebuddy = function(ownuserid, userid){
        var user = getDiveBuddyById(ownuserid);
        for (var i = 0; i < user.divebuddies.length; i++) {
            if(user.divebuddies[i] === userid ){
                elementposition = i;
            }
        }
        user.divebuddies.splice(elementposition, 1);
        user.groups.forEach(function(groupelement){
            var elementposition = groupelement.divebuddies.indexOf(userid);
            if(elementposition != -1) {
                groupelement.divebuddies.splice(elementposition, 1);
            }
        })
    }

    return viewModel;
}

module.exports = DivebuddiesViewModel;