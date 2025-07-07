import { pgTable, uniqueIndex, serial, varchar, boolean, timestamp, index, foreignKey, bigserial, text, time, bigint, integer, smallint, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { InferSelectModel } from "drizzle-orm";


export const category = pgTable("Category", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }),
}, (table) => {
	return {
		idx16619UkName: uniqueIndex("idx_16619_uk_name").using("btree", table.name.asc().nullsLast()),
	}
});

export const down = pgTable("Down", {
	id: serial().primaryKey().notNull(),
	url: varchar({ length: 300 }),
	downloaded: boolean(),
	date: timestamp({ withTimezone: true, mode: 'string' }),
}, (table) => {
	return {
		idx16624Url: uniqueIndex("idx_16624_url").using("btree", table.url.asc().nullsLast()),
	}
});

export const tag = pgTable("Tag", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }),
}, (table) => {
	return {
		idx16629UkName: uniqueIndex("idx_16629_uk_name").using("btree", table.name.asc().nullsLast()),
	}
});

export const video = pgTable("Video", {
	//id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
	id: bigserial({ mode: "number" }).primaryKey().notNull(),
	uaid: varchar({ length: 5 }),
	yid: varchar({ length: 11 }),
	title: varchar({ length: 200 }),
	description: text(),
	date: timestamp({ withTimezone: true, mode: 'string' }),
	postDate: timestamp({ withTimezone: true, mode: 'string' }),
	duration: time(),
	author: varchar({ length: 50 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	viewes: bigint({ mode: "number" }),
	likes: integer(),
	categoryId: integer(),
	aspectRatioWidth: smallint(),
	aspectRatioHeight: smallint(),
	textType: smallint(),
}, (table) => {
	return {
		idx16634FkCategory: index("idx_16634_fk_category").using("btree", table.categoryId.asc().nullsLast()),
		idx16634IdxTitle: index("idx_16634_idx_title").using("btree", table.title.asc().nullsLast()),
		idx16634IdxUaid: index("idx_16634_idx_uaid").using("btree", table.uaid.asc().nullsLast()),
		idx16634IdxYid: index("idx_16634_idx_yid").using("btree", table.yid.asc().nullsLast()),
		idx16634UiYid: uniqueIndex("idx_16634_ui_yid").using("btree", table.yid.asc().nullsLast()),
		fkCategoria: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "fk_categoria"
		}).onUpdate("restrict").onDelete("restrict"),
	}
});

export const videoTag = pgTable("VideoTag", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idVideo: bigint({ mode: "number" }).default(sql`'0'`).notNull(),
	idTag: integer().default(0).notNull(),
}, (table) => {
	return {
		idx16640FkTag: index("idx_16640_fk_tag").using("btree", table.idTag.asc().nullsLast()),
		fkTag: foreignKey({
			columns: [table.idTag],
			foreignColumns: [tag.id],
			name: "fk_tag"
		}).onUpdate("restrict").onDelete("restrict"),
		fkVideo: foreignKey({
			columns: [table.idVideo],
			foreignColumns: [video.id],
			name: "fk_video"
		}).onUpdate("restrict").onDelete("restrict"),
		idx16640Primary: primaryKey({ columns: [table.idVideo, table.idTag], name: "idx_16640_primary"}),
	}
});

// add por Vanduir: tipos
//export type Video0 = typeof video.$inferSelect; // dessa maneira é mais simples
export type Video = InferSelectModel<typeof video>;
