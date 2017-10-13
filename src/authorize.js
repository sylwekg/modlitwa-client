const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export function translate(errMsg) {
	const transList = [
	  {
	    server: "Failed to fetch",
	    client: "Server not responding",
	  },
	];

	let result=errMsg;  
	transList.forEach( (item, index) => {
		//console.log('comparing ',errMsg.message,' with ',item.server);
		if(!errMsg.message.localeCompare(item.server)) 
			result.message = item.client;	
	}); 
	return result;
}

export function login(email, password) {
	let config = {
	    method: 'POST',
	    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
	    body: `username=${email}&password=${password}`
	}	
	return new Promise((resolve, reject) => {
		fetch(baseURL+'/api/sessions/create', config)
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
		}).catch(err => { 
			console.log("Login Error: ", err);
			reject(translate(err));
			})
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
	let path = baseURL+'/api/protected/users/'+userId;

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
		}).catch(err => { 
			console.log("Login Error: ", err);
			reject(translate(err));
		 })
	});
}

export function updateProfile( name, email, tel, imageUrl, token, userId) {
	var data = new FormData();
	data.append("name",name);
	data.append("email",email);
	data.append("tel",tel);
	data.append("imageUrl",imageUrl);

	let config = {
	    method: 'POST',
	    headers: { 
	     	'Authorization': 'Bearer '+ token 
	    },
	    body: data
	}	
	let path = baseURL+'/api/protected/users/edit/'+userId;
	return new Promise((resolve, reject) => {
		fetch(path, config)
		  .then(response =>
		    response.json()
		    .then(user => ({ user, response }))
		  ).then(({ user, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
		      console.log('error on save attempt');
		      reject(user)
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => {
			console.log("Upload Error: ", err);
			reject(translate(err));
		})
	});
}


export function getGroupData(groupId, token) {
	let config = {
	    method: 'GET',
	    headers: { 
	    	'Content-Type':'application/x-www-form-urlencoded', 
			'Authorization': 'Bearer '+token
		},
	};
	let path = baseURL+'/api/protected/groups/'+groupId;

	return new Promise((resolve, reject) => {
		fetch(path, config)
		  .then(response =>
		    response.json()
		    .then(data => ({ data, response }))
		  ).then(({ data, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
		      reject(data)
		    }
		    else {
		      // If respons was successful
		      resolve(data)
		    }
		}).catch(err => { 
			console.log("Login Error: ", err);
			reject(translate(err));
		 })
	});
}

export function deleteMsg( msgId, userId, token ) {
	let config = {
	    method: 'POST',
	    headers: { 
	    	'Content-Type':'application/x-www-form-urlencoded', 
	     	'Authorization': 'Bearer '+ token 
	    },
	    body: `msgId=${msgId}&userId=${userId}`
	}
	return new Promise((resolve, reject) => {
		fetch(baseURL+'/api/protected/messages/delete', config)
		  .then(response => response.json()
		  	.then(user => ({ user, response }))
		  ).then(({ user, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
		      reject(user)
		    }
		    else {
		      // If delete was successful, return reslut
		      resolve(user)
		    }
		}).catch(err => { 
			console.log("delete Error: ", err);
			reject(translate(err));
			})
	});
}
