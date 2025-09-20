import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faCertificate, faMoneyBillWave, faCheckCircle, faTruck } from '@fortawesome/free-solid-svg-icons';

const WhyChoosePurego = () => {
  const points = [
    {
      icon: faFlask,
      title: 'Lab-Tested for Purity and Safety',
      description:
        'Every Purego supplement is independently lab-tested to ensure that the ingredients and nutritional values exactly match the label. Our testing ensures that there are no harmful or banned substances, giving you peace of mind with every dose.',
    },
    {
      icon: faCertificate,
      title: 'FSSAI-Certified Manufacturing',
      description:
        'Purego products are manufactured in FSSAI-certified facilities that follow strict quality and hygiene standards. This guarantees safe, authentic, and high-quality supplements every time.',
    },
    {
      icon: faMoneyBillWave,
      title: 'Direct-to-Consumer Pricing',
      description:
        'By eliminating middlemen, Purego delivers premium supplements at honest prices. You pay for quality, not marketing, fancy packaging, or hype.',
    },
    {
      icon: faCheckCircle,
      title: 'Transparent and Authentic',
      description:
        'Purego believes in full transparency—what you see on the label is exactly what’s inside the product. No exaggeration, no hidden additives.',
    },
    {
      icon: faTruck,
      title: 'Nationwide Delivery with COD Option',
      description:
        'Our supplements are available across India, with a Cash on Delivery (COD) option for secure and convenient shopping.',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5" >
        Why Choose <span style={{ color: '#88c349' }}>Purego?</span>
      </h2>

      {/* First Row: 3 boxes */}
      <div className="row justify-content-center">
        {points.slice(0, 3).map((point, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 rounded shadow-lg border-0">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="mb-3" style={{ fontSize: '2.5rem', color: '#88c349' }}>
                  <FontAwesomeIcon icon={point.icon} />
                </div>
                <h5 className="card-title" style={{ color: '#333', fontWeight: '600' }}>
                  {point.title}
                </h5>
                <p className="card-text" style={{ color: '#555' }}>
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row: 2 boxes centered */}
      <div className="row justify-content-center">
        {points.slice(3).map((point, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 rounded-3 shadow-lg border-0">
              <div className="card-body d-flex flex-column align-items-start">
                <div className="mb-3" style={{ fontSize: '2.5rem', color: '#88c349' }}>
                  <FontAwesomeIcon icon={point.icon} />
                </div>
                <h5 className="card-title" style={{ color: '#333', fontWeight: '600' }}>
                  {point.title}
                </h5>
                <p className="card-text" style={{ color: '#555' }}>
                  {point.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoosePurego;
