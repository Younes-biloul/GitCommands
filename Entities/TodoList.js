/**
 * @typedef {Object} ITodolist
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {string} color
 */


/**
 * @implements {ITodolist}
 */
export class Todolist  {
    /**
     * @param {number} id
     * @param {string} title
     * @param {string} body
     * @param {string} color
     */
    constructor(id, title, body, color) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.color = color;
    }
    
    
    printDetails() {
        console.log(`ID: ${this.id}, Title: ${this.title}, Body: ${this.body}, Color: ${this.color}`);
    }
}

// Example usage:
const myTodo = new Todolist(1, "My Title", "This is the body", "blue");
myTodo.printDetails();
//dd
//ddd