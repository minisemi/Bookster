export function normalizeDate(value) {
        if (!value) {
            return value
        }
        const month = (value.getMonth()+1<10) ? "0"+String(value.getMonth()+1) : String(value.getMonth()+1);
        const date = (value.getDate()<10) ? "0"+String(value.getDate()) : String(value.getDate());
        return String(value.getFullYear())+"-"+month+"-"+date;
    };

/*export function CheckBirth(date){
    let regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/
    if (!date.match(regex))
        return false;
    let birthDate = new Date(date),
        currentDate = new Date();

    if (isNaN(birthDate.getTime()) || birthDate>currentDate || birthDate < new Date('1900/01/01')) {
        return false;
    }
    else return true;

}*/

function CheckFirstName(firstName, errors){
    if (!firstName) {
        errors.firstName = "Required";
    } else if (firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }
}

function CheckSurName(familyName, errors){
    if (!familyName) {
        errors.familyName = 'Required'
    } else if (familyName.length > 15) {
        errors.familyName = 'Must be 15 characters or less'
    }
}

function CheckEmail(email, errors){
    if (!email) {
        errors.email = "Required";
    } else {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = 'Invalid email address format';
        }
    }
}

function CheckPassword(password, errors){
    if (!password) {
        errors.password = "Required";
    } else {
        // checkPassword(password, Auth.getToken());
        let regex = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{6,}$/;

        if (password.length < 6 || !password.match(regex)) {
            errors.password = 'Password must be at least 6 characters and contain upper/lower case letters and numbers';
        }
    }
}

function CheckRepeatPassword(values, errors){
    if (!errors.password && values.password !== values.repeatPassw) {
        errors.repeatPassw = "Repeated password does not match";
    }
}

function CheckBirthdate(birth, errors){
    if (!birth) {
        errors.birth = 'Required'
    }
}

export function signUpValidate (values) {
    const errors = {};
    CheckFirstName(values.firstName, errors);
    CheckSurName(values.familyName, errors);
    CheckEmail(values.email, errors);
    CheckPassword(values.password, errors);
    CheckRepeatPassword(values, errors);
    CheckBirthdate(values.birth, errors);
    return errors
}

export function loginValidate (values) {
    const errors = {};
    CheckEmail(values.email, errors);
    CheckPassword(values.password, errors);
    return errors
}
