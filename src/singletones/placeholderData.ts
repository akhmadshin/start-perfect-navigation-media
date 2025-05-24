let placeholderData: object | undefined;

export const getPlaceholderData = () => placeholderData;

export const setPlaceholderData = (newPlaceholderData?: object) => {
  placeholderData = newPlaceholderData;
}