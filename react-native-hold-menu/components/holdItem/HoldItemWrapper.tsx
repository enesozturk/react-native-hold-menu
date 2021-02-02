import React, { memo } from "react";

// Components
import HoldItem from './HoldItem'
import type { HoldItemWrapperProps } from "./types";
import { HoldMenuContext } from '../provider'

const HoldItemWrapperComponent = ({
    id,
    items,
    menuAnchorPosition,
    children,
    moveTop = true
}: HoldItemWrapperProps) => {
    const [state, dispatch] = React.useContext(HoldMenuContext);
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        setIsActive(state.active && state.activeItem == id ? true : false)
    }, [state])

    const handleActivate = () => dispatch({ type: 'active', activeItem: id })

    const content = React.useMemo(() => (
        <HoldItem
            id={id}
            menuAnchorPosition={menuAnchorPosition}
            isActive={isActive}
            handleActivate={handleActivate}
            items={items}
            theme={state.theme}
            moveTop={moveTop}>
            {children}
        </HoldItem>
    ), [isActive])

    return content;
};

const HoldItemWrapper = memo(HoldItemWrapperComponent);

export default HoldItemWrapper;
