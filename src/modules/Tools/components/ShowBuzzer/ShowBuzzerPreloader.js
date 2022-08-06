import cardPlaceholder from "assets/img/placeholder-card.svg";

const ShowBuzzerPreloader = () => {
  return (
    <div>
      <div className="tab-pane fade active show ">
        <div
          className="show-buzzer "
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            // flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <div
            className="two-buzzer "
            // style={{
            //   margin: "0 auto",
            //   display: "flex",
            //   // justifyContent: "space-evenly",
            // }}
          >
            <div className="center-random-number pointer ripple">
              <img
                src={cardPlaceholder}
                className=""
                style={{
                  borderRadius: "100%",
                  height: "230px",
                  width: "230px",
                  marginBottom: "40px",
                }}
                alt="img-preloader"
              />
            </div>
            <div className="center-random-number pointer ripple">
              <img
                src={cardPlaceholder}
                className="ripple"
                style={{
                  borderRadius: "100%",
                  height: "230px",
                  width: "230px",
                  marginBottom: "40px",
                }}
                alt="img-preloader"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBuzzerPreloader;
