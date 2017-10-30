import $ from 'jquery'

/**Takes any integer, positive or negative and returns its distance in weekday if 0 was sunday
 * For eg. If startDayNumber = 0, then 1 will be mon, 6 will be sat, -8 will be sat
 * @param i => integer distance from reference point.
 *             Can be any integer, from -ve to +ve
 * @param fullName (optional) => bool. IF TRUE, full name of day is returned for eg. Sunday
 *                               IF FALSE, short name is returned
 *                               By default it returns short name
 * @param startDayNumber (optional)=> the reference day in terms of integer from which weekDay is needed.
 *                                    0 -> sun, 1 -> mon, 2 -> tue, 3 -> wed
 *                                    4 -> thu, 5 -> fri, 6->sat
 */
export const dayOfWeek = (i, fullName=false,startDayNumber=0) => {
    const weekDays=["sun","mon","tue","wed","thu","fri","sat"];
    const weekDaysFullName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    if (i % 7 < 0)
        return fullName?weekDaysFullName[7 + i % 7 + startDayNumber]:weekDays[7 + i % 7 + startDayNumber];
    else
        return fullName?weekDaysFullName[i % 7 + startDayNumber]:weekDays[i % 7 + startDayNumber]
};

/**This methods gives reference-free clone to avoid immutability.
 * @param input => any javascript object, array, objectArray
 * @return array => immutable clone of the given input
 * */
export const deepCloneArray=(input)=>{
    return $.extend(true, [], input);
};

/**This methods gives reference-free clone to avoid immutability.
 * @param input => any javascript object, array, objectArray
 * @return object => immutable clone of the given input
 * */
export const deepCloneObject=(input)=>{
    return $.extend(true, {}, input);
};