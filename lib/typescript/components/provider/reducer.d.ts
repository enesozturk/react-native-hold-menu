export declare type StateProps = {
    active: number;
    activeItem: string | null;
    theme: 'light' | 'dark';
};
export declare enum ActionType {
    Active = "Active",
    End = "End",
    Theme = "Theme"
}
export declare type Action = {
    type: ActionType.Active;
    activeItem: string | null;
} | {
    type: ActionType.End;
} | {
    type: ActionType.Theme;
};
export declare const reducer: (state: StateProps, action: Action) => StateProps;
export declare const initialState: StateProps;
