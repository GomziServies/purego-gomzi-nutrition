import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";

const Offers = () => {
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState(null);

  const handleApply = () => {
    if (promoCode.trim()) {
      setAppliedCode(promoCode);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const offers = [
    { title: "20% Off on Orders Above ₹3999", code: "SAVE20" },
    { title: "Flat ₹100 Off on Electronics", code: "ELEC100" },
    { title: "Buy 2 Get 1 Free on Apparel", code: "APPAREL21" },
  ];

  return (
    <>
      <h2 className="mb-4">Offers & Benefits</h2>

      <Card className="mb-4">
        <Card.Body>
          <h5>Apply Promo Code</h5>
          <Form className="d-flex gap-2 mt-3">
            <Form.Control
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </Form>
          {appliedCode && (
            <Alert variant="success" className="mt-3">
              Promo code "{appliedCode}" applied successfully!
            </Alert>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5>Available Offers</h5>
          <div className="mt-3">
            {offers.map((offer, idx) => (
              <div key={idx} className="border rounded p-3 mb-3">
                <strong>{offer.title}</strong>
                <p className="text-muted mb-0">
                  Use Code: <code>{offer.code}</code>
                </p>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Offers;
