import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
        <Container>
            <Row>
            <Col xs={12} md={4}>
                <div className="display-6 heading">Cinépix</div>
                <p>Lorem ipsum dolor sit.</p>
            </Col>
            <Col xs={12} md={4} className="text-right mt-4 mt-md-0">
                <h4>Quick Links</h4>
                <ul className="list-unstyled footer-links">
                <li><i>Home</i></li>
                <li><i>Movies</i></li>
                <li><i>Television</i></li>
                </ul>
            </Col>
            <Col xs={12} md={4} className="mt-4 mt-md-0">
                <div className="footer-social-icons d-flex justify-content-between">
                <i className='display-6'><FaFacebook /></i>
                <i className='display-6'><FaTwitter /></i>
                <i className='display-6'><FaInstagram /></i>
                </div>
            </Col>
            </Row>
        </Container>
        <Container className='mt-4 mt-md-0'>
            <div className='row'>
                <div className='col-md-6'>
                    <p className=''>Copyright &copy; 2024</p>
                </div>
                <div className='col-md-6 text-start text-md-end'>
                    <p className=''>Designed and Created by <span className='heading'>Manav Gosain</span></p>
                </div>
            </div>
        </Container>
    </footer>
  );
};

export default Footer;
