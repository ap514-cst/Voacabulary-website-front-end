import axios from "axios";

const api=axios.create({
    baseURL:"https://voacabulary-website-back-end-2.onrender.com/api/auth/google"
});
export const googleAuth=(code)=>api.get(`/google?code=${code}`);