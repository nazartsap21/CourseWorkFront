export function getSeason(date: Date = new Date()): 'winter' | 'spring' | 'summer' | 'autumn' {
    const month = date.getMonth();
    if ([11, 0, 1].includes(month)) return 'winter';
    if ([2, 3, 4].includes(month)) return 'spring';
    if ([5, 6, 7].includes(month)) return 'summer';
    return 'autumn';
}

export function getTemperatureZones(date: Date = new Date()) {
    const season = getSeason(date);
    let optimalMin = 0, optimalMax = 0, acceptMin = 0, acceptMax = 0;

    switch (season) {
        case 'winter':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [0, 10, -10, 15];
            break;
        case 'spring':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [12, 18, 5, 22];
            break;
        case 'summer':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [20, 26, 17, 32];
            break;
        case 'autumn':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [10, 17, 3, 22];
            break;
    }


    return [
        { y1: 0, y2: acceptMin - 2, fill: '#EA4228' },
        { y1: acceptMin - 2, y2: acceptMin, fill: '#FF9933' },
        { y1: acceptMin, y2: optimalMin, fill: '#F5CD19' },
        { y1: optimalMin, y2: optimalMax, fill: '#5BE12C' },
        { y1: optimalMax, y2: acceptMax, fill: '#F5CD19' },
        { y1: acceptMax, y2: acceptMax + 2, fill: '#FF9933' },
        { y1: acceptMax + 2, y2: 35, fill: '#EA4228' },
    ];
}

export function getHumidityZones(date: Date = new Date()) {
    const season = getSeason(date);
    let optimalMin = 0, optimalMax = 0, acceptMin = 0, acceptMax = 0;

    switch (season) {
        case 'winter':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [30, 45, 25, 50];
            break;
        case 'spring':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [35, 55, 30, 60];
            break;
        case 'summer':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [40, 60, 35, 65];
            break;
        case 'autumn':
            [optimalMin, optimalMax, acceptMin, acceptMax] = [35, 55, 30, 60];
            break;
    }

    return [
        { y1: 0, y2: acceptMin - 5, fill: '#EA4228' },
        { y1: acceptMin - 5, y2: acceptMin, fill: '#FF9933' },
        { y1: acceptMin, y2: optimalMin, fill: '#F5CD19' },
        { y1: optimalMin, y2: optimalMax, fill: '#5BE12C' },
        { y1: optimalMax, y2: acceptMax, fill: '#F5CD19' },
        { y1: acceptMax, y2: acceptMax + 5, fill: '#FF9933' },
        { y1: acceptMax + 5, y2: 100, fill: '#EA4228' },
    ];
}
