const initialState = {
    userData:{
        id:null,
        email:'',
        fistName:'',
        lastName:'',
        pseudo:'',
        tests:[]
    },
    availableCourses:[],
    availableTests:[],
    ranking:[],
    tinderBg:'red'
}

function globalReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'REGISTER_USER_DATA':
        nextState = {
          ...state,
          userData:action.value
        };
    return nextState;
    case 'REGISTER_AVAILABLE_COURSES':
        nextState = {
          ...state,
          availableCourses:action.value
        };
    return nextState;
    case 'REGISTER_AVAILABLE_TESTS':
        nextState = {
          ...state,
          availableTests:action.value
        }
    return nextState;
    case 'REGISTER_RANKING':
        nextState = {
          ...state,
          ranking:action.value
        }
    return nextState;
  default:
    return state
  }
}

export default globalReducer;