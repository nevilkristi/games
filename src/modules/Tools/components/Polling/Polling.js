import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getPollList } from "store/actions";

import PollingCard from "./PollingCard";
import PollingResult from "./PollingResult";
import "react-toastify/dist/ReactToastify.css";
import PollingAdd from "./PollingAdd";

const Polling = () => {
  const dispatch = useDispatch();
  const [tool_list, SetToolList] = useState({ id: 0, name: "" });
  useEffect (() => {
    dispatch(getPollList());
  }, [dispatch,tool_list]);
  const { pollList } = useSelector((state) => state.Tool);

  const [step, setStep] = useState(1);
  const stepChange = (tools, step) => {
    SetToolList({
      id: tools?.tool_list_id,
      name: tools?.list_name,
    });

    setTimeout(() => {
      setStep(step);
    }, 200);
  };

  return (
    <div>
      {step === 1 && <PollingAdd poll={pollList} onStepChange={stepChange} />}

      {step === 2 && (
        <PollingCard onStepChange={stepChange}  poll={pollList} tool_list={tool_list} />
      )}

      {step === 3 && (
        <PollingResult
          poll={pollList}
          tool_list={tool_list}
          onStepChange={stepChange}
        />
      )}
    </div>
  );
};

export default Polling;
