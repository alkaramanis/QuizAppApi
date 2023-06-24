/* eslint-disable */
const importDynamic = new Function('modulePath', 'return import(modulePath)');

const User = require('../models/userModel');
const WeeklyInfo = require('../models/weeklyInfo');
const catchAsync = require('./catchAsync');

async function getAllUserTokens() {
  const users = await User.find({ exponentPushToken: { $exists: true } });
  return users;
}

const fetch = async (...args) => {
  const module = await importDynamic('node-fetch');
  return module.default(...args);
};
exports.sendPushNotification = async (updatedWeek) => {
  try {
    const user = await User.findOne(
      updatedWeek.legendsId[updatedWeek.legendsId.length - 1]
    );

    function createMessage(exponentPushToken) {
      const bodyMessage = `${
        updatedWeek.legendsGonnaGetPaid - updatedWeek.currentLegends
      } to go`;
      const legend = user.name;
      const message = {
        to: exponentPushToken,
        sound: 'default',
        title: `The user ${legend} went legend`,
        body: bodyMessage,
        data: { someData: 'goes here' },
      };
      return message;
    }

    const userTokens = await getAllUserTokens();

    for (let index = 0; index < userTokens.length; index++) {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          createMessage(userTokens[index].exponentPushToken)
        ),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
