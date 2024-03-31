import './app.css';
import { useState , useEffect} from 'react';
import axios from 'axios';
function App() {

  const [bool, setBool] = useState(false)

  const [user , setUser] = useState([]);

  const [data , setData] = useState({
    name : '',
    email  : '',
    password : '',
    dob :''
  })

  const [datas , setDatas] = useState({
    names : '',
    emails  : '',
    passwords : '',
    dobs :''
  })

  // const subForms = async (e) => {
  //   e.preventDefault()
  //   // const subs = await axios.post('http://localhost:3001/users' , {
  //   //   names : datas.names,
  //   //   emails : datas.emails,
  //   //   passwords : datas.passwords,
  //   //   dobs : datas.dobs
  //   // });
  //   // if(subs.data.status == true) {
  //   //   alert(subs.data.msg)
  //   // }
  //   // setBool(!bool)
  //   axios.put('http://localhost:3001/users' , {
  //     id : Id,
  //     names : datas.names,
  //     emails : datas.emails,
  //     passwords : datas.passwords,
  //     dobs : datas.dobs
  //   }).then((dt) => {
  //     if(dt) {
  //       setBool(!bool)
  //     }
  //   })
  // }

  useEffect(() => {
    axios.get('http://localhost:3001/users').then((dt) => {
      setUser(dt.data.data)
    })
  },[data]);

  const subForm = async (e) => {
    e.preventDefault()
    const sub = await axios.post('http://localhost:3001/users' , {
      name : data.name,
      email : data.email,
      password : data.password,
      dob : data.dob
    });
    if(sub.data.status == true) {
      alert(sub.data.msg)
    }
  }

  let name ; let value;
  const getForm = (e) => {
    name = e.target.name;
    value = e.target.value
    setData({...data , [name] : value})
  }

  let names ; let values;
  const getForms = (e) => {
    names = e.target.name;
    values = e.target.value
    setDatas({...datas , [names] : values})
  }

  const updte = (Id) => {
    setBool(!bool)
    axios.put('http://localhost:3001/users' , {
      id : Id,
      names : datas.names,
      emails : datas.emails,
      passwords : datas.passwords,
      dobs : datas.dobs
    }).then((dt)=>{
      if(dt){
        setBool(!bool)
      }
    })
  }

  const delte = (Id) => {
    axios.delete(`http://localhost:3001/users?id=${Id}`).then((dt) => {
      if(dt) {
        alert('delete success')
      }
    })
  }

  return (
    <>
      <div className = "container">
      <form onSubmit={subForm}>
      <div className = "inpt">
            <div>
               <label>Name</label> <input type = "text" name = "name" value = {data.name} onChange={getForm} />
            </div>
            <div>
            <label>Email</label> <input type = "text" name = "email" value = {data.email} onChange={getForm} />
            </div>
            <div>
            <label>password</label><input type = "password" name = "password" value = {data.password} onChange={getForm} />
            </div>
            <div>
            <label>DOB</label> <input type = "date" name = "dob" value = {data.dob} onChange={getForm}/>
            </div>
            <div>
              <button>Submit</button>
            </div>
        </div>       
      </form>
      <div className = "inpt tablecont">
            <table border='1' style={{border : '1px solid black',width : '100%',borderCollapse:'collapse'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>password</th>
                        <th>DOB</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                  
                  {
                        user.map((val) => {
                          return (
                            <tr key={val.id}>
                              <td>{val.name}</td>
                              <td>{val.email}</td>
                              <td>{val.password}</td>
                              <td>{val.dob}</td>
                              <td><button onClick={() => updte(val.id)}>
                                Update
                              </button></td>
                              <td><button onClick={() => delte(val.id)}>
                                Delete
                              </button></td>
                            </tr>
                          )
                        })
                      }
                  
                </tbody>
            </table>
        </div> 
      </div>

<div className='modal' style={{ display: bool ? 'block' : 'none' }}>
<form>
      <div className = "inpt">
            <div>
               <label>Name</label> <input type = "text" name = "names" value = {data.names} onChange={getForms} />
            </div>
            <div>
            <label>Email</label> <input type = "text" name = "emails" value = {data.emails} onChange={getForms} />
            </div>
            <div>
            <label>password</label><input type = "password" name = "passwords" value = {data.passwords} onChange={getForms} />
            </div>
            <div>
            <label>DOB</label> <input type = "date" name = "dobs" value = {data.dobs} onChange={getForms}/>
            </div>
            <div>
              <button onClick={updte}>update</button>
            </div>
        </div>       
      </form>
</div>

    </>
  );
}

export default App;
