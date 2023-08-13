class LocalStorage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItem(key: string): any {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.error(`LocalStorage: error retrieving data: ${error}`);
            return undefined;
        }
    }
    
    setItem<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`LocalStorage: error saving data: ${error}`);
        }
    }
    
    removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`LocalStorage: error removing data: ${error}`);
        }
    }
}


class CalculationsHistoryStore extends LocalStorage {
    readonly EXPRESSIONS_HISTORY = 'EXPRESSIONS_HISTORY'
    cursor: number = 0;

    constructor(){
        super()
        this.resetCursorToLastPosition()
    }
        
    public getStoredExpressions() {
        return super.getItem(this.EXPRESSIONS_HISTORY) || []
    }

    private getCursorLastIndex(): number {
        const store = this.getStoredExpressions()
        return store.length -1
    }

    public resetCursorToLastPosition(){
        this.cursor = this.getCursorLastIndex()
    }
    
    private moveCursorBack() {
        if((this.cursor - 1) < 0){
            this.cursor = 0
        } else{

            this.cursor-=1
        }
    }

    private moveCursorForward() {
        if((this.cursor + 1) > this.getCursorLastIndex()){
            this.resetCursorToLastPosition()
        } else{
            this.cursor+=1
        }
    }

    setItem(expression: string): void {
        const store = this.getStoredExpressions()
        store.push(expression)
        super.setItem(this.EXPRESSIONS_HISTORY,store)
        this.resetCursorToLastPosition()
    }

    getPreviousItem(): string | undefined {
        this.moveCursorBack()
        const expressions = this.getStoredExpressions()
        const cursorItem = expressions.at(this.cursor)
        const lastKey = expressions && cursorItem !== undefined ? cursorItem : 0;
        return lastKey;
    }

    getNextItem(): string | undefined {
        const expressions = this.getStoredExpressions()
        const cursorItem = expressions.at(this.cursor)
        this.moveCursorForward()
        const lastKey = expressions && cursorItem !== undefined ? cursorItem : 0;
        return lastKey;
    }
}

export {
    LocalStorage,
    CalculationsHistoryStore
}