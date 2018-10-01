# Web Application Template
![build status](https://travis-ci.org/dewv/webapp-template.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/dewv/webapp-template/badge.svg?branch=master)](https://coveralls.io/github/dewv/webapp-template?branch=master)

This repository is a template that can be used as a starting point for a Web app that uses `mmvece` to implement the [Model-View-Controller architecture](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).

You will need to:
- Edit `package.json`. Search for "APPNAME" and replace with your app's name. Verify that GitHub repo URL is correct.
- If you are using c9, and this folder is not the top of the workspace, consider copying or linking `.eslintrc` in the parent directory so that c9 will use it
- Consider creating `.env` for MySQL database credentials. Code will default to using c9 MySQL credentials.
- Replace the contents of this file with something appropriate for your app.

# Reference Data (Subject to updates)
- Controller needs to accomplish:  
  <ul><li>Handles HTTP requests, turning them into operations on model and/or view (staff or student, etc)</li>  
  <li>RESTful API; defines "business operations" such as CRUD methods as HTTP requests (method, URL)</li></ul>  
- View needs to create a useable webpage  
  <ul><li>user interface that can handle CRUD operations</li></ul>  
- Model needs to handle the data being utilized  
  <ul><li>Uses the public API and database to store and read data from CRUD/HTTP requests</li></ul>
