# CLItodo
Command-line todo list app built with NodeJS. Built from scratch with NodeJS and Vanilla JS. (chalk pkg used for making it look pretty).

## Pre-requisites
- NodeJS installed
- npm installed

Go to https://eloquentjavascript.net/20_node.html for an easy, quick guide on how to get started with Node.

## Getting Started
1. Clone repo
2. `cd` to repo on command line
3. In directory on the terminal, run `npm init -y`
4. We use modules `chalk` and JS ES6 modules `esm` . So in same directory run
	1. `npm install chalk`
	2. `npm install esm`
At this point, should see `package.json` and `packagelock.json` in your directory now, along with a new subdirectory `node_modules`

`index.js` already has **shebang** to link to your file path. 

5. In your new index.js add the **bin** between your scripts and keywords.

```
{
  ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
 "bin": {
    "biller": "./index.js"
  },
  "keywords": [],
  ...
}
```

6. Run `npm link` to create symbolic link for `todo`. You should see
```
Welcome to The Todo List CLI App
```
7. or an error lol, if so try `todo show` and you should see
```
Welcome to The Todo List CLI App

To-Do List
------------------------------------------
```

## User Guide
```
todo add [item]          //Add item to todo list"
todo delete [item]       //Delete item to todo list"
todo complete [item]     //Complete item on todo list
todo undo [item]         //Incomplete item on todo list
todo show                //Show current todo list
```
## Authors
Shafaat Ahsen - UT Austin

## Acknowledgements
* Thank you to Bilal Quadri for awesome project idea and help.
* Thank you to Marijn Haverbeke who wrote https://eloquentjavascript.net/

