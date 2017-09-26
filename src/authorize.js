

export function login(email, password) {
	let config = {
	    method: 'POST',
	    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
	    body: `username=${email}&password=${password}`
	}	
	return new Promise((resolve, reject) => {
		fetch('http://localhost:3001/api/sessions/create', config)
		  .then(response =>
		    response.json()
		    .then(user => ({ user, response }))
		  ).then(({ user, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
		      reject(user)
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => console.log("Login Error: ", err))
	});
}


export function getProfile(userId, token) {
	let config = {
	    method: 'GET',
	    headers: { 
	    	'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer '+token
		},
	};
	let path = 'http://localhost:3001/api/protected/users/'+userId;

	return new Promise((resolve, reject) => {
		fetch(path, config)
		  .then(response =>
		    response.json()
		    .then(user => ({ user, response }))
		  ).then(({ user, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
		      reject(user)
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => console.log("Login Error: ", err))
	});
}