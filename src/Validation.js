/**
 * Created by Matilda on 2017-05-18.
 */

import {checkPassword} from './utils/auth-api'
import Auth from './Auth'

class Validation{

    static CheckPasswordStrength(password){

    }

    static CheckPassword(password){
       // checkPassword(password, Auth.getToken());

        if (password.length<5) return true;

        return false;

    }
}

export default Validation;