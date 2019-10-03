# Monolithic Architecture 

* All the application executables, dependencies and configurations are bundled in a single package.
* Non-modular sequential approach.
* Multiple phases cannot be done simultaneously. Thus first document -> design -> code -> test.
This leads to delay and also downtime for human efforts.
Cannot perform parallel tasks.
* All the modules (yes, different modules still exist but they are not independent) must be written in same programming language.
* If a change is made to one module, we have to make changes to all the modules and perform regression testing.
This increases the build time and downtime as all services have to stopped if changes are to be made.
* If central bundle falls, entire service stops => Fault intolerant

```
Since 1990's, the working and consumer environment has changed from
-> Mainframe
-> PC
-> Virtual Computers
-> Cloud Computing (Remote virtualization services on demand)
-> Containerization (Docker etc.)
-> Serverless Orchestartion (Kubernetes)
```

# Benefits of Monolithic Architecture:

**1. Simple to Develop:**
* no or negligible modularity
* configure dependencies once
* one single programming languages (all on same page)

**2. Simple to Test:**
* Same language
* Test all at once (only blackbox without unit testing and return to developer for white box testing)

**3. Simple to Scale** (only Software not hardware)
* Increase resource

**4. Simple to Deploy**
