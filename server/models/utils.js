const addId = item => {
  console.log(1, item._id)
  return { ...item, id: item._id };
};

const addIds = list => {
  return list.map(addId);
};

module.exports = {
  addId,
  addIds
};
