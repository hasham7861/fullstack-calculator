# 🌟 Guide to using fullstack-calculator

## Prerequisites to running the app

- This project requires you to be in a linux environment either natively or through wsl
- Make sure node v19.7.0 is installed as it is the defacto for client and server folders/apps
- Make sure latest docker is installed as it will be used for running database locally
- In root directory, run this command `nvm use` to change current node version to v19.17.0
- In root directory, run this command `npm run client:install` to install client packages
- In root directory, run this command `npm run server:install` to install server packages
- Now make sure the docker demon is running in background

## Time to run the calculator app

- In root directory, run this command `npm run database`
- In root directory, run this command `npm run server`
- Now open another terminal tab and in that tab, in the root directory run `npm run client`
- By this point I am assuming everything is running on your end
- The app is now being hosted on http://localhost:5173
- Voilà! 🎉 Now you can see the beautiful calculator – not just any calculator, but a special one. You'll need to fidget around with it and read the design doc to discover all the cool features of this calculator.

## Link to Design Doc

[Click me to view Design Doc](DesignDoc.md)

## Video Setup + Walkthrough
- [Click me to view](https://youtu.be/58JoLP19FJQ)

