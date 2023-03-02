<template>
  <div class="wrapper-todo">
    <div class="title has-text-centered">My ToDo List!</div>
    <form
    @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
              v-model="newtodoContent"
              class="input"
              type="text"
              placeholder="Add todo">
        </p>
        <p class="control">
          <button :disabled="!newtodoContent"
              class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>
    <div
        :class="{'has-background-success-light' : todo.done}"
        v-for="todo in todos"
        :key="todo.id"
        class="card mb-5">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column"
            :class="{'has-text-success line-through':todo.done}"
            >{{ todo.content }}</div>
            <div class="column is-5 has-text-right">
              <button
                  @click="toggleDone(todo.id)"
                  :class="todo.done?'is-success':'is-light'"
                  class="button is-light">
                &check;</button>
              <button
                  @click="deleteTodo(todo.id)"
                  class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

// IMPORT
import {ref, onMounted} from "vue";
import {db} from '@/firebase'
import { collection, onSnapshot, addDoc  } from "firebase/firestore";

//FIREBASE REFS
const todosCollectionRef = collection(db, 'todos');


const todos = ref([
  // {
  //     id: 'id1',
  //     content: 'olla!',
  //     done: false,
  // },бб
  // {
  //   id: 'id2',
  //   content: 'salut!',
  //   done: true,
  // }
])

// GET TODOS
onMounted( ()=>{
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo ={
               id: doc.id,
               content: doc.data().content,
               done: doc.data().done,
          }
        fbTodos.push(todo)
    });
    todos.value = fbTodos;
  })
})


// ADD TODO
const newtodoContent = ref("");
const addTodo = ()=>{
   addDoc(todosCollectionRef, {
    content: newtodoContent.value,
    done: false,
});
  newtodoContent.value = "";
}
// DELETE TODO
const deleteTodo = (id) =>{
  todos.value = todos.value.filter((todo)=>todo.id !==id);
};

// TOGGLE DONE
const toggleDone = id =>{
  const index = todos.value.findIndex(todo=>todo.id===id);
  todos.value[index].done = !todos.value[index].done;
}

</script>

<style>
@import "bulma/css/bulma.min.css";
.wrapper-todo{
  min-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.has-text-centered{
  color: white;
}
.line-through{
  text-decoration: line-through;
}
</style>













