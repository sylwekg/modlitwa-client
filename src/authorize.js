const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export function translate(errMsg) {
	const transList = [
	  {
	    server: "Failed to fetch",
	    client: "Server is not responding",
		},
	  {
	    server: "Unauthorized",
	    client: "Please login",
		},

		
	];
//	console.log('translate Input =>',errMsg);
	let result=Object.assign({},errMsg);  
	transList.forEach( (item, index) => {
		//console.log('comparing ',errMsg.message,' with ',item.server);
		if(!errMsg.message.localeCompare(item.server)) {
			result=Object.assign({},result, { message: item.client })
			//console.log('translate Out =>',result);
		}
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
					if(user.message)
						reject(translate({message: user.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => { 
			console.log("Login Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
			});
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
					if(user.message)
						reject(translate({message: user.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => { 
			console.log("Login Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
			});
	});
}

export function updateProfile( name, email, tel, imageUrl,file, token, userId) {
	var data = new FormData();
	data.append("name",name);
	data.append("email",email);
	data.append("tel",tel);
	data.append("imageUrl",imageUrl);
	data.append("file",file);

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
					console.log('Authorize response:',response);
					console.log('error on save attempt');
					if(user.message)
						reject(translate({message: user.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If login was successful, set the token in local storage
		      resolve(user)
		    }
		}).catch(err => {
			console.log("Upload Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
			});
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
					console.log(response);
					if(data.message)
						reject(translate({message: data.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If respons was successful
		      resolve(data)
		    }
		}).catch(err => { 
			console.log("Login Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
		});
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
					if(user.message)
						reject(translate({message: user.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If delete was successful, return reslut
		      resolve(user)
		    }
		}).catch(err => { 
			console.log("delete Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
			});
	});
}

export function setReadMsg( msgId, userId, token ) {
	let config = {
	    method: 'POST',
	    headers: { 
	    	'Content-Type':'application/x-www-form-urlencoded', 
	     	'Authorization': 'Bearer '+ token 
	    },
	    body: `msgId=${msgId}&userId=${userId}`
	}
	return new Promise((resolve, reject) => {
		fetch(baseURL+'/api/protected/messages/setRead', config)
		  .then(response => response.json()
		  	.then(user => ({ user, response }))
		  ).then(({ user, response }) =>  {
		    if (!response.ok) {
		      // If there was a problem
					if(user.message)
						reject(translate({message: user.message, status: response.status}));
					else
						reject(translate({message: response.statusText, status: response.status}));
		    }
		    else {
		      // If delete was successful, return reslut
		      resolve(user)
		    }
		}).catch(err => { 
			console.log("delete Error: ", err);
			if(err.message)
				reject(translate({message: err.message}));
			else
				reject(translate({message: err}));
			});
	});
}
