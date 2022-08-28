# Traditional Software Development

1. Development Environment -> Implementation
2. SCM Server -> Version Control and triggers Build server
3. Build Server -> Creates executable and perform basic tests
4. SCM Server -> Get the output of Build Server 
* If Build Success -> Proceeed to UAT and Deployment
* If Build Fails -> Feedback to all developers
5. Deployment server -> Stage, test and deploy to production.

# Software Development using Containers

1. Development Environment -> Implementation
2. SCM Server -> Version Control and triggers Build server
3. Build Server -> Creates executable **in form of a docker image** and perform basic tests
4. SCM Server -> Get the output of Build Server 
* If Build Success -> Proceeed to UAT and Deploy **Docker image to Docker registry (Docker Hub)**
* If Build Fails -> Feedback to all developers
5. Deployment server -> Stage, test and deploy to production.

**Note:** Biggest advantage of using containers is that it guarantees working of application on any device/environment given that container engine is present on it.
