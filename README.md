# Deepomatic detection demo

### Presentation
Mini app which show Deepomatic detection API capabilities.

You can test it directly with this URL : http://epimodev-deepomatic-demo.surge.sh/

### Development
To build this project, you have to create an environment file in `environments` folder which contains variables to communicate with Deepomatic API :
- API_URL : Deepomatic API endpoint (currently https://api.deepomatic.com/v0.6)
- APP_ID : Deepomatic app id
- API_KEY : Deepomatic api key

You can generate an APP_ID and an API_key by creating a developer account on https://developers.deepomatic.com/home.

#### Launch dev server
```sh
$ yarn dev env_file_name
```

#### Build app
```sh
$ yarn build env_file_name
```
