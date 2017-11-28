var observableModule = require('data/observable');
var observableArray = require('data/observable-array').ObservableArray;
var InvitationViewModel = require('../invitations-view-model');
var frameModule = require('ui/frame');
var dialogs = require('ui/dialogs');
var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;
var Toast = require("nativescript-toast");

var invitationModel = new InvitationViewModel();

var page;
var user;
var invitationObj;
var ownId;
var divebuddiesModel;
var picker = new ModalPicker();

function onNavigatingTo(args) {
	page = args.object;
	ownId = page.navigationContext.fromUser;
	user = page.navigationContext.toUser;
	divebuddiesModel = page.navigationContext.divebuddiesModel;

	// var fromUser = // get fromUser information.
	 // logged user's id
	var date = new Date();
	if (!invitationModel.haveReceived(ownId, user.id)) {
		invitationObj = {
			from: ownId,
			to: user.id,
			title: "${nickname} will mit dir befreundet sein.",
			details: "Aus ${city}, ${country} mit ${expertience} Tauchgang",
			message: "",
			invitationDate: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			status: "ANSTEHEND",
			endDate: ""
		} 

		var pageData = new observableModule.fromObject({
			invitation : invitationObj,
			user: user,
			heading: "Schicke '" + user.nickname + "' eine Anfrage."
		});

		page.bindingContext = pageData;
	} else {
		dialogs.alert({
      title: "Achtung",
      message: "Sie haben bereits eine Freundschaftsanfrage von '" + user.nickname + "' bekommen, bitte bestätigen Sie diese."
    }).then(function (result) {
			frameModule.topmost().goBack();
		});
	}
}

function goBack() {
	frameModule.topmost().goBack();
};

function invite() {
	var invalid = false;
	if(invitationObj.message === "" || invitationObj.endDate === "") {
		invalid = true;
		Toast.makeText("Bitte alle Felder ausfüllen.", 'long').show();
	}

	if(!invalid) {
		var added = invitationModel.addInvitation(invitationObj);
		if(!added) {
			dialogs.alert({
	      title: "Achtung",
	      message: "Sie haben bereits eine Freundschaftsanfrage an diesen Nutzer versendet."
    	}).then(function (result) {
			});
		} else {
			Toast.makeText('Ihre Anfrage wurde versendet.').show();
		}
		frameModule.topmost().goBack();
	}
}

function selectDate() {
	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	picker.pickDate({
		title: "Bitte Datum auswählen:",
		theme: "light",
		minDate: tomorrow
	}).then(function (result) {
		invitationObj.endDate = result.year + "-" + result.month + "-" + result.day;
		var dateField = page.getViewById("dateField");
		dateField.text = result.day + "-" + result.month + "-" + result.year;
	}).catch(function (error) {
		console.log("DatePicker error: " + error);
	});
};

exports.onNavigatingTo = onNavigatingTo;
exports.goBack = goBack;
exports.invite = invite;
exports.selectDate = selectDate;
