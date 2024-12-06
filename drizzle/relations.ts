import { relations } from "drizzle-orm/relations";
import { category, video, tag, videoTag } from "./schema";

export const videoRelations = relations(video, ({one, many}) => ({
	category: one(category, {
		fields: [video.categoryId],
		references: [category.id]
	}),
	videoTags: many(videoTag),
}));

export const categoryRelations = relations(category, ({many}) => ({
	videos: many(video),
}));

export const videoTagRelations = relations(videoTag, ({one}) => ({
	tag: one(tag, {
		fields: [videoTag.idTag],
		references: [tag.id]
	}),
	video: one(video, {
		fields: [videoTag.idVideo],
		references: [video.id]
	}),
}));

export const tagRelations = relations(tag, ({many}) => ({
	videoTags: many(videoTag),
}));