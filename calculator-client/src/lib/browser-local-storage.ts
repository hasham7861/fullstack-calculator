class LocalStorage {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getItem(key: string): any {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.error(`LocalStorage: error retrieving data: ${error}`);
            return undefined;
        }
    }
    
    static setItem<T>(key: string, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`LocalStorage: error saving data: ${error}`);
        }
    }
    
    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`LocalStorage: error removing data: ${error}`);
        }
    }
}


class CalculationsHistoryStore extends LocalStorage {

    static readonly EXPRESSIONS_HISTORY = 'EXPRESSIONS_HISTORY'

    static setItem(expression: string): void {
        const store = super.getItem(this.EXPRESSIONS_HISTORY) || []
        store.push(expression)
        super.setItem(this.EXPRESSIONS_HISTORY,store)
    }

    static getPreviousAndMoveCursorBack(): string | undefined {
        const expressions = super.getItem(this.EXPRESSIONS_HISTORY);
        const lastKey = expressions && expressions.length > 0 ? expressions.pop() : 0;
        super.setItem(this.EXPRESSIONS_HISTORY, expressions)
        return lastKey;
    }
}

export {
    LocalStorage,
    CalculationsHistoryStore
}