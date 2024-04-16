// Bootstrap imports
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css'

// Image Imports
import receptionImage from '../../../Photos/salon.jpg'
import salonImage from '../../../Photos/salon3.jpg'
import barberImage from "../../../Photos/barber.jpg"

function CarouselStart() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img className="select-none" src={receptionImage} alt="Beauty salon reception" style={{ objectFit: 'fill', width: '100vw', height: '100vh' }} />
        <Carousel.Caption className='mb-3 text-lg select-none'>
          <h2 className='font-bold select-none'> Close appointment to your favourite beauty salons </h2>
          <p> Embrace your beauty journey with us! </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img src={barberImage} alt="Beauty salon room" style={{ objectFit: 'fill', width: '100vw', height: '100vh' }} />
        <Carousel.Caption className="text-lg mb-3 select-none">
          <h2 className='font-bold select-none'> Best nail, hair salons of your town </h2>
          <p> Here you can find the best beauty services. </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img src={salonImage} alt="Barber room" style={{ objectFit: 'fill', width: '100vw', height: '100vh' }} />
        <Carousel.Caption className="text-lg mb-3 select-none">
          <h2 className='font-bold select-none'> Find your barber here </h2>
          <p> Haircut tattoos and nail grooming. </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselStart;