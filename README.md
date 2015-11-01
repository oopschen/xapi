# xapi
A useful API mocking and docing tool to lower the cost between backend frontend development process

# Feature

* Simple configuration file, all you need is knowing json well
* Take advantage of *Node* power which is you can write javascript scripts to fullfill your complex requirements
* Auto generate documents for every api
* URI pattern support

# Get Started

    xapi

The command search the directory recursively at which the command is invoked.

# Configuration
The configuration file is actually a node module file, the syntax is like:

## Simple example
The example mock an api which can be requested at */user/1.json* with *GET* method and response with a user info json object show by the property *res*.The file path represents the request path.

### Filename: user.json

    module.exports = {
      "req": "/1",

      "res": {
        "name": "xapi",
        "age": 1,
        "email": "xapi@example.com"
      }

    };

## Full example
The example mock an api which can be requested at */user/info/1* with *POST* method and reponse with a user info in json show by the property *res*.The [url-pattern](https://github.com/snd/url-pattern) syntax used in req *target* property only and the res properties recursively.

### Filename: user/info.json

    module.exports = {
      "req": {
        method: "POST",
        target: "/:id"
      },

      "res": {
        "name": "xapi/:id",
        "age": 1,
        "email": "xapi@example.com"
      }

    };
