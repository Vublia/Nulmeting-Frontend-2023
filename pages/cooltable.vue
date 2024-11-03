<template>
    <table>
        <tr>
            <th>assignee</th>
            <th>dueDateTime</th>
            <th>description</th>
        </tr>
        <tr v-for="ee in entriesList">
            <td>{{ ee.todo.assignee }}</td>
            <td>{{ ee.todo.dueDateTime }}</td>
            <td>{{ee.todo.description}}</td>
        </tr>
    </table>
    <button @click="OnGetDataClick" >Look for entry</button>
</template>
<script setup lang="ts"> 
import {useGlobalStore} from '@/stores/global'
import {storeToRefs} from 'pinia'
const globalStore = useGlobalStore()
const entriesList = reactive([])
async function OnGetDataClick(){
    globalStore.apiCall().then(function(reply) {

        let newElement = true
        entriesList.forEach(element => {
            if(element.todo.id == reply.todo.id){
                newElement = false
            }
        });
        if(!newElement) return
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