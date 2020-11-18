export type BackdropProps = {
  toggle: boolean;
  onCloseMenu: () => void;
};

export type HoldMenuProps = {
  backdropProps: BackdropProps;
};

const initialState: HoldMenuProps = {
  backdropProps: {
    toggle: false,
    onCloseMenu: () => {},
  },
};

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_BACKDRROP_STATE":
      return { ...state, backdropProps: action.payload };
    default:
      return state;
  }
};
