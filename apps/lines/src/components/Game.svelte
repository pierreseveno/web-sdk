<script lang="ts">
	import { onMount } from 'svelte';

	import { EnablePixiExtension, Button } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Rectangle, Sprite } from 'pixi-svelte';
	import { stateModal, stateBet, stateBetDerived } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import {
		PARIS_LIGHTS_SYMBOL_CATALOG,
		type ParisLightsSymbolId,
	} from '../game/symbolCatalog';

	const PREMIUM_SYMBOL_IDS: ParisLightsSymbolId[] = [
		'PREMIUM_ARC_DE_TRIOMPHE',
		'PREMIUM_LOUVRE_PYRAMID',
		'PREMIUM_PERFUME_BOTTLE',
		'PREMIUM_SEINE_CRUISE',
	];
	const MEDIUM_SYMBOL_IDS: ParisLightsSymbolId[] = [
		'MEDIUM_STREET_LANTERN',
		'MEDIUM_CHAMPAGNE_GLASS',
		'MEDIUM_METRO_SIGN',
		'MEDIUM_MACARON_BOX',
	];
	const LOW_SYMBOL_IDS: ParisLightsSymbolId[] = [
		'LOW_HEART',
		'LOW_DIAMOND',
		'LOW_CLUB',
		'LOW_SPADE',
	];

	const PROVIDER_ASSET_RATIO = 1536 / 1024;
	const BUY_BONUS_BUTTON_SIZE = 150;
	const BUY_BONUS_MARK_WIDTH = BUY_BONUS_BUTTON_SIZE * 0.95;
	const BUY_BONUS_MARK_HEIGHT = BUY_BONUS_MARK_WIDTH / PROVIDER_ASSET_RATIO;

	const context = getContext();
	const providerMonogramWidth = $derived(
		['portrait', 'tablet'].includes(context.stateLayoutDerived.layoutType()) ? 140 : 170,
	);
	const providerMonogramHeight = $derived(providerMonogramWidth / PROVIDER_ASSET_RATIO);
	const buyBonusButtonDisabled = $derived(!context.stateXstateDerived.isIdle());
	const buyBonusActivateModeActive = $derived(stateBetDerived.activeBetMode()?.type === 'activate');

	const onBuyBonusPress = () => {
		if (buyBonusButtonDisabled) return;

		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });

		if (buyBonusActivateModeActive) {
			stateBet.activeBetModeKey = 'BASE';
			return;
		}

		stateModal.modal = { name: 'buyBonus' };
	};

	onMount(() => (context.stateLayout.showLoadingScreen = true));

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});
</script>

<App>
	<EnableSound />
	<EnableHotkey />
	<EnableGameActor />
	<EnablePixiExtension />

	<Background />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<ResumeBet />
		<!--
			The reason why <Sound /> is rendered after clicking the loading screen:
			"Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
			Ref: https://developer.chrome.com/blog/autoplay
		-->
		<Sound />

		<MainContainer>
			<BoardFrame />
		</MainContainer>

		<MainContainer>
			<Board />
			<Anticipations />
		</MainContainer>

		<UI>
			{#snippet gameName()}
				<UiGameName name="PARIS LIGHTS" />
			{/snippet}
			{#snippet logo()}
				<Sprite
					key="providerFrenchGamblingMonogram"
					anchor={{ x: 1, y: 0 }}
					width={providerMonogramWidth}
					height={providerMonogramHeight}
				/>
			{/snippet}
			{#snippet buttonBuyBonus(buttonProps)}
				<Button
					{...buttonProps}
					sizes={{ width: BUY_BONUS_BUTTON_SIZE, height: BUY_BONUS_BUTTON_SIZE }}
					disabled={buyBonusButtonDisabled}
					onpress={onBuyBonusPress}
				>
					{#snippet children({ center, hovered, pressed })}
						<Rectangle
							{...center}
							anchor={0.5}
							width={BUY_BONUS_BUTTON_SIZE}
							height={BUY_BONUS_BUTTON_SIZE}
							borderRadius={50}
							backgroundColor={buyBonusButtonDisabled ? 0x1a1a1a : 0x000000}
							alpha={pressed ? 0.9 : hovered ? 0.95 : 1}
							{...buyBonusActivateModeActive
								? {
										borderWidth: 10,
										borderColor: 0xffffff,
									}
								: {}}
						/>
						<Sprite
							{...center}
							key="providerFrenchGamblingMark"
							anchor={0.5}
							width={BUY_BONUS_MARK_WIDTH}
							height={BUY_BONUS_MARK_HEIGHT}
							alpha={buyBonusButtonDisabled ? 0.65 : 1}
						/>
					{/snippet}
				</Button>
			{/snippet}
		</UI>
		<Win />
		<FreeSpinIntro />
		{#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
			<FreeSpinCounter />
		{/if}
		<FreeSpinOutro />
		<Transition />
	{/if}
</App>

<Modals>
	{#snippet version()}
		<div class="modal-copy">
			{#if stateModal.modal?.name === 'payTable'}
				<h3>PARIS LIGHTS PAYTABLE</h3>
				<p>5 reels x 3 rows, 20 fixed lines.</p>
				<p>
					Payout values remain unchanged in this foundation pass and will be finalized during
					math balancing.
				</p>
				<p><strong>Special symbols</strong></p>
				<ul>
					<li>{PARIS_LIGHTS_SYMBOL_CATALOG.WILD_GOLDEN_PARIS_EMBLEM.label} (Wild)</li>
					<li>{PARIS_LIGHTS_SYMBOL_CATALOG.SCATTER_ILLUMINATED_EIFFEL_TOWER.label} (Scatter)</li>
				</ul>
				<p><strong>Premium symbols</strong></p>
				<ul>
					{#each PREMIUM_SYMBOL_IDS as symbolId}
						<li>{PARIS_LIGHTS_SYMBOL_CATALOG[symbolId].label}</li>
					{/each}
				</ul>
				<p><strong>Medium symbols</strong></p>
				<ul>
					{#each MEDIUM_SYMBOL_IDS as symbolId}
						<li>{PARIS_LIGHTS_SYMBOL_CATALOG[symbolId].label}</li>
					{/each}
				</ul>
				<p><strong>Low symbols</strong></p>
				<ul>
					{#each LOW_SYMBOL_IDS as symbolId}
						<li>{PARIS_LIGHTS_SYMBOL_CATALOG[symbolId].label}</li>
					{/each}
				</ul>
				<p>Wild substitutes for all symbols except Scatter.</p>
			{/if}

			{#if stateModal.modal?.name === 'gameRules'}
				<h3>PARIS LIGHTS GAME RULES</h3>
				<ul>
					<li>Game layout: 5x3 reels with 20 fixed lines.</li>
					<li>Line wins pay from left to right, starting on reel 1.</li>
					<li>Only adjacent reels count for line wins.</li>
					<li>Standard wins are 3, 4, or 5 matching symbols on a payline.</li>
					<li>Wild substitutes for all symbols except Scatter.</li>
					<li>3 Scatters = 10 Free Spins.</li>
					<li>4 Scatters = 12 Free Spins.</li>
					<li>5 Scatters = 15 Free Spins.</li>
					<li>
						During Free Spins, each Street Lantern adds +1 to the global multiplier.
					</li>
					<li>The Free Spins feature starts at a global multiplier of x1.</li>
					<li>Multiplier increases are persistent for the rest of the feature.</li>
					<li>The current spin is paid using the updated multiplier.</li>
					<li>No retrigger during Free Spins in V1.</li>
				</ul>
			{/if}

			<GameVersion version="1.0.0-foundation" />
		</div>
	{/snippet}
</Modals>

<style lang="scss">
	:global(.content.column > span:first-child:has(+ .modal-copy)) {
		display: none;
	}

	.modal-copy {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 46rem;
	}

	.modal-copy h3 {
		margin: 0;
		font-size: 1rem;
		line-height: 1.25rem;
	}

	.modal-copy p,
	.modal-copy li {
		font-size: 0.9rem;
		line-height: 1.3rem;
	}

	.modal-copy ul {
		margin: 0;
		padding-left: 1.2rem;
	}
</style>
