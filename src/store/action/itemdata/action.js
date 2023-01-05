export const SetRfid = rfid => {
    console.log('rfid', rfid);
    return dispatch => {
      dispatch({type: 'RFID',rfid});
    };
  };
  export const SetRfid1 = rfid1 => {
    console.log('rfid1', rfid1);
    return dispatch => {
      dispatch({type: 'RFID1', rfid1});
    };
  };
  export const SetModel = model => {
    console.log('model', model);
    return dispatch => {
      dispatch({type: 'MODEL',model});
    };
  };
  export const SetModel1 = model1 => {
    console.log('model1', model1);
    return dispatch => {
      dispatch({type: 'MODEL1',model1});
    };
  };
  export const SetLpn = lpn => {
    console.log('lpn', lpn);
    return dispatch => {
      dispatch({type: 'LPN',lpn});
    };
  };
  export const SetQty = qty => {
    console.log('qty', qty);
    return dispatch => {
      dispatch({type: 'QTY',qty});
    };
  };
  export const SetSerial = serial => {
    console.log('serial', serial);
    return dispatch => {
      dispatch({type: 'SERIAL',serial});
    };
  };