interface ToNumberOptions {
    default?: number;
    min?: number;
    max?: number;
}

export function toBoolean(value: string) : boolean {
    return value === "true" || value === "1"
}

export function toDate(value: string) : Date {
    return new Date(value);
}

export function toNumber(value: string, opts: ToNumberOptions = {}) : number {
    let n = Number.parseInt(value, 10);

    if ( Number.isNaN(n) ){
        n = opts.default;
    }
    if ( opts.min ) {
        if ( n < opts.min ){
            n = opts.min;
        }
    }
    if ( opts.max ) {
        if ( n > opts.max ){
            n = opts.max;
        }
    }
    return n;
}