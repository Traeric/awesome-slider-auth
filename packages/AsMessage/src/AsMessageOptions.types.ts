import { VNode } from "vue";

export type MessageType = 'success' | 'error' | 'warn' | 'info';

interface MessageOptionInfo {
    id?: number,
    message: string | VNode;
    type?: MessageType;
    offset?: number;
    onClose?: Function;
    duration?: number;
    elementLike?: boolean;
}


export type AsMessageOptionsType = MessageOptionInfo | string;

