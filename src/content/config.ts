import { defineCollection, z } from 'astro:content';

// Individual instruction pages (the actual how-to content)
const instructions = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    make: z.string(),
    model: z.string(),
    years: z.string(), // e.g., "2018-2024"
    yearStart: z.number(),
    yearEnd: z.number(),
    difficulty: z.enum(['easy', 'medium', 'hard']).default('easy'),
    timeMinutes: z.number().default(5),
    requiresExistingKey: z.boolean().default(true),
    requiresLocksmith: z.boolean().default(false),
    compatibleFobs: z.array(z.object({
      fccId: z.string(),
      description: z.string().optional(),
    })).optional(),
    steps: z.array(z.object({
      step: z.number(),
      title: z.string(),
      description: z.string(),
      proTip: z.string().optional(),
      warning: z.string().optional(),
    })),
    troubleshooting: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    author: z.string().default('The Remote Guy'),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    image: z.string().optional(),
  }),
});

// Makes (car manufacturers)
const makes = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string().optional(),
    description: z.string().optional(),
    modelCount: z.number().optional(),
  }),
});

// Models (specific car models)
const models = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    make: z.string(),
    image: z.string().optional(),
    yearRanges: z.array(z.string()).optional(),
  }),
});

export const collections = {
  instructions,
  makes,
  models,
};
