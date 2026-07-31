"use client";
 
import {useState} from "react";
import {useRouter} from "next/navigation";
 
 
export default function Login(){
 
const router=useRouter();
 
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");
 
 
async function submit(e:React.FormEvent){
 
e.preventDefault();
 
 
const res=await fetch(
"/api/admin/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
password
})
});
 
 
if(res.ok){
 
router.push("/admin");
 
}else{
 
setError("نام کاربری یا رمز اشتباه است");
 
}
 
}
 
 
 
return (
 
<div className="min-h-screen bg-[#07192f] flex items-center justify-center p-5">
 
<form
onSubmit={submit}
className="bg-white rounded-3xl p-8 w-full max-w-md space-y-4"
>
 
<h1 className="text-2xl font-bold text-center">
ورود مدیریت مسابقات
</h1>
 
 
<input
className="input"
placeholder="نام کاربری"
value={username}
onChange={e=>setUsername(e.target.value)}
/>
 
 
<input
className="input"
type="password"
placeholder="رمز عبور"
value={password}
onChange={e=>setPassword(e.target.value)}
/>
 
 
{
error &&
<p className="text-red-500">
{error}
</p>
}
 
 
<button className="bg-blue-700 text-white w-full py-3 rounded-xl">
ورود
</button>
 
 
</form>
 
</div>
 
)
 
}
 