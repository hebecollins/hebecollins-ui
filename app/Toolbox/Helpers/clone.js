import $ from 'jquery'

/**This methods gives reference-free clone to avoid immutability.
 * @param input => any javascript object, array, objectArray
 * @return immutable clone of the given input
 * */
export const deepCloneArray=(input)=>{
    return $.extend(true, [], input);
};

export const deepCloneObject=(input)=>{
    return $.extend(true, {}, input);
};