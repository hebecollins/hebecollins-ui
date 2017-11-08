import React from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from "./actions/actionStore"
import {getPermissionByRoute, getRouteByName} from "./Toolbox/Helpers/routeHandler"
import {redirectTo, redirectToHome} from "./Toolbox/Helpers/redirect";

/**This method checks if user is allowed to access a certain route or not based on user type/
 * user types are: ["authentication","client","trainer","manager","admin"]
 * @param Component it is the component which has been passed to check for permission
 * @return Component if allowed else error
 * */

/*TODO(very important): Right now component is getting mounted after it is redirecting for a second, because render function shots anyway. So terminate the rendering just after it redirects
*/
export default function (Component) {
    class Permission extends React.Component {
        componentWillMount() {//gets called just once before first render
            const route = this.props.location.pathname;
            const {isAuthenticated, user} = this.props;
            /** if(notAutheticated AND requires authentication){
            *           redirectTo to login page with error message asking to log in
            *   }
             *  if(authenticated but his userType is not allowed){
             *          a forbidden response page
             *  }
             * */
            if (!isAuthenticated) {
                if (!getPermissionByRoute(route).includes('authentication')) {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: 'You need to login to access this page'
                    });
                    redirectToHome();
                }
            }
            else {
                const userType = user.user_type;
                console.log(route);
                console.log(userType);
                if (!getPermissionByRoute(route).includes(userType)) {
                    redirectTo('/'+userType);
                }
            }
        }

        componentWillUpdate(nextProps) {//gets called whenever render updates
            const route = this.props.location.pathname;
            if (!nextProps.isAuthenticated && route !== getRouteByName("HOME")) {
                redirectToHome();
            }
        }

        render() {
            return (
                <Component {...this.props}/>
            );
        }
    }

    Permission.propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        user: React.PropTypes.object.isRequired,
        addFlashMessage: React.PropTypes.func.isRequired
    };

    function mapStateToProps(state) {
        return {
            user: state.auth.user,
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps, {addFlashMessage})(Permission);
}

/*componentWillMount only gets called before render first time gets called.
when we pressed logout, it triggered the action of deleting the user data from local storage
hence changing the navigation bar. But when we pressed logout we didnot enter componentWillMount
hence there was no redirection that could have happened.
So, we introduced another method which is called just before the component gets updated.
Now, when we pressed on logout, componentWillMount gets called just before component was about
to mount. Hence it redirected.
*/