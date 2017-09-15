import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TabModel, TabChangedEvent } from './tab.model';

@Component({
    selector: 'editor-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.css']
})
export class TabComponent implements AfterViewInit {

    @Input() public get activeTabIndex() {
        return this.activeIndex;
    }
    @Input() tabs: Array<TabModel>;
    @Output() tabChanged = new EventEmitter<TabChangedEvent>();

    private activeIndex = 0;
    private tabCount = 1;

    constructor() { }

    ngAfterViewInit() {

    }

    tabClick(index: number) {
        if (this.activeIndex === index) {
            return;
        }
        this.toggleActive(index);
    }

    addTab(fileName = `noname-${this.tabCount}`, content = '') {
        const newTab = new TabModel();
        if (this.tabs.some(v => v.fileName === fileName)) {
            fileName = `noname-${++this.tabCount}`;
        }
        newTab.fileName = fileName;
        newTab.editorContent = content;
        this.tabCount++;
        this.tabs.push(newTab);
        this.toggleActive(this.tabs.length - 1);
    }

    editTab(index: number, element: HTMLInputElement) {
        this.tabs[index].editing = true;
        setTimeout(() => element.focus(), 0);
    }

    editInputKeyPress(index: number, event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.tabs[index].editing = false;
        }
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
        if (this.activeIndex >= this.tabs.length) {
            this.activeIndex = 0;
            this.toggleActive(0);
        } else {
            this.toggleActive(this.activeIndex);
        }
    }

    toggleActive(activateIndex: number) {
        this.activeIndex = activateIndex;
        this.tabs.forEach(v => v.isActive = false);
        this.tabs[activateIndex].isActive = true;
        this.tabChanged.emit({
            index: activateIndex,
            data: this.tabs[activateIndex]
        });
        console.log('active tab:', this.activeIndex);
    }

    tabNext() {
        const activeIndex = this.tabs.length >= this.activeIndex + 1 ? 0 : this.activeIndex + 1;
        this.toggleActive(activeIndex);
    }

    tabBack() {
        const activeIndex = this.activeIndex - 1 < 0 ? this.tabs.length - 1 : this.activeIndex - 1;
        this.toggleActive(activeIndex);
    }
}
