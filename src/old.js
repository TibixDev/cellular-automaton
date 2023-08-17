function randCells() {
    return Array(64).fill(0).map(e => Array(64).fill(0).map(e => Math.random() > 0.5 ? 0 : 1));
}

function squareCells() {
    return Array(64).fill(0).map((e, i) => Array(64).fill(i % 2 === 0 ? 1 : 0).map((e, i) => e + i % 2 === 0 ? 0 : 1));
}

function coolCells() {
    const pattern = "00010011011111";
    return Array(64).fill(0).map((e, i) => Array(64).fill(0).map((e, j) => pattern[(i + j) % pattern.length] === "1" ? 1 : 0));
}