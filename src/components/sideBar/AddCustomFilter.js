import React, { useEffect, useMemo, useState } from "react";
import { FormFeedback, Input, Modal } from "reactstrap";
import closePopup from "assets/img/close.svg";
import { useDispatch } from "react-redux";
import { createFilter } from "store/actions";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  filter_name: Yup.string().trim().required("Filter is required."),
});

const AddCustomFilter = ({
  show,
  onClose,
  filter_type,
  id,
  filter_name,
  mode,
}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    name: filter_name !== undefined ? filter_name : "",
    filter_type: filter_type === 2 ? 2 : 1,
  });

  useEffect(() => {
    setFilter({
      name: filter_name !== undefined ? filter_name : "",
      filter_type: filter_type === 2 ? 2 : 1,
    });
  }, [filter_name, filter_type]);

  const initialValues = useMemo(
    () => ({
      filter_name: filter_name,
    }),
    [filter_name]
  );

  const onSubmit = () => {
    let newFilter = filter;
    newFilter["filter_id"] = id;
    newFilter["name"] = values.filter_name;

    dispatch(createFilter(newFilter));
    onClose();
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      id="gameModal"
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            {mode === "add" ? "Add New Filter" : "Edit Filter"}
          </h5>
          <button
            type="button"
            className="close-img"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" onClick={onClose}>
              <img src={closePopup} className="close-img" alt="" />
            </span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleFormControlTextarea1" className="c-label">
                Filter
              </label>

              <Input
                type="textarea"
                name="filter_name"
                className="form-control c-textarea"
                value={values.filter_name}
                onChange={handleChange}
                id="exampleFormControlInput1"
                placeholder="Type here"
                onBlur={handleBlur}
                invalid={touched.filter_name && !!errors.filter_name}
              />
              <FormFeedback>{errors.filter_name}</FormFeedback>
            </div>
            <div className="cust-btn-flex mt20">
              <button
                className="btn-dull gameInfo cust-padd-bt"
                data-dismiss="modal"
                onClick={onClose}
              >
                CANCEL
              </button>
              <button type="submit" className="btn-primary cust-padd-btn">
                {mode === "add" ? "ADD" : "UPDATE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCustomFilter;
