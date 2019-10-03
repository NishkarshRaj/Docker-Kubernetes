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

# Disadvantages of Monolithic Architecture:

**1. Difficult to maintain:** If one module is changed, then all modules have to be changed (Regression testing)

**2. Fault Intolerant:** If the server fails, all services stop.

**3. Highly coupled code:** Code is highly coupled and thus one change affects large number of modules.
Also, high coupling means code base in integrated and thus large LOC are present which makes it less readable and understandable.

**4. Difficult to patch:** Highly static system; changes are difficult to be incorporated.

**5. Huge downtime for changes:** Change in one module needs entire server and all other modules to be stopped leading to huge downtime.

**6. Low adaptability to new tools and technologies:** One biggest case of losing huge market share due to poor adaptability is of Nokia in mobile market.

```
Monolithic architecture is still used in Mainframe and Banking sectors because the data is very valuable, voluminous and dynamic and shift of architecture would need huge downtime and would involve huge risks.
```

# Basics of Cloud Computing

```
-> On Demand services
-> Remote resources
-> Virtualization
-> Fast access to resources -> No time to buy and set up H/W
-> Reliable -> Negligible downtime due to mirroring
```

# Microservices Architecture

* Loose coupling: Highly cohesive yet independent modules
* Microservice: Independend and standalone module performing unique tasks.
* Different DB instance for all modules -> Logging -> only merging with master DB common for all when needed
* Different programming languages can be used for different modules only interface must be unique and problem solving must be done.
* Distributed Development and use of new technologies especially Cloud Computing and Virtualization.
* High scalability (both for H/W and S/W): Replication and time sharing
* Faster rate of deployment as Agile is followed: Small changes yet incremental
* All modules communicate using IPC (Inter process Communication) using API (generally REST API) gateways.
* Version Control is followed: No downtime, the production environment just needs to be shifted from one place to another using load balancers.


