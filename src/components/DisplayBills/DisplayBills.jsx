import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import { Fragment, useEffect, useState } from "react";
import './DisplayBills.css';
import HeaderComp from "../HeaderComp/HeaderComp";
import { useNavigate } from 'react-router-dom';


function DisplayBills() {

    const [billList, setBillList] = useState([])

    let navigate = useNavigate();

    async function fetchBills() {
        await getDocs(collection(db, 'patientDetails'))
            .then(snapshot => {
                const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setBillList(newData)

                console.log(" new data is", newData)
            })
    }


    useEffect(() => {
        fetchBills();
    }, []);

    function updateDetails(e, id){
        console.log("eeee is", e, id);
        navigate('/UpdateBills', {state : id}) 
    }
    

    function getList() {
        return (<ul className="bill_list_section">
            {billList.map(e => {
                return (
                    <li key={e.id}>
                        <div className="bill_container">
                            <img src={e.biil_images[0]} alt={e.hospital_name} width="300"></img>


                            <div>
                                <div><span> Name:</span> {e.patientName}</div>
                                <div><span> Address:</span> {e.address}</div>
                                <div><span> At Hospital:</span> {e.hospital_name}</div>
                                <div><span> Date of service:</span> {e.dateOfService}</div>
                                <div><span> Bill Amount:</span> {e.bill_amount}</div>

                            </div>

                            <div>
                                <button key = {e.id} onClick={(k) => updateDetails(k, e.id)}> Edit Details </button>
                            </div>


                        </div>
                    </li>
                )
            })}
        </ul>
        )
    }

    return (
        <Fragment>
            <HeaderComp />
            {getList()}
        </Fragment>
    )
}

export default DisplayBills;