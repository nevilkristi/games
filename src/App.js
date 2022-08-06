import React, {
  useState,
  useLayoutEffect,
  useEffect,
  Suspense,
  lazy,
} from "react";
import { Switch, useLocation, useHistory } from "react-router-dom";
import protectedRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import queryString from "query-string";
import Layout from "components/common/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthData,
  setToken,
  fetchAccessToken,
  setIsAuth,
  fetchSites,
  getAllMenuList,
  fetchProfile,
  getAllFooterMenuList,
} from "store/actions";
import { get, set, remove } from "services/cookies";
import { connectMainIo } from "services/socket";
import { GET_KEYWORD_DATA } from "constants/urls";
import { axiosAdmin } from "services/api";
import { PreloaderLogo } from "components/preloders";
import { Helmet } from "react-helmet";
import { axiosAccounts } from "services/api";
import { GET_DRIFT_DATA } from "constants/urls";

const PrivateRouteMiddleware = lazy(() =>
  import("./routes/PrivateRouteMiddleware")
);
const PublicRouteMiddleware = lazy(() =>
  import("./routes/PublicRouteMiddleware")
);
const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const qry = queryString.parse(location.search);
  const tempToken = qry?.token;
  const { isAuth } = useSelector((state) => state.auth); //,user,token
  const pageUrl = location.pathname;
  const site_id = 4;

  const [driftLoading, setDriftLoading] = useState(false);
  const [driftData, setDriftdata] = useState({});

  useLayoutEffect(() => {
    const user = get("user");
    const token = get("token");

    if (!isAuth && !!token) {
      dispatch(setAuthData(user));
      dispatch(setToken(token));
      dispatch(setIsAuth(true));
      dispatch(fetchSites());
      dispatch(fetchProfile());
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(getAllMenuList({ site_id: site_id, menu_type: 1 }));
    dispatch(getAllFooterMenuList({ menu_type: 2, site_id: 4 }));
  }, [dispatch]);

  useEffect(() => {
    if (tempToken) {
      set("site_id", site_id);
      dispatch(
        fetchAccessToken({ temp_token: tempToken, site_id: site_id }, () => {
          // setLoading(false);
          history.replace(location.pathname);
        })
      );
    }
  }, [tempToken, dispatch, history, location.pathname]);

  useEffect(() => {
    if (isAuth) connectMainIo();
  }, [isAuth]);

  //redirect to login page if not logged in and redirect to game page if logged in
  useEffect(() => {
    const token = get("token");
    if (
      isAuth === false &&
      !token &&
      tempToken === undefined &&
      pageUrl === "/"
    ) {
      window.location.replace(
        `${process.env.REACT_APP_ACCOUNT_SITE_URL}/login?app_id=4&redirect=${process.env.REACT_APP_REDIRECT_URL}`
      );
    } else {
      (async () => {
        try {
          let res;
          let keyword = pageUrl.replaceAll("/", "");
          if (keyword !== "") {
            let data = { keyword: keyword, site_id: site_id };
            res = await axiosAdmin.post(GET_KEYWORD_DATA, data);

            if (res.data?.data?.pageLinkData) {
              if (res.data?.data?.pageLinkData?.link_type === 9) {
                if (!!res.data.data.pageLinkData.target_url) {
                  window.location.replace(
                    res.data.data.pageLinkData.target_url
                  );
                }
              } else if (res.data?.data?.pageLinkData?.link_type === 3) {
                if (isAuth === false && !token && tempToken === undefined) {
                  window.location.replace(
                    `${process.env.REACT_APP_ACCOUNT_SITE_URL}/login?app_id=4&redirect=${process.env.REACT_APP_REDIRECT_URL}/${res.data.data.pageLinkData.keyword}`
                  );
                }
              }
            } else {
              if (isAuth === false && !token && tempToken === undefined) {
                window.location.replace(
                  `${process.env.REACT_APP_ACCOUNT_SITE_URL}/login?app_id=4&redirect=${process.env.REACT_APP_REDIRECT_URL}${window.location.pathname}`
                );
              }
            }
          }
        } catch (e) {}
      })();
    }
  }, [isAuth, tempToken, pageUrl, dispatch]);

  const onClose = () => {
    const mainToken = get("mainToken");
    set("token", mainToken);
    remove("mainToken");
    remove("userId");
    remove("site");
    window.location.replace(process.env.REACT_APP_ADMIN_SITE_URL);
  };
  useEffect(() => {
    (async () => {
      try {
        setDriftLoading(true);
        const payload = {
          site_id: 4,
        };
        const res = await axiosAccounts.post(GET_DRIFT_DATA, payload);
        if (res?.status) {
          setDriftLoading(false);
          if (res?.data) {
            setDriftdata(res.data.data);
          }
        }
      } catch (err) {
        console.log("error", err.response?.data?.message || err.message);
        setDriftLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {driftData?.script && (
        <Helmet>
          <script type="text/javascript">{driftData.script}</script>
        </Helmet>
      )}
      {isAuth && (
        <Suspense fallback={<PreloaderLogo />}>
          <Layout>
            {!!get("mainToken") && window.location === window.parent.location && (
              <div className="bg-danger d-flex align-items-center justify-content-end p-3">
                <button
                  className="btn bg-white text-danger d-flex align-items-center rounded-pill px-3 frame-close-btn shadow-lg "
                  onClick={onClose}
                >
                  <i className="fas fa-arrow-left mr-2" />
                  <span>Back To Dashboard</span>
                </button>
              </div>
            )}

            <Switch>
              {publicRoutes.map((item, i) => (
                <PublicRouteMiddleware key={i} {...item} />
              ))}
              {protectedRoutes.map((item, i) => (
                <PrivateRouteMiddleware key={i} {...item} />
              ))}
            </Switch>
          </Layout>
        </Suspense>
      )}
    </>
  );
};

export default App;
