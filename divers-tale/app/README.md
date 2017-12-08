# Application architecture
There are five blank components located in these folders:
- `/browse`
- `/featured`
- `/home`
- `/search`
- `/settings`

Each of these pages has the following components:
- `ActionBar` - It holds the title and navigation button that opens the drawer.
- `RadSideDrawer` - The component to display a drawer on the page.
- `RadSideDrawer.drawerContent` - Part of the RadSideDrawer, it holds a custom component `MyDrawer` that displays the contents of the drawer.
- `RadSideDrawer.mainContent` - Part of the RadSideDrawer, it holds the main content for the page. You can expand this layout to modify each page.

There is a NativeScript custom component that holds the contents of the drawer.
- `/shared/my-drawer` - It holds the contents of the drawer that are reused on every page. There is a StackLayout for the profile info on top and a ListView for showing the navigation items. Expand this custom component to match what you want to have in your drawer.

# Styling
This template is set up to use SASS for styling. All classes used are based on the {N} core theme – consult the [documentation](https://docs.nativescript.org/angular/ui/theme.html#theme) to understand how to customize it. Check it out to see what classes you can use on which component.

It has 4 global style files that are located at the root of the app folder:
- `_app-variables.scss` - holds the global SASS variables that are imported on each component's styles.
- `app.scss` - the global common style sheet. These style rules are applied to both Android and iOS.
- `platform.android.scss` - the global Android style sheet. These style rules are applied to Android only.
- `platform.ios.scss` - the global iOS style sheet. These style rules are applied to iOS only.

Each component including the drawer custom component has 3 style files located in the folder of the component:
- `_page-name.scss` - the component common style sheet. These style rules are applied to both Android and iOS.
- `page-name.android.scss` - the component Android style sheet. These style rules are applied to Android only.
- `page-name.ios.scss` - the component iOS style sheet. These style rules are applied to iOS only.


# Workaround
If map is not shown inside divesites remove platform with 'tns platform remove android' and add it again. 