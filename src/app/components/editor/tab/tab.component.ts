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

    /**
     * Tab element click event.
     *
     * @param {number} index clicked tab's index.
     * @memberof TabComponent
     */
    tabClick(index: number) {
        if (this.activeIndex === index) {
            return;
        }
        this.toggleActive(index);
    }

    /**
     * Add tab button click event.
     *
     * @param {string} [fileName=`noname-${this.tabCount}`] default tab name.
     * @param {string} [content=''] default tab content.
     * @memberof TabComponent
     */
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

    /**
     * Tab's name double click event.
     *
     * @param {number} index tab's index.
     * @param {HTMLInputElement} element focus target <input>.
     * @memberof TabComponent
     */
    editTab(index: number, element: HTMLInputElement) {
        this.tabs[index].editing = true;
        setTimeout(() => element.focus(), 0);
    }

    /**
     * Tab's name input key event.
     *
     * @param {number} index tab's index.
     * @param {KeyboardEvent} event keyboard event.
     * @memberof TabComponent
     */
    editInputKeyPress(index: number, event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.tabs[index].editing = false;
        }
    }

    /**
     * Tab's remove button event.
     *
     * @param {number} index tab's index.
     * @memberof TabComponent
     */
    removeTab(index: number) {
        this.tabs.splice(index, 1);
        if (this.activeIndex >= this.tabs.length) {
            this.activeIndex = 0;
            this.toggleActive(0);
        } else {
            this.toggleActive(this.activeIndex);
        }
    }

    /**
     * Change active tab event.
     *
     * @param {number} activateIndex activation tab index.
     * @memberof TabComponent
     */
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

    /**
     * Active tab next.
     *
     * @memberof TabComponent
     */
    tabNext() {
        const activeIndex = this.tabs.length >= this.activeIndex + 1 ? 0 : this.activeIndex + 1;
        this.toggleActive(activeIndex);
    }

    /**
     * Active tab back.
     *
     * @memberof TabComponent
     */
    tabBack() {
        const activeIndex = this.activeIndex - 1 < 0 ? this.tabs.length - 1 : this.activeIndex - 1;
        this.toggleActive(activeIndex);
    }
}
