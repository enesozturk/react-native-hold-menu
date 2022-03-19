declare const styles: {
    menuWrapper: {
        position: "absolute";
        left: number;
        zIndex: number;
    };
    menuContainer: {
        position: "absolute";
        top: number;
        width: number;
        borderRadius: number;
        display: "flex";
        flexDirection: "row";
        justifyContent: "flex-start";
        alignItems: "flex-start";
        overflow: "hidden";
        zIndex: number;
    };
    menuInnerContainer: {
        display: "flex";
        flexDirection: "column";
        justifyContent: "flex-start";
        alignItems: "center";
    };
    menuItem: {
        width: string;
        display: "flex";
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        paddingHorizontal: number;
        paddingVertical: number;
    };
    border: {
        borderBottomWidth: number;
        borderBottomColor: string;
    };
    menuItemText: {
        fontSize: number;
        lineHeight: number;
        textAlign: "left";
        width: string;
        flex: number;
    };
    menuItemTitleText: {
        fontSize: number;
        lineHeight: number;
        textAlign: "center";
        width: string;
        flex: number;
    };
    textDark: {
        color: string;
    };
    textLight: {
        color: string;
    };
};
export default styles;
