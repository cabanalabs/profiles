require('dotenv').config({path: './.env'});
import {cabana} from "./index";

cabana.config.set({
  PROFILE_SERVER: 'http://localhost:3006',
  MINT_SERVER: 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET
});

cabana.auth.session({ id: '1234', name: 'Test', platform: 'discord'}).then((registration) => {
  console.log('registration', registration);

  cabana.profile.getPublicUrl('1080536264882790480', '350495033620824074').then((hello) => {
    console.log('imageUrl', hello);
  });

  cabana.badges.getList('1080536264882790480').then((badges) => {
    console.log('badges', badges && JSON.stringify(badges,null,2));
  });

  // cabana.profile.draft('1', '2', { name: 'A', title: 'B', avatar: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg'}).then((hello) => {
  //   console.log('url', hello);
  // });

  // cabana.badges.getList('1234').then((badges) => {
  //   console.log('badges', badges && JSON.stringify(badges,null,2));
  // });
  //
  // cabana.auth.tenantInfo('1234').then((info) => {
  //   console.log('tenantInfo: ', info);
  // });

  // cabana.auth.resetRegistration('1234', '1').then(() => {
  //   console.log('reset success');
  // });
  // //
  // cabana.profile.redeem('1234', '1', '1112').then((msg) => {
  //   console.log('Redeem: ', msg);
  // });

  // cabana.profile.avatar('1234', '1', 'https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg').then((url) => {
  //   console.log('avatar', url);
  // });
});


