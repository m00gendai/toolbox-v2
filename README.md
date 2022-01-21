# README #

### What is this repository for? ###

This is an intranet information hub, basically a collection of links and applets related to the work place.

It is built with server independence in mind, hence why JS modules are embedded in index.html. 
It mainly uses JSON as a "database", however everything concerning the Profile Menu (= user account data) is handled via Firebase/Firestore.

Python was used to create the software that converts CSV files into customized JSON files since data delivery is alsmost exclusively Excel.

### How do I get set up? ###

The toolbox makes use of the following libraries:

* jQuery
* lodash
* dragula
* anime.js
* firebase.js app
* firebase.js auth
* firebase.js firestore
* React
* React-dom
* babel

You need to provide your own firebase credentials and configs. The toolbox looks for a local file called *firebase.js* where you need to provide your authDomain, projectId, storageBucket, messagingSenderId and appId.

Basic maintenance in the sense of adding/removing/changing Home Page Tiles (links to applets/websites) and/or AIP Tiles (links to electronic AIPs) requires only amendments in the respective JSON files, the rest happens automatically.

### Contribution guidelines ###

No contribution, this is an inhouse company only intranet page maintained by the repo owner alone.

### Who do I talk to? ###

* Repo owner