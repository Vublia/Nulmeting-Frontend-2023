import { getAPIkey } from "~/apiKey";
import axios from "axios";

export const useGlobalStore = defineStore("globalStore", () => {
  const loading = ref(false);

  const startLoader = (): void => {
    loading.value = true;
  }
  const stopLoader = (): void => {
    loading.value = false;
  }
  async function apiCall(){

  	let config = {
  	  method: 'get',
  	  maxBodyLength: Infinity,
  	  url: 'https://86a4h9y007.execute-api.eu-west-1.amazonaws.com/development/nulmeting/todo',
  	  headers: { 
  	    'x-api-key': getAPIkey()
  	  }
  	};
  	let resp = ""
  	return await axios.request(config).then((response) => {
      return response.data
  	})
  	.catch((error) => {
  	  console.log(error);
      return ""
  	});
    
    return resp
  	
  	  }
  	

  return { loading, startLoader, stopLoader, apiCall };
});