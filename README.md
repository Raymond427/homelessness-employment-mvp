# Firebase Progressive Web App Template

This template will create a PWA that is easily configure with a firebase project

## Available Features
### Application
* Full internal form implementation using React hooks
* Toggle color themes for light and dark modes
* Modals
* Page navigation with history management
* Reset Password Flow (requires Firebase Authentication configuration)
### Firebase
* Firebase Notifications
* Firebase Performance Monitoring
* Firebase Page View Ananlytics
* Firebase Authentication and E-Commerce Analytics
### Payments
* Stripe Credit/Debit Card Processing
### Progressive Web Application
* Service Worker registration
* Asset and Google Analytics Caching with [Workbox](https://developers.google.com/web/tools/workbox)
* Modals that prompt the user to install the PWA
* Modal that prompts the user to enable web notifications
* Modals that prompt the user to reload the app for service worker updates when available

## Setup

1. Create a new project in [Firebase](https://firebase.google.com)
1. Add the configuration values to the [firebase.js](https://github.com/Raymond427/firebase-pwa-template/blob/master/src/firebase.js) file
1. Create an account with [Stripe](https://stripe.com)
1. Add your API key to the [Payments.js](https://github.com/Raymond427/firebase-pwa-template/blob/master/src/component/page/Payment.js) file
1. Remove comments on in the [/index/components.js](https://github.com/Raymond427/firebase-pwa-template/blob/master/src/component/index.js) file
1. Run `npm start` and explore the template!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
