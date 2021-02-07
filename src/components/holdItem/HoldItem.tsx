import React, { memo } from 'react';

// Components
import HoldItemChild from './HoldItemChild';
import type { HoldItemProps } from './types';
import { HoldMenuContext } from '../provider';
import { ActionType } from '../provider/reducer';

const HoldItemComponent = ({ ...props }: HoldItemProps) => {
  const { state, dispatch } = React.useContext(HoldMenuContext);
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(state.active && state.activeItem === props.id ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleActivate = () => {
    if (dispatch)
      dispatch({ type: ActionType.Active, activeItem: props.id.toString() });
  };

  const content = React.useMemo(() => {
    return (
      <HoldItemChild
        isActive={isActive}
        theme={state.theme}
        handleActivate={handleActivate}
        {...props}
      >
        {props.children}
      </HoldItemChild>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return content;
};

const HoldItem = memo(HoldItemComponent);

export default HoldItem;
