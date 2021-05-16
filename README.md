# Hi, this is a walkthrough of the steps to take in order to run this word count challenge app

# Getting started

Open up the file in your preferred code editor

In your terminal make sure you are in the correct directory, the commands I'm going to specify below, should
be executed in the root of the project i.e `word-count-challenge`. If you are not in the root of the project just `cd` into it

# Commands / Scripts 

### 'npm install'

This will install all your node modules and necessary depencies. This should be the first command to run at the root of the project

### 'npm start'

This command allows you to run the app in development mode. If your browser does not open a window automatically when this step is complete,
just open [http://localhost:3000]

### 'npm test' 

This command allows you to run the tests I have put in place with react-testing-library and jest to make this project more robust.
Note: This command will be in watch mode so any changes to the [name].test.tsx files will instantly trigger a new run of tests

### 'npm run build'

This command allows you to build the app for production. It will end up in the `build` folder bundling React in production mode with increased performance
The app will be ready for deployment once this is ran

### Disclaimer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
