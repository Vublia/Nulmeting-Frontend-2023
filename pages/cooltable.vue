<template>
    <div v-if="entriesList.length > 0" class="toDoTable">
        <table>
            <tr>
                <th>Assignee</th>
                <th>Date Due</th>
                <th>Description</th>
            </tr>
            <tr v-for="ee in entriesList">
                <td>{{ ee.todo.assignee }}</td>
                <td>{{ ee.todo.dueDateTime }}</td>
                <td>{{ee.todo.description}}</td>
            </tr>
        </table>
    </div>
    <p v-else>No data yet, press the big button</p>
    <button id="BigTableButton" @click="OnGetDataClick" >Look for new entry</button>
    <p v-if="reactiveText" style="color:red">Entry was a duplicate 😒 </p>
</template>
<script setup> 
import {useGlobalStore} from '@/stores/global'
import {storeToRefs} from 'pinia'
//Get store
const globalStore = useGlobalStore()
//Get entries
const entriesList = reactive([])

//bool that determines if the html shows the 'no new entry found' object
let reactiveText = ref(false)

async function OnGetDataClick(){
    globalStore.apiCall().then(function(reply) {

        let newElement = true
        entriesList.forEach(element => {
            if(element.todo.id == reply.todo.id){
                newElement = false
                reactiveText.value = true
            }
        });
        if(!newElement) return
        reactiveText.value = false
        //change datetime to smth more useful
        reply.todo.dueDateTime = formatDateTime(reply.todo.dueDateTime)
        entriesList.push(reply)
    })
    //entriesList.push(await  globalStore.apiCall())
    return
}

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
<style lang="css">

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