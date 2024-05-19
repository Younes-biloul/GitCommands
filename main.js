// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue, onChildAdded ,remove,update} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxMmmyPnEZJiLidfthlMzYvG7Q1Ida-_4",
  authDomain: "todolistproject-simplon.firebaseapp.com",
  databaseURL: "https://todolistproject-simplon-default-rtdb.firebaseio.com",
  projectId: "todolistproject-simplon",
  storageBucket: "todolistproject-simplon.appspot.com",
  messagingSenderId: "240899170513",
  appId: "1:240899170513:web:af9d90c754b76d0c4fa5f0",
  measurementId: "G-MKYP38GFVJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

//generate id
function Range() {
  return "id-" + Math.random().toString(36).substr(2, 9);
}


// for sweetalert2
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});



// Add item to Firebase
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = todoInput.value;
  var id =Range();

  if (todoText) {
    set(ref(db, "todos/"+id),{
      text: todoText,
      completed: false,
    }).then(()=>{
      Toast.fire({
        icon: "success",
        title: "Task added Succesfully!",
      });
    }).catch(()=>{
      Toast.fire({
        icon: "error",
        title: "somthing went wrong!",
      });
    });
    todoInput.value = "";
  }
});


// update,delete and load the data from firebase realtime database 


onValue(ref(db, "todos"), (snapshot) => {
  todoList.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const todoItem = childSnapshot.val();
    const todoId = childSnapshot.key;

    const li = document.createElement("li");
    const li_left = document.createElement("li-left");
    const li_right = document.createElement("li-right");
    li.appendChild(li_left);
    li.appendChild(li_right);
    const todoText = document.createElement("span");
    todoText.textContent = todoItem.text;
    todoText.style.textDecoration = todoItem.completed
      ? "line-through"
      : "none";

    const checkbox = document.createElement("input");
    checkbox.className="isComplet";
    checkbox.type = "checkbox";
    checkbox.checked = todoItem.completed;
    checkbox.addEventListener("change", () => {
      update(ref(db, "todos/" + todoId), { completed: checkbox.checked });
    });

    const updateButton = document.createElement("button");
    updateButton.className="update-btn";
    updateButton.innerHTML = `<i class="fa-solid fa-pen-to-square "></i>`;
    updateButton.addEventListener("click", () => {
      const newTodoText = prompt("Update the task:", todoItem.text);
      if (newTodoText) {
        update(ref(db, "todos/" + todoId), { text: newTodoText });
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";

    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.addEventListener("click", () => {
      remove(ref(db, "todos/" + todoId)).then(()=>{
        Toast.fire({
          icon: "success",
          title: "Task deleted Succesfully!",
        });
      }).catch(()=>{
        Toast.fire({
          icon: "error",
          title: "can't delete this task!",
        });
      });
    });

    li_left.appendChild(checkbox);
    li_left.appendChild(todoText);
    li_right.appendChild(updateButton);
    li_right.appendChild(deleteButton);
    todoList.appendChild(li);
  });
});


