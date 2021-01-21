export class Page {
    index: number; // current_page
    length: number; // total
    size: number; // total
    sizeOptions: number[];
    constructor(current = 1, length = 0, size = 25) {
        this.index = current;
        this.length = length;
        this.size = size;
        this.sizeOptions = [5, 10, 25, 100];
    }

    public get pageIndex() {
        return this.index - 1;
    }

    public setValues(current, length, size) {
        this.index = current;
        this.length = length;
        this.size = size;
    }
}
