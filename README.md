# Architecture

The system uses the standard [Spring Framework](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#spring-webflux) architecture. Requests enter through the controller, which handles the HTTP level logic, and delegates more specific functionality to either services or repositories, depending on the situation. This system is also built on reactive technologies.

# API

API information is served by the application itself. OpenAPI specs can be accessed through `/v3/api-docs` (JSON) or `/v3/api-docs.yaml` (YAML). This does not supply a Swagger UI, but an external UI can be used (e.g. https://editor.swagger.io/).

# Deployment

All operations are relative to root project directory.

## Docker

```BASH
$ docker-compose up 
```

## Manual

Apache Maven is required to build the project. Java 8 or later is required to build and run the project.

### Testing

```BASH
$ mvn clean test
```

### Building

> Note: The build also runs the test suite

```BASH
$ mvn clean package
```

### Running

The [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/appendix-application-properties.html#common-application-properties) and [SpringDoc OpenAPI](https://springdoc.org/#properties) properties can be used to configure the application. By default the application will listen on port 8080 and connects to a MongoDB instance on port 27017.

```BASH
$ java -jar target/palindrome-2.0.0.jar
```