if (!("groupBy" in Map)) {
    // @ts-expect-error polyfill para Map.groupBy
    Map.groupBy = <K, T>(items: Iterable<T>, callback: (item: T, index: number) => K): Map<K, T[]> => {
        const map = new Map<K, T[]>();
        let i = 0;
        for (const item of items) {
            const key = callback(item, i++);
            const group = map.get(key);
            if (!group) {
                map.set(key, [item]);
            } else {
                group.push(item);
            }
        }
        return map;
    };
}