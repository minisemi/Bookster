/**
 * Created by Matilda on 2017-05-18.
 */

import {checkPassword} from './utils/auth-api'
import Auth from './Auth'

class Validation{

    static clearVals(formValid){
        for (let key in formValid){
            formValid[key]=null
        }
        return formValid
    }

    static changeToSuccess (formValid, name, context){
        context.setState({message:""})
        formValid[name]="success"
        context.setState({visibility:"hiddenAlert"})

        var errors= false;
        for (let key in formValid){
            if(formValid[key]!="success")
                errors=true;
        }
        if (!errors)
            context.setState({buttonEnabled:true})
    }

    static changeToError (formValid, name, context, message){
        formValid[name] = "error"
        context.setState({visibility:"alert-danger", message:message, buttonEnabled:false})

    }

    static CheckBirth(date){
        let regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/
        if (!date.match(regex))
            return false;
        let birthDate = new Date(date),
            currentDate = new Date();
        console.log(birthDate)
        if (birthDate>currentDate || birthDate < new Date('1900/01/01')) {
            return false;
        }
        else return true;

    }

    static CheckNotEmpty(str){
        return (str!="")
    }


    static checkRepeated(context, formValid, value, name){
        if(context.state.formValues.password!=value){
                    Validation.changeToError(formValid,name, context, "Repeated password does not match")

                }
                else{
                    if(!Validation.CheckPassword(value)){
                        Validation.changeToError(formValid,name, context, "Password must be at least 6 characters and contain upper and lower case letters")
                    }else
                        Validation.changeToSuccess(formValid, name, context)

                }
    }

    static CheckPassword(password){
        // checkPassword(password, Auth.getToken());
        let regex = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{6,}$/;

        if(password.length>5 && password.match(regex)){
            return true;
        }

        return false;
    }

    static CheckEmail(email){
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        return (email.match(regex))
    }

    static feedback(context, event){
        let formValid = context.state.formValidation;

        switch (event.target.name) {
            case "password":
                if(!Validation.CheckPassword(event.target.value)){
                    Validation.changeToError(formValid, event.target.name, context, "Password must be at least 6 characters and contain upper and lower case letters")
                    break;
                }else{
                    Validation.changeToSuccess(formValid, event.target.name, context)
                    break;
                }
                if(context.state.formValues.repeatPassword!=undefined || context.state.formValues.repeatPassword!="")
                    Validation.checkRepeated(context, formValid, context.state.formValues.repeatPassword, "repeatPassword");

                break;
            case "repeatPassword" :
                Validation.checkRepeated(context, formValid, event.target.value, event.target.name);

                break;
            case "email" :
                if (!Validation.CheckEmail(event.target.value)){
                    Validation.changeToError(formValid, event.target.name,context, "Email not valid")
                }else
                    Validation.changeToSuccess(formValid, event.target.name, context);
                break;
            case "birth" :
                if (!Validation.CheckBirth(event.target.value)){
                    Validation.changeToError(formValid, event.target.name,context, "Birth date not valid")
                }else
                    Validation.changeToSuccess(formValid, event.target.name, context);
                break;

            default:
                if (!Validation.CheckNotEmpty(event.target.value))
                    Validation.changeToError(formValid, event.target.name,context, "Please fill in all fields")
                else
                    Validation.changeToSuccess(formValid, event.target.name, context);

                break;
        }

    }

}



export default Validation;