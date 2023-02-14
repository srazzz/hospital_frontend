// import { fetchFunction } from './PatientScreen';
export const connection = async type => {
  try {
    const response = await fetch(`http://192.168.1.12:3001/${type}`);
    const json = await response.json();
    // console.log(patients)
    return type === 'doctors' ? json.doctors : json.patients;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

export const postData = (name, age, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://192.168.1.12:3001/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name, age: age}),
      });
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const putData = async (id,name,age, type) => {
   return new Promise(async (resolve, reject) => {
  try {
    // console.log(id,name,age,"theretehre")
    const response = await fetch(`http://192.168.1.12:3001/${type}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name : name , age: age}),
    });
    const data = await response.json();
    // console.log(data,"theretehre")
    resolve(data);
  } catch (error) {
    console.error(error);
    reject(error);
  }
  });
};


export const del = async (_id , type) => {
  return new Promise(async (reslove, reject) => {
  try {
    const response = await fetch(`http://192.168.0.181:3001/${type}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    reslove(data);
  } catch (error) {
    console.error(error);
    reject(error);
  }
});
};