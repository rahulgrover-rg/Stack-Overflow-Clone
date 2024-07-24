const allLangs = [
    {
      "key": "en",
      "language": "English"
    },
    {
      "key": "es",
      "language": "Spanish"
    },
    {
      "key": "hi",
      "language": "Hindi"
    },
    {
      "key": "pt",
      "language": "Portuguese"
    },
    {
      "key": "zh",
      "language": "Chinese"
    },
    {
      "key": "fr",
      "language": "French"
    }
  ]

const langReducer = (state = { lang : "en" , allLangs : allLangs}, action) => {
    switch (action.type) {
      case "LANG_CHANGE":
        return { ...state, lang: action?.data };
      case "LANG_RESET":
        return { ...state, lang : "en" };
      default:
        return state;
    }
  };
  
  export default langReducer;