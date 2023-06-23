import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase';
import HeaderComp from "../HeaderComp/HeaderComp";
import './UpdateBills.css';

import { useNavigate } from 'react-router-dom';


function UpdateBills() {

    let navigate = useNavigate();

    const [billData, setBillData] = useState({})
    const [amountError, setAmountError] = useState(false);
    const [error, setError] = useState(false);


    const location = useLocation();

    var Id = location.state;

    const docRef = doc(db, 'patientDetails', Id);

    // gettting details of the particular bill user wanna update
    async function getDocument() {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setBillData(docSnap.data())
            } else {
               setError(true)
            }
        }
        catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        getDocument()
    }, []);


    // to validate if input amount bill is only numbers and accepts decimals too
    function validateBillAmount(e) {
        if (!Number(e.target.value) && (e.target.value) !== '') {
            setAmountError(true)
        } else {
            setAmountError(false)
        }
    }

    // trigerrs onsubmit of the form to update the details
    async function updateBillDetails(e) {
        e.preventDefault();
        if (!amountError) {
            setError(false)
            const billDetailRef = doc(db, 'patientDetails', Id);
            await updateDoc(billDetailRef, {
                patientName: e.target.patient_name.value,
                address: e.target.address.value,
                hospital_name: e.target.hospital_name.value,
                dateOfService: e.target.date_of_service.value,
                bill_amount: e.target.bill_amount.value,
            })

            navigate("/")

        } else {
            setError(true)

        }
    }


    // displaying the initial data 
    function displayData() {
        return (
            <div className="updateBill_container">
                <h1>Update the Bill Details</h1>
                <form className="updateBill_section" onSubmit={(e) => updateBillDetails(e)}>
                    <div>

                        <div> <span> Name:</span> </div>

                        <div> <input
                            className='patient-name'
                            required
                            name='patient_name'
                            defaultValue={billData.patientName}
                            placeholder='Enter Your Name'></input>
                        </div>

                    </div>

                    <div>
                        <div> <span> Address:</span> </div>
                        <div>
                            <input
                                className='address'
                                required name='address'
                                placeholder='Enter Your address'
                                defaultValue={billData.address}
                            ></input> </div>
                    </div>

                    <div>
                        <div> <span>At Hospital:</span> </div>
                        <div>
                            <input
                                required
                                className='hospital-name'
                                name='hospital_name'
                                placeholder='hospital name'
                                defaultValue={billData.hospital_name}
                            ></input></div>
                    </div>

                    <div>
                        <div> <span>Date of service:</span>  </div>
                        <div>
                            <input
                                required
                                type='date'
                                className='DtService'
                                name='date_of_service'
                                defaultValue={billData.dateOfService}
                            ></input> </div>
                    </div>

                    <div>
                        <div> <span> Bill Amount:</span> </div>
                        <div>
                            <input
                                required
                                className='bill-amount'
                                name='bill_amount'
                                placeholder='bill amount'
                                defaultValue={billData.bill_amount || ''}
                                onChange={(e) => validateBillAmount(e)}
                            ></input>
                        </div>
                    </div>

                    {amountError && <div className='error'>Invalid Bill Amount only numbers are allowed</div>}
                    {error && <div className="error">Cannot update the details !!. Please try again later</div>}

                    <div className='update_container'>
                        <button type='submit' aria-label='update data' >Update </button>
                    </div>

                </form>
            </div>
        )
    }


    return (
        <Fragment>
            <HeaderComp />
            {displayData()}


        </Fragment>
    );
}

export default UpdateBills;