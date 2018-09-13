# Gatsby + Netlify CMS Portfolio

**Note:** This starter uses the [Gatsby v2 Beta](https://www.gatsbyjs.org/blog/2018-06-16-announcing-gatsby-v2-beta-launch/).

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Access Locally

Once setup with yuor own Netlify account and hooked your github, then follow:

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