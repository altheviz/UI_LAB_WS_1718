if ((global).TNS_WEBPACK) {
    // registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    // register application modules
    global.registerModule("nativescript-pro-ui/sidedrawer",
        () => require("../node_modules/nativescript-pro-ui/sidedrawer"));

    global.registerModule("shared/my-drawer/MyDrawer", () => require("./shared/my-drawer/MyDrawer"));
    global.registerModule("authentication/login/login-page", () => require("./authentication/login/login-page"));
    global.registerModule("authentication/registration/registration-page", () => require("./authentication/registration/registration-page"));
    global.registerModule("home/home-page", () => require("./home/home-page"));
    global.registerModule("browse/browse-page", () => require("./browse/browse-page"));
    global.registerModule("featured/featured-page", () => require("./featured/featured-page"));
    global.registerModule("certificates/certificates-page", () => require("./certificates/certificates-page"));
    global.registerModule("settings/settings-page", () => require("./settings/settings-page"));
}
