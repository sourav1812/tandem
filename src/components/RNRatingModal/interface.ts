export interface ratingModalProps {
    visible : boolean;
    renderModal : ()=> void;
    nextClick : ()=>void;
}

export interface ratingType {
    name : string;
}

export const ratingList : ratingType[] = [
    {name : '😡'},
    {name : '😖'},
    {name : '😑'},
    {name : '😊'},
    {name : '😍'},
]