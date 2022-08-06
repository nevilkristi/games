import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RowPreloader } from "components/preloders";
import { useParams } from "react-router-dom";

function FilterTab() {
  const { filters } = useSelector((state) => state.Dashboard);
  const [isLoad, setIsLoad] = useState(true);
  const [popularFilters, setPopularFilters] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (filters.popular_filters) {
      setPopularFilters(filters.popular_filters);
      setIsLoad(false);
    }
  }, [filters]);
  return isLoad ? (
    <RowPreloader />
  ) : (
    <div className="cust-flex2 c-flex-wrap c-margin-top">
      {!!popularFilters &&
        popularFilters.map((f, i) => (
          <Link
            key={i}
            to={"/games/filter/" + f.filter_id}
            value={f.filter_id}
            className={
              +params.id === +f.filter_id
                ? "active btn-secondary"
                : "btn-secondary"
            }
          >
            {f.name}
          </Link>
        ))}
    </div>
  );
}

export default FilterTab;
