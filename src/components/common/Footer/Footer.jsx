import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

const Footer = () => {
  const { footerMenu } = useSelector((state) => state.footer);

  const list = useMemo(() => {
    const data = [...footerMenu];
    return data?.sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1)) || [];
  }, [footerMenu]);

  return (
    <footer className="footer-content ">
      <div className="container">
        <div className="footer-clearfix">
          <div className="footer-info">
            <NavLink to="#">
              <i className="far fa-copyright"></i>2022 Stuff You Can Use{" "}
            </NavLink>
            {list?.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <span>{" | "}</span>
                  <NavLink
                    to={{
                      pathname:
                        item?.system_pages_id > 0
                          ? "/" + item?.sycu_system_page?.page_link?.target_url
                          : item.link,
                    }}
                    target={item?.system_pages_id > 0 ? "" : "_parent"}
                  >
                    {item?.application_menu_title}
                  </NavLink>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
