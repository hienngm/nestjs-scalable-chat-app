<p align="center">
<a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
<h1 align="center">Scalable Chat Application in NestJS 🐈</h1>

## Description

This repository serves as an illustrative example for developing a scalable chat application using NestJS. The architecture of this application is specifically designed to efficiently handle a high volume of users while ensuring high performance for real-time messaging.

Check out my article ["Designing a Highly Scalable Chat Application for Handling High User Loads in NestJS"](https://dev.to/hienngm/designing-a-highly-scalable-chat-application-for-handling-high-user-loads-in-nestjs-5big) for a detailed explanation.

### Tech Stack:

<p align="center">
  <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg" alt="nestjs" width="86" height="86"/> </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://graphql.org" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg" alt="graphql" width="86" height="86" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://socket.io/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/socketio/socketio-icon.svg" alt="socket.io" width="86" height="86" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="86" height="86" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://redis.io" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg" alt="redis" width="86" height="86" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.nginx.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg" alt="nginx" width="86" height="86" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="86" height="86" />
  </a>
</p>


## What enables scalability in my design?

- The application maintains correct functionality even when horizontally scaling out multiple instances.
- The application efficiently delivers messages or events only to the relevant instances, avoiding unnecessary invocations and optimizing resource usage and performance.
- The application architecture is designed with loose coupling between services, leveraging the Dependency Inversion Principle in NestJS. This allows for easy decomposition into microservices with minimal effort.
- Additionally, by implementing the ["Clean architecture"](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), the application becomes framework-independent. For example, it allows for effortless transition between databases, such as migrating from MongoDB to PostgreSQL, without requiring modifications to the core entity and business logic.

All of these aspects are discussed in detail in my article available [here](https://dev.to/hienngm/designing-a-highly-scalable-chat-application-for-handling-high-user-loads-in-nestjs-5big).

## Installation

Follow the steps below to install and set up the project:

1. Clone the repository:

   ```
   git clone https://github.com/hienngm/nestjs-scalable-chat-app
   ```

2. Copy the environment file:

   ```
   cp sample.env .env
   ```

3. Start the containers:

   ```
   npm run dc up
   ```

4. Initialize the database (only needed once):
   ```
   npm run dc-create-testing-data
   ```

If you want to clean the project, run the following command:

```
npm run dc-clean
```

## Contributing

Feel free to reach out if you have any ideas, comments, or questions.

Best regards,

Hien Nguyen Minh

## Contact

- Author - [@hienngm](https://github.com/hienngm)
- LinkedIn - [Hien Nguyen Minh](https://www.linkedin.com/in/hienngm/)
- Blog - [https://dev.to/hienngm](https://dev.to/hienngm)

## License

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).
