import React ,{useState} from 'react';
import axios from 'axios';

const Register=()=>{
   const [email,setEmail]=useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
   const [type,setType]=useState('');
   const[signupStatus,setSignupStatus]=useState('');

   const handleSubmit=async(e)=>{
    e.preventDefault();
    //All register can be users only admin access cannot be given
    setType('user');
    //sending data in the form of formData
    const formData=new FormData();
    formData.append('email',email);
    formData.append('password',password);
    formData.append('name',name);
    formData.append('type',type);

    try{
      const response = await axios.post('https://8080-cffceecfebadebddaccdaedadeeaffeddeafeaeaadbdbabf.project.examly.io/api/signup',formData,{
         header:{
          'Content-Type': 'multipart/form-data',
         },
      });
      if(response.status===200){
        console.log('Signup succesful');
        setSignupStatus('Signup successful, Please click on Login')
      }
      else{
        console.log('Email is alredy registered');
        setSignupStatus('Email is already registered')
      }
      
    }
    catch(error){
      console.log('Email is alredy registered');
      setSignupStatus('Email is already registered')
    }

   };

return(

  <div>
   <form onSubmit={handleSubmit}>
     <label>
     Name:
     <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required/>
     </label><br/>
    <label>
     Email:
     <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
    </label><br />
    <label>
     New Password:
     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </label><br />
    
    <button type="submit">Sign Up</button>
   
   </form>
    {signupStatus && <p>{signupStatus}</p>}
  </div>
);

};
 export default Register;