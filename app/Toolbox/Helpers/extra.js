import $ from 'jquery'
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
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


/**@return int => index of current day ([sun, mon, tue, wed, thu, fri, sat] => [0,1,2,3,4,5,6])
 * */
export const currentDayOfWeek = ()=> {
    const d= new Date();
    return d.getDay();
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
    if( moment(date) >  moment().subtract(7, 'days')){
        return moment(date).calendar()
    }
    else{
        return moment().format("MMM Do YYYY");
    }
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
    setTimeout(()=>{
        const elementError = document.getElementsByClassName("help-block");
        const firstElementError = elementError[0];
        if (firstElementError) {
            window.scrollTo(0, firstElementError.offsetTop - 100);
        }
    }, 100);
};

/**Waits for 100 milliseconds for the DOM to get updated. After that it reads first "alert"(of the page)
 * , which contains alert, and scroll to it
 * */
export const scrollToAlert = () => {
    setTimeout(()=> {
        const elementAlert = document.getElementsByClassName("alert");
        const firstElementAlert = elementAlert[0];
        if(firstElementAlert){
            window.scrollTo(0, firstElementAlert.offsetTop - 100);
        }
    }, 100);
};