import $ from 'jquery'
import isEmpty from 'lodash/isEmpty'

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
export const dayOfWeek = (i, fullName = false, startDayNumber = 0) => {
    const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const weekDaysFullName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (i % 7 < 0)
        return fullName ? weekDaysFullName[7 + i % 7 + startDayNumber] : weekDays[7 + i % 7 + startDayNumber];
    else
        return fullName ? weekDaysFullName[i % 7 + startDayNumber] : weekDays[i % 7 + startDayNumber]
};

/**This methods gives reference-free clone to avoid immutability.
 * @param input => any javascript object, array, objectArray
 * @return array => immutable clone of the given input
 * */
export const deepCloneArray = (input) => {
    return $.extend(true, [], input);
};

/**This methods gives reference-free clone to avoid immutability.
 * @param input => any javascript object, array, objectArray
 * @return object => immutable clone of the given input
 * */
export const deepCloneObject = (input) => {
    return $.extend(true, {}, input);
};

/**This method takes date in 'yyyy-mm-dd' format and convert it into 'dd monthName, yyyy' format
 * @param date => String in format 'yyyy-mm-dd'
 * @return String => in format 'dd monthName, yyyy'
 */
export const getFormattedDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let parts = date.split('-');
    const month = monthNames[parts[1] - 1];
    const year = parts[0];
    const day = parts[2];
    return `${day} ${month}, ${year}`;
};

export const getGenderFromGenderCode = (gender) => {
    switch (gender) {
        case "m":
            return "Male";
        case "f":
            return "Female";
        case "o":
            return "Others";
        default:
            return "undefined"
    }
};

/**Waits for 100 milliseconds for the DOM to get updated. After that it reads first "help-block"(of the page)
 * , which contains errors, and scroll to it
 * */
export const scrollToError = () => {
    setTimeout(function () {
        const elements = document.getElementsByClassName("help-block");
        const firstElement = elements[0];
        if (firstElement) {
            window.scrollTo(0, firstElement.offsetTop - 100);
        }
    }, 100);
};