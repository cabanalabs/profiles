import {cabana} from "./index";

cabana.config.set({
  PROFILE_SERVER: 'http://localhost:3006',
  MINT_SERVER: 'http://localhost:3000',
  JWT_SECRET: 'secret'
});

cabana.auth.session({ id: '1234', name: 'Test', platform: 'discord'}).then((registration) => {
  console.log('registration', registration);

  cabana.profile.getPublicUrl('1110384782635966556', '223956314609418240').then((hello) => {
    console.log('imageUrl', hello);
  });

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


