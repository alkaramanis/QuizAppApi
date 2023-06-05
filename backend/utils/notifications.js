const importDynamic = new Function('modulePath', 'return import(modulePath)');
const fetch = async (...args) => {
    const module = await importDynamic('node-fetch');
    return module.default(...args);
  };
  exports.sendPushNotification = async(updatedWeek) => {

    function createMessage () {
      const bodyMessage = `${updatedWeek.legendsGonnaGetPaid-updatedWeek.currentLegends} to go`
      const message = {
        to: exponentPushToken,
        sound: 'default',
        title: `The user ${updatedWeek.id} went legend`,
        body: bodyMessage,
        data: { someData: 'goes here' },
        }
      return message 
    };
  
    const userTokens = await getAllUserTokens()
    
  for (let index = 0; index < userTokens.length; index++) {
  
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createMessage(userTokens[index].exponentPushToken)),
    });
    
  }
}