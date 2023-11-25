import axios from "@/utils/http/index";

export const userLogin = (data) => {
    return axios.post("/user/userLogin", data)
}


export const getQuestionList =(data) =>{
    return axios.get("/question/getQuestionList", data)
}

export const submitQuestion =(data) =>{
    return axios.post("/question/submitQuestion", data)
}
