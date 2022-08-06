/**
 * SH - 29-11-2021
 */

import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; //useHistory
import queryString from "query-string";

import Policy from "components/common/Footer/Policy";

import axios from "axios";
import { axiosAdmin } from "services/api";
import { GET_KEYWORD_DATA } from "constants/urls";
import Game from "modules/Games/Game";
const RoutePage = (props) => {
  const keyword = props.match?.params?.name;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const qry = queryString.parse(location.search);
  const userToken = qry?.userToken;
  const site_id = 4;
  //const { isAuth } = useSelector(state => state.auth)
  // useEffect(() => {
  //   setData(null);
  // }, []);

  const dataClear = () => {
    setData(null);
  };

  useEffect(() => {
    (async () => {
      if (data == null) {
        try {
          setLoading(true);
          let res;
          if (userToken !== undefined) {
            let data = { keyword: keyword, site_id: site_id };
            res = await axios.post(
              `${process.env.REACT_APP_API_ADMIN_URL}${GET_KEYWORD_DATA}`,
              data,
              {
                headers: {
                  authorization: "Bearer " + userToken.replaceAll(" ", "+"),
                },
              }
            );
          } else {
            res = await axiosAdmin.post(`${GET_KEYWORD_DATA}`, {
              keyword,
              site_id: site_id,
            });
          }
          if (res.data?.data?.pageLinkData) {
            setData(res.data.data.pageLinkData);
            setLoading(false);
          }
        } catch (e) {
          setLoading(false);
        }
      }
    })();
  }, [keyword, userToken, data, site_id]);

  return (
    <>
      {data !== null &&
        (data.link_type === 13 ? (
          <Policy {...data} site_id={site_id} />
        ) : (
          <Game dataId={data?.data_id} clearData={dataClear} />
        ))}
    </>
  );
};

export default RoutePage;
