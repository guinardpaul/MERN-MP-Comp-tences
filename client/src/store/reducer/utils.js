/**
 * Add Elem to Array
 * @param {{}} previousArray array to update
 * @param {*} obj object
 */
export const AddElemToArray = (previousArray, obj) => {
  const updatedArray = [...previousArray, obj];
  return updatedArray;
};

/**
 * Update Array
 * @param {[]} previousArray previous array to update
 * @param {*} obj object
 */
export const updateArray = (previousArray, obj) => {
  const updatedArray = [...previousArray];
  updatedArray.forEach((elem, i) => {
    if (elem.id === obj.id) {
      updatedArray[i] = obj;
    }
  });
  return updatedArray;
};

/**
 * Remove Elem to Array
 * @param {[]} previousArray previous array to update
 * @param {number} obj_id object ID
 */
export const removeElemToArray = (previousArray, obj_id) => {
  const updatedArray = previousArray.filter(c => c.id !== obj_id);
  return updatedArray;
};