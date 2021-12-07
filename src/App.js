import React,{useState,useEffect} from 'react';
import './App.css';
import  Axios  from 'axios';


function App() {
  
  const [name,setName] = useState("");
  const [lastname,setLastname] = useState("");
  const [phone,setPhone] = useState("");
  const [studentList, setStudentList] = useState([])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      // console.log(response.data);
      setStudentList(response.data);
    })
  },[])

  const onSubmitButton = () =>{
    Axios.post("http://localhost:3001/api/insert",{
      name:name,
      lastname:lastname,
      phone:phone
    });
    setStudentList([...studentList,{name:name,lastname:lastname,phone:phone}])

  };

  const onDelete = (name) =>{
    Axios.delete(`http://localhost:3001/api/delete/${name}`)
  }


  return (

    <div className="App">
      <h1>Ogrenci Tablosu</h1>
      <div className="form">
        <label>İsim</label>
        <input type="text" name="ad" 
        onChange={(e) =>{setName(e.target.value)}}
        />
        <label>Soyisim</label>
        <input type="text" name="soyad" 
        onChange={(e) =>{setLastname(e.target.value)}}
        />
        <label>Tel No</label>
        <input type="text" name="tel" 
        onChange={(e) =>{setPhone(e.target.value)}}
        />
        <button onClick={onSubmitButton}>Kaydet</button>
      </div>

      
        {studentList.map((val)=>{
          return (
            <div className="card">
              <h2>isim : {val.name} </h2>
              <h5>Soy isim : {val.lastname} </h5>
              <h5>Tel : {val.phone} </h5>
              <button onClick={() => {onDelete(val.name)}}>Sil</button>
            </div>
          )
        })}
      

    </div>
  );
}

export default App;
