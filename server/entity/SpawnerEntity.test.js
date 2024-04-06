import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import gameArea from '../GameArea.js';
import { SpawnerEntity } from './SpawnerEntity.js';
import { Vector2 } from '../math/Vector2.js';

// à finir quand le côté serveur sera opérationnel

describe('Spawner entity tests', () => {
	it('spawns several monsters at once', () => {
		const spawner = new SpawnerEntity({
			pos: new Vector2(200, 200),
		});
		gameArea.add_entity(spawner);
		assert.strictEqual(gameArea.entities.length, 1);
		spawner.update();
		assert.strictEqual(gameArea.entities.length, 5);
	});
});
