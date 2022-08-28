# Basics of Containerization using Docker and Orchestration using Kubernetes

# How to Collaborate

1. Fork the repository to your own GitHub account.

2. Clone the repository to your local machine

```
git clone "https://www.github.com/{Username}/Docker-Kubernetes.git"
```

where username is your GitHub account username.

3. Create a branch where you can do your local work.
Never work on **master** branch as we do not allow master commits except by admins.

```
git branch {branchname}
git checkout branchname
```

4. Do your work and stage your changes.

```
git add <filename>
```

5. Commit you changes with a commit message containing your name, file(s) worked upon, changes added.

```
git commit -m "Name| files| Changes"
```

6. Push changes to your forked repository

```
git push -u origin branchname
```

# Synchronize forked repository with Upstream repository

1. Create upstream as our repository

```
git remote add upstream "https://www.github.com/NishkarshRaj/Docker-Kubernetes.git"
```

2. Fetch upstream changes in local machine

```
git fetch upstream
```

3. Switch to master branch

```
git checkout master
```

4. Merge changes in local machine

```
git merge upstream/master
```

5. Push changes to your forked GitHub repository

```
git push -f origin master
```
