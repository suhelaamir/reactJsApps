import React, {Component, Fragment} from 'react';

class Footer extends Component {
    render() {
        return(
            <Fragment>
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 footer-copyright">
                                <p className="mb-0">Copyright 2020 © Jamal Garage Pvt. Ltd. All rights
reserved.</p>
                            </div>
                            <div className="col-md-6">
                                <p className="pull-right mb-0">Jamal Garage mall Admin panel<i className="fa faheart"></i></p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            </Fragment>
        );
    }
}
export default Footer;