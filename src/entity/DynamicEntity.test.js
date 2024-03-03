import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DynamicEntity } from './DynamicEntity.js';
import { error } from 'node:console';

describe('Dynamic entity tests', () => {
	it('must not move to negative coordinates', () => {
		assert.doesNotThrow(() => new DynamicEntity(120, 130, 10, 40), error);

		assert.throws(
			() => {
                const entity = new DynamicEntity(0, 20, 10, 40);
                entity.setSpeed(-1, 0);
                entity.move();
            },
			/L\'entité dynamique ne peut pas se déplacer dans des x négatifs !/
		);

		assert.throws(
			() => {
                const entity = new DynamicEntity(20, 0, 10, 40);
                entity.setSpeed(0, -1);
                entity.move();
            },
			/L\'entité dynamique ne peut pas se déplacer dans des y négatifs !/
		);
	});
});