import React, { useState } from 'react'
import { Modal } from 'reactstrap'
import closepopup from "assets/img/close_popup.svg";
import { handleSaveRandomName } from 'store/actions';
import { useDispatch,useSelector } from 'react-redux';
const SaveListModal = ({show,onClose}) => {
    const { randomName } = useSelector((state) => state.Tool);
    const dispatch = useDispatch();
    const saveListHandle = (element) =>{
        dispatch(handleSaveRandomName({   
                tool_list_id: element.tool_list_id,
                list_name: element.list_name,
                tool_type: element.tool_type,
                option:[]
            }
        ))
    }
    const [saveName,setSaveName] = useState('')
    return (
        <Modal isOpen={show}  id="saveListModal" className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content custom-modal">
                 <div className="text-right ml-4 mr-4 mt-4 mb-0">
                     <button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
                         <span aria-hidden="true"><img src={closepopup} alt="" /> </span>
                     </button>
                 </div>
                 <div className="modal-body add-body text pt-4">
                 <div className="filter-modal-name mt-4">
                        Save Name List
                    <input type='text' id='add-list-text' placeholder='Name your list' className="bottom-border-input add-filter-input mb-4" value={saveName} onChange={(e)=>setSaveName(e.target.value)}/>
                    </div>
                     <button type="button"  className="button-primary add-pop-btn" onClick={()=>saveListHandle(randomName.rows.list_name)}>Save</button>
                     
                 </div>
 
             </div>
                
     </Modal>
    )
}

export default SaveListModal
