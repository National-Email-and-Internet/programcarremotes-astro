import { defineCollection, z } from 'astro:content';

// Individual instruction pages (the actual how-to content)
const instructions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    make: z.string(),
    model: z.string(),
    years: z.string(),
    yearStart: z.number(),
    yearEnd: z.number(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
    timeMinutes: z.number().default(5),
    requiresExistingKey: z.boolean().default(true),
    requiresLocksmith: z.boolean().default(false),
    author: z.string().default('The Remote Guy'),
    pubDate: z.string(),
    oldUrl: z.string().optional(),
  }),
});

export const collections = {
  instructions,
};
