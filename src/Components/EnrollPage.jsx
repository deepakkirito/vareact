import axios from 'axios';
import { useState } from 'react';
import classes from '../Styles/EnrollPage.module.scss';

const baseUrl = 'http://localhost:7000/enroll'

function EnrollPage() {

    const [formDetails, setFormDetails] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitForm = () => {
        setLoading(true);
        axios.post(baseUrl, formDetails).then(response => {
            console.log(response.data);
            if (response.data === 'inserted') {
                setLoading(false);
                setFormSubmitted(true)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        })
    }



    return (
        <div className={classes.EnrollPage}>
            <section className="h-100 bg-dark">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                            alt="Sample photo" className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-xl-6">
                                        <form
                                            className="card-body p-md-5 text-black"
                                            onChange={e => setFormDetails({ ...formDetails, [e.target.id]: e.target.value })}
                                        >
                                            <h3 className="mb-5 text-uppercase"> Student enrollment form </h3>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="firstName"
                                                            className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="firstName"> First name </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="lastName"
                                                            className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="lastName"> Last name </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="motherName"
                                                            className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="motherName"> Mother's name </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" id="fatherName"
                                                            className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="fatherName"> Father's name </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                                <h6 className="mb-0 me-4"> Gender: </h6>
                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                        id="femaleGender" value="Female" />
                                                    <label className="form-check-label" htmlFor="femaleGender"> Female </label>
                                                </div>
                                                <div className="form-check form-check-inline mb-0 me-4">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                        id="maleGender" value="Male" />
                                                    <label className="form-check-label" htmlFor="maleGender"> Male </label>
                                                </div>
                                                <div className="form-check form-check-inline mb-0">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                        id="otherGender" value="Other" />
                                                    <label className="form-check-label" htmlFor="otherGender"> Other </label>
                                                </div>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="date" id="dob" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="dob"> Date of Birth </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="phoneNumber" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="phoneNumber"> Phone Number </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="email" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="email"> Email ID </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="course" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="course"> Course </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="text" id="address" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="address"> Address </label>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <select id="countryState" name="countryState"
                                                    >
                                                        <option>--Select-State--</option>
                                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar
                                                            Islands</option>
                                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                        <option value="Assam">Assam</option>
                                                        <option value="Bihar">Bihar</option>
                                                        <option value="Chandigarh">Chandigarh</option>
                                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli
                                                        </option>
                                                        <option value="Daman and Diu">Daman and Diu</option>
                                                        <option value="Delhi">Delhi</option>
                                                        <option value="Goa">Goa</option>
                                                        <option value="Gujarat">Gujarat</option>
                                                        <option value="Haryana">Haryana</option>
                                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                        <option value="Jharkhand">Jharkhand</option>
                                                        <option value="Karnataka">Karnataka</option>
                                                        <option value="Kerala">Kerala</option>
                                                        <option value="Ladakh">Ladakh</option>
                                                        <option value="Lakshadweep">Lakshadweep</option>
                                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                        <option value="Maharashtra">Maharashtra</option>
                                                        <option value="Manipur">Manipur</option>
                                                        <option value="Meghalaya">Meghalaya</option>
                                                        <option value="Mizoram">Mizoram</option>
                                                        <option value="Nagaland">Nagaland</option>
                                                        <option value="Odisha">Odisha</option>
                                                        <option value="Puducherry">Puducherry</option>
                                                        <option value="Punjab">Punjab</option>
                                                        <option value="Rajasthan">Rajasthan</option>
                                                        <option value="Sikkim">Sikkim</option>
                                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                                        <option value="Telangana">Telangana</option>
                                                        <option value="Tripura">Tripura</option>
                                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        <option value="Uttarakhand">Uttarakhand</option>
                                                        <option value="West Bengal">West Bengal</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="text" id="pinCode" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="pinCode"> Pincode </label>
                                            </div>
                                                <div className="alert alert-success" role="alert"
                                                    style={formSubmitted ? { 'display': 'flex' } : { 'display': 'none' }}
                                                >
                                                    Form Submitted Successfully!
                                                </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <img src="https://cdn-icons-png.flaticon.com/512/4461/4461744.png" alt="Loading" className={classes.loading}
                                                    style={loading ? {'display':'flex'} : {'display':'none'}}></img>
                                                <button
                                                    type="button"
                                                    className="btn btn-warning btn-lg ms-2"
                                                    onClick={submitForm}
                                                    // disabled={Object.keys(formDetails).length < 12}
                                                > Submit form </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EnrollPage;
