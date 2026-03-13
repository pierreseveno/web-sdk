<script lang="ts">
	import { Rectangle, Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	const PARIS_BACKGROUND_RATIO = 1536 / 1024;

	const context = getContext();
	const parisBackgroundProps = $derived.by(() => {
		const { width, height } = context.stateLayoutDerived.canvasSizes();
		const canvasRatio = width / (height || 1);

		if (canvasRatio > PARIS_BACKGROUND_RATIO) {
			return {
				x: width * 0.5,
				y: height * 0.5,
				width,
				height: width / PARIS_BACKGROUND_RATIO,
				anchor: 0.5,
			};
		}

		return {
			x: width * 0.5,
			y: height * 0.5,
			width: height * PARIS_BACKGROUND_RATIO,
			height,
			anchor: 0.5,
		};
	});
</script>

<Rectangle {...context.stateLayoutDerived.canvasSizes()} backgroundColor={0x000000} zIndex={-4} />
<Sprite key="parisBackground" {...parisBackgroundProps} zIndex={-3} />
