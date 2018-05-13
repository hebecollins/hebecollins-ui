import React from 'react';

/** This component splits the  screen into two parts. One part will be mobile & desktop visible, and the
 *  other will be desktop only
 *  @param monitorMode boolean=> If monitor mode is true, left side of the screen will be mobile visible
 *                               ELSE right side will be mobile visible
 *                               BY DEFAULT screen monitor mode is false
 *  @param children => Children defined inside <TwoScreen></TwoScreen> tag.
 *                      It is expected to receive 2 children with each having a 'key' as 'mobileVisible' or 'desktopOnly'
 * */
export const TwoScreen = ({children, monitorMode}) => {

    const getComponent = (key) => {
        return children.filter((component) => {
            return component.key === key;
        });
    };

    return (
        <div>
            {monitorMode ?
                <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="content-child-two-screen">
                            {getComponent('mobileVisible')}
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-6 hidden-xs">
                        <div className="content-child-two-screen">
                            {getComponent('desktopOnly')}
                        </div>
                    </div>

                </div> :
                <div className="row">
                    <div className="col col-lg-6 col-md-6 col-sm-6 hidden-xs">
                        <div className="content-child-two-screen">
                            {getComponent('desktopOnly')}
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="content-child-two-screen">
                            {getComponent('mobileVisible')}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

TwoScreen.propTypes = {
    monitorMode: React.PropTypes.bool.isRequired
};

TwoScreen.defaultProps = {
    monitorMode: false
};