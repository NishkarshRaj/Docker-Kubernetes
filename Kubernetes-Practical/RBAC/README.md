# Kubernetes RBAC within a namespace: A Practical Guide

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
minikube start
```

## Setting up RBAC

With the RBAC yaml file, we can use kubectl to create the Namespace, ServiceAccount, Role, RoleBinding and Pod.

```cmd
kubectl apply -f rbac.yaml
```

You should get an output similar to this:

```cmd
namespace/rbac-example-namespace created
serviceaccount/rbac-example-serviceaccount created
role.rbac.authorization.k8s.io/rbac-example-role created
rolebinding.rbac.authorization.k8s.io/rbac-example-rolebinding created
pod/nginx created
```

## Verify RBAC permissions

The rbac-example-role only allows `get`, `watch` and `list` permissions for pods in the `rbac-example-namespace.`
To verify if the RBAC permissions are working we will create a new context with a test-user and authenticate with the serviceaccount token.

To get the token for the rbac-example-serviceaccount, run the following kubectl commands:

```cmd
kubectl describe serviceaccount rbac-example-serviceaccount -n rbac-example-namespace
```

You should get an output similar to this:

```cmd
Name:                rbac-example-serviceaccount
Namespace:           rbac-example-namespace
Labels:              <none>
Annotations:         Image pull secrets:  <none>
Mountable secrets:   rbac-example-serviceaccount-token-bdhbq
Tokens:              rbac-example-serviceaccount-token-bdhbq
Events:              <none>
```

Copy the serviceaccount token name, in this case `rbac-example-serviceaccount-token-bdhbq` and get the token value:

```cmd
kubectl describe secrets rbac-example-serviceaccount-token-bdhbq -n rbac-example-namespace
```

You should get an output similar to this:

```cmd
Name:         rbac-example-serviceaccount-token-bdhbq
Namespace:    rbac-example-namespace
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: rbac-example-serviceaccount
              kubernetes.io/service-account.uid: 123210a4-1f50-4b26-bf6d-ca638a16a6ba

              Type:  kubernetes.io/service-account-token

              Data
              ====
              token:      eyJhbGciOiJSUzI1NiIsImtpZCI6IjVrbURYNzdRV3ZkY1BqeS1PUEJ5aUdZUGhhanhGRFZXeEtNS2Z0U1FzMWcifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJyYmFjLWV4YW1wbGUtbmFtZXNwYWNlIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InJiYWMtZXhhbXBsZS1zZXJ2aWNlYWNjb3VudC10b2tlbi1iZGhicSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJyYmFjLWV4YW1wbGUtc2VydmljZWFjY291bnQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxMjMyMTBhNC0xZjUwLTRiMjYtYmY2ZC1jYTYzOGExNmE2YmEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6cmJhYy1leGFtcGxlLW5hbWVzcGFjZTpyYmFjLWV4YW1wbGUtc2VydmljZWFjY291bnQifQ.MGXfCughpcRREHCygQGTNwRQyPsA-zfeIZt765qgr_DcrgVnWRhNh_-gvThxIK8I4jCes5Cp51dXkvLInKPbMiAGgDcMXJVhwyf4eLQCb6_RwYaUm05LcYodFx_bj1unhKaJlJp0JrY8vh29iaM7rIPLLjlBOhGlmSwPFfz_5cwu6BHM2Q5Go37ysd839JuXjJUSz70Ee0EVQXRYG5gUriclhOyD2sFnQ8b7yOnCwVoCXrq1cvWwYPcJjRmhVZdQS3vcLkcmihZMlQzxf73yCN_v78BBJTsa98PiyKCqNN0CJ6wYLjxR4C_5brrF-vCnoR3_JJ_t4sZ0XJ64y0nNwA
              ca.crt:     1066 bytes
              namespace:  22 bytes
```

Copy the value of the token from the Data field and set it as a variable

```cmd
TOKEN=eyJhbGciOiJSUzI1NiIsImtpZCI6IjVrbURYNzdRV3ZkY1BqeS1PUEJ5aUdZUGhhanhGRFZXeEtNS2Z0U1FzMWcifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJyYmFjLWV4YW1wbGUtbmFtZXNwYWNlIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6InJiYWMtZXhhbXBsZS1zZXJ2aWNlYWNjb3VudC10b2tlbi1iZGhicSIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJyYmFjLWV4YW1wbGUtc2VydmljZWFjY291bnQiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiIxMjMyMTBhNC0xZjUwLTRiMjYtYmY2ZC1jYTYzOGExNmE2YmEiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6cmJhYy1leGFtcGxlLW5hbWVzcGFjZTpyYmFjLWV4YW1wbGUtc2VydmljZWFjY291bnQifQ.MGXfCughpcRREHCygQGTNwRQyPsA-zfeIZt765qgr_DcrgVnWRhNh_-gvThxIK8I4jCes5Cp51dXkvLInKPbMiAGgDcMXJVhwyf4eLQCb6_RwYaUm05LcYodFx_bj1unhKaJlJp0JrY8vh29iaM7rIPLLjlBOhGlmSwPFfz_5cwu6BHM2Q5Go37ysd839JuXjJUSz70Ee0EVQXRYG5gUriclhOyD2sFnQ8b7yOnCwVoCXrq1cvWwYPcJjRmhVZdQS3vcLkcmihZMlQzxf73yCN_v78BBJTsa98PiyKCqNN0CJ6wYLjxR4C_5brrF-vCnoR3_JJ_t4sZ0XJ64y0nNwA
```

## Create a user entry

To create a user entry in kubeconfig, run the following command:

```cmd
kubectl config set-credentials test-user --token=$TOKEN
```

You should get an output similar to this:

```cmd
User "test-user" set.
```

## Create a new context

To create a new context in kubeconfig, run the following command:

```cmd
kubectl config set-context test-rbac --cluster=minikube --user=test-user
```

You should get an output similar to this:

```cmd
Context "test-rbac" created.
```

## Use the new context

To switch to the new context we created, run the following command:

```cmd
kubectl config use-context test-rbac
```

You should get an output similar to this:

```cmd
Switched to context "test-rbac".
```

## Verification

We can now verify if the RBAC permissions we defined are working.

Listing pods in the `rbac-example-namespace` should work, run the following command to verify:

```cmd
kubectl get pods -n rbac-example-namespace
```

You should get an output similar to this:

```cmd
NAME    READY   STATUS    RESTARTS   AGE
nginx   1/1     Running   0          32s
```

But listing pods across all namespaces should be forbidden, run the following command to verify:

```cmd
kubectl get pods --all-namespaces
```

You should get an output similar to this:

```cmd
Error from server (Forbidden): pods is forbidden: User "system:serviceaccount:rbac-example-namespace:rbac-example-serviceaccount" cannot list resource "pods" in API group "" at the cluster scope
```

Creating new namespaces should also be forbidden, run the following command to verify:

```cmd
kubectl create namespace testing
```

You should get an output similar to this:

```cmd
Error from server (Forbidden): namespaces is forbidden: User "system:serviceaccount:rbac-example-namespace:rbac-example-serviceaccount" cannot create resource "namespaces" in API group "" at the cluster scope
```
