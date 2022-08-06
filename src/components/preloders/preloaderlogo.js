import growLogo from "assets/img/growLogo.svg";
const PreloaderLogo = () => {
  return (
    <div className="PreLoaderLogo">
      <div className="loader_wrapper">
        <img src={growLogo} alt="growLogo" />
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PreloaderLogo;
