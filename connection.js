export const connection = async(type) => {
    try {
      const response = await fetch(`http://192.168.0.181:3001/${type}`);
      const json = await response.json();
      return(type === 'doctors' ? json.doctors : json.patients);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }

};

// export const postData = async (name, age, type) => {
//   try {
//     const response = await fetch(`http://192.168.0.181:3001/${type}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name: name, age: age  }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const del = async (_id) => {
  return new Promise(async (reslove, reject) => {
  try {
    const response = await fetch(`http://192.168.0.181:3001/doctors/${_id}`, {
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


// export const putData = async (name, age, type ) => {
//   try {
//     const response = await fetch(`http://192.168.0.181:3001/${type}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name: name, age: age  }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };



