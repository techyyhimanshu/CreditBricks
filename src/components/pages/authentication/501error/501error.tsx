import  { Fragment } from "react";
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error501 = () => {
	return(

<Fragment>
	<div>
					
					<Row>
						
							<div className="main-error-wrapper wrapper-1 page page-h">
								<h1 className="">501<span className="tx-20">error</span></h1>
								<h2 className="">Oopps. The page you were looking for doesn't exist.</h2>
				<h6 className="">You may have mistyped the address or the page may have moved.</h6><Link className="btn btn-primary" to={`${import.meta.env.BASE_URL}dashboard/dashboard1/`}>Back to Home</Link>
							</div>

					</Row>
				
				</div>
				</Fragment>
 
); };

Error501.propTypes = {};

Error501.defaultProps = {};

export default Error501;
