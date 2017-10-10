import {login} from './authorize';
import {getProfile} from './authorize';


describe('Watch-dog', () => {
	test('Alive test', () => {
		expect("terefere").toMatch("terefe");
	})
});



describe('Client-server tests', () => {

	// var profileLogin;
	// var profileToken;

	// beforeAll(() => {
	// 	return login('test@test.pl', 'user')
	// 	.then( data => {
	// 		profileLogin=data.user._id;
	// 		profileToken=data.access_token;
	// 	});
	// });

	let fakeUserId = 'test';
	let password = 'test';

	test('Login with invalid user or password', () => {
	  	expect.assertions(1);
	    return login(fakeUserId, password)
	    .catch(data => {
	    	expect(data.message).toMatch("The username or password don't match");
	  	});
	});

	let userId = 'test@test.pl';
	password = 'user';

	test('Login with correct user and password', () => {
	  	expect.assertions(3);
	    return login(userId, password)
	    .then( data => {
	    	expect(data.access_token).toBeDefined();
	    	expect(data.user._id).toBeDefined();
	    	expect(data.user.email).toBe(userId);
	  	})
	});



	// test('Get profile data', () => {
	// 	console.log(profileLogin, profileToken);
	// 	expect.assertions(1);
	// 	return getProfile(profileLogin, profileToken)
 //  		.then( profile => {
 //  			expect(profile.user._id).toBeDefined();
 //  		})	
  		
 //  	});





});


