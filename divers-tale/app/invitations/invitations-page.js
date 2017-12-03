var ObservableModule = require('data/observable');
var ObservableArray = require('data/observable-array').ObservableArray;

var frameModule = require('ui/frame');
var dialogs = require('ui/dialogs');

var ownId; // should receives after login
var page;
var invitationModel;
var divebuddiesModel;
var sendInvitations;
var receivedInvitations;


function filterInvitationByStatus(array, status) {
	var newArray = new ObservableArray();
	array.forEach(function(invitation) {
		if (invitation.status === status) {
			newArray.push(invitation);
		}
	});
	return newArray;
}


function onNavigatingTo(args) {
	page = args.object;

	ownId = page.navigationContext.id;
	divebuddiesModel = page.navigationContext.divebuddiesModel;
	invitationModel = page.navigationContext.invitationModel;

	sendInvitations = invitationModel.getSendInvitations(ownId);
	receivedInvitations = invitationModel.getReceivedInvitations(ownId);
	var pageData = new ObservableModule.fromObject({
		receivedInvitations: receivedInvitations,
		pending: filterInvitationByStatus(sendInvitations, 'ANSTEHEND'),
		accepted: filterInvitationByStatus(sendInvitations, 'ANGENOMMEN'),
		declined: filterInvitationByStatus(sendInvitations, 'ABGELEHNT')
	});
	page.bindingContext = pageData;
}


// function removeFromLocalList(invitationObj, list) {
// 	for (var i = 0; i < list.length; i++) {
// 		var element = list[i];
// 		if (element.from === invitationObj.from && element.to === invitationObj.to) {
// 			list.splice(i, 1);
// 			break;
// 		}
// 	}
// }

/* ***********************************************************
 * According to guidelines, if you have a drawer on your page, you should always
 * have a button that opens it. Get a reference to the RadSideDrawer view and
 * use the showDrawer() function to open the app drawer section.
 *************************************************************/
function onDrawerButtonTap(args) {
	const sideDrawer = frameModule.topmost().getViewById("sideDrawer");
	sideDrawer.showDrawer();
}

function details(args) {
	var invitation = args.view.bindingContext;

	var navigationOptions = {
		moduleName: "invitations/invitation-details/invitation-details-page",
		context: { invitation: invitation, invitationModel: invitationModel, buddiesModel: divebuddiesModel }
	}
	frameModule.topmost().navigate(navigationOptions);
}

function goBack() {
	frameModule.topmost().goBack();
};

exports.filterInvitationByStatus = filterInvitationByStatus;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.details = details;
exports.onNavigatingTo = onNavigatingTo;
exports.goBack = goBack;
