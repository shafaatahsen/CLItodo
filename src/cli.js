import * as fs from 'fs';
import chalk from 'chalk';

class todoitem{
	constructor(item,_id){
		this.string = item; //string of actual todolist titem
		this.complete = false; //default set item to incomplete/false
		this.id = _id; //unique numeric ID for each item
	}
}

export function cli(args) {
	console.log(chalk.blueBright("Welcome to The Todo List CLI App\n"));
	const items = require('./items.json');
	
	args.splice(0, 2); //remove the irrelevent args

	switch(args[0]){
		case "add":
			try {
				args.splice(0,1); //remove 'add' from args
				add(args, items); //remove add
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't add that!"));
			}
			break;
		case "show":
			console.log("To-Do List");
			console.log("------------------------------------------");

			const keys = Object.keys(items)

			for (const key of keys) {
	  			if(items[key] == false){
	  				console.log("[ ]" + key );
	  			}
	  			else{
	  				console.log("[X]" + key);
	  			}
			}
			break;
		case "delete":
			try {
				args.splice(0,1); //remove 'delete' from args
				dlt(args, items); //remove delete
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't delete that"));
			}			
			break;
		case "complete":
			try {
				args.splice(0,1); //remove 'complete' from args
				complete(args, items); //remove delete
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't delete that"));
			}

			break;
		case "undo":
			try {
				args.splice(0,1); //remove 'complete' from args
				undo(args, items); //remove delete
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't undo that"));
			}
			break;
		case "help":
			console.log("add [item]      --- Add item to todo list");
			console.log("delete [item]   --- Delete item to todo list");
			console.log("complete [item] --- Complete item on todo list");
			console.log("undo [item]     --- Incomplete item on todo list");
			console.log("show            --- Show current todo list");
			break;
		default:
			console.log(chalk.redBright("sorry that's not a real command"));
	}

	console.log("\ntype 'todo help' to show all options");
}


function add(args, items){
	let item = getItem(args);

	//add item to list
	items[item] = false;

	//write to store
	fs.writeFile(`${__dirname}/items.json`, JSON.stringify(items), function(err) {
	if (err) {
	  throw new Error(err.message);
	}
		console.log(chalk.greenBright("successfully added '"+item + "'' to list."));	
	})
}

function dlt(args, items){
	//get item
	let item = getItem(args);

	//delete item from list
	if(items.hasOwnProperty(item)){
		delete items[item];
	}
	else{
		console.log(chalk.redBright("item doesn't exist"));
		return;
	}

	//save
	fs.writeFile(`${__dirname}/items.json`, JSON.stringify(items), function(err) {
	if (err) {
	  throw new Error(err.message);
	}
		console.log(chalk.greenBright("successfully deleted '"+item + "' from todo list."));	
	})
}

function complete(args, items){
	let item = getItem(args);
	//delete item from list
	if(items.hasOwnProperty(item)){
		items[item] = true;
	}
	else{
		console.log(chalk.redBright("item doesn't exist, couldn't complete"));
		return;
	}

	//save
	fs.writeFile(`${__dirname}/items.json`, JSON.stringify(items), function(err) {
	if (err) {
	  throw new Error(err.message);
	}
		console.log(chalk.greenBright("Completed "+item));	
	})

}

function undo(args, items){
	let item = getItem(args);
	//delete item from list
	if(items.hasOwnProperty(item)){
		items[item] = false;
	}
	else{
		console.log(chalk.redBright("item doesn't exist, couldn't undo"));
		return;
	}

	//save
	fs.writeFile(`${__dirname}/items.json`, JSON.stringify(items), function(err) {
	if (err) {
	  throw new Error(err.message);
	}
		console.log("Undid "+item);	
	})

}

function getItem(args){
	//check if gave item to delete
	
	if(args.length == 0){
		throw error;
	}
	let item = '';

	//merge list to get key
	if(args.length == 1){
		item = args[0];
	}
	else{
		item = args.reduce((a, b) => a +' '+ b);
	}

	return item;
}



