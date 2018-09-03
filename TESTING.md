# Testing

## Preparation

### Docker
To create a testable image and use `docker-compose-test.yml` for local test run first we need to create a `rustmq/dashboard:test` image:

 >$ docker build -f .\Dockerfile --build-arg REACT_APP_API_HOST=http://localhost:4000/http://web:8000 -t rustmq/dashboard:test .

After you could use `docker-compose` to run application for test, for example:

 >$ docker-compose -f .\docker-compose-test.yml up -d

## Run tests

To run test on your machine you need to run following command:

 >$ npm run test

That's it for now. Contribution are welcome.
