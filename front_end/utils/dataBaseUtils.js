export const putInServer = async ( { bodyData, linkExtender = '/api/user-data', headerData = {'Content-Type': 'application/json'} } ) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${linkExtender}`, {
      method: 'PUT',
      headers: headerData,
      body: JSON.stringify(bodyData)
    });

    if (!response.ok) {
        throw new Error('Failed to tinker calendar data');
    }

    const result = await response.json();
    console.log('Update successful:', result);
  } catch (error) {
      console.error('Error with accessing calendar data:', error);
  }
}; 

export const getFromServer = async ( { linkExtender = '/api/user-data', headerData = {'Content-Type': 'application/json'} } ) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${linkExtender}`, {
      method: 'GET',
      headers: headerData,
    }); 
  
    if (!response.ok) {
      throw new Error('Failed to post calendar data');
    }

    const result = await response.json();
    console.log('Get successful.')
    return result
    
  } catch (error) {
    console.error('Error with accessing calendar data:', error);   
  }
}

export const postToServer = async ( { bodyData, linkExtender = '/api/user-data', headerData = {'Content-Type': 'application/json'} } ) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${linkExtender}`, {
      method: 'POST',
      body: JSON.stringify(bodyData),
      headers: headerData,
    }); 
  
    if (!response.ok) {
      console.error('Failed response:', response);
      throw new Error('Failed to post calendar data');
    }

    const result = await response.json();
    console.log('Post successful.')
    return result
    
  } catch (error) {
    console.error('Error with accessing calendar data:', error);   
  }
}