import React, { useState, useEffect } from "react";

import { Link, useHistory, useLocation } from "react-router-dom"; //useLocation //useHistory
import {
  logout,
  getNotification,
  seenNotification,
  seenAllNotification,
} from "store/actions";

// images
import Gameslogo from "assets/img/Games_Logo_Horizontal.png";
import notificationUnseenSVG from "assets/img/notification_unseen.svg";
import AddGamesOrIce from "modules/Dashboard/components/AddGamesOrIce";
import { clear } from "services/cookies";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "assets/img/user-img.jpg";
import growCurriculum from "assets/img/grow-curriculum.jpeg";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import DefaultSvg from "assets/img/placeholder-card.png";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setActiveMenu(location.pathname);

    location.pathname.includes("games/filter") && setActiveMenu("/");
    location.pathname.includes("accounts") && setActiveMenu("/accounts");
    location.pathname.includes("tool") && setActiveMenu("/tool");
  }, [location]);

  useEffect(() => {
    dispatch(getNotification({ page_record: 3, page_no: page }));
  }, [page, dispatch]);

  const { isAuth, user } = useSelector((state) => state.auth);
  const { Notification, NotificationCount, NotificationBadgeCount } =
    useSelector((state) => state.Miscellaneous);

  const { sites, appMenuList } = useSelector((state) => state.site);
  const [sidebarMenu, setSidebarMenu] = useState("");
  const [overlay01, setOverlay01] = useState("");
  const [activeMenu, setActiveMenu] = useState("/");

  const [addModal, setAddModal] = useState({
    show: false,
    data: null,
  });

  const handleClose = () => {
    setAddModal((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  const handleLogout = () => {
    clear();
    dispatch(logout());
    history.push("/");
  };

  const openSidebarMenu = () => {
    setSidebarMenu("show");
    setOverlay01("is-open");
  };

  const closeSidebarMenu = () => {
    setSidebarMenu("");
    setOverlay01("");
  };

  const handleActiveMenu = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <>
      <div className="container-fluid p0">
        <nav className="navbar c-navbar navbar-expand-lg navbar-dark bg-dark  c-plr100 c-header-height">
          <Link className="navbar-brand" to="/">
            <img src={Gameslogo} className="c-logo" alt="c-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              {!!appMenuList.length &&
                appMenuList?.map((MainMenu, i) => (
                  <li
                    className={`nav-item ${
                      activeMenu === MainMenu.link && "active"
                    }`}
                    key={i}
                    onClick={() => handleActiveMenu(MainMenu.link)}
                  >
                    {MainMenu.link !== "addnew" ? (
                      <Link
                        className="nav-link header-menu "
                        to={{
                          pathname: MainMenu.link,
                        }}
                      >
                        {MainMenu.application_menu_title}
                      </Link>
                    ) : (
                      <Link
                        className="nav-link header-menu"
                        to="#"
                        onClick={() => {
                          setAddModal((prevState) => ({
                            ...prevState,
                            show: true,
                          }));
                        }}
                      >
                        {/* {MainMenu.icon && (
                              <img
                                src={MainMenu.icon}
                                alt={MainMenu.application_menu_title}
                                className="menu-icon"
                              />
                            )} */}
                        {MainMenu.application_menu_title}
                      </Link>
                    )}
                  </li>
                ))}

              {/* Notification Icon */}
              <li className="nav-item ">
                <div className="nav-link  header-menu" to="#">
                  <div className="dropdown bell-dropdown-icon">
                    <button
                      className="bg-transparent bell-btn dropdown-toggle border-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={notificationUnseenSVG}
                        alt=""
                        className="menu-icon"
                      />
                      {NotificationBadgeCount > 0 && (
                        <span className="badge badge-light custom-badge">
                          {NotificationBadgeCount}
                        </span>
                      )}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {Notification.length === 0 ? (
                        <Card
                          className="align-center border-0"
                          style={{
                            width: "340px",
                          }}
                        >
                          <CardBody>
                            <div className="row">
                              <div className="col-md-9">
                                <CardTitle></CardTitle>
                              </div>
                              <div className="col-md-1"></div>
                            </div>
                            <CardText>No New Notification</CardText>
                          </CardBody>
                        </Card>
                      ) : (
                        <React.Fragment>
                          <div id="scrollableDiv1">
                            <InfiniteScroll
                              className="p-2"
                              dataLength={Notification.length}
                              next={() => {
                                setPage(page + 1);
                              }}
                              hasMore={
                                NotificationCount > Notification.length
                                  ? true
                                  : false
                              }
                              scrollableTarget="scrollableDiv1"
                            >
                              {Notification.map((notification, i) => (
                                <Link
                                  key={i}
                                  to={{
                                    pathname: `${notification.redirect_key}`,
                                  }}
                                  className=""
                                  onClick={() => {
                                    dispatch(
                                      seenNotification(
                                        notification.notification_id
                                      )
                                    );
                                  }}
                                >
                                  <div
                                    className="dropdown-item c-dropdown-item mt-2"
                                    style={{ width: "360px" }}
                                  >
                                    <div className="submenu-flex">
                                      <img
                                        src={
                                          notification.attachment === ""
                                            ? DefaultSvg
                                            : notification.attachment
                                        }
                                        alt="img"
                                        className="h50"
                                      />
                                      <h6 className="c-submenu-title">
                                        {notification.notification_title}
                                      </h6>
                                    </div>
                                    <p className="menu-p-light">
                                      {notification.notification_description}
                                    </p>
                                    <div className="submenu-flex c-justify-end">
                                      <p className="menu-p-date">
                                        {moment(
                                          notification.created_datetime
                                        ).format("DD/MM/YY - hh:mm a")}
                                      </p>

                                      <i
                                        className={
                                          notification.is_seen
                                            ? "fa fa-circle notification-seen-img ml-2 d-flex"
                                            : "fa fa-circle notification-seen-img ml-2 d-flex unseen"
                                        }
                                        aria-hidden="true"
                                      ></i>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </InfiniteScroll>
                          </div>
                          {NotificationBadgeCount > 0 && (
                            <div
                              className=" button-primary small-btn d-table button-read-all  mt-3 mr-2"
                              onClick={() => {
                                dispatch(seenAllNotification());
                              }}
                            >
                              Read All
                            </div>
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </li>

              {/* Right Side Panel */}
              {isAuth && (
                <>
                  <div className={`overlay overlay01 ${overlay01}`}></div>

                  <li className="nav-item ">
                    <div
                      className="nav-link "
                      to="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      // data-toggle="dropdown"
                      // aria-haspopup="true"
                      // aria-expanded="false"
                      onClick={openSidebarMenu}
                    >
                      <span>
                        <img
                          src={
                            !!user && !!user.profile_image
                              ? user.profile_image
                              : profileImg
                          }
                          alt="user-img"
                          className="profile-img-icon"
                        />
                      </span>{" "}
                      {user && <span className="">{user.first_name}</span>}
                      <i className="fa fa-chevron-down ml-2"></i>
                    </div>
                  </li>

                  <div id="sidebarMenu" className={`${sidebarMenu}`}>
                    <div className="sidemenu-header"></div>
                    <ul className="sidebarMenuInner p-0">
                      <li className="user">
                        <img
                          src={
                            !!user && !!user.profile_image
                              ? user.profile_image
                              : profileImg
                          }
                          alt="user-img"
                          className="user-img"
                        />
                        <label
                          className="sidebarIconToggle"
                          onClick={closeSidebarMenu}
                        >
                          <i className="fas fa-times"></i>
                        </label>

                        {!!user && !!user.display_name && (
                          <h3 className="mtb10">{user.display_name}</h3>
                        )}
                        {!!user && !!user.email && (
                          <p className="header-user-email">{user.email}</p>
                        )}
                        <div className="siderbar-btn">
                          <Link
                            className="btn account-btn btn-size"
                            target="_parent"
                            to={{
                              pathname: process.env.REACT_APP_ACCOUNT_SITE_URL,
                            }}
                          >
                            Account
                          </Link>
                          <Link
                            to="#"
                            className="btn logout-btn btn-size"
                            onClick={handleLogout}
                          >
                            Logout
                          </Link>
                        </div>
                      </li>
                      <li>
                        <h5 className="heading-text">Applications</h5>
                        <ul className="application-submenu p-0">
                          {sites.map((site) => (
                            <Link
                              key={site.site_id}
                              target="_parent"
                              to={{ pathname: site.url }}
                            >
                              <li
                                className={`
                                ${site.site_id === 4 ? "active" : ""}
                                ${site.site_id === 8 ? "d-none" : ""}`}
                              >
                                <img
                                  src={
                                    !!site.small_logo
                                      ? site.small_logo
                                      : growCurriculum
                                  }
                                  alt=""
                                />
                                {site.title}
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </li>
                    </ul>
                    {!!user && (user.user_role === 1 || user.user_role === 2) && (
                      <div className="admin-btn">
                        <Link
                          className="btn-edit-profile"
                          target="_parent"
                          to={{
                            pathname: process.env.REACT_APP_ADMIN_SITE_URL,
                          }}
                        >
                          Go To Admin Panel
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>
          {/* </div> */}
          {/* </nav> */}
          {/* </div> */}

          {addModal.show && (
            <AddGamesOrIce {...addModal} onClose={handleClose} />
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
