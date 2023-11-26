import axios from "@/utils/http/index";



  
export const userLogin = (data?:object) => {
    return axios.post("/user/userLogin", data)
}


export const getQuestionList =(data?:object) =>{
    return axios.get("/question/getQuestionList", data)
}

export const submitQuestion =(data?:object) =>{
    return axios.post("/question/submitQuestion", data)
}
