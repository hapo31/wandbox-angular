

export class TabModel {
    isActive: boolean;
    editing: boolean;
    fileName: string;
    editorContent: string;
}

export interface TabChangedEvent {
    index: number;
    data: TabModel;
}