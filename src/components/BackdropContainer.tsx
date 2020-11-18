import React from "react";
import { connect } from "react-redux";

import { MenuBackDrop } from "../../react-native-hold-menu";
import { BackdropProps } from "../data/HoldMenuReducer";

type BackdropContainerProps = {
  Backdrop: BackdropProps;
};

const BackdropContainer = ({ Backdrop }: BackdropContainerProps) => {
  return (
    <MenuBackDrop toggle={Backdrop.toggle} onCloseMenu={Backdrop.onCloseMenu} />
  );
};

const mapStateToProps = (state: any) => ({
  Backdrop: state.HoldMenu.backdropProps,
});

export default connect(mapStateToProps)(BackdropContainer);
