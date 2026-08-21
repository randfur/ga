declare global {
    class TempStorageType<T> {
        createNew: () => T;
        buffer: T[];
        index: number;
        constructor(createNew: () => T);
        acquire(): T;
    }

    class TempType {
        static storageList: TempStorageType<any>[];
        static reclaimAll(): void;
    }
}
export {};