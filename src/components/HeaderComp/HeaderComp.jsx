import { Fragment } from "react";
import './HeaderComp.css';
import { useNavigate } from 'react-router-dom';

function HeaderComp(){

    let navigate = useNavigate();

    function openForm(){
        navigate('/PatientForm') 
    }

    function openHome(){
        navigate("/")
    }

    return(
        <Fragment>
            <div className="header_section">
                <h1>Truffle Health</h1>
                <div className="nav_section">
                    <button onClick={(e)=>openHome(e)}>Home</button>
                    <button onClick={(e) => openForm(e)}>Add New Bill</button>
                </div>
            </div>
        </Fragment>
    )

}

export default HeaderComp;