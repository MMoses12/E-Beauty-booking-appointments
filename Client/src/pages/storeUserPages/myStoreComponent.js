import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditText, EditTextarea } from 'react-edit-text';

const MyStoreComponent =  () => {
    const availableServices = ['service1','service2','service3','service4'];
    const availableCategories = ['tattoo','nails','hair','Barber'];
    const [storeName , setStoreName] = useState('Barberia')
    const [selectedCategory,setSelectedCategory] = useState('Categories')
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [email,setEmail] = useState("kkafantaris@uth.gr")
    const [number,setNumber] = useState("6985748856");
    const [time,setTime] = useState(["10:00 - 14:00"," 15:00 - 20:00"]);
    const [comment,setComment] = useState('We are friendly stuff');
    const [chosenServices,setChosenServices] = useState([]);

    const handlePhotoChange = (e) => {
        // Get the selected file from the input
        const file = e.target.files[0];
        
        // Do something with the file (e.g., save it to state)
        setSelectedPhoto(file);
    };

    const handleLogoChange = (e) => {
        // Get the selected file from the input
        const file = e.target.files[0];
        
        // Do something with the file (e.g., save it to state)
        setSelectedLogo(file);
    };

    const handleName  = (event) => {
        setStoreName(event.target.value);
    }

    const handleCommentChange = (value) => {
        setComment(value);
      };

      const handleEmailChange = (value) => {
        setEmail(value);
      };
      const handleNumberChange = (value) => {
        setNumber(value);
      };
    const saveComment=()=> {

    }

    const handleCategoryChoice =(code) =>{
        setSelectedCategory(code);
    }

    const handleServiceSelect = (service) => {
        if (chosenServices.includes(service)) {
            setChosenServices(chosenServices.filter((selected) => selected !== service));
        } else {
          setChosenServices([...chosenServices, service]);
        }
      };

      const handleTimeChange = (index, value) => {
        const updatedTime = [...time]; // Create a copy of the time state array
        updatedTime[index] = value; // Update the value at the specified index
        setTime(updatedTime); // Update the time state with the modified array
      };

      const makeChanges =()=> {
        if(selectedPhoto !== "null" && selectedLogo !== "null" && selectedCategory!=="Categories" && storeName !== "" && 
            chosenServices !== '' && comment !== "" && number !== "" && email !== ""){}
      }

    return(
        <div className='text-center shadow' style={{backgroundColor:"beige"}} >
            <div className='text-center shadow' style={{backgroundColor : "#ADD8E6", borderRadius: "0 0 1.5rem 1.5rem ",paddingTop:"5px",paddingBottom: "10px"}}>
                <h2 style={{fontFamily:"cursive", fontWeight:"bold" }}>Create and Edit your Store</h2>
            </div>

            <div>
                <h6 className='card-title text-center'  style={{fontWeight:"bold",fontFamily:"italic", marginTop:"20px"}}>➤Please fill all the following fields and then press Finish</h6>
            </div>
            <div className='container d-flex flex-row shadow' style={{borderRadius:'10px',width:"60%" ,marginTop:"20px",backgroundColor:"white"}}>
                <div style={{display:"flex",flexDirection:"column",  borderRight: '2px solid #ccc',width:"50%"}}>
                    <div>
                        <h5 className='card-title'style={{marginTop:"30px"}}>Add a photo of your Store</h5>
                        <input type="file" onChange={handlePhotoChange} style={{marginTop:"30px"}}/>
                        {selectedPhoto && <p>Selected file: {selectedPhoto.name}</p>}
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <h5 className='card-title'style={{marginTop:"30px"}}>Add the Logo of your Store</h5>
                        <input type="file" onChange={handleLogoChange} style={{marginTop:"30px"}}/>
                        {selectedLogo && <p>Selected file: {selectedLogo.name}</p>}
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",marginLeft:"10px", width:"50%"}}>
                    <div>
                        <h5 className='card-title' style={{marginTop:"30px"}}>Add the name of your Store</h5>
                        <input type="text" value={storeName} onChange={handleName} style={{marginRight:"10px",marginTop:"15px"}}></input>
                        <button style={{backgroundColor:"beige"}}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ADD8E6'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'beige'}>Save</button>
                    </div>
                    <div>
                        <h5 className='card-title' style={{marginTop:"30px"}}>Choose the category of your store</h5>
                        <Dropdown style={{marginTop:"15px"}}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'grey', borderColor: 'grey' }}>
                                {selectedCategory}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {availableCategories.map((category, index) => (
                                <Dropdown.Item key={index} onClick={() => handleCategoryChoice(category)}>
                                    <span style={{ marginLeft: '5px' }}>{category}</span>
                                </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className='container d-flex flex-row shadow bg-white mt-4' style={{width:"60%" , borderRadius:"10px"}}>
                <div style={{display:"flex",flexDirection:"column",paddingRight:"10px" ,borderRight: '2px solid #ccc',width:"50%"}}>
                    <div>
                        <h5 className = "card-title" style={{marginTop:"30px"}}>Add the services that you want</h5>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: 'grey', borderColor: 'grey' }}>
                            Services
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {availableServices.map((service, index) => (
                            <Dropdown.Item key={index} onClick={() => handleServiceSelect(service)}>
                                <input type="checkbox" checked={chosenServices.includes(service)} readOnly />
                                <span style={{ marginLeft: '5px' }}>{service}</span>
                            </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <div style={{marginBottom:"20px"}}>
                        <h5 className="card-title" style={{marginTop:"10px"}}> Your chosen services are:</h5>
                        <div style={{display:'flex',flexDirection:"row",alignItems:'center',justifyContent: 'center'}}>
                            <div>{chosenServices.join(', ')}</div>
                            <button style={{ cursor: "pointer", backgroundColor: "beige", width: "70px", marginLeft: '10px' ,borderRadius:"10px"}} 
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ADD8E6'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'beige'} >
                            Confirm
                            </button>
                        </div>
                        <h8 style={{fontSize:"0.7rem"}}>➤Press confirm to save your changes</h8>
                    </div>
                </div>
                <div style={{marginLeft:"10px",marginTop:"28px"}}>
                    <div>
                        <h4 className='text-center' style={{fontSize:"1.3rem"}}>Write an info text for your store page</h4>
                    </div>
                    <div className='d-flex flex-row' style={{justifyContent: 'center'}}>

                        <div className="comment-container">
                            <EditTextarea className="border comment" value={comment} onChange={handleCommentChange} style ={{height:'100px' , width :'250px',marginLeft:'20px',marginBottom:"20px", resize: 'none'}}
                                placeholder={comment}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex flex-column bg-white shadow" style={{borderRadius:"10px",width:"60%",marginTop:"20px"}}>
                    <div className="text-center" style={{display:"flex" , flexDirection:"column",justifyContent:'center',alignItems:'center'}}> 
                        <h4 className="card-title">Enter the function hours of your store (ex. HH:MM - HH:MM)</h4>
                        <input className="text-center" type="timeS" value={time[0]} style={{width:"200px",marginTop:"10px"}}
                            onChange={(e) => handleTimeChange(0, e.target.value)}>
                        </input>
                        <input  className="text-center" type="timeS" value={time[1]} style={{width:"200px",marginTop:"10px"}} 
                            onChange={(e) => handleTimeChange(1, e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <h4 className="card-title">Finally add store email and number</h4>
                        <div style={{display:"flex" ,flexDirection:"row" , gap:"20px",justifyContent:"center",alignItems:"center"}}>
                            <p>Email:</p>
                            <input type="email" value={email} onChange={handleEmailChange}></input>
                        </div>
                        <div style={{display:"flex" ,flexDirection:"row" , gap:"20px",justifyContent:"center",alignItems:"center"}}>
                            <p>Phone:</p>
                            <input type="number" value={number} onChange={handleNumberChange}></input>
                        </div>
                    </div>
            </div>
            <button onClick={makeChanges} style={{marginTop:" 20px",marginBottom:"20px",backgroundColor:"White",borderRadius:"10px"}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ADD8E6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'White'}>Confirm</button>
        </div>

    )

}
export default MyStoreComponent