export const getRoomName = (person1, person2) => {
  if (person1 < person2) return person1 + "-" + person2;
  else return person2 + "-" + person1;
};
