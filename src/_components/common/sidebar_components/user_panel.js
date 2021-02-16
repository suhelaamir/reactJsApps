import React, { Component, Fragment } from 'react';
import man from "../../../assets/images/user.png";

class UserPanel extends Component {

    render() {
        return(
            <Fragment>
                <div>
                    <div className="sidebar-user text-center">
                        <div><img className="img-60 rounded-circle lazyloaded blur-up" alt="user image" src={man} />
                        </div>
                        <h6 className="mt-3 f-14">Kamal Waris</h6>
                        <p>Two Wheeler Engineering</p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserPanel;