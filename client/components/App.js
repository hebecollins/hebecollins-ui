import React from 'react';
import Greetings from './Greetings';
import NavigationBar from './NavigationBar';
import IntlTelInput from 'react-intl-tel-input';
import 'file?name=libphonenumber.js!./../../node_modules/react-intl-tel-input/dist/libphonenumber.js';
import './../../node_modules/react-intl-tel-input/dist/main.css';

class App extends React.Component{

    handle(status, value, countryData, number){
        console.log(
            // status// cam be used for validation
            // , value
             countryData.dialCode
             //  number
        );
    }

    render() {
        // const handle = (status, value, countryData, number) => {
        //     console.log( number);
        //
        // };
        return(
            <div className="container">
                <NavigationBar/>
                <IntlTelInput
                    preferredCountries={['in']}
                    onPhoneNumberChange={this.handle }
                    placeholder = {'9876543210'}
                    numberType="MOBILE"
                    css={ ['intl-tel-input', 'form-control'] }
                    utilsScript={ 'libphonenumber.js' }
                />
                {this.props.children}
            </div>
        );
    }
}

export default App;