# Ukuvota
## Summary
Ukuvota uses a cooperative and scalable process to help individuals reach collective decisions. The core process is [score voting](https://electology.org/score-voting) with additional features to make it more cooperative:
- **To "keep things the way they are" is always an option, never the default.** Framing this option as a default position introduces a significant conservative bias—listing it as an option removes this bias and keeps a collective evolutionary.
- **To "look for other options" is always an option.** If none of the other current options are good enough, people are able to choose to look for better ones—this ensures that there is always an acceptable option for everyone.
- **Every participant can express how much they support or oppose each option.** Limiting people to choose their favorite or list their preference prevents them from fully expressing their opinions—scoring clarifies opinions and makes it much more likely to identify the best decision.
- **Acceptance (non-opposition) is the main determinant for the best decision.** A decision with little opposition reduces the likelihood of conflict, monitoring or sanctioning—it is also important that some people actively support the decision to ensure it actually happens.

## Technology used
The front-end is made using the Quasar Framework

## Installing

``` bash
(sudo is only required if npm is installed globally)

# install quasar-cli globally 
$ sudo npm install -g quasar-cli

# install yarn for dependencie management
$ sudo npm install -g yarn
```

## Build Setup

``` bash
# install dependencies
$ yarn

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

## Deployment

Deployment is managed using gitlab ci. The master branch will be tested and built and deployed to [staging.ukuvota.world](https://staging.ukuvota.world).

Once you have verified that you haven't broken everything, then you can trigger the deployment to [ukuvota.world](https://ukuvota.world) in the [gitlab environments](https://gitlab.com/ukuvota/ukuvota/environments) view.
