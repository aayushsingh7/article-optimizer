 const formatDate = (createdAt) => {
  const d = new Date(createdAt);
  return d.toLocaleDateString("en-GB");
};

export default formatDate