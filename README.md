# amazonlite

A full stack Amazon clone deployed on Vercel (https://amazonlite-tau.vercel.app/). Please see the [Live Demo](https://github.com/victornguyen75/amazonlite#live-demo) section for more details.

![Amazonlite Home Page](/public/images/homepage.png)

## Functionality

This e-commerce application is built with:

- product pages that pull clothing stock data from MongoDB
- a cart page
- a user login page with an API that authenticates users in MongoDB
- an account creation page with an API that creates users in MongoDB
- a shipping address form page
- a payment method page
- an order finalization page
- an order receipt page
- payments made with the PayPal API
- an order history page
- a profile update page

## Technologies used:

- ReactJS
- NextJS
- TypeScript
- Tailwind CSS
- Headless UI
- Axios
- Cloud MongoDB
- Mongoose
- PayPal
- Vercel

## Requirements

- an account with Cloud MongoDB (free version is available)
- a MongoDB connection set as the `MONGODB_URI` env variable
- a developer account with PayPal
- a PayPal Client ID set as the `PAYPAY_CLIENT_ID` env variable

## Set up

1. Clone the project with git clone https://github.com/victornguyen75/amazonlite.git in the terminal
2. Install dependencies with `yarn install` or `npm install`
3. Start the server with `yarn start` or `npm start`
4. Open a browser tab with http://localhost:3000/api/seed to set the product data on the application.
5. Change the URL to http://localhost:3000 to see the application

## Live Demo

1. Open a browser tab with https://amazonlite-tau.vercel.app//api/seed to set the product data on the application.
2. Change the URL to https://amazonlite-tau.vercel.app/ to see the application
