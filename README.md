# JV Backend #

Demonstration of Requirements understanding, proposing a solution and implementation by using the latest tools and techniques. The code is based on Google Android SDK.

### What is this repository for? ###

* To provide a blue-print of all necessary component for:
  * A scalable application
  * A reusable app structure
* Version 1.0.0

## How do I get set up? ##

### How to set up ###
To set-up the project locally you need to clone this repo, from `master` or `develop` branch or some latest `TAG`

### Configuration ###

Please sync and resolve dependencies by using
- `yarn`

Set environment variables:
- `cp .env.example .env`

### Start App
- `yarn dev`
- You may access the app on `http://localhost:5000`


### Build Docker Image
- `docker build -t jv-backend .`


### Run Docker Image
- Run `docker run -d -p 5000:5000 jv-backend`
- You may access the running docker app on `http://localhost:5000`


### Stop Docker Container
- Run `docker stop jv-backend`

### Prerequisite

- [nodejs](https://nodejs.org)
- [npm](www.npmjs.com/‎)
- [Docker](https://www.docker.com/)
- [Github Actions](https://github.com/features/actions)

## Requirements ##

- See [`package.json`](/package.json)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [JEST](https://jestjs.io)


## Major Libraries and tools included: ##

- Jest
- Winston
- Supertest
- joi


#### Auth ####
- No auth is used for this version


## External Tools: ##

- **Pipelines**: [Github Actions](https://github.com/features/actions)
- **Build-Packaging**: [Docker](https://www.docker.com/)


## Code Quality ##
- [SonarCloud Project](https://sonarcloud.io/dashboard?id=naeemark_jv-backend)

- `Jest`
- `Istanbol Coverage`

## Distribution ##

### API Documentation
- https://documenter.getpostman.com/view/1932091/T1DpBGqy

### Postman Environments

- [DEV](https://www.dropbox.com/s/b9me8a6ufhw0c3o/%5Benv-dev%5D%20jv%20backend.postman_environment.json?dl=0)
- [PROD](https://www.dropbox.com/s/pg55b78cd49icyx/%5Benv-prod%5D%20jv%20backend.postman_environment.json?dl=0)


### Postman Collection

- Download Collection: https://www.getpostman.com/collections/97295e2ebecd80fba22d


## Contribution guidelines ##

- Forks are always appreciated
