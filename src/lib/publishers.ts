/*
 * Publisher lookup helpers for the static Astro site.
 * These queries read the publishers table at build time so pages can render
 * publisher metadata without a client-side API layer.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Retrieves all publishers sorted alphabetically by name.
 *
 * @param db - Shared database connection used for the lookup.
 * @returns A promise resolving to each publisher's summary data in name order.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
