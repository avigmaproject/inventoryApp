export const initialState = {
    rfid: null,
    rfid1:null,
    model:null,
    model1:null,
    lpn:null,
    qty:null,
    serial:null
  };
  
  const reducer = (state = initialState, action) => {
    // console.log("actionaction", action);
    switch (action.type) {
      case 'RFID': {
        return {
          ...state,
          rfid: action.rfid,
        };
      }
      case 'RFID1': {
        return {
          ...state,
          rfid1: action.rfid1,
        };
      }
      case 'MODEL': {
        return {
          ...state,
          model: action.model,
        };
      }
      case 'MODEL1': {
        return {
          ...state,
          model1: action.model1,
        };
      }
      case 'QTY': {
        return {
          ...state,
          qty: action.qty,
        };
      }
      case 'LPN': {
        return {
          ...state,
          lpn: action.lpn,
        };
      }
      case 'SERIAL': {
        return {
          ...state,
          serial: action.serial,
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  