makeSuccess = (message = "", data = []) => {
  const json = { success: true, message: message, data: data };
  return json;
};

makeError = (message = "", data = []) => {
  const json = { success: false, message: message, data: data };
  return json;
};

generateId = students => {
  if (students.length)
    return (
      students.reduce((prev, current) => {
        return prev.y > current.y ? prev : current;
      }).id + 1
    );
  else return 1;
};

updateObjectByKey = (array, object, key) => {
  let cobj = array.find(obj => obj[key] === object[key]) || {};
  return [
    ...array.filter(obj => obj[key] !== object[key]),
    { ...cobj, ...object }
  ];
};
