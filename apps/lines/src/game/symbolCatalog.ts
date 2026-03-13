export type ParisLightsSymbolCategory = 'special' | 'premium' | 'medium' | 'low';

export type ParisLightsSymbolId =
	| 'WILD_GOLDEN_PARIS_EMBLEM'
	| 'SCATTER_ILLUMINATED_EIFFEL_TOWER'
	| 'PREMIUM_ARC_DE_TRIOMPHE'
	| 'PREMIUM_LOUVRE_PYRAMID'
	| 'PREMIUM_PERFUME_BOTTLE'
	| 'PREMIUM_SEINE_CRUISE'
	| 'MEDIUM_STREET_LANTERN'
	| 'MEDIUM_CHAMPAGNE_GLASS'
	| 'MEDIUM_METRO_SIGN'
	| 'MEDIUM_MACARON_BOX'
	| 'LOW_HEART'
	| 'LOW_DIAMOND'
	| 'LOW_CLUB'
	| 'LOW_SPADE';

export const PARIS_LIGHTS_RUNTIME_SYMBOLS = {
	WILD_GOLDEN_PARIS_EMBLEM: 'W',
	SCATTER_ILLUMINATED_EIFFEL_TOWER: 'S',
	PREMIUM_ARC_DE_TRIOMPHE: 'H1',
	PREMIUM_LOUVRE_PYRAMID: 'H2',
	PREMIUM_PERFUME_BOTTLE: 'H3',
	PREMIUM_SEINE_CRUISE: 'H4',
	MEDIUM_STREET_LANTERN: 'L1',
	MEDIUM_CHAMPAGNE_GLASS: 'L2',
	MEDIUM_METRO_SIGN: 'L3',
	MEDIUM_MACARON_BOX: 'L4',
	LOW_HEART: 'L5',
} as const;

export type RuntimeSymbolName =
	(typeof PARIS_LIGHTS_RUNTIME_SYMBOLS)[keyof typeof PARIS_LIGHTS_RUNTIME_SYMBOLS];

export type ParisLightsSymbol = {
	id: ParisLightsSymbolId;
	label: string;
	category: ParisLightsSymbolCategory;
	runtimeSymbol?: RuntimeSymbolName;
	status: 'wired' | 'reserved';
};

export const PARIS_LIGHTS_SYMBOL_CATALOG: Record<ParisLightsSymbolId, ParisLightsSymbol> = {
	WILD_GOLDEN_PARIS_EMBLEM: {
		id: 'WILD_GOLDEN_PARIS_EMBLEM',
		label: 'Golden Paris Emblem',
		category: 'special',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.WILD_GOLDEN_PARIS_EMBLEM,
		status: 'wired',
	},
	SCATTER_ILLUMINATED_EIFFEL_TOWER: {
		id: 'SCATTER_ILLUMINATED_EIFFEL_TOWER',
		label: 'Illuminated Eiffel Tower',
		category: 'special',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.SCATTER_ILLUMINATED_EIFFEL_TOWER,
		status: 'wired',
	},
	PREMIUM_ARC_DE_TRIOMPHE: {
		id: 'PREMIUM_ARC_DE_TRIOMPHE',
		label: 'Arc de Triomphe',
		category: 'premium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.PREMIUM_ARC_DE_TRIOMPHE,
		status: 'wired',
	},
	PREMIUM_LOUVRE_PYRAMID: {
		id: 'PREMIUM_LOUVRE_PYRAMID',
		label: 'Louvre Pyramid',
		category: 'premium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.PREMIUM_LOUVRE_PYRAMID,
		status: 'wired',
	},
	PREMIUM_PERFUME_BOTTLE: {
		id: 'PREMIUM_PERFUME_BOTTLE',
		label: 'Perfume Bottle',
		category: 'premium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.PREMIUM_PERFUME_BOTTLE,
		status: 'wired',
	},
	PREMIUM_SEINE_CRUISE: {
		id: 'PREMIUM_SEINE_CRUISE',
		label: 'Seine Cruise',
		category: 'premium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.PREMIUM_SEINE_CRUISE,
		status: 'wired',
	},
	MEDIUM_STREET_LANTERN: {
		id: 'MEDIUM_STREET_LANTERN',
		label: 'Street Lantern',
		category: 'medium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.MEDIUM_STREET_LANTERN,
		status: 'wired',
	},
	MEDIUM_CHAMPAGNE_GLASS: {
		id: 'MEDIUM_CHAMPAGNE_GLASS',
		label: 'Champagne Glass',
		category: 'medium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.MEDIUM_CHAMPAGNE_GLASS,
		status: 'wired',
	},
	MEDIUM_METRO_SIGN: {
		id: 'MEDIUM_METRO_SIGN',
		label: 'Metro Sign',
		category: 'medium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.MEDIUM_METRO_SIGN,
		status: 'wired',
	},
	MEDIUM_MACARON_BOX: {
		id: 'MEDIUM_MACARON_BOX',
		label: 'Macaron Box',
		category: 'medium',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.MEDIUM_MACARON_BOX,
		status: 'wired',
	},
	LOW_HEART: {
		id: 'LOW_HEART',
		label: 'Heart',
		category: 'low',
		runtimeSymbol: PARIS_LIGHTS_RUNTIME_SYMBOLS.LOW_HEART,
		status: 'wired',
	},
	LOW_DIAMOND: {
		id: 'LOW_DIAMOND',
		label: 'Diamond',
		category: 'low',
		status: 'reserved',
	},
	LOW_CLUB: {
		id: 'LOW_CLUB',
		label: 'Club',
		category: 'low',
		status: 'reserved',
	},
	LOW_SPADE: {
		id: 'LOW_SPADE',
		label: 'Spade',
		category: 'low',
		status: 'reserved',
	},
};

export const RUNTIME_SYMBOL_TO_PARIS_LIGHTS_SYMBOL_ID: Record<RuntimeSymbolName, ParisLightsSymbolId> = {
	H1: 'PREMIUM_ARC_DE_TRIOMPHE',
	H2: 'PREMIUM_LOUVRE_PYRAMID',
	H3: 'PREMIUM_PERFUME_BOTTLE',
	H4: 'PREMIUM_SEINE_CRUISE',
	L1: 'MEDIUM_STREET_LANTERN',
	L2: 'MEDIUM_CHAMPAGNE_GLASS',
	L3: 'MEDIUM_METRO_SIGN',
	L4: 'MEDIUM_MACARON_BOX',
	L5: 'LOW_HEART',
	S: 'SCATTER_ILLUMINATED_EIFFEL_TOWER',
	W: 'WILD_GOLDEN_PARIS_EMBLEM',
};

export const getParisLightsSymbolByRuntimeName = (runtimeSymbol: RuntimeSymbolName) =>
	PARIS_LIGHTS_SYMBOL_CATALOG[RUNTIME_SYMBOL_TO_PARIS_LIGHTS_SYMBOL_ID[runtimeSymbol]];