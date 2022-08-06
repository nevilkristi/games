import React, {
  useCallback,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import { Label, Progress } from "reactstrap";
import { useDropzone } from "react-dropzone";
import { s3 } from "services/aws";
import AvField from "availity-reactstrap-validation/lib/AvField";
import gallerySvg from "assets/img/gallery.svg";
import videoPlaySvg from "assets/img/video-play.svg";

const Video = ({ src }) => {
  return (
    <video controls className="video" key={src}>
      <source src={src} type="video/mp4" />
      <source src={src} type="video/ogg" />
      <source src={src} type="video/ogg" />
      <source src={src} type="video/ogg" />
    </video>
  );
};

const CustomDropZone = forwardRef(
  (
    {
      label,
      handleOnDrop,
      src,
      multiple = false,
      accept = "image/*",
      folderName,
      type = "image",
      bucketName,
    },
    ref
  ) => {
    const [progress, setProgress] = useState({
      0: 0,
    });
    const [totalFiles, setTotalFiles] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isVideoLink, setIsVideoLink] = useState(false);

    const progressValue = useMemo(() => {
      const values = Object.values(progress);
      return values.reduce((a, b) => a + b, 0) / totalFiles;
    }, [progress, totalFiles]);

    useEffect(() => {
      if (progressValue === 100 && isUploading) {
        setIsUploading(false);
        setProgress({ 0: 0 });
        setTotalFiles(0);
      }
    }, [progressValue, isUploading]);

    useImperativeHandle(
      ref,
      () => ({
        isUploading,
      }),
      [isUploading]
    );

    useEffect(() => {
      if (!isUploading) setProgress(0);
    }, [isUploading]);

    const onDrop = useCallback(
      (acceptedFiles) => {
        setTotalFiles(acceptedFiles.length);
        if (multiple) {
          const files = acceptedFiles;

          files.forEach((file, i) => {
            const fileName = file.name
              .split(".")
              .slice(0, -1)
              .join(".")
              .replace(" ", "_");

            const fileExtension = file.name.split(".")[1];

            const currentTime = file.lastModified;

            const fileFullName =
              fileName + "_" + currentTime + "." + fileExtension;

            const params = {
              ACL: "public-read",
              Key: fileFullName,
              ContentType: file.type,
              Body: file,
            };
            setIsUploading(true);
            s3.upload(params)
              .on("httpUploadProgress", function (evt) {
                const value = Math.round((evt.loaded / evt.total) * 100);

                setProgress((prev) => ({
                  ...prev,
                  [i]: value,
                }));
              })
              .send(function (err, data) {
                if (err) {
                  console.dir(err);
                  return;
                }
                handleOnDrop(data.Location);
                setIsUploading(false);
              });
          });
        } else {
          const file = acceptedFiles[0];
          const fileName = file.name
            .split(".")
            .slice(0, -1)
            .join(".")
            .replace(" ", "_");
          const fileExtension = file.name.split(".")[1];
          const currentTime = file.lastModified;
          const fileFullName =
            fileName + "_" + currentTime + "." + fileExtension;

          const params = {
            ACL: "public-read",
            Key: fileFullName,
            ContentType: file.type,
            Body: file,
          };

          setIsUploading(true);
          s3.upload(params)
            .on("httpUploadProgress", function (evt) {
              const value = Math.round((evt.loaded / evt.total) * 100);
              setProgress({ 0: value });
              if (value === 100) {
                setIsUploading(false);
              }
            })
            .send(function (err, data) {
              if (err) {
                return;
              }
              handleOnDrop(data.Location);

              setIsUploading(false);
            });
        }
      },
      [handleOnDrop, multiple]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple,
      accept,
    });

    return (
      <div className="">
        <div className="d-flex align-items-center justify-content-between ">
          {!!label && <Label className="mb-0">{label}</Label>}
          {type === "video" && (
            <div className="custom-switch-row d-flex align-items-center">
              <div className="form-check form-switch form-switch-md custom-switch d-none">
                <input
                  type="checkbox"
                  className="form-check-input cursor-pointer"
                  id="is_arrow"
                  checked={isVideoLink}
                  onChange={(e) => {
                    setIsVideoLink(e.target.checked);
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {isVideoLink ? (
          <div className="mb-3">
            <AvField
              type="text"
              className="form-control"
              value={src}
              name="video"
              placeholder={!!label ? label : "Video Link"}
              onChange={(e) => {
                handleOnDrop(e.target.value);
              }}
            />
          </div>
        ) : (
          <>
            <div className={"d-flex align-items-center mt-3"}>
              <input {...getInputProps()} />
              <div
                {...getRootProps()}
                className="dropzone-area w-100"
                style={{
                  borderColor: isDragActive ? "rgba(52, 195, 143)" : "#ced4da",
                }}
              >
                {isDragActive && type === "video" ? (
                  <>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label c-clear "
                    >
                      {type === "video" ? "Videos" : "Images"}
                    </label>
                    <div className="image-upload-wrapper pointer">
                      <img
                        src={type === "video" ? videoPlaySvg : gallerySvg}
                        alt=""
                      />
                      <h6>
                        {type === "image"
                          ? "Drop your images here, or "
                          : "Drop your videos here, or "}
                        <span onClick={() => handleOnDrop("")}>Browse</span>
                      </h6>
                      <p>
                        {type === "image"
                          ? "Supports jpg, jpeg, png"
                          : "Supports mp4, mov"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="c-label c-clear"
                    >
                      {type === "video" ? "Videos" : "Images"}
                    </label>
                    <div className="image-upload-wrapper pointer">
                      {/* <CustomDropZone /> */}
                      <img
                        src={type === "video" ? videoPlaySvg : gallerySvg}
                        alt=""
                      />
                      <h6>
                        {type === "image"
                          ? "Drop your images here, or "
                          : "Drop your videos here, or "}
                        <span onClick={() => handleOnDrop("")}>Browse</span>
                      </h6>
                      <p>
                        {" "}
                        {type === "image"
                          ? "Supports jpg, jpeg, png"
                          : "Supports mp4, mov"}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {!!src &&
                (type === "image" ? (
                  <div className="image-container me-2">
                    <img className="ms-2 icon-image" src={src} alt="icon" />
                    <button
                      type="button"
                      className="close-icon text-white p-0 bg-danger"
                      onClick={() => handleOnDrop("")}
                    >
                      <i className="bx bx-x" />
                    </button>
                  </div>
                ) : type === "video" ? (
                  <div className="video-box ms-2">
                    <Video src={src} />
                    <button
                      type="button"
                      className="close-icon text-white p-0 bg-danger me-2"
                      onClick={() => handleOnDrop("")}
                    >
                      <i className="bx bx-x" />
                    </button>
                  </div>
                ) : type === "zip" ? (
                  <div className="image-container ms-2 ">
                    <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                      <i className="fas fa-file-archive fa-6x" />
                    </div>
                    <button
                      type="button"
                      className="close-icon text-white p-0 bg-danger me-2"
                      onClick={() => handleOnDrop("")}
                    >
                      <i className="bx bx-x" />
                    </button>
                  </div>
                ) : type === "document" ? (
                  <></>
                ) : null)}
            </div>
            {isUploading && (
              <div className="mt-2">
                <Progress
                  color="primary"
                  value={progressValue}
                  className="progress-xl"
                  style={{ width: "100%" }}
                >
                  {progressValue.toFixed(0)}%
                </Progress>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);
export default CustomDropZone;
