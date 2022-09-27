<template>
	<canvas id="game-canvas"></canvas>
</template>

<script setup lang="ts">

let canvas;


onMounted (() => {
	canvas = document.getElementById("game-canvas") as HTMLCanvasElement | null;
	console.log(canvas);
	

})



</script>