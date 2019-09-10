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
  user.set("useremail", useremail);
  user.set("cash", 1000000);

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

Parse.Cloud.define("getItemList", async req => {
  const Character = Parse.Object.extend("Character"); // Get class from database
  const query = new Parse.Query(Character); // Make query from class

  try {
    const result = await query.find(); // Get all datas
    return result;
  } catch (error) {
    throw error;
  }
});

Parse.Cloud.define('purchaseItem', async (req) => {
  const user = req.user;
  const objectId = req.params.objectId;
  const count = req.params.count;

  if (user == null) {
    throw Error('There is no user');
  }

  const userCash = user.get('cash');

  console.log('UserCash: ', userCash)

  //  Character from objectId
  const Character = Parse.Object.extend('Character'); // Get class from database
  let character = new Character();
  character.id = objectId;

  // userCharacterQuery
  const UserCharacter = Parse.Object.extend('UserCharacter'); // Get class from database
  const userCharacterQuery = new Parse.Query(UserCharacter); // Make query from class

  try {
    character = await character.fetch();
    const characterPrice = character.get('price');
    const characterCount = character.get('count');

    if (characterCount < count) {
      throw Error('There is not enough items');
    }

    if (userCash < characterPrice*count) {
      throw Error('Not enough cash');
    }

    // Find exist characters whice user bought before
    userCharacterQuery.equalTo('user', user);
    userCharacterQuery.equalTo('character', character);
    let userCharacter = await userCharacterQuery.first();

    if (userCharacter == null) {
      userCharacter = new UserCharacter();
    }

    character.increment('count', -count);
    user.increment('cash', -characterPrice*count);
    userCharacter.set('user', user);
    userCharacter.set('character', character);
    userCharacter.increment('count', count);

    await user.save(null, {useMasterKey: true});
    await userCharacter.save();
    return character.save();
  } catch (error) {
    throw error;
  
  }
})