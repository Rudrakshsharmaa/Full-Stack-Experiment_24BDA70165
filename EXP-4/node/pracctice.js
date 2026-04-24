const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employees = [];

function menu(){
    console.log("\n1.Add 2.List 3.Exit");
    rl.question("choose: ", function(choice){
        if (choice ==1) addemployee();
        else if (choice==2) listemployee();
        else rl.close();
    });
}
 
 function addemployee(){}
rl.question("Name: ", function (name) {
  rl.question("Position: ", function (position) {

    let emp = {
      name: name,
      position: position
    };

    employees.push(emp);

    console.log("Employee Added Successfully");
    menu();
  });
});

function listemployee(){
    console.log(employees);
    menu();
}
menu();
