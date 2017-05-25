/**
 * Created by Matilda on 2017-05-18.
 */

import {checkPassword} from './utils/auth-api'
import Auth from './Auth'

class Validation{

    static changeToSuccess (formValid, name, context){
        context.setState({message:""})
        formValid[name]="success"
        context.setState({visibility:"hiddenAlert"})
    }

    static changeToError (formValid, name, context, message){
        formValid[name] = "error"
        context.setState({visibility:"alert-danger"})
        context.setState({message:message})
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

    }

    static feedback(context, event){
        let formValid = context.state.formValidation;

        switch (event.target.name) {
            case "newPassword":
                if(!Validation.CheckPassword(event.target.value)){
                    Validation.changeToError(formValid, event.target.name, context, "Password must be at least 6 characters and contain upper and lower case letters")

                }else{
                    Validation.changeToSuccess(formValid, event.target.name, context)
                }

                break;
            case "repeatPassword" :
                if(context.state.formValues.newPassword!=event.target.value){
                    Validation.changeToError(formValid,event.target.name, context, "Repeated password does not match")

                }
                else{
                    Validation.changeToSuccess(formValid, event.target.name, context)

                }
                break;

            default:
                break;
        }

    }

}



export default Validation;