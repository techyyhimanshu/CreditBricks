
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
return (
    <div className="main-footer">
    <Col md={12} sm={12} >
        <div className="pt-0 ht-100p">
        @2025 Credt Bricks  {" "}
        <span className='float-end'>
          <Link to="#" className="text-primary me-4">
          Terms of Service
          </Link>
          <Link to="#" className="text-primary">
          Privacy
          </Link></span>
        </div>
      </Col>
    </div>
); }

