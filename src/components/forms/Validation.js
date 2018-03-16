
/*
 Clear all validationStatus values in form
 */
export function clearVals(formValid){
    for (let key in formValid){
        formValid[key]=null
    }
    return formValid
}

export function changeToSuccess (formValid, name, context){
    context.setState({message:""})
    formValid[name]="success"
    context.setState({visibility:"hiddenAlert"})

    var errors= false;
    for (let key in formValid){
        if(formValid[key]!=="success")
            errors=true;
    }
    if (!errors)
        context.setState({buttonEnabled:true})
}

export function changeToError (formValid, name, context, message){
    formValid[name] = "error"
    context.setState({visibility:"alert-danger", message:message, buttonEnabled:false})

}

export function CheckBirth(date){
    let regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
    if (!date.match(regex))
        return false;
    let birthDate = new Date(date),
        currentDate = new Date();

    if (isNaN(birthDate.getTime()) || birthDate>currentDate || birthDate < new Date('1900/01/01')) {
        return false;
    }
    else return true;

}

export function CheckNotEmpty(str){
    return (str!=="")
}




export function CheckEmail(email){
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return (email.match(regex))
}


 /*Sets feedback to user based on what field is filled in (context.target.name)
 sets alarm text and success/error based on this.
*/


export function feedback(context, event) {
    let formValid = context.state.formValidation;

    switch (event.target.name) {
        case "password":
            if (!CheckPassword(event.target.value)) {
                changeToError(formValid, event.target.name, context, "Password must be at least 6 characters and contain upper/lower case letters and numbers")
                break;
            } else {
                changeToSuccess(formValid, event.target.name, context)
            }
            if (context.state.formValues.repeatPassword !== undefined || context.state.formValues.repeatPassword !== "")
                checkRepeated(context, formValid, context.state.formValues.repeatPassword, "repeatPassword");

            break;
        case "repeatPassword" :
            checkRepeated(context, formValid, event.target.value, event.target.name);

            break;
        case "email" :
            if (!CheckEmail(event.target.value)) {
                changeToError(formValid, event.target.name, context, "Email not valid")
            } else
                changeToSuccess(formValid, event.target.name, context);
            break;
        case "birth" :
            if (!CheckBirth(event.target.value)) {
                changeToError(formValid, event.target.name, context, "Birth date not valid")
            } else
                changeToSuccess(formValid, event.target.name, context);
            break;

        default:
            if (!CheckNotEmpty(event.target.value))
                changeToError(formValid, event.target.name, context, "Please fill in all fields")
            else
                changeToSuccess(formValid, event.target.name, context);

            break;
    }

}

export function checkRepeated(context, formValid, value, name){
    if(context.state.formValues.password!==value){
        changeToError(formValid,name, context, "Repeated password does not match")

    }
    else{
        if(!CheckPassword(value)){
            changeToError(formValid,name, context, "Password must be at least 6 characters and contain upper/lower case letters and numbers")
        }else
            changeToSuccess(formValid, name, context)

    }
}

export function CheckPassword(password, errors){
    let passwordError = errors;
    if (!password) {
        passwordError = 'Required';
        return passwordError;
    } else {
        // checkPassword(password, Auth.getToken());
        let regex = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{6,}$/;

        if (password.length > 5 && password.match(regex)) {
            passwordError = 'Password must be at least 6 characters and contain upper/lower case letters and numbers'
            return passwordError;
        }
    }
}

export function signUpValidate (values) {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required'
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }
    if (!values.surName) {
        errors.surName = 'Required'
    } else if (values.surName.length > 15) {
        errors.surName = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    errors.passw = CheckPassword(values.passw, errors.passw);
    /*if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'Sorry, you must be at least 18 years old'
    }*/
    console.log(errors);
    return errors
};
