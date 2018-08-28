# RustMQ UI

## Environment

You need to set an environment variable `REACT_APP_API_HOST` to make an API calls.

How to set an environment: [Adding Custom Environment Variables](#adding-custom-environment-variables)

### Running using Docker

We prepared `docker-compose-development.yml` file which describes current application layout. To run it, just type in command line:
>$ `docker-compose -f ./docker-compose-development.yml up -d`

Make sure that you are using latest images with all you code changes.

## Heroku

Currently we are using Docker-based deployments. More details could be found on link [Deploying with Docker](https://devcenter.heroku.com/categories/deploying-with-docker).

Because we need to provide an build argument to set correct variable `REACT_APP_API_HOST`, your list of comands will look like:

>$ heroku container:login

>$ heroku container:push web --arg REACT_APP_API_HOST=<YOUR_API_HOST> # change YOUR_API_HOST with valid value

>$ heroku container:release web

--------------------

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
