import "../layout.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";


function Layout({ children }) {
  const { user } = useSelector((state) => state.user)
  const location = useLocation()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      
      const response = await axios.post("/api/user/form", values);
  
    } catch (error) {
      console.log(error)
    }
  };
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-5-fill",
    },
    {
      name: "Application form",
      path: "/getform",
      icon: "ri-file-list-2-fill",
    },
    {
      name: "View Application",
      path: "/viewapps",
      icon: "ri-list-unordered",
    },


  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-5-fill",
    },
    {
      name: "User list",
      path: "/admin/userslist",
      icon: "ri-file-list-2-fill",
    } , 
    {
      name: "Applications list",
      path: "/admin/app-list",
      icon: "ri-file-list-2-fill",
    },
    {
      name: "Slots",
      path: "/admin/slots",
      icon: "ri-bookmark-fill",
    }
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex-layout">
        <div className='sidebar'>
          <h1 className="text" > JOBHUB </h1>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path
              return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            })}
            <div className='d-flex menu-item' onClick={(onFinish) => {
              localStorage.clear()
              navigate('/login')
            }}>
              <i className='ri-logout-box-fill'></i>
              <Link> Logout</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <div className="d-flex align-items-center P-5">
            <Link className="anchor" to='/logout' >{user?.name.toUpperCase()}<p>{user?.time}</p></Link>
          </div>
        </div>
        <div className="body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
