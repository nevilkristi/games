import React from "react";
import { Col, Collapse, Row } from "reactstrap";
function FaqAccordion({ faq, id }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <div
        className="extra-pages card-head d-flex align-items-center justify-content-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w100">
          <h2 className=" m-0"> {faq.title}</h2>
        </div>
        <div>
          {isOpen ? (
            <i className="fa fa-chevron-up icons" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-chevron-down icons" aria-hidden="true"></i>
          )}
        </div>
      </div>
      <Collapse className="mb-3" isOpen={isOpen}>
        <div
          className="extra-pages card-body"
          dangerouslySetInnerHTML={
            faq.content !== null ? { __html: faq.content } : null
          }
        ></div>
      </Collapse>
    </>
  );
}

export default FaqAccordion;
