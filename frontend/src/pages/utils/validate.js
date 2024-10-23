export default function validate(values) {
    let errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name.trim()) {
        errors.name = "Name is Required"
    }

    if(!values.empid.trim()){
        errors.empid = "Employee Id is Required"
    }

    if(!values.email.trim()){
        errors.email = "Email Id is Required"
    }
    else if (!emailRegex.test(values.email.trim())) {
        errors.email = "Email is Invalid";
    }

    if(!values.dob.trim()){
        errors.dob = "Date of Birth is Required"
    }

    if(!values.phNo.trim()){
        errors.phNo = "Phone Number is Required"
    }

    if(!values.gender){
        errors.gender = "Gender is Required"
    }

    if(!values.jobTitle.trim()){
        errors.jobTitle = "Job Title is Required"
    }

    if(!values.department.trim()){
        errors.department = "Department is Required"
    }

    if(!values.workLocation.trim()){
        errors.workLocation = "Work Location is Required"
    }

    if(!values.doj.trim()){
        errors.doj = "Date of Joining is Required"
    }

    if(!values.empType.trim()){
        errors.empType = "Employee Type is Required"
    }

    if(!values.address){
        errors.address = "Address is Required"
    }

    if(!values.city.trim()){
        errors.city = "City is Required"
    }

    if(!values.state.trim()){
        errors.state = "State is Required"
    }

    if(!values.pinCode.trim()){
        errors.pinCode = "Pincode is Required"
    }

    return errors
}
