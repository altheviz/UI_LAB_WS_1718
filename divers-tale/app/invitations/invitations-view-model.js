const observableModule = require("data/observable");

var ObservableArray = require("data/observable-array").ObservableArray;
var data = require("./static_data");
var userData = require("../divebuddies/static_data"); // should be replace with some databased instance

var invitations = data.invitationsData;
var users = userData.divebuddies_data;

function formatDate(date) {
	var formatDate = new Date(date);
	var month = formatDate.getMonth() + 1;
	return formatDate.getFullYear() + "-" + month + "-" + formatDate.getDate();
}

function InvitationViewModel() {
	var viewModel = new ObservableArray();

	viewModel.load = function() {
		invitations.forEach(function(element) {
			viewModel.push({
				from: element.from,
				to: element.to,
				title: element.title,
				details: element.details,
				message: element.message,
				invitationDate: element.invitationDate,
				status: element.status,
				endDate: element.endDate
			})
		}, this);
	}

	viewModel.contains = function (ownId, buddyId) {
		for (var i = 0; i < invitations.length; i++) {
			var element = invitations[i];
			if (element.from === ownId && element.to === buddyId && element.status !== "ACCEPTED")	 {
				return true;
			}
		}
		return false;
	};

	/**
	 * Checks whether an invitation has already being received.
	 */
	viewModel.haveReceived = function(ownId, buddyId) {
		for (var i = 0; i < invitations.length; i++) {
			var element = invitations[i];
			if (element.to === ownId && element.from === buddyId && element.status === "PENDING") {
				return true;
			}
		}
		return false;
	}

	viewModel.addInvitation = function (invitation) {
		if ( ! viewModel.contains(invitation.from, invitation.to)) {
			invitations.push(invitation);
			return true;
		} 
		return false;
	}
	viewModel.getSendInvitations = function (userId) {
		var returnValue = new ObservableArray();
		invitations.forEach(function(invitation) {
			if(invitation.from === userId) {
				invitation.invitationDate = formatDate(invitation.invitationDate);
				invitation.endDate = formatDate(invitation.endDate);
				users.forEach(function(user) {
					if(user.id === invitation.to) {
						invitation.toUser = user;
					} else if (user.id === invitation.from) {
						invitation.fromUser = user;
					}
				}, this);
				returnValue.push(invitation);
			}
		}, this);

		return returnValue;
	}

	viewModel.getReceivedInvitations = function (userId) {
		var returnValue = new ObservableArray();
		invitations.forEach(function (invitation) {
			if (invitation.to === userId && invitation.status === "ANSTEHEND") {
				invitation.invitationDate = formatDate(invitation.invitationDate);
				invitation.endDate = formatDate(invitation.endDate);
				users.forEach(function (user) {
					if (user.id === invitation.to) {
						invitation.toUser = user;
					} else if( user.id === invitation.from) {
						invitation.fromUser = user;
					}
				}, this);
				returnValue.push(invitation);
			}
		}, this);

		return returnValue;
	}
	viewModel.updateInvitationStatus = function(invitationObj, status) {
		for (var i = 0; i < invitations.length; i++) {
			var invitation = invitations[i];
			if (invitation.from === invitationObj.from && invitation.to === invitationObj.to) {
				invitation.status = status;
				if (status === "ACCEPTED") {
					users.forEach(function(user) {
						if (user.id === invitationObj.to) {
							// add invitation sender into my list of buddies.
							user.divebuddies.push(invitationObj.from);
						}
					});
				}
				return true;
			}
		}
		return false;
	}
	viewModel.removeInvitation = function (invitationObj) {
		invitations.forEach(function (invitation, index) {
			if (invitation.from === invitationObj.from && invitation.to === invitationObj.to) {
				receivedInvitation.splice(index, 1);
				return true;
			}
		})
		return false;
	}
	return viewModel;
}

module.exports = InvitationViewModel;