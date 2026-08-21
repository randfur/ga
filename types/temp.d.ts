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

        // Reclaims all temp objects as available for reuse, typically called at the
        // start or end of every frame.
        static reclaimAll(): void;
    }
}
export {};