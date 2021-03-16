import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faListAlt, faCoffee, faColumns, faSort,faEdit, faPlus, faFileMedical,faCopy, faTrashAlt,faWrench,faFileMedicalAlt, faPenSquare, faTimesCircle, faReply } from '@fortawesome/free-solid-svg-icons';
import ttext from '../configTranslate';


const icon_attr_values = {
    size: [ "xs","sm","lg",
            "2x","3x","4x",
            "5x","6x","7x",
            "8x","9x","10x"],
    rotation: [90,180,270],
    flip: ["horizontal","vertical","both"],
    border: true,
    inverse: true,
    fixedWidth : true,
    listItem: true,
}


const FA={
indexColIcon: [ <FontAwesomeIcon icon={faListAlt} size={icon_attr_values.size[3]} rotation={180} /> , ],
    sortIcon: [ <FontAwesomeIcon icon={faSort} title={ttext["sort"]} />, ],
    deleteIcon:[ <FontAwesomeIcon icon={faTrashAlt} title={ttext["delete"]} />, ],
    editIcon:[ <FontAwesomeIcon icon={faEdit} title={ttext["edit"]} />, ],
    addIcon:[ <FontAwesomeIcon icon={faPlus} title={ttext["add"]} />, ],
    advancedOptionIcon:[ <FontAwesomeIcon icon={faCoffee} />, ],
    downloadDataIcon:[ <FontAwesomeIcon icon={faCoffee} />, ],
    copyIcon: [ <FontAwesomeIcon icon={faCopy} />, ],
    columnIcon: [ <FontAwesomeIcon icon={faColumns} />, ],
    changeFixIcon: [ <FontAwesomeIcon icon={faWrench} />, ],
    test1: [ <FontAwesomeIcon icon={faFileMedical} />, ],
    test2: [ <FontAwesomeIcon icon={faFileMedicalAlt} />, ],
    contentEditableIcon: [ <FontAwesomeIcon icon={faPenSquare} title={ttext["contentEditable"]} className="bg-success text-dark" />, ],
    exitIcon: [ <FontAwesomeIcon icon={faTimesCircle} title={ttext["exit"]} />, ],
    updateIcon: [<FontAwesomeIcon icon={faReply} title={ttext["update"]} /> ],

}



export default FA;