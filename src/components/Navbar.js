import React from 'react'

const Navbar = (props) => {
    // const[setStyle,setMyStyle] = useState({
    //   color:'black',
    //   backgroundColor:'white'
    // })

    // const[btnText,setBtnText]=useState("Enable Dark Mode") 
    
    // const toggleStyle=()=>{
    //   if(setStyle.color==='white')
    //   {
    //     setMyStyle({
    //       color:'white',
    //       backgroundColor:'black'
    //     })
    //     setBtnText("Enable Light Mode");
    //   }
    //   else{
    //     setMyStyle({
    //       colour:'black',
    //       backgroundColor:'white'
    //     })
    //     setBtnText("Enable Dark Mode");
    //   }
    // }

  return (
    <>
     <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} shadow-sm py-2`}>
    <div className="container-fluid">
      <a className="navbar-brand fw-bold" href="/">
        <i className="fas fa-text-height me-2"></i>
        {props.title}
      </a>
      
      <div className="d-flex align-items-center">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={props.toggleMode}
          />
          <label className={`form-check-label text-${props.mode === 'light' ? 'dark' : 'light'} ms-2`}>
            Dark Mode
          </label>
        </div>
      </div>
    </div>
  </nav>
    
    </>
  )
}

// Navbar.defaultProps={
//   title:'Enter title here',
// };
export default Navbar
