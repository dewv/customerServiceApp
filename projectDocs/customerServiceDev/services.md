# Service-oriented architecture

This Web application template uses a service-oriented architecture (SOA).

## Services

A service defines operations on a "business object". 

Generally, each service will roughly correspond to a database table.

Each service has a model, a controller, and a set of views.

### Model
	
- provides an object-oriented software model of the thing the service represents
- public API handles private details of database CRUD/business operations, as required 
- is a `.js` file in `models` folder (different file for each service)

### Views
	
- provide a user interface "screen", "page", etc. for each CRUD operation, as required
- is a `.js` file in `views` folder (one per service), and a subfolder under `views` (one per service) containing HTML files 

### Controller

- handles HTTP requests, turning them into operations on model and/or view
- entry point to a RESTful API; it defines certain "business operations" as HTTP requests (method, URL)
- is a `.js` file in `controllers` folder (one per service)
