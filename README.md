## Portfolio

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, deployed, hosted and served on AWS.

## Prerequisites

- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally

Once setup with your own Netlify account and you have hooked up your github, then follow:

```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```
