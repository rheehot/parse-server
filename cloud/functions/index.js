Parse.Cloud.define('hello', (req) => {
  return '끄아아아아앙 키키ㅣㅋ키이이이러ㅡ이ㅏ루니우';
});

Parse.Cloud.define('whoami', (req)=>{
  const name = req.params.name;
  const money = req.params.money;

  const result = `Hello. ${name}! You will earn $${money}!!!`
  return result;
})

Parse.Cloud.define('signUp', async(req) => {
  const user = new Parse.User();
  const username = req.params.username;
  const password = req.params.password;
  const useremail = req.params.useremail;

  user.set("username", username);
  user.set("password", password);
  user.set("useremail", useremail)

  if (username == null || password == null){
    throw Error("There is wrong inputs")
  }

  try{
    const result = await user.signUp();
    return result;
  } catch(error){
    console.log("Error:"+error.code + " "+ error.message);
    throw error;
  }
});