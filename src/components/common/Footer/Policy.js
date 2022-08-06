import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import privacyImg from "assets/img/privacy-policy.jpg";
import { getSystemPageDetailData } from "store/actions";
import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";
import PolicyPlaceHolder from "./PolicyPlaceHolder";
import debounce from "lodash.debounce";
//import LoaderFooter from "components/common/Loader/LoaderFooter";
const Policy = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pageUrl = location.pathname;
  let keyword = pageUrl.replaceAll("/", "");
  const { systemPageDetail, loading } = useSelector((state) => state.footer);
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    dispatch(
      getSystemPageDetailData({
        site_id: 4,
        data_for: keyword,
      })
    );
  }, [dispatch, keyword]);
  const LoadFalse = debounce(() => {
    setIsLoad(false);
  }, 1000);

  useEffect(() => {
    LoadFalse();
  }, [systemPageDetail]);
  return !!loading || isLoad ? (
    <PolicyPlaceHolder />
  ) : (
    <>
      <section
        className="privacy-policy mb55"
        style={{ backgroundImage: `url(${privacyImg})` }}
      >
        <div className="container">
          <div className="privacy-policy-heading">
            <p>{systemPageDetail?.page_title}</p>
          </div>
        </div>
      </section>
      <section className="main_card_wrapper">
        <div
          className="container-fluid c-plr100 mt-5"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(systemPageDetail?.description),
          }}
        />
      </section>
    </>
  );
};

export default Policy;
