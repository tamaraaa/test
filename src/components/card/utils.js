export const generateDescription = desc =>
  !desc ? "Description is not availible" : desc.slice(0, 40);
export const formatDate = date =>
  date
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-");
