import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewUsers(){
        const[users,setUsers] = useState([]);


       
    useEffect(()=>{
        axios
    .get(`http://localhost:8080/user/Allusers`)
    .then((res) => {
      console.log(res);
        setUsers(res.data)
        
    })
},[])
return (
        <div>
            <div id = "b-img" style={{ backgroundImage: `url(https://media.istockphoto.com/photos/healthy-fresh-rainbow-colored-fruits-and-vegetables-in-a-row-picture-id1208790364?b=1&k=20&m=1208790364&s=612x612&w=0&h=ECVAEDf_s_XHZ8D_wGg2CCfBCzkVqblC5Gwes7CbysQ=)`,
                           backgroundSize:'100%',
                           height:'800px',
                           backgroundRepeat:'no-repeat'
                        }}>
             <br></br>
             <h3 style = {{color:'whitesmoke'}}>USERS</h3>
             <div id = "order-table" className = "row">
             <table style={{marginLeft:'30px',width:'95%'}} className="table table-dark table-hover">


                        <thead>
                            <tr>
                                <th> USERID</th>
                                <th>USERNAME</th>
                                <th>ADDRESS</th>
                                <th>EMAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                                    {
                                       users.map((
                                        o)=>
                                
                                    
                                    <tr key = {o.userId}>
                                         <td> {o.userId} </td>
                                         <td>{o.username}</td>
                                         <td>{o.address}</td>
                                         <td>{o.email}</td>
                                             
                                         
                                        
                                    </tr>
                                    )}
    
                                       
                                    
     
                                    
                                    
                                

                        </tbody>
                            
                    </table>

             </div>

        </div>
        </div>
    )
}


export default ViewUsers;