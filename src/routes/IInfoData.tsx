export default interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	tags: Tag[];
	team: Team[];
	description: string;
	message: string;
	open_source: boolean;
	started_at: Date;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	links: Links;
	links_extended: LinksExtended[];
	whitepaper: Whitepaper;
	first_data_at: Date;
	last_data_at: Date;
}

export interface Links {
	explorer: string[];
	facebook: string[];
	reddit: string[];
	source_code: string[];
	website: string[];
	youtube: string[];
}

export interface LinksExtended {
	url: string;
	type: string;
	stats?: Stats;
}

export interface Stats {
	subscribers?: number;
	contributors?: number;
	stars?: number;
	followers?: number;
}

export interface Tag {
	id: string;
	name: string;
	coin_counter: number;
	ico_counter: number;
}

export interface Team {
	id: string;
	name: string;
	position: string;
}

export interface Whitepaper {
	link: string;
	thumbnail: string;
}
