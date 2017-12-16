if ((global).TNS_WEBPACK) {
    // registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    // register application modules
    global.registerModule("nativescript-pro-ui/sidedrawer",
        () => require("../node_modules/nativescript-pro-ui/sidedrawer"));

    // General modules
    global.registerModule("shared/my-drawer/MyDrawer", () => require("./shared/my-drawer/MyDrawer"));
    global.registerModule("settings/settings-page", () => require("./settings/settings-page"));
    
    // Home module
    global.registerModule("home/home-page", () => require("./home/home-page"));

    // Authentication modules
    global.registerModule("authentication/login/login-page", () => require("./authentication/login/login-page"));
    global.registerModule("authentication/registration/registration-page", () => require("./authentication/registration/registration-page"));

    // Profile module
    global.registerModule("profile-page", () => require("./certificates/profile-page"));

    // Events module
    global.registerModule("events/events-page", () => require("./events/events-page"));

    // Divebuddies module
    global.registerModule("divebuddies/divebuddies-page", () => require("./divebuddies/divebuddies-page"));

    // Invitations module
    global.registerModule("invitations/invitations-page", () => require("./invitations/invitations-page"));

    // Checklist module
    global.registerModule("checklist/checklist-page", () => require("./checklist/checklist-page"));

    // Divelog module
    global.registerModule("divelog/divelog-list/divelog-list-page", () => require("./divelog/divelog-list/divelog-list-page"));

    // Divesigns module
    global.registerModule("divesigns/divesigns-page", () => require("./divesigns/divesigns-page"));

    // Florafauna module
    global.registerModule("florafauna/florafauna-page", () => require("./florafauna/florafauna-page"));

    // Market module
    global.registerModule("market/market-page", () => require("./market/market-page"));
}
