// This is a form page where user can add their bill details, on sucessfull submit redirects to home page(display Bill component)

import './PatientForm.css';
import { db, firebaseStorage } from '../../firebase';
import { Fragment, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import HeaderComp from "../HeaderComp/HeaderComp";

// this for saving the image in firebase storage;
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { v4 } from "uuid";
import { useNavigate } from 'react-router-dom';

function PatientForm() {

    const [amountError, setAmountError] = useState(false);
    const [fileLimitError, setfileLimitError] = useState(false);
    const [error, setError] = useState(false);
    // const [dataSubmitted, setDataSubmitted] = useState(false);

    let navigate = useNavigate();

    // triggers onsubmit of the form
    async function getPatientBillDetails(e) {
        e.preventDefault();
        if ((!amountError && !fileLimitError)) {
            // adding images uploaded to storage: and getting the array of image urls
            let url_arr = []
            for (let i = 0; i < e.target.bill_files.files.length; i++) {
                var imagefile = e.target.bill_files.files[i];
                let url = await uploadImageToStorage(imagefile);
                url_arr.push(url)
            };

            // add the data to firebase
            addPatientdetails({
                patientName: e.target.patient_name.value,
                address: e.target.address.value,
                hospital_name: e.target.hospital_name.value,
                dateOfService: e.target.date_of_service.value,
                bill_amount: e.target.bill_amount.value,
                biil_images: url_arr
            })

            navigate("/")

        }
        else {
            setError(true)
        }
    }
    // adding the doc to the firebase firestore
    async function addPatientdetails(details) {

        try {
            const docRef = await addDoc(collection(db, 'patientDetails'),
                details
            );
            setError(false)
        } catch (e) {
            setError(true)
        }
    }

    // uploading the images to firebase storage and getting their image Urls in return
    function uploadImageToStorage(imagefile) {
        return new Promise(resolve => {
            const imageRef = ref(firebaseStorage, `images/${imagefile.name + v4()}`);
            uploadBytes(imageRef, imagefile).then((response) => {
                var image_path = response.metadata.fullPath;
                var get_storage = getStorage();
                getDownloadURL(ref(get_storage, image_path)).then((url) => {
                    resolve(url)
                })
            })
        })
    }

    // to validate if input amount bill is only numbers and accepts decimals too
    function validateBillAmount(e) {
        if (!Number(e.target.value) && (e.target.value) !== '') {
            setAmountError(true)
        } else {
            setAmountError(false)
        }
    }

    //setting limit to upload files to 2
    function limit_selection(e) {
        if (e.target.files.length > 2) {
            e.target.value = ''
            setfileLimitError(true);
        } else {
            setfileLimitError(false);
        }
    }


    return (
        <Fragment>
            <HeaderComp />

            <div className='patient_form_container'>
                <h1> Upload your bills</h1>
                <form className='form-data' onSubmit={(e) => getPatientBillDetails(e)}>

                    <label>Name : <input className='patient-name' required name='patient_name' placeholder='Enter Your Name'></input></label>
                    <label>Home Address : <input className='address' required name='address' placeholder='Enter Your address'></input></label>
                    <label>Hospital Name : <input required className='hospital-name' name='hospital_name' placeholder='hospital name'></input> </label>
                    <label> Date Of Service :  <input required type='date' className='DtService' name='date_of_service'></input> </label>
                    <label>Bill Amount($) :
                        <input
                            required
                            className='bill-amount'
                            name='bill_amount'
                            placeholder='bill amount'
                            onChange={(e) => validateBillAmount(e)}
                        ></input></label>

                    <label>Upload Bill :
                        <input type='file' className='bill_files' required name='bill_files' multiple accept="image/*" onChange={limit_selection} ></input></label>


                    {amountError && <div className='error'>Invalid Bill Amount only numbers are allowed</div>}
                    {fileLimitError && <div className='error'> Cannot upload more than 2 image files</div>}
                    {error && <div className='error'> Error sending the data. Please try again</div>}


                    <div className='submit_container'>
                        <button type='submit' className='patient_submit_btn' aria-label='saving form data' >Submit </button>
                    </div>
                </form>
            </div>

        </Fragment>
    )
}

export default PatientForm;