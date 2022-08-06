import cardPlaceholder from "assets/img/placeholder-card.svg";

const ToolPreloader = () => {
  return (
    <div className="row">
      <div className="col-lg-12">
        <h1 className="card-title placeholder-glow">
          <span className="placeholder col-12"></span>
        </h1>

        <div
          className="row"
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <div className="center" style={{margin: "0 auto"}}>
            <img
              src={cardPlaceholder}
              className="card-img-top"
              style={{
                borderRadius: "100%",
                height: "250px",
                width: "250px",
              }}
              alt="img-preloader"
            />
          </div>
          <div className="pause-restore-btn justify-content-center mt-4">
            <img
              src={cardPlaceholder}
              className="card-img-top"  
              style={{
                borderRadius: "100%",
                height: "50px",
                width: "50px",
              }}
              alt="img-card"
            />
          
        </div>
        </div>

        
      </div>
    </div>
  );
};

export default ToolPreloader;
