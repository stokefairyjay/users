# JJ

this app was bootstrapped with create react app, i am a fan of using a custom webpack build just because it feels like i have more control but create react app is great for a quick starts

the app has 3 main pages, list profile users, manage users which has add or edit and list and manage groups

groups can be assigned to users on the edit user profile page and groups can be deleted when there are no active members, the user list page can be filtered which works on filtering first or last name from the search input, the page can also be filtered on by cliking on the group name buttons to show all users within a group

i used json-server for the 'backend' which i've never used before but it's brilliant and great for projects where the focus is front end

i also used typescript, there are some any types in there and i have to say although i have always commercially used typescript and appreciate the added value, understanding and ide benefits of typescript, it did for me slow down some dev work as i've been coding recently without. i'm sure typescript evangelists would compleltey disagree with me but that was just how i felt in this project

i also used out of the box react testing library, which i have never used before and there is only one sample test in there, but i have to say i prefer using enzyme with jest, i really like the jquery style of navigating through the shallow dom and asserting what it finds.

original readme..

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
