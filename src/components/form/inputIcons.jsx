import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faEye, faKey } from '@fortawesome/free-solid-svg-icons';
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

    email: [ <FontAwesomeIcon icon={faEnvelopeSquare} title={ttext["email"]} size={icon_attr_values.size[3]} />, ],
    password: [ <FontAwesomeIcon icon={faKey} title={ttext["password"]}  size={icon_attr_values.size[3]} />, ],
    showPassword: [ <FontAwesomeIcon icon={faEye} title={ttext["showPassword"]}  size={icon_attr_values.size[3]} />, ],
}

export default FA;