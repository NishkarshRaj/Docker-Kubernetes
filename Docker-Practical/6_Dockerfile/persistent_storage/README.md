# Use Volumes to persist data

## Create a Volume an fill with data
We build the Container initvolume and populate it with data.
`docker build -t initvolume ./initVolume`
`docker run initvolume`
```
FROM alpine
COPY . /data
VOLUME /data
CMD cd /data && cat DATA
```
The container's folder /data is persisted in a Volume.
The container terminates the volume lives on.

We then build a second container which will print out the data stored in the /data folder.
`docker build -t hellodocker .`

`docker run --volumes-from initvolume hellodocker`
This uses the volume created by the initvolume-Container.
```
FROM node
COPY . /
CMD cd / && node hellodocker.js
```

```
/* File System Object */
var fs = require('fs');
/* Read File */
fs.readFile('data/DATA', 'utf8', function(err, contents) {
    console.log(contents);
});
```


