# simple-playlist

[![Build Status](https://app.bitrise.io/app/b529b99f0b54b8d8/status.svg?token=C-OMMAY6_eRbstZAkgKd5g)](https://app.bitrise.io/app/b529b99f0b54b8d8)
![Tests](https://github.com/josellausas/simple-playlist/workflows/Tests/badge.svg)

A Simple Playlist Mobile App

## Features
- Built with React Native
- Uses Typescript
- `Playlist` and `Song` objects are managed and propagated between screens
- Users can view a list of playlists
- Users can select a playlist to view songs
- Users can edit a playlist to toggle songs on/off
- Each playlist has a color

## Extra Features
- Automated deployments with Bitrise.io: [![Build Status](https://app.bitrise.io/app/b529b99f0b54b8d8/status.svg?token=C-OMMAY6_eRbstZAkgKd5g)](https://app.bitrise.io/app/b529b99f0b54b8d8)
- Automated tests with github actions: ![Tests](https://github.com/josellausas/simple-playlist/workflows/Tests/badge.svg)

### Dependencies
- React Native
- XCode
- Android Studio
- Cocoapods

# Install

1. Run `npm install` or `yarn install`
2. Change directory into `ios/`
3. Run: `pod install`

# Run App
## Run iOS
`yarn ios`

## Run Android
`yarn android`


# Resources
- https://github.com/facebook/react-native/issues/4099
- https://medium.com/@mridultripathi/effectively-change-orientation-in-react-native-and-detect-device-type-8b9f69d669d6
- https://jestjs.io/docs/en/getting-started#using-babel
- https://jestjs.io/docs/en/webpack
- https://stackoverflow.com/questions/57595093/cannot-read-property-direction-of-undefined-tests-only
- https://github.com/facebook/jest/issues/2663
- https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
