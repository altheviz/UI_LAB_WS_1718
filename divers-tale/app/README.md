# Styling

This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:

1. `app.ios.scss` - iOS specific styles which overwrite `_app-common.scss` styles
2. `app.android` - Android specific styles which overwrite `_app-common.scss` styles
3. `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles
4. `_app-common.scss` - common available styles for texts, links, titles, ...