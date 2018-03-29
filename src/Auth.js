import Cookies from 'universal-cookie';
var cookie = new Cookies();
class Auth {

    static authenticateUser(token, email, userId) {
        cookie.set('token', token);
        cookie.set('email', email);
        if (userId){
            cookie.set('userId', userId);
        }
    }

    static switchCred(token, email){
        cookie.remove('token');
        cookie.remove('email');
        let userId = cookie.get('userId');
        cookie.remove('userId');
        this.authenticateUser(token, email, userId);
    }

    static checkIfAuthenticated() {
        console.log("token");
        console.log(cookie.get('token'));
        console.log(cookie.get('token') != null);
        return cookie.get('token') != null;
    }

    static deauthenticateUser() {
        console.log("deautenticate1");
        cookie.remove("token");
        cookie.remove('userId');
        cookie.remove('email');
        console.log("deautenticate2");
    }

    static getToken() {
        return cookie.get('token');
    }

    static getEmail(){
        return cookie.get('email');
    }

    static getUserId(){
        return cookie.get("userId");
    }

    static getUser(){
        return this.checkIfAuthenticated() ?
            { token: cookie.get("token") }
            :
            {};
    }

}

export default Auth;