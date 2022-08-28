# Basics of Docker

I have covered them in my [blog](https://iq.opengenus.org/basics-of-using-docker/)

Here is some basic vocabulary:

**1. Docker Images:** Basis static image on which containers are built on execution.
They represent the entire application along with the dependencies.
It includes the following

* Platform (Parent) OS image
* Layering (See: Image Layering using RUN command)
* Commands to be executed on build
* Dependencies

-> We can create a docker image based on another docker image. This is the concept of layering.

**2. Docker Containers:** It is the Docker image in execution.
It is where the application resides and executes.

```
Analogy: Docker Image is a program and Docker Container is its state in process.
```

**3. Docker Hub or Docker Registry:** Remote cloud based repositories of Docker Images made by us and the community.

**4. Docker Engine:** Standard software on which containers are executed. It is used to build, run and ship docker images.
