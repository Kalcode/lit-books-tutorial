### Install an editor, `Visual Studio Code`

If you aren't familiar with and editor or the terminal I recommend installing [Visual Studio Code](https://code.visualstudio.com/)

Recommend the following extensions:
- ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- GraphQL: https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode
- Stylelint: https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint

If you want to use your own editor and are familiar with installing extensions look for a `stylelint` and `eslint` extension to take advantage of the linting we will be installing later.

### Introduction to terminal

Open `Visual Studio Code` that you just installed.

We will cover Visual Studio Code terminal. When you load VSCode you will see a menu called Terminal in the top left. Click `New Terminal` to have a new window appear. This is your terminal window.

TODO: Insert Terminal Window screenshot.

Terminals are used to put in commands to the operating system to run your programs. Example `npm run start` is a command we can use later to start a server for our `react client`.

When I refer to terminal window, this is how you get to it. To close it, click the `trashcan` icon in the terminal window. Restarting the terminal often is needed during installing of `global` software like `git` or `node`. This essentially "restarts" the terminal and loads the new software we installed. When I instruct to restart the terminal, simply click the `trashcan` icon and then open a `New Terminal` window.

### Creating a project folder

Find a directory where you will want to store your code. Example is `Documents` on Windows or Mac. I typically store them under my username on the computer under `projects` or `code`. `/Users/myUserName/projects`. Create a folder that represents the name of the project. I will refer to the project folder as `litbooks`. So `/Users/myUserName/projects/litbooks`.

Try using the terminal to create the directory. Example Google `terminal create a directory windows` or `mac`

#### Using the terminal

##### Example on OSX
```
mkdir ~/projects/litbooks
```

##### Example on Windows Powershell
```
mkdir $home/projects/litbooks
```

If you have trouble here, create a directory the way you typically do.

### Open project folder (VSCode)

Open `VSCode` if its not opened and in the top left click `file` and `Open Folder`, find your new project `litbooks` and select it to open it in the editor. If a terminal window isn't open, go ahead and open a `New Terminal` window. We will use this to type commands below.

### Installing Node

We will use the current version of node, as of this writting that would be `10.11.0`

Follow the link and download and install [Node.js](https://nodejs.org/en/download/current/)

There are several ways to install `node.js`. I recommend for beginners to just use the `mis` for windows installer or `pkg` for osx installers.

Close your console/terminal and reopen it. Type `node -v` and a version should come back like `v10.11.0`

Type `npm -v` and you should get something back similar to `6.2.0` 

If one of the above had an error try googling `how to install node and npm` plus the name of your os, like `osx`, `mac`, `windows`, `ubuntu` etc... like http://lmgtfy.com/?q=how+to+install+node+and+npm+on+mac

*NOTE: the key of learning web development is troubleshooting and resourcefulness. If you continue to have issues feel free to open a github issue. But please try to search for a solution the best you can first*

### Install Git

[Installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) should be straight forward. Follow the guide linked. 

Restart your terminal window.

We will check if installed by running `git --version`.

It should return a version number. In windows it may look like `git version 2.15.1.windows.2`

If you are unsure type `git status`. You will see an output like 

```sh
fatal: Not a git repository (or any of the parent directories): .git
```

This just means there isn't a respository setup, but is a good sign git is working.

Git is a whole topic itself. This course will only cover adding your changes to a respository at the end of each section.

### Git Init

Init your git repo using the following command in terminal inside your project folder `litbooks`

```sh
git init
```

### Create Server folder

Create a server folder, `server`, the project has a sub folder like so `litbooks/server`

```sh
mkdir server
```

### Npm Init Server

Init your NPM `package.json` with the following command, make sure you are in the `server` folder.

```sh
cd ./server
npm init -y
```

### Gitignore

Add `.gitignore` file with the following inside the `server` folder

```
node_module
dist
.env
```