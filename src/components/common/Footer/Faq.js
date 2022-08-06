import React, { useEffect, useState } from "react";
import { getFaq } from "store/actions";

import { useDispatch, useSelector } from "react-redux";
import FaqAccordion from "./FaqAccordion";
import { Card, CardBody } from "reactstrap";
import { RowPreloader } from "components/preloders";
function Faq() {
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoad(true);
    dispatch(
      getFaq(
        {
          site_id: 4,
        },
        () => {
          setIsLoad(false);
        }
      )
    );
  }, [dispatch]);

  const { FAQs } = useSelector((state) => state.Miscellaneous);

  return (
    <section className="pb60 main-section">
      <div className="container-fluid c-plr100 mt-3">
        <div className="extra-pages">
          <div className="search-area-right-dashboard">
            {isLoad ? <RowPreloader height="100px" /> : <h6>FAQ</h6>}
          </div>
          <section className="extra-pages faq ">
            <div className="extra-pages  faq-container">
              {isLoad ? (
                <div>
                  <RowPreloader height="200px" />
                  <RowPreloader height="200px" />
                  <RowPreloader height="200px" />
                  <RowPreloader height="200px" />
                  <RowPreloader height="200px" />
                </div>
              ) : (
                <div className="">
                  <Card className="faq-card">
                    {FAQs.map((faq, i) => (
                      <CardBody>
                        <FaqAccordion faq={faq} id={i} />
                      </CardBody>
                    ))}
                  </Card>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Faq;
