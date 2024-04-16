import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BanCustomerComponent =  () => {
    const [banUser,setBanUser] = useState('');
    const [unbanUser,setunBanUser] = useState('');
    const [bannedUsers,setBannedUsers] = useState(['yolo','diaby']);
    const [displayBannedUsers, setDisplayBannedUsers] = useState('');

    const addBan = ()=> {
        setBannedUsers([...bannedUsers,banUser]);
    }
    const removeBan = (userToRemove) => {
        const updatedBannedUsers = bannedUsers.filter((user) => user !== userToRemove);
        setBannedUsers(updatedBannedUsers);
      };
    const handleInputChange = (e) => {
        setBanUser(e.target.value);
    };
    const handleRemoveChange = (e) => {
        setunBanUser(e.target.value);
    };
    const showBanned=()=>{
        setDisplayBannedUsers(
            <select>
              {bannedUsers.map((user, index) => (
                <option key={index}>{user}</option>
              ))}
            </select>
          );
    }
    return(
        <div className='text-center' style={{display:"flex",flexDirection:"column",backgroundColor:"beige",alignItems:'center',height:"100vh"}}>
            <div className='text-center shadow' style={{backgroundColor : "#ADD8E6", width:"100%",borderRadius: "0 0 1.5rem 1.5rem ",paddingTop: "5px",paddingBottom:"15px"}}>
                <h2 className="card-title" style={{fontFamily:"cursive", fontWeight:"bold" }}>You are available to ban a customer</h2>
            </div>
            <div></div>
            <div style={{display:"flex",flexDirection:"row",gap:"20px"}}>      
                <div className="card shadow" style={{width:"350px",height:"300px",justifyContent:"center",marginTop:"100px"}}>
                    <div>
                        <h5 className="cart-title">Enter the username you want to ban:</h5>
                        <input type="text" value={banUser} onChange={handleInputChange}></input>
                        <button style={{borderRadius:"10px" , backgroundColor:"tomato",marginLeft:"20px"}} onClick={addBan}>Ban</button>
                    </div>
                </div>
                <div>
                    <div className="card shadow" style={{width:"350px",height:"300px",justifyContent:"center",marginTop:"100px"}}>
                        <div>
                            <div style={{marginTop:"20px"}}>
                            <div style={{display:"flex",flexDirectiob:"row",justifyContent:"center"}}>
                                <h5 className="card-title">See banned users:</h5>
                                <button onClick={showBanned}>Update List</button> 
                            </div>
   
                                <p>{displayBannedUsers && displayBannedUsers}</p>
                            </div>
                            <h5 className="cart-title">Enter the username you want to ban:</h5>
                            <input type="text" value={unbanUser} onChange={handleRemoveChange}></input>
                            <button style={{borderRadius:"10px" , backgroundColor:"green",marginLeft:"20px"}} onClick={() => removeBan(unbanUser)}>Unban</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default BanCustomerComponent