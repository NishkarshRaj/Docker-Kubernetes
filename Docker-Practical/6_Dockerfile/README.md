# Creating a Dockerfile for building Docker Images

1. Create a Dockerfile
```
vi Dockerfile
```
* Dockerfile is a special file with name **Dockerfile** and no extension.
* It is a declarative file containing statements for Docker image creation.

2. Write the Dockerfile

**Basic Syntax**
```
FROM {parent image}
RUN {command 1}
RUN {command 2}
...
```
* FROM command pulls a docker image from registry which will act as platform image for our Docker image.
* RUN command is used to layer the platform image with new operations.

3. Close the Dockerfile
```
Escape -> :wq
```

4. Build the Dockerfile to create Docker Image
```
$ docker build -t {docker image name you want} .
```
* . is used because Dockerfile is present on the current directory. If this is not the case, provide path to Dockerfile.

5. Check for the creation of Docker image
```
$ docker images
```

6. Run the docker image
```
$ docker run --it {docker image name}
```
