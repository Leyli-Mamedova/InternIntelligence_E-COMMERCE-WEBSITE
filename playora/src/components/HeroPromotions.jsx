import React from 'react';
import { Carousel, Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroPromotions = () => {
    const carouselItems = [
        {
            id: 1,
            title: 'New CD Releases Are Here!',
            subtitle: 'Discover the freshest sounds and expand your collection with Playora.',
            buttonText: 'Shop Now',
            link: '/genre/all',
            imageSrc: 'https://f4.bcbits.com/img/a3201315358_16.jpg'
        },
        {
            id: 2,
            title: 'Rockin\' Sale is On! Don\'t miss out your chance.',
            subtitle: 'Get 25% off all rock CDs this week only.',
            buttonText: 'Explore Rock CDs',
            link: '/genre/Rock',
            imageSrc: 'https://i.ebayimg.com/images/g/dz4AAOxy-WxTF1bp/s-l640.jpg'
        },
        {
            id: 3,
            title: 'Your Ultimate Pop Collection',
            subtitle: 'Find your favorite pop stars and their iconic albums.',
            buttonText: 'Find Pop Albums',
            link: '/genre/Pop',
            imageSrc: 'https://spindizzyrecords.com/cdn/shop/files/Olivia_Rodrigo_-_GUTS_-_CD_c3ba5f76-deb6-467d-9772-0eed3831623e.jpg?v=1688138515&width=1946'
        }
    ];

    return (
        <Carousel slide={true} direction="next" controls={false} indicators={false} pause={false} interval={3000}>
            {carouselItems.map(item => (
                <Carousel.Item key={item.id}>
                    <div
                        className="d-flex align-items-center justify-content-center promotion-height home-main pt-5 pb-4"
                    >
                        <Container>
                            <Row className="align-items-center justify-content-between">
                                <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                                    <h1 className="display-5 fw-bold mb-3 text-black">{item.title}</h1>
                                    <p className="lead mb-4 text-black">{item.subtitle}</p>
                                    <Link to={item.link}>
                                        <Button variant="dark" className='rounded-5 hero-buttons border-0' size="lg">
                                            {item.buttonText}
                                        </Button>
                                    </Link>
                                </Col>
                                <Col md={6} className="text-end">
                                    <div className='m-auto promotion-photos' style={{width: '500px', height: '500px'}}>
                                        <img
                                            className="d-block w-100 h-auto"
                                            src={item.imageSrc}
                                            alt={item.title}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
export default HeroPromotions;