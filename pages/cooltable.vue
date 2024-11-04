<template>
    <div v-if="todoStore.taskTable.length > 0" class="toDoTable">
        <table>
            <tr>
                <th>Assignee</th>
                <th>Date Due</th>
                <th>Description</th>
            </tr>
            <tr v-for="tt in todoStore.taskTable">
                <td>{{ tt.todo.assignee }}</td>
                <td>{{ formatDateTime(tt.todo.dueDateTime) }}</td>
                <td>{{tt.todo.description}}</td>
            </tr>
        </table>
    </div>
    <p v-else>No data yet, press the big button ✨</p>
    <button id="BigTableButton" @click="OnGetDataClick"  >Look for new entry</button>
    <p v-if="todoStore.failedCall" style="color:red">Entry was a duplicate 😒 </p>
        
</template>
<script setup> 

import { useToDoStore } from '~/stores/todo';
//Get stores
const todoStore = useToDoStore()


async function OnGetDataClick(){
    todoStore.apiCall()
    return
}

/**
 * From a string that can be processed via the Date class, into a new string that is in a pretty format
 * @param dueDateTime the date in a string format that can be fed into Date()
 * @returns a string of the date in a readable format
 */
function formatDateTime(dueDateTime){
    let dateFormated = new Date(dueDateTime)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = dateFormated.getDay() + 1
    let result = months[dateFormated.getMonth()] + " " + days
    if(days == 1 || days == 21 || days == 31){
        result += "st"
    }
    else if(days == 2 || days == 22){
        result += "nd"
    }
    else if(days == 3 || days == 23){
        result += "rd"
    }
    else{
        result += "th"
    }
    
    result += " " + (dateFormated.getYear() + 1900) + " "
    let hours  = dateFormated.getHours()
    if(hours < 10){
        result += "0"
    }
    result += hours + ":"
    let mins = dateFormated.getMinutes()
    if(mins < 10){
        result += "0"
    }
    result += mins
    return result

}

</script>
<style scoped lang="scss">

.toDoTable table {
    width: 60vw;
}
.toDoTable th{
    border: 2px solid #000000;
}
.toDoTable td{
    text-align:center;
    border: 1px solid #000000;
}
#BigTableButton{
    width: 60vw;
    height: 10vh;
    font-size: 5vh;
}

</style>