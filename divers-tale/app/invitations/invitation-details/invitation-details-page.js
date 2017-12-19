var ObservableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;
var frameModule = require('ui/frame');
var dialogs = require('ui/dialogs');

var page;
var invitation;
var invitationModel;
var diveBuddiesModel;
var certificates;

function onNavigatingTo(args) {
	page = args.object;
	invitation = page.navigationContext.invitation;
	invitationModel = page.navigationContext.invitationModel;

	var pageData = new ObservableModule.fromObject({
		invitation: invitation
	});
	page.bindingContext = pageData;
}

function goBack() {
	frameModule.topmost().goBack();	
}

function updateInvitation (status) {
	invitationModel.updateInvitationStatus(invitation, status);
	frameModule.topmost().goBack();
}

function accept() {
	updateInvitation("ACCEPTED");
}

function decline() {
	updateInvitation("DECLINE");
}

exports.accept = accept;
exports.decline = decline;
exports.goBack = goBack;
exports.onNavigatingTo = onNavigatingTo;