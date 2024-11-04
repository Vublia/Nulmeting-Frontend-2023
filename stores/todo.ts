import { getAPIkey } from "~/apiKey";
import { useGlobalStore } from "./global";
import axios from "axios";
import { defineStore } from "pinia";


export const useToDoStore = defineStore("todoStore", () => {
  const taskTable = reactive(new Array())
  const failedCall = ref(false)
  const globalStore = useGlobalStore()

  async function apiCall(){
    globalStore.startLoader()

  	let config = {
  	  method: 'get',
  	  maxBodyLength: Infinity,
  	  url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo',
  	  headers: { 
  	    'x-api-key': getAPIkey()
  	  }
  	};
    
    axios.request(config).then((response) => {
        let newElement = true
        //check if the element is a duplicate, if so, dont add it to the table
        taskTable.forEach(element => {
            if(element.todo.id == response.data.todo.id){
                failedCall.value = true
                newElement = false
            }
        });
		if(newElement){
            taskTable.push(response.data)
            newElement = true
            failedCall.value = false
        }
        globalStore.stopLoader()
        
  	})
  	.catch((error) => {
  	  console.log(error);
  	});
    
  	
  	}
  	

  return { taskTable, apiCall, failedCall };
});