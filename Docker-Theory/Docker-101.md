# More about Dockers

## Docker Basics

* Portability - Same working on different platforms and devices.

* Docker is used throughtout the SDLC Lifecycle but its most important significance plays in deployment.

* Software Stack - A software consists of 
1. Frontend
2. Backend
3. Database
4. Dependencies and Environment configurations
We have to configure all of them in different environments to run it everywhere.

* Containers are standard packaging - organization - transport - portability.

## Docker Architecture

### General Workflow of Docker

* Dockerfile - Docker Image - Docker Container - DockerHub
* Pull Image in different devices via the repository and run the container anywhere.

### Containerization vs Virtualization

* Hypervisor vs Container Runtime
* Guest OS vs Parent Kernel sharing
* Resource allocation vs On demand resource allocation

![img](img/containervm.png)

### Docker Architecture - Client Server Architecture

* Client - Command Line Interface
* Server - Docker Daemon - containers run on server => Server = Docker Daemon + Containers
* Docker Engine - Client + Server
* Docker Client and Server interact via commands or Rest API.

## Advantages of Docker
* Build Once - Run everywhere
* Portable - Supported by AWS, GCP etc
* Easy to Share - central hub repository
* Version Controlling
* Isolation
* Standard Packaging 
* Improved productivity

## Docker Installation on Linux 64 bits

* Connect to Linux

* Install Docker

```
$ sudo apt-get -y update
$ sudo apt-get -y install docker
$ docker --version
$ docker info
```
* Start Docker

```
$ sudo service docker start
$ docker info
```

* Add User to Docker

```
$ sudo usermod -a -G docker [username]
```

* Stop Docker
```
$ sudo service docker stop
```

* Uninstall Docker
```
$ apt remove docker
```

### Resources

https://get.docker.com/
https://docs.docker.com/engine/install/binaries/

## Basic Docker Commands

### Basic commands

* Version, client, golang version - detailed

```
$ docker version
```

* One line Docker version information

```
$ docker --version 
$ docker -v 
```

* Detailed Docker information along with current state on parent OS

```
$ docker info
```

* Help command to know about other commands
```
$ docker --help
```
```
$ docker [command] --help
```

* Login to DockerHub

```
$ docker login
```

### Images commands

* Docker Pull

```
$ docker pull [image name] # Fetches from repository
```
```
$ docker images -q # All IDs of image
```
```
$ docker images -a # All information of cached images
```

* Delete images
```
$ docker rmi [-f] [space separated image names or ID]
```

### Containers commands

* PS - list containers
```
$ docker ps # Running containers
```
```
$ docker ps -a # All containers
```

* Run - Check image locally, if not present, pull from Hub and launch a container.
```
$ docker run [image name]
```
```
$ docker run -it [image] # Interactive mode
```

* Docker start
```
$ docker start [image name] # Not running but fully provisioned
```

* Docker Stop
```
$ docker stop [image name]
```

### System commands

* Stats command - Resource utilization
```
$ docker stats
```

* Disk utilization

```
$ docker system df 
```

* Prune - delete all unused data but not the dangling images
* Prune --all (dangling images - not having any running container)
```
$ docker system prune # Outputs total resource regained especially in terms of memory
```

## Docker Images

### What are Images

* Images are template to create docker containers
* Containers are runtime artifacts


```
$ docker images # list images
```
```
$ docker images --help # Check the basic command usage
```

### How to Pull an image
```
$ docker pull [image name] # Pulls latest image by default
```

```
$ docker pull [image name]:[tags] # Downloads specific tags
```

```
$ docker images -q # Shows all numeric IDs of local images # --quiet
```

```
$ docker images -f "dangling=false" # Filter -- filter
```

```
$ docker image --all # All images
```

### How to run a container from the image

```
$ docker run [image name]
```

```
$ docker run -it --name [container name] [image] [bash]
```

### Basic Commands

* Inspect Images - Shows layers - Images are STACK of layers.
```
$ docker inspect [image name]
```

* Inspect Containers
```
$ docker inspect [container name]
```

* Stopped related containers needed to delete image - use force
```
$ docker rmi [-f] [image name]
```

## Docker Containers
* Running instance of Docker Images

![image](img/arch.png)


### How to create containers
```
$ docker run [image name] # Inbuilt Pull feature
```

```
$ docker ps # Running containers
```

```
$ docker ps -a # All containers
```

```
$ docker run --name [name of container] -it [image name]
```

* Start containers
* Stop containers
* Pause containers - lock container - takes on input from user and stops every tasks!
```
$ docker pause [container name] # From another terminal
```

* Unpause containers
```
$ docker unpause [container name]
```

* Top command - PID, commands, name etc.
```
$ docker top [container name]
```

* Statistics
```
$ docker stats [container name]
```

* Attach to running container - attach to start or running state only
```
$ docker attach [container name or ID]
```

* Kill a container - Running containers only
```
$ docker kill [container name or ID]
```

* Remove container
```
$ docker rm [container name or ID]
```

* History of containers linked to local image
```
$ docker history [image name]
```

## How to run Jenkins on Docker Containers
* How to Start Jenkins on Docker
* How to set Jenkins home on parent OS

* Pull the Jenkins Image
```
$ docker pull jenkins
```

* Run the Docker container to launch Jenkins on parent OS
```
$ docker run -p 8080:8080 -p 50000:50000 jenkins # [Export Host port]:[Server port]
```
* 8080: Web Brower hosting
* 50000: Jenkins API Communication linking

* Create a persistent storage for Jenkins - Docker Volume
```
$ docker run -p 8080:8080 -p 50000:50000 -v [local storage]:[destination storage] jenkins
```

* Unlock Jenkins home on parent OS web Interface
* Set a password - Settings - Users - Configure - Change Password
* Create a simple job to execute Shell command - `$ls`
* New terminal since Jenkins running via Docker on other terminal
* Stop the Docker container of Jenkins
* Check if the job present on the local storage
* Delete the container permanently
* Create another container with same Jenkins home directory of local parent!!

**BCD!! Jenkins jobs and different configurations are kept intact when we use the same local storage for linking**

**BCD!! Volume Mapping - Create Volume via Docker CLI - "/var/lib/docker/volumes" but we can directly link a local folder as well.**

## Dockerfiles

Text file with instruction to **build** the Docker Images

```
$ vim Dockerfile
```

```Dockerfile
# Comments
FROM [image name]/[SCRATCH] # Scratch is an empty image
MAINTAINER [User name] <[Email]> # Optional
RUN [command] # Execute on Build
CMD ["echo","Hello World"]# Execute on container launch
```

* Build the Docker Image
```
$ docker build [path]
```

* Build Image with tag
```
$ docker build -t [image name] [path]
```

* Run the image
```
$ docker run [image ID]
```

### References

https://github.com/wsargent/docker-cheat-sheet#dockerfile

https://docs.docker.com/engine/reference/builder/#environment-replacement


## Docker Compose - Microservice Architecture

* tool for defining & running multi-container docker applications
* use yaml files to configure application services (docker-compose.yml)
* can start all services with a single command : `docker compose up`
* can stop all services with a single command : `docker compose down`
* can scale up and down selected services/containers of the compose when required

### Install Docker Compose 

* Already installed on Mac and Windows

```
$ docker compose -v # or --version
```
```
$ docker compose version
```

* **Way 1) Download via GitHub**
```
$ curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
```

* **Way 2) Download using pip**
```
$ pip install -U docker-compose
```

## Create Docker compose
```
$ vi docker-compose.yaml
```

* 2 space identation

```
version: [version number] # Note docker compose file version must be compatible with Docker Engine version
services:
  [container name]: 
	  [image]: [image name]
  [container name]: 
	  [image]: [image name]
```

* Check validity of yaml file - correct syntax or not
```
$ docker-compose config
```

* Launch all containers
```
$ docker-compose up [-d]
```

* Check containers
```
$ docker-compose ps
```

* Down the service
```
$ docker-compose down
```

* Scale specific containers
```
$ docker-compose --scale [c1]=n [c2]=m
```

## Docker Volumes

* Volumes are used for persistent data generated by the container even after the container is destroyed

### Use of Docker volumes

* Decoupling container from storage
* Share volume (storage/data) among different containers
* Attach volume to container
* On deleting container volume does not delete

### Using Docker Volumes

```
$ docker volume --help
```

* Create Volume
```
$ docker create volume [volume name]
```

* List volumes
```
$ docker volume ls
```

* Inspect volume
```
$ docker volume inspect [volume name]
```

* Remove volume
```
$ docker volume rm [volume name]
```

* Delete all unsued volues
```
$ docker volume prune
```

* Attach volume on container creation
```
$ docker run [-v/--volume/--mount] [volume name]:[destination] [image name]
```

**Note: We can use advanced volume drivers to store the docker volumes on remote or cloud storage**

### Bind Mounts - Linking physical location with container rather than Docker volume
```
$ docker run -v [source folder]:[destination folder] [image name]
```
This source folder, if not already created, is created by the command.

**Note: Delete All containers** 
```
$ docker container prune
```

**Note: Delete all running containers**
```
$ docker rm $(ps -aq)
```


