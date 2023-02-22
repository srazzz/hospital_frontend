export const postDoctorData = (
  name,
  specialty,
  email,
  password,
  patientData,
  type,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://192.168.0.158:3001/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          specialty,
          email,
          password,
          patients: patientData,
        }),
      });
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
export const postPatientData = patientArray => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://192.168.0.158:3001/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientArray),
      });
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
export const putDoctorData = (name, specialty, email, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('///////////////////////');
      const response = await fetch(`http://192.168.0.158:3001/doctors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          specialty: specialty,
          email: email,
          // patients: patientData,
        }),
      });
      // console.log(response, 'response in api calls ');
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
