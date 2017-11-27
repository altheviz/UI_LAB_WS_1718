var observableModule = require('data/observable');
var observableArray = require('data/observable-array').ObservableArray;
var InvitationViewModel = require('../invitations-view-model');
var frameModule = require('ui/frame');
var dialogs = require('ui/dialogs');
var ModalPicker = require("nativescript-modal-datetimepicker").ModalDatetimepicker;

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
	 // logged user's id
	var date = new Date();;
	if (!invitationModel.haveReceived(ownId, user.id)) {
		invitationObj = {
			from: ownId,
			to: user.id,
			title: "wants to add you as a buddy",
			details: "From Albuquerque in USA with 2 dives",
			message: "",
			invitationDate: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
			status: "PENDING",
			endDate: ""
		} 

		var pageData = new observableModule.fromObject({
			invitation : invitationObj,
			user: user,
			heading: "Schreib " + user.nickname + " eine Nachricht"
		});

		page.bindingContext = pageData;
	} else {
		dialogs.alert("Sie haben eine buddy Anfrage von " + user.nickname + " schon bekommen. Schauen ihre Anfrageliste.").then(function (result) {
			frameModule.topmost().goBack();
		});
	}
}

function goBack() {
	frameModule.topmost().goBack();
};

function invite() {
	var added = invitationModel.addInvitation(invitationObj);
	if(!added) {
		dialogs.alert("Ihre Anfrage konnte nicht gesendet werden. Bitte später versuchen.").then(function (result) {
		});
	}
	frameModule.topmost().goBack();
}

function selectDate() {
	picker.pickDate({
		title: "Bitte Datum auswählen:",
		theme: "light",
		minDate: new Date()
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
