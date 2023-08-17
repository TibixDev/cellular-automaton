<template>
    <div class="flex flex-col gap-5 items-center justify-center w-screen h-screen">
        <h1 class="text-4xl font-bold">Cellular Automaton</h1>
        <div class="grid cellular-grid">
            <template v-for="row, k in cellHistory" :key="k">
                <div v-for="cell, j in row" :key="j" class="w-2 h-2" :class="cell ? 'bg-transparent' : 'bg-blue-500'">
                </div>
            </template>
        </div>
        <div class="flex flex-row gap-3">
            <button @click="reset()" class="bg-blue-500 p-2 rounded-md text-white">Reset</button>
            <button @click="randCells()" class="bg-blue-500 p-2 rounded-md text-white">Rand</button>
            <button @click="iter()" class="bg-blue-500 p-2 rounded-md text-white">Next</button>
            <button @click="loop()" class="p-2 rounded-md text-white" :class="isLooping ? 'bg-red-500' : 'bg-blue-500'">
                {{ isLooping ? 'Stop Loop' : 'Start Loop' }}
            </button>
            <select name="ruleset" id="ruleset" v-model="engine" class="px-2 rounded-md bg-neutral-800">
                <option v-for="r in rules" :value="r">{{ r.name }}</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as rules from "../engines";

let loopInterval = ref(null);
let isLooping = ref(false);
let cells = ref<number[]>(Array(64).fill(0).map(e => 0));
// Set the last cell to 1
cells.value[cells.value.length - 1] = 1;
let cellHistory = ref<number[][]>(Array(64).fill(cells.value));
console.log(cells.value);

function processRuleset(ruleset) {
    // console.log("Newgen")
    let newCells = [cells.value[0]];
    for (let j = 2; j < cells.value.length; j++) {
        const chunk = `${cells.value[j-2]}${cells.value[j-1]}${cells.value[j]}`;
        // console.log(`${chunk} -> ${ruleset[chunk]}`)
        newCells.push(ruleset[chunk])
    }
    newCells.push(cells.value[cells.value.length - 1]);
    // console.log(newCells)
    cellHistory.value.push([...cells.value]);
    // Max cutoff: 64
    if (cellHistory.value.length > 64) {
        cellHistory.value.shift();
    }
    cells.value = newCells;
}

const engine = ref(rules.rule30);
function iter() {
    processRuleset(engine.value.ruleset);
}

function loop() {
    if (isLooping.value) {
        clearInterval(loopInterval.value);
        isLooping.value = false;
    } else {
        loopInterval.value = setInterval(() => iter(), 50);
        isLooping.value = true;
    }
    console.log(isLooping.value)
}

function randCells() {
    cells.value = Array(64).fill(0).map(e => Math.round(Math.random()));
    cellHistory.value = Array(64).fill(cells.value);
}

function reset() {
    cells.value = Array(64).fill(0).map(e => 0);
    cells.value[cells.value.length - 1] = 1;
    cellHistory.value = Array(64).fill(cells.value);
}
</script>

<style scoped>
.cellular-grid {
    grid-template-columns: repeat(64, minmax(0, 1fr));
}
</style>