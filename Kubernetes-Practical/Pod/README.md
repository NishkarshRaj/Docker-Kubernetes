# Creating a Kubernetes POD: A Practical Guide

## Preparation
For this guide you'll need the following installed:
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

## Make sure hyperV is running (Windows Only)

We need Windows virtualization features enabled for us to run minikube. To see if HyperV is enabled, run the following command in Powershell as an administrator.

```cmd
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```

If HyperV wasn't active before, go ahead and restart your computer.

## Setting up minikube

Start up minikube with the following command.  

```cmd 
minikube start --vm-driver=hyperv
```
and if you want to set hyperv as the default
```cmd 
minikube config set vm-driver hyperv
```

## Describing the deployment

Next, we'll need to get our deployment file setup. This is described using YAML.

``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

With the yaml file setup, we can use kubectl to create the deployment.

```cmd
kubectl apply -f manifest.yml
```

You should get an output similar to this:

```cmd
C:\Users\Dublin\Documents\GitHub\Docker-Kubernetes\Kubernetes-Practical\Pod> kubectl apply -f .\nginx.yaml
deployment.apps/nginx-deployment configured
```

## Checking Pod Deployments

To check the pod deployments, run the following kubectl command:

```cmd
kubectl get pods
```

And you should get an output similar to below:

```cmd
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-54f57cf6bf-8hhps   1/1     Running   0          105s
nginx-deployment-54f57cf6bf-t4nb7   1/1     Running   0          103s
```

To check a specific pods status, we can run a describe for a particular pod.

```cmd
kubectl describe pod nginx-deployment nginx-deployment-54f57cf6bf-8hhps
```

The syntax for the kubectl command is ``` kubectl describe pod  DEPLOYMENT-NAME POD-NAME ```

And get a more detailed output of its metadata and associated events.

```cmd
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from default-token-5bwbx (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  default-token-5bwbx:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  default-token-5bwbx
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                 node.kubernetes.io/unreachable:NoExecute for 300s
Events:
  Type    Reason     Age        From               Message
  ----    ------     ----       ----               -------
  Normal  Scheduled  <unknown>  default-scheduler  Successfully assigned default/nginx-deployment-54f57cf6bf-8hhps to minikube
  Normal  Pulled     4m2s       kubelet, minikube  Container image "nginx:1.7.9" already present on machine
  Normal  Created    4m2s       kubelet, minikube  Created container nginx
  Normal  Started    4m2s       kubelet, minikube  Started container nginx
Error from server (NotFound): pods "nginx-deployment" not found
```


## Editing Deployment

To edit the deployment, edit the manifest.
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 4 # Upped the replica count to 4
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.8 # Bumped the nginx version
        ports:
        - containerPort: 80
```

And run kubectl apply again.

```cmd
kubectl apply -f manifest.yml
```


## Scaling Deployment
