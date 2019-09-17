const ParseURL = "http://localhost:1337/parse/functions/";
const RestURL = "http://localhost:1337/parse/";
const AppID = "YOUR_PARSE_APP_ID";
const ContentType = "application/json";

const FETCH_HEADERS = {
  "Content-Type": ContentType,
  "X-Parse-Application-Id": AppID
};

Parse.initialize(AppID);
Parse.serverURL = RestURL;

class ParseApi {
  static async getItemList() {
    const response = await fetch(ParseURL + "getItemList", {
      method: "POST",
      headers: FETCH_HEADERS
    });

    // console.log(response);

    return response.json(); // get body stream
  }

  static async getUserItemList() {
    try {
      const response = await Parse.Cloud.run("getUserItemList", {});
      let result = [];
      // console.log("getUserItemList", response);
      if (response) {
        response.forEach(element => {
          result.push(element.toJSON());
        });

        return result;
      } else {
        throw "Something Wrong";
      }
    } catch (error) {
      throw error;
    }
  }

  static async purchaseItem({ objectId, count }) {
    try {
      const result = await Parse.Cloud.run("purchaseItem", { objectId, count });
      if (result) {
        return result.toJSON();
      } else {
        throw "Something Wrong";
      }
    } catch (error) {
      throw error;
    }
  }

  static async sayHello() {
    const response = await fetch(ParseURL + "whoami", {
      method: "POST",
      headers: FETCH_HEADERS,
      body: JSON.stringify({
        name: "아이유",
        money: 1000000000000
      })
    });

    // console.log(response);

    return response.json(); // get body stream
  }

  static async signUp(username, password) {
    const response = await Parse.Cloud.run("signUp", { username, password });
  }

  static async signIn(username, password) {
    const user = await Parse.User.logIn(username, password);
    return user.toJSON();
  }

  static async logout() {
    try {
      const log = await Parse.User.logOut();
      // console.log(log);
      document.getElementById("logout-btn").style.visibility = "hidden";
      location.href = "../pages/index.html";
    } catch (error) {
      alert(error);
    }
  }

  static checkCurrentUser() {
    const user = Parse.User.current();

    if (user) {
      return user.toJSON();
    } else {
      return false;
    }
  }

  static async purchaseItem({ objectId, count }) {
    try {
      const result = await Parse.Cloud.run("purchaseItem", { objectId, count });
      if (result) {
        return result.toJSON();
      } else {
        throw "Something Wrong";
      }
    } catch (error) {
      throw error;
    }
  }

  // static async signIn(username,password){
  //     const response = await fetch(RestURL  + 'login',{
  //         method: "POST",
  //         headers: FETCH_HEADERS,
  //         body: JSON.stringify({
  //             username,
  //             password,
  //         })
  //     });
  //     console.log(response);
  //     return response.json();
  // }

  static async signOut(session_token) {
    const response = await fetch(RestURL + "logout", {
      method: "POST",
      headers: {
        "Content-Type": ContentType,
        "X-Parse-Application-Id": AppID,
        "X-Parse-Session-Token": session_token
      }
    });
    // console.log(response);
    return response.json();
  }
}
