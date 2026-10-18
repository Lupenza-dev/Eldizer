# Expo SDK 57

This project uses Expo 57, React Native 0.86.3, React 19.2.3, React Navigation 7,
and Reanimated 4 with React Native Worklets. Dependency versions are locked in
`package-lock.json`.

## Run locally

Use a Node version accepted by `package.json` (Node 24 LTS is recommended).
Install Expo Go supporting SDK 57 on your Android device and enable USB debugging.

```sh
npm ci
npx expo start --android
```

Expo Go is the default launch target. `npm start` also starts Expo Go mode.
Stop any previously running Metro process before restarting after this change.
Remote push registration is skipped in Expo Go; it remains enabled in native builds.

`npm run android` and `npm run ios` compile native apps when needed; they require
native build tools. Local iOS builds require Xcode 26.4 or newer, and the minimum
iOS version is 16.4. `npm run web` starts the web app.

To use a custom development client later, install it with
`npx expo install expo-dev-client`, then build and install a new native app before
running `npx expo start --dev-client`. This changes Expo CLI's default launch target.

## Migration changes

- Aligned Expo modules and native libraries with Expo 57's dependency map.
- Added Worklets, web dependencies, and system UI support. Expo Go is the default
  development target; the custom development client dependency was removed.
- Removed unused Firebase, RNEUI edge, and carousel packages, plus Firebase's old
  static-framework overrides. Android SDK/build-tools versions now use Expo defaults.
- Migrated splash configuration to the splash-screen plugin and added the
  notifications plugin. Babel's Expo preset configures Worklets automatically.
- Updated notification display, trigger, and subscription cleanup APIs.
- Updated navigation header options, initial route names, and return-to-login
  behavior for React Navigation 7.
- Used Android safe-area insets for custom headers and the footer.

## Validation

```sh
npx expo install --check
npx expo-doctor@latest
npx expo export --platform all --output-dir dist/sdk57
```

Native project generation was also checked in a temporary copy with
`npx expo prebuild --no-install`. This does not compile or launch native apps.
Before release, test login/registration, drawer navigation, loan forms, image and
document picking, date pickers, notifications, and keyboard/system-bar spacing on
Android and iOS devices.

The existing EAS project ID and update URL reference different project IDs in
`app.json`. They were preserved; verify the intended EAS Update destination before
publishing an update. No build or update was published during this migration.

References: [Expo 57 release notes](https://expo.dev/changelog/sdk-57),
[React Navigation 7 migration](https://reactnavigation.org/docs/upgrading-from-6.x/).
