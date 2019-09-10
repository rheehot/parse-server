const ParseURL = 'http://localhost:1337/parse/functions/';
const RestURL = 'http://localhost:1337/parse/';
const AppID = 'YOUR_PARSE_APP_ID';
const ContentType = 'application/json';

const FETCH_HEADERS = {
    "Content-Type": ContentType,
    "X-Parse-Application-Id": AppID,
}

class ParseApi {
    static async sayHello() {
        const response = await fetch(ParseURL + 'whoami', {
            method: "POST",
            headers: FETCH_HEADERS,
                body: JSON.stringify({
                "name": "아이유",
                "money": 1000000000000,
            })
        });

        console.log(response);

        return response.json(); // get body stream
    }

    static async signUp(username,password){
        const response = await fetch(ParseURL + 'signUp',{
          method: "POST",
          headers : FETCH_HEADERS,
          body: JSON.stringify({
            username,
            password,
          })
        });
        console.log(response);
        return response.json();
    }

    static async signIn(username,password){
        const response = await fetch(RestURL  + 'login',{
            method: "POST",
            headers: FETCH_HEADERS,
            body: JSON.stringify({
                username,
                password,   
            })
        });
        console.log(response);
        return response.json();
    }

    static async signOut(session_token){
        const response = await fetch(RestURL  + 'logout',{
            method:"POST",
            headers: {
                "Content-Type": ContentType,
                "X-Parse-Application-Id": AppID,
                "X-Parse-Session-Token":session_token,
            }
        })
        console.log(response);
        return response.json();
    }
}

