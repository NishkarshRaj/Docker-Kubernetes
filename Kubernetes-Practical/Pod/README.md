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

And if you want to set hyperv as the default.

```cmd
minikube config set vm-driver hyperv
```

## Describing the Pod

Next, we'll need to get our pod file setup. This is described using YAML.

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: nishkarsh
spec:
  containers: 
  - name: nishkarsh
    image: nginx
```

With the yaml file setup, we can use kubectl to create the deployment.

```cmd
kubectl create -f nginx.yaml
```

You should get an output similar to this:

```cmd
PS C:\Users\Dublin\Documents\GitHub\Docker-Kubernetes\Kubernetes-Practical\Pod> kubectl create -f nginx.yaml
pod/nishkarsh created
```

## Checking the Pod

To check the pod, run the following kubectl command:

```cmd
kubectl get pods
```

And you should get an output similar to the below:

```cmd
PS C:\Users\Dublin\Documents\GitHub\Docker-Kubernetes\Kubernetes-Practical\Pod> kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
nishkarsh                           1/1     Running   0          25s
```

To check a specific pods status, we can run a describe for a particular pod.

```cmd
kubectl describe pod nishkarsh
```

The syntax for the kubectl command is ``` kubectl describe pod POD-NAME ```

And get a more detailed output of its metadata and associated events.

```cmd
PS C:\Users\Dublin\Documents\GitHub\Docker-Kubernetes\Kubernetes-Practical\Pod> kubectl describe pod nishkarsh
Name:               nishkarsh
Namespace:          default
Priority:           0
PriorityClassName:  <none>
Node:               minikube/172.17.50.52
Start Time:         Wed, 09 Oct 2019 21:50:58 -0500
Labels:             <none>
Annotations:        <none>
Status:             Running
IP:                 172.18.0.10
Containers:
  nishkarsh:
    Container ID:   docker://55597268f41d9a24a0d2803dd27d10dfcb746955111d0418f6cc5b0341647281
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:aeded0f2a861747f43a01cf1018cf9efe2bdd02afd57d2b11fcc7fcadc16ccd1
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Wed, 09 Oct 2019 21:51:00 -0500
    Ready:          True
    Restart Count:  0
    Environment:    <none>
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
  Normal  Scheduled  <unknown>  default-scheduler  Successfully assigned default/nishkarsh to minikube
  Normal  Pulling    67s        kubelet, minikube  Pulling image "nginx"
  Normal  Pulled     66s        kubelet, minikube  Successfully pulled image "nginx"
  Normal  Created    66s        kubelet, minikube  Created container nishkarsh
  Normal  Started    66s        kubelet, minikube  Started container nishkarsh
```

## Deleting the Pod

To delete the pod, run the following command:

```cmd
kubectl delete pods nishkarsh
```

And you'll get the following message:

```cmd
PS C:\Users\Dublin\Documents\GitHub\Docker-Kubernetes\Kubernetes-Practical\Pod> kubectl delete pods nishkarsh
pod "nishkarsh" deleted
```
