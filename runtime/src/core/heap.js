import { memory } from '../runtime';
import { GrainError } from '../errors/errors';

export let heapAdjust = function(n) {
  throw new GrainError(-1, "Grain runtime is not yet instantiated.");
};

export function grainCheckMemory(numBytes) {
  if (numBytes === 0) {
    return;
  }
  let curTop = heapAdjust(0);
  if (memory.buffer.byteLength - curTop < numBytes) {
    memory.grow(1);
  }
}

export function grainHeapAllocate(numWords) {
  // allocates the number of words
  let curTop = heapAdjust(0);
  let wordsToAllocate = 4 * (Math.ceil((numWords - 1) / 4) + 1);
  heapAdjust(wordsToAllocate * 4);
  return curTop;
}
