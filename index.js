#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`balance for ${this.name}: ${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount}Fees paid for ${this.name}`);
    }
    show_status() {
        console.log(`ID ${this.id}`);
        console.log(`Name${this.name}`);
        console.log(`Courses${this.courses}`);
        console.log(`Balance${this.balance}`);
    }
}
class StudentManager {
    students = [];
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`student:${name}added succesfully, Student ID:${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`student:${student.name} enrolled in${course}successfully`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found please enter correct student ID");
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found please enter correct student ID");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
}
async function main() {
    console.log("Welcome to Student Management System");
    console.log("-".repeat(50));
    let student_manager = new StudentManager();
    while (true) {
        let choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View_Student_balance",
                    "Pay_Fees",
                    "Show status",
                    "Exit"
                ]
            }]);
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "enter a student name",
                    }]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "enter a course name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View_Student_Balance":
                let balance_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    }]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "enter amount to pay"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "show status":
                let status_input = await inquirer.prompt([{
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    }]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
main();
