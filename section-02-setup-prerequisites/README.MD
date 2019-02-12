# Section 2 - Setup Prerequisites

<!-- TOC -->

- [Section 2 - Setup Prerequisites](#section-2---setup-prerequisites)
    - [Install an editor, `Visual Studio Code`](#install-an-editor-visual-studio-code)
    - [Introduction to terminal](#introduction-to-terminal)
    - [Creating a project folder](#creating-a-project-folder)
      - [Using the terminal](#using-the-terminal)
        - [Example on OSX](#example-on-osx)
        - [Example on Windows Powershell](#example-on-windows-powershell)
    - [Open project folder (VSCode)](#open-project-folder-vscode)
    - [Installing Node](#installing-node)
    - [Install Git](#install-git)
    - [Git Init](#git-init)
    - [Create Server folder](#create-server-folder)
    - [Npm Init Server](#npm-init-server)
    - [Gitignore](#gitignore)
    - [Commiting in Git](#commiting-in-git)

<!-- /TOC -->

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

Node is what will run our `javascript` outside the browser context. Its know as a runtime engine.

[Read more about Node.js at wiki](https://en.wikipedia.org/wiki/Node.js)

---

We will use the current version of node, as of this writting that would be `10.11.0`

Follow the link and download and install [Node.js](https://nodejs.org/en/download/current/)

There are several ways to install `node.js`. I recommend for beginners to just use the `mis` for windows installer or `pkg` for osx installers.

Close your console/terminal and reopen it. Type `node -v` and a version should come back like `v10.11.0`

Type `npm -v` and you should get something back similar to `6.2.0` 

If one of the above had an error try googling `how to install node and npm` plus the name of your os, like `osx`, `mac`, `windows`, `ubuntu` etc... like http://lmgtfy.com/?q=how+to+install+node+and+npm+on+mac

*NOTE: the key of learning web development is troubleshooting and resourcefulness. If you continue to have issues feel free to open a github issue. But please try to search for a solution the best you can first*

### Install Git

`Git` is used to track incremental changes to our code. It allows us to maintain a history of changes. You can see on [this project](https://github.com/Kalcode/lit-books-tutorial/commits/master) there are a lot of tracked changes we call `commit`.

[Read more about git at wiki](https://en.wikipedia.org/wiki/Git)

---

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

A really good guide is [Atlassian's Getting Git Right](https://www.atlassian.com/git)

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
---

`.gitignore` tells `Git` to ignore those folders or files. `node_modules` are a collection of software for node that can be reinstalled each time using `package.json`. So keeping the files in our repository is a waste of space. See we ignore that directory. `dist` is a folder we will use to "build" our application later. We also ignore that folder because we can always re-build it, the code there would be functionally a duplicate of our source code. `.env` will be used to store senstive information that shouldn't be pushed or saved in a public and argubaly private repository.

### Commiting in Git

In your terminal for VSCode we will initialize a repository. Open your `terminal` if its not already opened.

Make sure you are in the folder above `server`, or the `project` folder we have been calling `litbooks`. This is where our repository will live. It will contain both the `server` and `client` folders.

Setup git username and email if you haven't with 

```sh
git config --global user.name "First and Last Name"
git config --global user.email "your-email@domain.com"
```

```sh
git init
```

To check the status of your git type 

```sh
git status
```

You should see: 

```sh
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        server/
```

Then type:

```sh
git add .
git commit --message "initialize repo"
```

Thats it, your work history as been saved. You can check by typing

```sh
git log
```

with an output similiar to below:

```sh
commit --random-numbers-and-characters-here (HEAD -> master)
Author: First and Last Name
Date:   Sun Oct 14 15:01:16 2018 -0500

    initialize repo
```