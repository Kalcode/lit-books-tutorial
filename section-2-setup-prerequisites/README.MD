### Git Init

Init your git repo using the following command in terminal

```sh
git init
```

### Create Server folder

Create a server folder, `server`, so the project has a sub folder `project/server`

```sh
mkdir server
```

### Npm Init Server

Init your NPM package.json=, make sure you are in the server folder.

```sh
cd ./server
npm init -y
```

### Gitignore

Add `.gitignore` file with the following

```
node_module
dist
.env
```