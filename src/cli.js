import * as fs from 'fs';
import chalk from 'chalk';

//class for each item in todo list
class todoitem{
	constructor(item,_id){
		this.string = item; //string of actual todolist titem
		this.complete = false; //default set item to incomplete/false
		this.id = _id; //unique numeric ID for each item
	}
}


//Command Line Interface that is called from Index JS
//reads in CLI arguments, processes and shows relevant output from todo add
//options in CLI:
//todo show
//todo add [item]
//todo complete [item]
//todo undo [item]
//todo delete [item]
export async function cli(args) {
	console.clear();
	const items = require('./items.json');
	
	args.splice(0, 2); //remove the irrelevent args


	switch(args[0]){
		case "add":
			try {
				args.splice(0,1); //remove 'add' from args
				let printstr = await add(args, items);
				console.log(chalk.greenBright(printstr));
				show(items);
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't add that!"));
			}
			break;
		case "show":
			console.log(chalk.blueBright("Welcome to The Todo List CLI App\n"));
			show(items);
			break;
		case "delete":
			try {
				args.splice(0,1); //remove 'delete' from args
				let printstr = await dlt(args, items);
				console.log(chalk.greenBright(printstr));
				show(items);
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't delete that"));
			}			
			break;
		case "complete":
			try {
				args.splice(0,1); //remove 'complete' from args
				let printstr = await complete(args, items);
				console.log(chalk.greenBright(printstr));
				show(items);
			}
			catch (error){
				console.log(chalk.redBright("sorry couldn't delete that"));
			}

			break;
		case "undo":
			try {
				args.splice(0,1); //remove 'complete' from args
				let printstr = await undo(args, items);
				console.log(chalk.greenBright(printstr));
				show(items);
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

	//console.log("\ntype 'todo help' to show all options");
}

function show(items){
	console.log("To-Do List");
	console.log("------------------------------------------");

	const keys = Object.keys(items)

	for (const key of keys) {
			if(items[key] == false){
				console.log("[ ] " + key );
			}
			else{
				console.log("[X] " + key);
			}
	}
}

//Func to add element from todolist
//Parameters:
//args: list of words without 'add' command broken by spaces, have to merge them before add item to string 
//items: list of current todoitems
function add(args, items){
	let item = getItem(args);

	//add item to list
	items[item] = false;

	//write to store
	fs.writeFile(`${__dirname}/items.json`, JSON.stringify(items), function(err) {
	if (err) {
	  throw new Error(err.message);
	}
	});
	return new Promise((resolve, reject)=>{
			resolve("successfully added '"+item + "' to list.");	
		}); 
}

//Func to add element from todolist
//Parameters:
//args: list of words without 'add' command broken by spaces, have to merge them before add item to string 
//items: list of current todoitems
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
	})
	return new Promise((resolve, reject)=>{
			resolve("successfully deleted '"+item + "' from todo list.");	
		}); 
}

//Func to complete element from todolist
//Parameters:
//args: list of words without 'add' command broken by spaces, have to merge them before add item to string 
//items: list of current todoitems
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
	})

	return new Promise((resolve, reject)=>{
			resolve("Completed "+item);	
		}); 

}

//Func to set item on todo list to incomplete
//Parameters:
//args: list of words without 'add' command broken by spaces, have to merge them before add item to string 
//items: list of current todoitems
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
	})

	return new Promise((resolve, reject)=>{
			resolve("Undid "+item);	
		}); 

}

//Func to take list of words and make into space seperated string
//Parameters:
//args: list of words without a command broken by spaces to be merged
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



